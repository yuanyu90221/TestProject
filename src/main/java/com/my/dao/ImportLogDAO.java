package com.my.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.sql.DataSource;

import com.my.fileutil.Common;
import com.my.model.ImportLogModel;
import com.my.model.Statistics;
import com.mysql.jdbc.Statement;

/**
 * 處理 DB ImportLog 的Class
 * @author FredTeng
 *
 */
public class ImportLogDAO 
{
	private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	/**
	 * insert importLog to DB
	 * @param importLog
	 * @return
	 */
	public String Insert(ImportLogModel importLog) {
		String importSN = "";
		String sql = "INSERT INTO importlog " +
				"( filename, org_filename, state, importtime, file_dec ) VALUES " +
				"( ?, ?, ?, ?, ?);";
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, importLog.getFilename());
			ps.setString(2, importLog.getOrg_filename());
			ps.setString(3, importLog.getState());
			ps.setString(4, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(importLog.getImporttime()));
			ps.setString(5, importLog.getDec());
						
			int affectedRows = ps.executeUpdate();
			if(affectedRows != 0) 
			{
				ResultSet generatedKeys = ps.getGeneratedKeys();
		        if (generatedKeys.next()) {
		        	importSN= generatedKeys.getLong(1)+"";
		        }
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}	
		
