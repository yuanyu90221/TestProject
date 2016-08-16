package com.my.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.my.constant.SystemConstant;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/home", method = RequestMethod.POST)
	public String home( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) {
		logger.info("Welcome home! The client locale is");
		if(!((String)session.getAttribute("username")).equals("")){
			model.put(SystemConstant.USER_NAME, session.getAttribute(SystemConstant.USER_NAME));
			return "home";
		}
		else
			return "login";
	}
	
}
