package com.my.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String Login(HttpServletRequest request, HttpSession session, HttpServletResponse response) { 
		
		logger.info("This is first login! The client locale is {}.");
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
		return "login";
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.POST)
	public String userCheckPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
		String username = request.getParameter("username");
		String pwd = request.getParameter("passwd");
		if(username == null||pwd==null){
			return "login";
		}
		logger.info("username : "+ username + ", password : " + pwd);
		session.setAttribute("username", username);
		return "home";
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.GET)
	public String userCheckGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
		String username = request.getParameter("username");
		String pwd = request.getParameter("passwd");
		if(username == null||pwd==null){
			return "login";
		}
		logger.info("username : "+ username + ", password : " + pwd);
		session.setAttribute("username", username);
		return "home";
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.POST)
	public String userLogoutPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
		session.removeAttribute("username");
		session.invalidate();
		logger.info("username logout");
		return "login";
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.GET)
	public String userLogoutGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		response.setDateHeader("Expires", 0);  
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");  
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");  
		response.setHeader("Pragma", "no-cache");
		session.removeAttribute("username");
		session.invalidate();
		logger.info("username logout");
		return "login";
	}
}
