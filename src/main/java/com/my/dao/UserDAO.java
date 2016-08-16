package com.my.dao;

import java.util.List;

import com.my.model.User;

public interface UserDAO {
	
	public User findByUser(String strAccount, String strPassword);
	
	public User getUser(String strAccount);
	
	public List<User> getUserList();
	
	public String AddUser(User user);
	
	public String DeleteUser(String user_id);
	
	public String ModifyUser(User user);
	
	public boolean modifyUserExtra(String user_id, String json);
}
