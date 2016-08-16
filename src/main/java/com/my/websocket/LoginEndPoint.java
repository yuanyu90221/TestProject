package com.my.websocket;

import java.util.HashMap;

import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ServerEndpoint(value="/websocket/{user}")
public class LoginEndPoint {
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(LoginEndPoint.class);
	
	public static HashMap<String, Session> sessionMap = new HashMap<String, Session>();
	
	@OnOpen
	public void open(final Session session, @PathParam("user") final String user){
		 logger.info("session openend and bound to user: " + user);
		 session.getUserProperties().put("user", user);
		 sessionMap.put(user,session);
	}
	
	@OnClose
	public void close(final Session session){
		String user = (String) session.getUserProperties().get("user");
		
		sessionMap.remove(user);
		logger.info("user : " + user + " 已登出");
		
	}
	
	
}
