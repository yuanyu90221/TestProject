package com.my.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
public class UserManageController {
	
	public String getAllUser(Model model){
		return "userList";
	}
}
