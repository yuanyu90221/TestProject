package com.my.controller;

import java.lang.reflect.Field;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.my.constant.SystemConstant;
import com.my.constant.UserConstant;
import com.my.dao.UserDAO;
import com.my.model.User;

@Controller
public class UserManageController {
	
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(UserManageController.class);
	@Autowired
	public UserDAO userDAO;
	
	public String getAllUser(Model model){
		return "userList";
	}
	
	@RequestMapping(value = "/modifyUser", method = RequestMethod.POST)
	public String modifyUser( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		logger.info("enter modify user page");
		
		if(!((String)session.getAttribute("username")).equals("")){
			String modifyAccount = request.getParameter(SystemConstant.MODIFY_USER);
			logger.info("modifyAccount:"+modifyAccount);
			User ur = userDAO.getUser(modifyAccount);
			
			model.put(SystemConstant.USER,ur);
			return "userInfo";
		}
		else
			return "login";
	}
	
	@RequestMapping(value = "/doModify", method = RequestMethod.POST)
	public String doModify( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		logger.info("enter modify user page");
		
		if(!((String)session.getAttribute("username")).equals("")){
			User modifiedUr = formatInput(request);
			String modifyAccount = modifiedUr.getAccount();
			logger.info("modifyAccount:"+modifyAccount);
			User ur = userDAO.getUser(modifyAccount);
			if(ur!=null){
				modifiedUr.setUser_id(ur.getUser_id());
			    String result = userDAO.ModifyUser(modifiedUr);
			    if(SystemConstant.MOD_SUCCESS.equals(result)){
			    	model.put(SystemConstant.USER,modifiedUr);
			    }
			    else{
			    	logger.info(result);
			    	model.put(SystemConstant.USER,ur);
			    }
				return "userInfo";
			}
			else{
				logger.info(modifyAccount+" 不存在");
				return "home";
			}
		}
		else
			return "login";
	}
	
	public User formatInput(HttpServletRequest request){
		User ur = new User();
		String username = request.getParameter(UserConstant.USER_NAME);
		String passwd = request.getParameter(UserConstant.PASSWORD);
		String account = request.getParameter(UserConstant.ACCOUNT);
		String org = request.getParameter(UserConstant.ORG);
		String dec = request.getParameter(UserConstant.DEC);
		ur.setUser_name(username);
		ur.setPassword(passwd);
		ur.setAccount(account);
		ur.setOrg(org);
		ur.setDec(dec);
		return ur;
	}
}