		return importSN;
	}

    /**
     * insert importLog to DB
     * @param importLog
     * @return
     */
    public String recover(ImportLogModel importLog) {
        String importSN = "";
        String sql = "INSERT INTO importlog " +
                "( importlog_sn, filename, org_filename, state, importtime, file_dec ) VALUES " +
                "( ?, ?, ?, ?, ?, ?);";
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, importLog.getImportlog_sn());
            ps.setString(2, importLog.getFilename());
            ps.setString(3, importLog.getOrg_filename());
            ps.setString(4, importLog.getState());
            //ps.setDate(4, new java.sql.Date(importLog.getImporttime().getTime()));
            ps.setString(5, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(importLog.getImporttime()));
            ps.setString(6, importLog.getDec());
                        
            int affectedRows = ps.executeUpdate();
            if(affectedRows != 0) 
            {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                if (generatedKeys.next()) {
                    importSN= generatedKeys.getLong(1)+"";
                }
            }
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }   
        
        return importSN;
    }
	
	/**
	 * 透過 userid 搜尋自己上載的 importlog
	 * @param strUserID
	 * @return
	 */
	public Map<String, List<ImportLogModel>> SearchByUserId (String strUserID){
		TreeMap<String,List<ImportLogModel>> imortlogs = new TreeMap<String, List<ImportLogModel>>();
		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
				+ " i.importtime AS importtime FROM importlog i, user_importlog ui  "
				+ "WHERE i.importlog_sn = ui.importlog_sn AND ui.user_id = ? order by importtime DESC";
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strUserID);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
			    String state = rs.getString("state");
			    if(state.equals("3")){
			        continue;
			    }
			    
				ImportLogModel importlog = new ImportLogModel();
				importlog.setImportlog_sn(rs.getString("importlog_sn"));
				importlog.setOrg_filename(rs.getString("org_filename"));
				
				importlog.setState(state);
				if(state.equals("0")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
				}else if(state.equals("1")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.1"));
				}else{
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.2"));
				}

				importlog.setDec( rs.getString("file_dec"));

				try {
					importlog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
				} catch (ParseException e) {
					importlog.setImporttime( rs.getDate("importtime"));	
					e.printStackTrace();
				}

				if(imortlogs.containsKey(importlog.getDec())){
					imortlogs.get(importlog.getDec()).add(importlog);
				}else{
					List<ImportLogModel> valuseList = new ArrayList<ImportLogModel>();
					valuseList.add(importlog);
					imortlogs.put(importlog.getDec(), valuseList);
				}
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			Common.WirteLog("SearchByUserId", e.getMessage(), 3);
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		
		//Order by Key
		/*Set<Entry<String, List<ImportLogModel>>> set = imortlogs.entrySet();	        
		Iterator<Entry<String, List<ImportLogModel>>> iterator = set.iterator();
		while(iterator.hasNext()) {
			Map.Entry me2 = (Map.Entry)iterator.next();
        }*/
		return imortlogs;
	}

	/**
	 * User 處理完的 ImportLog 
	 * @param strUserId
	 * @param limitIndex
	 * @param limitCount
	 * @return
	 */
	public List<ImportLogModel> SearchFinishImportLog (String strUserId, int limitIndex, int limitCount )
	{
		List<ImportLogModel> resultList = new ArrayList<ImportLogModel>();
		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
				+ "i.importtime AS importtime FROM importlog i, user_importlog ui  "
				+ "WHERE i.importlog_sn = ui.importlog_sn AND ui.user_id = ? AND i.state = 1 order by importtime DESC "
				+ "limit "+limitIndex+","+ limitCount ;
		
		
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strUserId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
			    String state = rs.getString("state");
			    if(state.equals("3")){
			        continue;
			    }
			    
				ImportLogModel importlog = new ImportLogModel();
				String sn = rs.getString("importlog_sn");
				importlog.setImportlog_sn(sn);
				importlog.setOrg_filename(rs.getString("org_filename"));
				importlog.setState(state);
				importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.1"));
				importlog.setDec( rs.getString("file_dec"));
				//sum
				Statistics statistics = SelectStatistics(importlog.getImportlog_sn());
				importlog.setEmail_sum(statistics.getEmailCount());
				importlog.setIm_sum(statistics.getImCount());
				importlog.setOther_sum(statistics.getOtherCount());
				importlog.setSn_sum(statistics.getSocialnetworkCount());
				importlog.setVoip_sum(statistics.getVoipCount());
				importlog.setWww_sum(statistics.getWwwCount());

				try {
					importlog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
				} catch (ParseException e) {
					importlog.setImporttime( rs.getDate("importtime"));	
					e.printStackTrace();
				}
				resultList.add(importlog);
				
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
//			Common.WirteLog("SearchFinishImportLog", e.getMessage(), 3);
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		
		return resultList;
	}
	
	
	/**
	 * insert  user 以及 improtLog 的關聯
	 * @param strUserid
	 * @param strImportLogSN
	 * @return
	 */
	public String InsertUserImportLog(String strUserid,String strImportLogSN){
		String ErrorMessage = "";
		String sql = "INSERT INTO user_importlog " +
				"( user_id, importlog_sn) VALUES " +
				"( ?, ? );";
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, strUserid);
			ps.setString(2, strImportLogSN);
			ps.executeUpdate();

		} catch (SQLException e) {
			ErrorMessage = e.getMessage();
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					ErrorMessage = e.getMessage();
				}
			}
		}		
		return ErrorMessage;
	}

    /**
     * delete user 以及 improtLog 的關聯
     * @param strUserid
     * @param strImportLogSN
     * @return
     */
    public String deleteUserImportLogLink(String strImportLogSN){
        String ErrorMessage = "";
        String sql = "DELETE FROM user_importlog "
                + "WHERE importlog_sn = ?;";
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, strImportLogSN);
            ps.execute();

        } catch (SQLException e) {
            ErrorMessage = e.getMessage();
            
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    ErrorMessage = e.getMessage();
                }
            }
        }       
        return ErrorMessage;
    }

	/**
	 * 透過 import log sn 查詢統計數目
	 * @param strImportLogSN
	 * @return
	 */
	public Statistics SelectStatistics(String strImportLogSN){
		Statistics statistics = null;
		String sql = "SELECT * FROM statistics "
				+ "WHERE importlog_sn = ? ";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strImportLogSN);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				statistics = new Statistics();
				statistics.setEmailCount(rs.getInt("email"));
				statistics.setWwwCount(rs.getInt("www"));
				statistics.setImCount(rs.getInt("im"));
				statistics.setSocialnetworkCount(rs.getInt("socialnetwork"));
				statistics.setOtherCount(rs.getInt("other"));
				statistics.setVoipCount(rs.getInt("voip"));
				break;
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {System.out.println(e.getMessage());}
			}
		}
		
		return statistics;
		
	}
	
	/**
	 * 利用 dec 查詢所有 type 的統計數量
	 * @param dec_key
	 * @return
	 */
	public Statistics SelectStatisticsByDec(String dec_key, String account) {
		Statistics statistics = null;
//		String sql = "SELECT sum(s.email) as email, sum(s.www) as www,  sum(s.im) as im,"
//				+ " sum(s.socialnetwork) as socialnetwork , sum(s.other) as other, sum(s.voip) as voip "
//				+ "FROM statistics s, importlog i "
//				+ "WHERE s.importlog_sn = i.importlog_sn AND i.file_dec = ? ";
		
		String sql = "SELECT sum(s.email) as email, sum(s.www) as www,  sum(s.im) as im,"
				+ " sum(s.socialnetwork) as socialnetwork , sum(s.other) as other, sum(s.voip) as voip "
				+ "FROM statistics s, importlog i, user_importlog ui, user u "
				+ "WHERE s.importlog_sn = i.importlog_sn "
				+ "AND i.importlog_sn = ui.importlog_sn "
				+ "AND ui.user_id = u.user_id "
				+ "AND i.file_dec  = ? "
				+ "AND u.account = ? ";
			
				
		Connection conn = null;

		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, dec_key);
			ps.setString(2, account);
			ResultSet rs = ps.executeQuery();
			 while (rs.next()) {
				 statistics = new Statistics();
				 statistics.setEmailCount(rs.getInt("email"));
				 statistics.setWwwCount(rs.getInt("www"));
				 statistics.setImCount(rs.getInt("im"));
				 statistics.setSocialnetworkCount(rs.getInt("socialnetwork"));
				 statistics.setOtherCount(rs.getInt("other"));
				 statistics.setVoipCount(rs.getInt("voip"));
				 break;
			 }
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {System.out.println(e.getMessage());}
			}
		}
		
		return statistics;
	}
	
	/**
	 * 透過 SN 搜尋 importLog info
	 * @param strImportLogSN
	 * @return
	 */
	public ImportLogModel SearchBySN(String strImportLogSN){
		ImportLogModel importLog= null;
		
		String sql = "SELECT * FROM importlog "
				+ "WHERE importlog_sn = ? ";
		Connection conn = null;
		try {
		    conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, strImportLogSN);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
			    importLog = new ImportLogModel();
				importLog.setImportlog_sn(rs.getString("importlog_sn"));
				importLog.setFilename(rs.getString("filename"));
				importLog.setOrg_filename(rs.getString("org_filename"));
				String state = rs.getString("state");
				importLog.setState(state);
				if(state.equals("0")){
				    importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
				}else if(state.equals("1")){
					importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.1"));
	            }else if(state.equals("2")){
	                importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.2"));
	            }else{
	                // for deleted
	                importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.3"));
	            }

				importLog.setDec( rs.getString("file_dec"));
			 				
				try {
					importLog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
				} catch (ParseException e) {
					importLog.setImporttime( rs.getDate("importtime"));	
					e.printStackTrace();
				}				 
				break;
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {System.out.println(e.getMessage());}
			}
		}
		
		return importLog;
	}
	
	/**
	 * 搜尋此user 已處理完成的 importLog
	 * @param user_id
	 * @return
	 */
	public int SearchFinishImprotLog(String user_id){
		int count = 0;
		String sql = "SELECT count(*) FROM importlog i, user_importlog ui "
				+ "WHERE i.importlog_sn = ui.importlog_sn AND ui.user_id = ? AND i.state ='1' ";
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, user_id);
			ResultSet rs = ps.executeQuery();
			 while (rs.next()) {
				 count =  rs.getInt(1);
			 }
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			count = 0;
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {System.out.println(e.getMessage());}
			}
		}
		return count;
	}

	/**
	 * insert 一筆全 0 的統計數量 by imortlogSN
	 * @param imortLogSN
	 */
	public void insertStatistics(String imortLogSN) {
		String sql = "INSERT INTO statistics " +
				"( importlog_sn) VALUES " +
				"( ? );";
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, imortLogSN);
			ps.executeUpdate();
			
		} catch (SQLException e) {
		
//			Common.WirteLog("insertStatistics", e.getMessage(), 3);
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
//					Common.WirteLog("insertStatistics", e.getMessage(), 3);
				}
			}
		}		
		
	}

	/**
	 * 算出此 User 下面所有 importLog 的所有統計數量
	 * @param user_id
	 * @return
	 */
	public Statistics SelectStatisticsByUserId(String user_id) {
		Statistics statistics = new Statistics();
		String sql = "SELECT sum(s.email) as email, sum(s.www) as www,  sum(s.im) as im,"
				+ " sum(s.socialnetwork) as socialnetwork , sum(s.other) as other, sum(s.voip) as voip "
				+ "FROM statistics s, importlog i, user_importlog ui "
				+ "WHERE s.importlog_sn = i.importlog_sn "
				+ "AND i.importlog_sn = ui.importlog_sn "
				+ "AND ui.user_id = ?";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, user_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				statistics.setEmailCount(rs.getInt("email"));
				statistics.setWwwCount(rs.getInt("www"));
				statistics.setImCount(rs.getInt("im"));
				statistics.setSocialnetworkCount(rs.getInt("socialnetwork"));
				statistics.setOtherCount(rs.getInt("other"));
				statistics.setVoipCount(rs.getInt("voip"));
				break;
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
//			Common.WirteLog("SelectStatisticsByUser", e.getMessage(), 3);
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {System.out.println(e.getMessage());}
			}
		}
		
		return statistics;
	}

	/**
	 * 找出此  user 下面所有 importLog 資訊
	 * @param even_key
	 * @return
	 */
	public List<ImportLogModel> SelectImportLogByUserId(String user_id) {
		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
				+ " i.importtime AS importtime "
				+ "FROM importlog i, user_importlog ui "
				+ "WHERE i.importlog_sn = ui.importlog_sn "
				+ "AND ui.user_id = ? "
				+ "order by importtime DESC";
		return SelectImportLogByUserId(user_id, sql);
	}

	/**
	 * 找出此  user 下面指定index開始的預設筆數的 importLog 資訊
	 * @param even_key
	 * @return
	 */
	public List<ImportLogModel> SelectImportLogByUserId(String user_id, int limitIndex) {
		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
				+ " i.importtime AS importtime "
				+ "FROM importlog i, user_importlog ui "
				+ "WHERE i.importlog_sn = ui.importlog_sn "
				+ "AND ui.user_id = ? "
				+ "order by importtime DESC "
				+ "limit "+limitIndex+","+ Common.menuCount;
		return SelectImportLogByUserId(user_id, sql);
	}

	/**
	 * 回傳查詢的 importLog 資訊
	 * @param even_key
	 * @return
	 */
	private List<ImportLogModel> SelectImportLogByUserId(String user_id, final String sqlCmd) {	
		List<ImportLogModel> resultList = new ArrayList<ImportLogModel>();

		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sqlCmd);
			ps.setString(1, user_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
			    if(rs.getString("state").equals("3")) continue;

				ImportLogModel importlog = new ImportLogModel();
				importlog.setImportlog_sn(rs.getString("importlog_sn"));
				importlog.setOrg_filename(rs.getString("org_filename"));
				String state = rs.getString("state");
				importlog.setState(state);
				if(state.equals("0")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
				}else if(state.equals("1")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.1"));
                }else{
                    importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.2"));
                }
				importlog.setDec( rs.getString("file_dec"));

				try {
					importlog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
				} catch (ParseException e) {
					importlog.setImporttime( rs.getDate("importtime"));	
					e.printStackTrace();
				}
				resultList.add(importlog);
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			Common.WirteLog("SearchByUserId", e.getMessage(), 3);
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		
		return resultList;
	}

	/**
	 * 算出此  dec 下面所有 importLog 資訊
	 * @param even_key
	 * @return
	 */
	public List<ImportLogModel> SelectImportLogByDec(String even_key, String account) {
		List<ImportLogModel> resultList = new ArrayList<ImportLogModel>();
//		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
//				+ " i.importtime AS importtime "
//				+ "FROM importlog i  "
//				+ "WHERE i.file_dec like ? order by importtime DESC";
		String sql = "SELECT i.importlog_sn AS importlog_sn, i.org_filename AS org_filename, i.state AS state, i.file_dec AS file_dec, "
				+ " i.importtime AS importtime "
				+ "FROM importlog i, user_importlog ui, user u  "
				+ "WHERE i.importlog_sn = ui.importlog_sn "
				+ "AND ui.user_id = u.user_id "
				+ "AND u.account = ? AND i.file_dec like ? order by importtime DESC";
		
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, account);
			ps.setString(2, "%"+even_key+"%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ImportLogModel importlog = new ImportLogModel();
				importlog.setImportlog_sn(rs.getString("importlog_sn"));
				importlog.setOrg_filename(rs.getString("org_filename"));
				String state = rs.getString("state");
				importlog.setState(state);
				if(state.equals("0")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
				}else if(state.equals("1")){
					importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.1"));
                }else if(state.equals("2")){
                    importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.2"));
                }else{
                    // for deleted
                    importlog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.3"));
                }
				importlog.setDec( rs.getString("file_dec"));

				try {
					importlog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
				} catch (ParseException e) {
					importlog.setImporttime( rs.getDate("importtime"));	
					e.printStackTrace();
				}
				resultList.add(importlog);
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			Common.WirteLog("SearchByUserId", e.getMessage(), 3);
			
		} finally {
			if (conn != null) {
				try {
				    conn.close();
				} catch (SQLException e) {}
			}
		}
		return resultList;
	}

	/**
	 * Delete import log from table: importlog and statistics
	 * @param id importlog_sn
	 */
	public void deleteImportLog(String id){

        String deleteImportlog = "DELETE FROM importlog "
                + "WHERE importlog_sn = ?;";

        String deleteStatistics = "DELETE FROM statistics "
                + "WHERE importlog_sn = ?;";

        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(deleteImportlog, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, id);
            ps.execute();
            
            ps = conn.prepareStatement(deleteStatistics, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, id);
            ps.execute();

            ps.close();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            Common.WirteLog("deleteImportLog", e.getMessage(), 3);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }
	}

	/**
	 * set state to 3 first
	 * @param id importlog_sn
	 */
	public void setDeletedState(String id){
	    setDeletedState(new String[]{id});
	}
	public void setDeletedState(String[] ids){
        String setState = "UPDATE importlog "
                + "SET state = ? "
                + "WHERE importlog_sn = ?;";

        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(setState);
            for(String id : ids){
                ps.setString(1, "3");
                ps.setString(2, id);
                ps.execute();
            }
            ps.close();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
//            Common.WirteLog("deleteImportLog", e.getMessage(), 3);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }
    }
}
