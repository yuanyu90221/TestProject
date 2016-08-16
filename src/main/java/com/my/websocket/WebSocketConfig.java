package com.my.websocket;

import java.util.HashSet;
import java.util.Set;

import javax.websocket.Endpoint;
import javax.websocket.server.ServerApplicationConfig;
import javax.websocket.server.ServerEndpointConfig;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WebSocketConfig implements ServerApplicationConfig {
	//  取得logger
	private static final Logger logger = LoggerFactory.getLogger(WebSocketConfig.class);
	@Override
	public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> scanned) {
		logger.info("******getAnnotatedEndpointClasses******");
		System.out.println("******getAnnotatedEndpointClasses******");
		Set<Class<?>> res=new HashSet<>();
		for(Class<?> cs:scanned){
			//System.out.println(cs.getName());
			if(cs.getPackage().getName().startsWith("com.my")){
				logger.info(cs.getName());
				System.out.println(cs.getName());
				res.add(cs);
			}
		}
		return res;
	}

	@Override
	public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> arg0) {
		System.out.println("******getEndpointConfigs******");
		Set<ServerEndpointConfig> res=new HashSet<>();
		return res;
	}

}
