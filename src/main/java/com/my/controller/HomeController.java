package com.my.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.my.constant.SystemConstant;
import com.my.dao.ImportLogDAO;
import com.my.dao.RecoverFileDAO;
import com.my.dao.UserDAO;
import com.my.fileutil.Common;
import com.my.fileutil.FileCleaner;
import com.my.fileutil.FileRecover;
import com.my.model.DeleteArray;
import com.my.model.ImportLogModel;
import com.my.model.ImportLogSn;
import com.my.model.RecoverArray;
import com.my.model.Statistics;
import com.my.model.User;
import com.my.service.SessionService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Autowired
	SessionService sessionService;
	@Autowired
	public UserDAO userDAO;
	@Autowired
	public ImportLogDAO importLogDAO;
	@Autowired
	public RecoverFileDAO recoverFileDAO; 
	
	private Executor mFileCleanerThreadPollForDelete = Executors.newFixedThreadPool(6);
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	private Queue<String[]> mRecoveredQueue = new LinkedList<String[]>();
	
    private Executor mFileCleanerThreadPollForRecover = Executors.newFixedThreadPool(3);
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
	
	@RequestMapping(value = "recoverData", method = RequestMethod.POST)
	public String recoverData( ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) {
		logger.info("Welcome home! The client locale is");
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			model.put(SystemConstant.USER_NAME, session.getAttribute(SystemConstant.USER_NAME));
			return "recoverData";
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
	
	@RequestMapping(value="getImportLog", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
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
	
	@RequestMapping(value="getStatistics", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
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
	
	@RequestMapping(value="getStatisticsByImportLogSn", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public Statistics getStatisticsByImportLogSn(@RequestBody ImportLogSn importlogsn, ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		Statistics statistics = null;
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String importLogSnIn = importlogsn.getImportlogsn();
			statistics = importLogDAO.SelectStatistics(importLogSnIn);
		}
		return statistics;
	}
	
	@RequestMapping(value="getFinishedImportLog", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<ImportLogModel> getFinishedImportLog(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		logger.info("getFinishedImportLog");
		List<ImportLogModel> importLogList = null;
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String strAccount = (String)session.getAttribute(SystemConstant.USER_NAME);
			String strUserID = userDAO.getUser(strAccount).getUser_id();
			logger.info("account : " + strAccount + ", userId : " + strUserID );
			int count = importLogDAO.SearchFinishImprotLog(strUserID);
			logger.info("count : " + count);
			importLogList = importLogDAO.SearchFinishImportLog(strUserID, 0, count);
		}
		return importLogList;
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
	
	@RequestMapping(value="fileUpload", method = RequestMethod.POST)
	public String fileUpload(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response){
		logger.info("Welcome fileUpload! ");
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			return "fileUpload";
		}
		else
			return "login";
	}
	/**
	 * User Import File TO Net_Stream
	 * @param files 上傳多個檔案
	 * @param dec 此批檔案描述
	 * @return
	 */
	@RequestMapping(value="multipleSave", method=RequestMethod.POST, produces="text/plain; charset=utf-8")
	@ResponseBody
	public String multipleSave(@RequestParam("file") MultipartFile[] files,
	        @RequestParam("description") String description, Model model, HttpSession session){
		String errorMessage="";
		logger.info("mutltipleSave");
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String pcfileName = null;
			String strUserName = (String)session.getAttribute(SystemConstant.USER_NAME);
			User m_loginUser = (User)sessionService.userList.get(strUserName);
			logger.info("mutltipleSave username " + strUserName +"  , user : " + m_loginUser );
		 	if (files != null && files.length >0) {
		 		
		 		try {
					doFilesUpload(files, pcfileName, m_loginUser, description);
				} catch (IOException e) {
					errorMessage = e.getMessage();
					model.addAttribute("errorMessage", errorMessage);
				}
		 	}
			return errorMessage;
		}
		else{
			return errorMessage;
		}
	}
	
	
	/**
	 * 處裡多個檔案上傳
	 * 
	 * @param files
	 * @param pcfileName
	 * @param m_loginUser
	 * @param dec
	 */
	private void doFilesUpload(MultipartFile[] files, String pcfileName, User m_loginUser, String dec) throws IOException{
 		for(int i =0 ;i< files.length; i++){
 		    try {
 		    	doSingleFileUpload(files[i],pcfileName, m_loginUser, dec);
 		    }catch (Exception e) {
 		        //log
 		        Common.WirteLog("multipleSave", e.getMessage(), 3);
 		        System.out.println(e.getMessage());
 		        throw e;
 		    }
 		}
	}
	
	/**
	 * 處理單檔上傳
	 * 
	 * @param file
	 * @param pcfileName
	 * @param m_loingUser
	 * @param dec
	 * @throws IOException
	 */
	private void doSingleFileUpload(MultipartFile file, String pcfileName, User m_loingUser, String dec) throws IOException{
		if(file.getSize() > 0)
		{
		    String imortLogSN = "";
			String newFileName = Common.GetNowDateTimeFileName();
			pcfileName = newFileName+".pcap";
			String rootPath =Common.FILE_UPLOAD_PATH;
			File dir = new File(rootPath);

			if (!dir.exists())
			{
			    dir.mkdirs();
			}		
			byte[] bytes = file.getBytes();
			BufferedOutputStream buffStream = 
			        new BufferedOutputStream(new FileOutputStream(new File(dir.getAbsolutePath()
			                + File.separator + pcfileName)));
			buffStream.write(bytes);
			buffStream.close();
		 
			// insert importLog to DB
			ImportLogModel importLog = new ImportLogModel();
			importLog.setDec(dec);
			importLog.setFilename(pcfileName);
			importLog.setOrg_filename(file.getOriginalFilename());
			importLog.setState(SystemConstant.IMPORT_FILE_STATE);
			importLog.setImporttime(new Date());
			imortLogSN = importLogDAO.Insert(importLog);
		 
			//建立 importLog 以及 user 的關聯
			importLogDAO.InsertUserImportLog(m_loingUser.getUser_id(), imortLogSN);
			// 產生 xml ok檔
			String okFileName = newFileName+".ok";
			String okFilePath = dir.getPath()+ File.separator + okFileName;
			Common.CreateOKFile(imortLogSN, pcfileName, okFilePath);

			importLogDAO.insertStatistics(imortLogSN);
	    }
	}
	
	 /**
     * Delete and backup import log
     * @return
     */
    @RequestMapping(value="/multipleDelete", method=RequestMethod.POST, produces="application/json;charset=utf-8")
    @ResponseBody
    public List<ImportLogModel> multipleDelete(@RequestBody DeleteArray deleteIds, ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception {      
    	List<ImportLogModel> importLogList = null;
    	logger.info("multipleDelete");
    	
    	final String[] pcfileIds = deleteIds.getDeleteIds().toArray(new String[0]);
    	if(pcfileIds != null){
    		logger.info(pcfileIds[0]);
    	}
    	
        if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
        	String strUserName = (String)session.getAttribute(SystemConstant.USER_NAME);
        	final User m_loginUser = (User)sessionService.userList.get(strUserName);
        	final List<Long> longIds = new ArrayList<Long>();
        	//開一個Thread去處理Delete
        	mFileCleanerThreadPollForDelete.execute(new Runnable(){

				@Override
				public void run() {//處理thread
					//Set state to 3 first
                    importLogDAO.setDeletedState(pcfileIds);

                    for(final String id : pcfileIds){
                        longIds.add(Long.parseLong(id));
                        final ImportLogModel importLog = importLogDAO.SearchBySN(id);
        
                        mFileCleanerThreadPollForDelete.execute(new Runnable(){
                            public void run(){
                                recoverFileDAO.backup(importLog, m_loginUser.getUser_id());
        
                                importLogDAO.deleteUserImportLogLink(id);
                                importLogDAO.deleteImportLog(id);
        
                                //delete data in Solr
                              
                                SolrAccessController.CleanDataByImportLogSn(longIds);
        
                                mFileCleanerThreadPollForDelete.execute(new FileCleaner(id, importLog.getFilename()));
                            }
                        });
                        
                    }
				}
        	
        	});
        	// query 最後結果
        	importLogList = getImportLog(model, request, session,response);
        }
       
        return importLogList;
    }
    
    /**
     * 取得所有在Recover table的資料
     * 
     * @param model
     * @param request
     * @param session
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value="getRecoverLog", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<ImportLogModel> getRecoverLog(HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception 
	{
		List<ImportLogModel> importLogList = null;
		if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
			String strAccount = (String)session.getAttribute(SystemConstant.USER_NAME);
			String strUserID = userDAO.getUser(strAccount).getUser_id();
			importLogList = importLogDAO.SelectImportLogByUserId(strUserID);
			//不顯示已recover但還未完成的資料
            if (mRecoveredQueue.size() == 0){
                mRecoveredQueue.clear();
                importLogList = recoverFileDAO.getUserBackupData(strUserID);
                
            } else {
            	removeImportLogById(importLogList, mRecoveredQueue.poll());
            }
		}
		return importLogList;
	}
    
    /**
     * 移除掉在recovery queue中未處理完的data
     * 
     * @param importLog
     * @param ids
     */
    public void removeImportLogById(List<ImportLogModel> importLog,String[] ids){
	    if(ids == null) return;

	    for(String id : ids){
	        if(id == null) continue;
	        try{
    	        for(int i = importLog.size() -1 ; i >= 0; i--){
    	            if(id.equals(importLog.get(i).getImportlog_sn())){
    	                importLog.remove(i);
    	                break;
    	            }
    	        }
	        } catch(NullPointerException e){}
	    }
    }
    
    /**
     * Delete and backup import log
     * @return
     */
    @RequestMapping(value="/multipleRecover", method=RequestMethod.POST, produces="application/json;charset=utf-8")
    @ResponseBody
    public List<ImportLogModel> multipleRecover(@RequestBody RecoverArray recoverIds, HttpServletRequest request, HttpSession session, HttpServletResponse response) throws Exception {      
    	List<ImportLogModel> importLogList = null;
    	logger.info("multipleRecover");
    	
    	final String[] pcfileIds = recoverIds.getRecoverIds().toArray(new String[0]);
    	if(pcfileIds != null){
    		logger.info(pcfileIds[0]);
    	}
    	mRecoveredQueue.add(pcfileIds);
        if(!((String)session.getAttribute(SystemConstant.USER_NAME)).equals("")){
        	String strUserName = (String)session.getAttribute(SystemConstant.USER_NAME);
        	final User m_loginUser = (User)sessionService.userList.get(strUserName);
        	//開一個Thread去處理Delete
        	mFileCleanerThreadPollForRecover.execute(new Runnable(){

				@Override
				public void run() {//處理thread
					recoverFileDAO.setDeletedState(pcfileIds);
                    
                    for(final String id : pcfileIds){
                        synchronized(this){
                        final ImportLogModel importLog = recoverFileDAO.SearchBySN(id);
                        final String oldFileName = importLog.getFilename();
                        importLog.setFilename(Common.GetNowDateTimeFileName() + ".pcap");
                        
                        // insert to importLog DB
                        mFileCleanerThreadPollForRecover.execute(new Runnable(){
                            public void run(){
                                importLogDAO.recover(importLog);
                                importLogDAO.InsertUserImportLog(m_loginUser.getUser_id(), importLog.getImportlog_sn());
                                importLogDAO.insertStatistics(importLog.getImportlog_sn());
        
                                // delete from backup DB
                                recoverFileDAO.deleteBackup(id);
        
                                
                            }
                        });
                        
                      //move pcap file and create ok file
                        mFileCleanerThreadPollForRecover.execute(new FileRecover(id, oldFileName, importLog.getFilename()));
                       }
                    }
				}
        	
        	});
        }
        // query 最後結果
        importLogList = getRecoverLog(request, session,response);
        
        return importLogList;
    }
}
