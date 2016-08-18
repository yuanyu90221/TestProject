package com.my.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.my.constant.SystemConstant;
import com.my.constant.UserConstant;
import com.my.dao.UserDAO;
import com.my.model.User;
import com.mysql.jdbc.StringUtils;

@Controller
public class UserManageController {
	
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(UserManageController.class);
	@Autowired
	public UserDAO userDAO;
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String addUser(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		if(!((String)session.getAttribute("username")).equals("")){
			return "userInfo";
		}
		else
			return "login";
	}
	
	@RequestMapping(value = "/doAddUser", method = RequestMethod.POST)
	public String doAddUser(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception{
		if(!((String)session.getAttribute("username")).equals("")){
			User ur  = formatInput(request);
			String strAccount = ur.getAccount();
			if(StringUtils.isEmptyOrWhitespaceOnly(strAccount)){
				throw new NullPointerException("Argument null");
			}
			if(userDAO.getUser(strAccount)!=null){
				throw new NullPointerException("UserExists");
			}
			userDAO.AddUser(ur);
			return "userList";
		}
		else
			return "login";
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
	public String doModify( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception{
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
				throw new SQLException(modifyAccount+" 不存在");
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
	
	@RequestMapping(value = "/userList", method = RequestMethod.POST)
	public String getUserList( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		logger.info("enter userList page");
		
		if(!((String)session.getAttribute("username")).equals("")){
			
			return "userList";
		}
		else
			return "login";
	}
         
	
	public @ModelAttribute List<User> getUserList(){
		List<User> userList = userDAO.getUserList();
        return userList;
	}
	
	@RequestMapping(value="/userListResult", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public List<User> getUserListResult(Model model,HttpServletRequest request, HttpSession session, HttpServletResponse response){
		logger.info("getUserListResult");
		logger.info(request.getHeader("Accept"));
		List<User> userList = userDAO.getUserList();
        return userList;
	}
	
	@RequestMapping(value = "/doDeleteUser", method = RequestMethod.POST)
	public String doDeleteUser(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception{
		if(!((String)session.getAttribute("username")).equals("")){
			
			String strAccount = request.getParameter(SystemConstant.DELETE_USER);
			if(StringUtils.isEmptyOrWhitespaceOnly(strAccount)){
				throw new NullPointerException("Argument null");
			}
			User ur = userDAO.getUser(strAccount);
			userDAO.DeleteUser(ur.getUser_id());
			return "userList";
		}
		else
			return "login";
	}
}
