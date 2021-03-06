package com.my.controller;

import java.io.IOException;
import java.util.Locale;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.LocaleEditor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.my.constant.SystemConstant;
import com.my.dao.UserDAO;
import com.my.fileutil.Common;
import com.my.model.User;
import com.my.service.SessionService;
import com.my.websocket.LoginEndPoint;

@Controller
public class LoginController {
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	SessionService sessionService;
	
	@Autowired
	public UserDAO userDAO;
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView Login(HttpServletRequest request, HttpSession session, HttpServletResponse response,Locale locale) { 		
		logger.info("This is first login! The client locale is {}."+locale.toString());
		SetNoCacheProperties(response);
      
		return new ModelAndView("login");
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.POST)
	public String userCheckPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws IOException{
		SetNoCacheProperties(response);
		// 取得前端傳來的參數
		String username = request.getParameter(SystemConstant.USER_NAME);
		String pwd = request.getParameter(SystemConstant.PASSWD);
		User ur = userDAO.findByUser(username, pwd);
		
		String sessionId = request.getSession().getId();
		if(ur==null){
			logger.info("使用者不存在或密碼錯誤");
			model.put(SystemConstant.RESPONSE_MSG, "使用者不存在或密碼錯誤");
			model.put(SystemConstant.USER_NAME, username);
			model.put(SystemConstant.PASSWD, pwd);
			return "login";
		}
		if(SessionService.userList.containsKey(username)){
			logger.info(username+ " has been logined!");
			// kit out origin
			if(!sessionId.equals(SessionService.userSessions.get(username).getId())){
				SessionService.logout(username);
				Session userSession = LoginEndPoint.sessionMap.get(username);
				userSession.close();
				logger.info(username+ " has been kitout!");
			}
			else{
				Session userSession = LoginEndPoint.sessionMap.get(username);
				SessionService.userSessions.remove(username);
				userSession.close();
				logger.info(username+ " has been kitout!");
			}
		}
		
		if(SessionService.userSessions.get(username)==null){
			sessionService.addUserSession(username, ur);
		}
		logger.info("username : "+ username + ", password : " + pwd + ", sessionId: "+ sessionId);
	   
		session.setAttribute(SystemConstant.USER_NAME, username);
		return "home";
	}
	
	@RequestMapping(value="/userlogin", method = RequestMethod.GET)
	public String userCheckGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws IOException{

		return userCheckPost(model,request,session,response);
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.POST)
	public String userLogoutPost(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws ServletException{

		SetNoCacheProperties(response);
		String usesrName = (String)session.getAttribute(SystemConstant.USER_NAME);
		String sessionId = request.getSession().getId();
		sessionService.logout();
		logger.info("usesrName: "+usesrName+", sessionId: "+ sessionId);
		
		logger.info("username logout");
		return "login";
	}
	
	@RequestMapping(value="/userlogout", method = RequestMethod.GET)
	public String userLogoutGet(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws ServletException{
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
	
	
	/**
	 * 改變語系
	 * @param request
	 * @param session
	 * @param response
	 * @param locale
	 * @return
	 */
	@RequestMapping(value = "/changeLanguange", method = RequestMethod.POST)
	public ModelAndView changeLanguage(HttpServletRequest request, HttpSession session, HttpServletResponse response,Locale locale) { 		
		logger.info("This is first login! The client locale is {}."+locale.toString());
		SetNoCacheProperties(response);
        String language = request.getParameter(SystemConstant.LANGUAGEE_OPTS); 
        Common.SystemLocale = language;
		LocaleEditor localeEditor = new LocaleEditor();
		localeEditor.setAsText(language); // your locale string
		LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
		localeResolver.setLocale(request, response, (Locale) localeEditor.getValue());
		return new ModelAndView("login");
	}
	
}
