package com.my.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;

import com.my.constant.SystemConstant;
import com.my.dao.ImportLogDAO;
import com.my.dao.UserDAO;
import com.my.model.ImportLogModel;
import com.my.model.Statistics;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Autowired
	public UserDAO userDAO;
	@Autowired
	public ImportLogDAO importLogDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/home", method = RequestMethod.POST)
	public String home( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) {
		logger.info("Welcome home! The client locale is");
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			model.put(SystemConstant.USER_NAME, session.getAttribute(SystemConstant.USER_NAME));
			return "home";
		}
		else
			return "login";
	}
	
	@RequestMapping(value="ShowData", method = {RequestMethod.GET, RequestMethod.POST})
	public String showData(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			return "showData";
		}
		else{
			return "login";
		}
	}
	
	@RequestMapping(value="getImportLog", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json")
	@ResponseBody
	public List<ImportLogModel> getImportLog(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		List<ImportLogModel> importLogList = null;
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String strAccount = (String)session.getAttribute(SystemConstant.USER_NAME);
			String strUserID = userDAO.getUser(strAccount).getUser_id();
			importLogList = importLogDAO.SelectImportLogByUserId(strUserID);
		}
		return importLogList;
	}
	
	@RequestMapping(value="getStatistics", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json")
	@ResponseBody
	public Statistics getStatistics(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		Statistics statistics = null;
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String strAccount = (String)session.getAttribute(SystemConstant.USER_NAME);
			String strUserID = userDAO.getUser(strAccount).getUser_id();
			statistics = importLogDAO.SelectStatisticsByUserId(strUserID);
		}
		return statistics;
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
