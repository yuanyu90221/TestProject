package com.my.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.my.dao.UserDAO;
import com.my.model.User;

@Controller
public class LoginController {
	
	@Autowired
	public UserDAO userDAO;
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String Login(HttpServletRequest request, HttpSession session, HttpServletResponse response) { 		
		logger.info("This is first login! The client locale is {}.");
		SetNoCacheProperties(response);
		return "login";
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.POST)
	public String userCheckPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		SetNoCacheProperties(response);
		// 取得前端傳來的參數
		String username = request.getParameter("username");
		String pwd = request.getParameter("passwd");
		User ur = userDAO.findByUser(username, pwd);
		String sessionId = request.getSession().getId();
		if(ur==null){
			return "login";
		}
		logger.info("username : "+ username + ", password : " + pwd + ", sessionId: "+ sessionId);
	
		session.setAttribute("username", username);
		return "home";
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.GET)
	public String userCheckGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){

		return userCheckPost(model,request,session,response);
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.POST)
	public String userLogoutPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){

		SetNoCacheProperties(response);
		String usesrName = (String)session.getAttribute("username");
		session.removeAttribute("username");
		String sessionId = request.getSession().getId();
		logger.info("usesrName: "+usesrName+", sessionId: "+ sessionId);
		session.invalidate();
		logger.info("username logout");
		return "login";
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.GET)
	public String userLogoutGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		// dopost request
		return userLogoutPost(model, request, session, response);
	}
	
	/**
	 * 設定session為no cache
	 * 
	 * @param response
	 */
	private void SetNoCacheProperties(HttpServletResponse response){
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
	}
}
