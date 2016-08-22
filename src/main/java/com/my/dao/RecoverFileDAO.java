package com.my.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import com.my.fileutil.Common;
import com.my.model.ImportLogModel;

/**
 * 處理 DB ImportLog 的Class
 * @author FredTeng
 *
 */
public class RecoverFileDAO 
{
	private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	/**
	 * Read backup list
	 * @param userId
	 * @return
	 */
	public List<ImportLogModel> getUserBackupData(String userId){
    	    String search = "SELECT * " 
    	        + "FROM deleted_list "
                + "WHERE user_id = ?;";
	    Connection conn = null;
	    List<ImportLogModel> list = new ArrayList<ImportLogModel>();
        try {
    	    conn = dataSource.getConnection();
    	    PreparedStatement ps = conn.prepareStatement(search);
            ps.setString(1, userId);
            ResultSet rs = ps.executeQuery();
            ImportLogModel importLog;
            while (rs.next()) {
                if(rs.getString("state").equals("3")) continue;

                importLog = new ImportLogModel();
                importLog.setImportlog_sn(rs.getString("importlog_sn"));
                importLog.setOrg_filename(rs.getString("org_filename"));
                importLog.setState(rs.getString("state"));
                importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
                importLog.setDec( rs.getString("file_dec"));
                try {
                    importLog.setImporttime( new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(rs.getString("importtime")));
                } catch (ParseException e) {
                    importLog.setImporttime( rs.getDate("importtime")); 
                    e.printStackTrace();
                }
                list.add(importLog);
            }
            rs.close();
            ps.close();
        }catch (SQLException e) {
            System.out.println(e.getMessage());
            Common.WirteLog("getUserBackupData", e.getMessage(), 3);
        } finally {
            if (conn != null) {
                try {
                conn.close();
                } catch (SQLException e) {}
            }
        }

	    return list;
	}

    /**
     * recover importLog to DB
     * @param importLog
     * @return
     */
    public String backup(ImportLogModel importLog, String user_id) {
        String importSN = "";
        String backup = "INSERT INTO deleted_list " +
                "( importlog_sn, user_id, filename, org_filename, importtime, file_dec ) VALUES " +
                "( ?, ?, ?, ?, ?, ? );";
        Connection conn = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(backup);
            ps.setString(1, importLog.getImportlog_sn());
            ps.setString(2, user_id);
            ps.setString(3, importLog.getFilename());
            ps.setString(4, importLog.getOrg_filename());
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
	 * 透過 SN 搜尋 importLog info
	 * @param strImportLogSN
	 * @return
	 */
	public ImportLogModel SearchBySN(String strImportLogSN){
		ImportLogModel importLog= null;
		
		String sql = "SELECT * FROM deleted_list "
				+ "WHERE importlog_sn = ? ";
		Connection conn = null;
		try {
		    conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strImportLogSN);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
			    importLog = new ImportLogModel();
				importLog.setImportlog_sn(rs.getString("importlog_sn"));
				importLog.setFilename(rs.getString("filename"));
				importLog.setOrg_filename(rs.getString("org_filename"));
				importLog.setState("0");
				importLog.setStateContent(Common.GetLocaleMessage("ImportLogModel.message.file.state.0"));
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
	 * 刪除備份的資料  
	 */
	public String deleteBackup(String id){
        String deleteBackupLog = "DELETE FROM deleted_list "
                + "WHERE importlog_sn = ?;";

        Connection conn = null;
        String filename = null;
        try {
            conn = dataSource.getConnection();
            PreparedStatement ps = conn.prepareStatement(deleteBackupLog);
            ps.setString(1, id);
            ps.execute();
            ps.close();

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            Common.WirteLog("deleteBackup", e.getMessage(), 3);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }

        return filename;
	}

	/**
	 * set state to 3 first
	 * @param id importlog_sn
	 */
	public void setDeletedState(String id){
        setDeletedState(new String[]{id});
    }
    public void setDeletedState(String[] ids){
        String setState = "UPDATE deleted_list "
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
            Common.WirteLog("deleteImportLog", e.getMessage(), 3);
        } finally {
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {}
            }
        }
    }
}
