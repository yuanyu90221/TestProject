package com.my.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import com.my.dao.UserDAO;

@Controller
public class UserManageController {
	
	@Autowired
	public UserDAO userDAO;
	
	public String getAllUser(Model model){
		return "userList";
	}
}
