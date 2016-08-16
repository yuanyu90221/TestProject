package com.my.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.my.model.User;
import com.mysql.jdbc.Statement;
@Repository
@Transactional
public class UserDAOImpl implements UserDAO{
	
	private DataSource dataSource;
	
	/**
	 * @param dataSource the dataSource to set
	 */
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	/**
	 * 利用帳號密碼搜尋該用戶
	 * @param strAccout
	 * @param strPassword
	 * @return
	 */
	@Override
	public User findByUser(String strAccout, String strPassword) {
		String sql = "SELECT * FROM user WHERE account = ? AND password = ? ";
		Connection conn = null;
		User user = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strAccout);
			ps.setString(2, strPassword);
			
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				user = new User(
						rs.getString("user_id"),
						rs.getString("account"), 
						rs.getString("password"),
						rs.getString("user_name"),
						rs.getString("org"),
						rs.getString("dec"),
						rs.getString("extra")
				);
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		return user;
	}

	/**
	 * 利用帳號密碼搜尋該用戶
	 * @param strAccout
	 * @param strPassword
	 * @return
	 */
	@Override
	public List<User> getUserList() {
		List<User> userList = new ArrayList<User>();
		String sql = "SELECT * FROM user where account <> 'admin' ";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				User user = new User(
						rs.getString("user_id"),
						rs.getString("account"), 
						rs.getString("password"),
						rs.getString("user_name"),
						rs.getString("org"),
						rs.getString("dec"),
						rs.getString("extra"));
				userList.add(user);
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		return userList;
	}

	/**
	 * insert user to DB
	 * @param user
	 * @return
	 */
	@Override
	public String AddUser(User user) {
		String result = "";
		String sql = "INSERT INTO User " +
				"( `account`, `password`, `user_name`, `org`, `dec`) VALUES " +
				"( ?, ?, ?, ?, ?);";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, user.getAccount());
			ps.setString(2, user.getPassword());
			ps.setString(3, user.getUser_name());
			ps.setString(4, user.getOrg());
			ps.setString(5, user.getDec());
			
			int affectedRows = ps.executeUpdate();
			if(affectedRows != 0) 
			{
//				ResultSet generatedKeys = ps.getGeneratedKeys();
//		        if (generatedKeys.next()) {
//		        	user_id= generatedKeys.getLong(1)+"";
//		        }
				result = "Add user success.";
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			result = "Add user fail.";
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}	
		
		return result;
	}

	/**
	 * Delete user from DB
	 * @param user
	 * @return
	 */
	@Override
	public String DeleteUser(String user_id) {
		String result = "";
		String sql = " Delete From User where `user_id` = ? ;";
		Connection conn = null;
		
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, user_id);
			
			int affectedRows = ps.executeUpdate();
			if(affectedRows != 0) 
			{
				result = "Delete user success.";
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			result = "Delete user fail.";
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}	
		
		return result;
	}

	/**
	 * Modify user
	 * @param user
	 * @return
	 */
	@Override
	public String ModifyUser(User user) {
		String result = "";
		
		String sql = "Update User set " +
				" `account`=?, `password`= ? , `user_name`= ?, `org`= ?, `dec`= ? " +
				" where user_id = ?;";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, user.getAccount());
			ps.setString(2, user.getPassword());
			ps.setString(3, user.getUser_name());
			ps.setString(4, user.getOrg());
			ps.setString(5, user.getDec());
			ps.setString(6, user.getUser_id());
			
			int affectedRows = ps.executeUpdate();
			if(affectedRows != 0) 
			{
				 result = "Modify user success.";
			}
			
		} catch (SQLException e) {
			System.out.println(e.getMessage());
			result = "Modify user fail.";
			
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}	
		
		return result;
	}

	@Override
	public boolean modifyUserExtra(String user_id, String json) {
		 String sql = "Update User set " +
	                " extra=? " +
	                " where user_id = ?;";
	        Connection conn = null;
	        
	        try {
	            conn = dataSource.getConnection();
	            PreparedStatement ps = conn.prepareStatement(sql,  Statement.RETURN_GENERATED_KEYS);
	            ps.setString(1, json);
	            ps.setString(2, user_id);
	            ps.executeUpdate();
	            return true;
	        } catch (SQLException e) {
	            System.out.println(e.getMessage());
	        } finally {
	            if (conn != null) {
	                try {
	                    conn.close();
	                } catch (SQLException e) {}
	            }
	        }   
	        
	        return false;
	}

	@Override
	public User getUser(String strAccount) {
		String sql = "SELECT * FROM user WHERE account = ?";
		Connection conn = null;
		User user = null;
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, strAccount);
			
			
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				user = new User(
						rs.getString("user_id"),
						rs.getString("account"), 
						rs.getString("password"),
						rs.getString("user_name"),
						rs.getString("org"),
						rs.getString("dec"),
						rs.getString("extra")
				);
			}
			rs.close();
			ps.close();
			
		} catch (SQLException e) {
			
			System.out.println(e.getMessage());
			
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		return user;
	}

}
