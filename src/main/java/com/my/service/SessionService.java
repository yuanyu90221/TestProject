package com.my.service;

import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.my.constant.SystemConstant;
import com.my.model.User;

public class SessionService {
	
	public static HashMap<String,User> userList = new HashMap<String, User>();
	
	protected HttpServletRequest request;
	
	public HttpSession getHttpSession(){
		ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		return sra.getRequest().getSession(true);

	}
	
	public void addUserSession(String name, Object user){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();    
	    HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();   
	    request.getSession().setAttribute(SystemConstant.USER_INFO, user);
	    userList.put(name, (User)user);
	}
	
	public Object getUserSessionAttribute(String name){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();    
        HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();    
        Object userSessionAttribute=null;  
        if (!name.trim().equals("")) {
        	userSessionAttribute= request.getSession().getAttribute(name);
        }
        return userSessionAttribute;  
	}
	
	public void logout() throws ServletException{
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();    
	    HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest();
	    userList.remove(request.getSession().getAttribute(SystemConstant.USER_NAME));
	    request.getSession().removeAttribute(SystemConstant.RA_USER_INFO);
	    request.getSession().removeAttribute(SystemConstant.USER_INFO);
	    request.getSession().removeAttribute(SystemConstant.USER_NAME);
	    request.getSession().invalidate();
	}
}
