package com.my.fileutil;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import com.my.controller.ApplicationContextHelper;


/**
 * 共用函式
 * 
 * @author FredTeng
 *
 */
public class Common {

	private static final Logger log =  LoggerFactory.getLogger(Common.class.getName());
	public static String Languages = "en";
	public static String FILE_UPLOAD_PATH ;
	public static String PARSER_PATH;
	public static String solrLocation;
	public static int solrRowCount;
	public static String SystemLocale = "en";	//語系預設 en
	public static int NaviCount = 5;	//語系顯示5筆
	
	public static String XSL_TW_PATH;
	public static String XSL_EN_PATH;	
	public static String SUMMARY_XSL_TW_PATH;
	public static String SUMMARY_XSL_EN_PATH;
	public static String SUMMARY_FILE_NAME;
	public static String output_FileServer;	//輸出檔案 Web Ap 位置 
	public static Long MaxUploadSize;
	public static int menuCount;
	public static int menuLoadNum;

	public static HashMap<String, Integer> showingIndex = 
			new HashMap<String, Integer>(); //側邊顯示的index
	public static HashMap<String, Boolean> haveNewImportLog = 
			new HashMap<String, Boolean>(); //有新的ImportLog
//	public static HashMap<String, ImportLogMainData> m_ImportLogMainData = 
//			new HashMap<String, ImportLogMainData>();
	//public static ArrayList<String> finishImportLogSN = new ArrayList<String>();
	
	@Autowired
	MessageSource messageSource;

	/**
	 * 取得現在時間 yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public static String GetNowDateTime(){
		   DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Date date = new Date();
		   System.out.println(dateFormat.format(date));
		   Calendar cal = Calendar.getInstance();
		   return dateFormat.format(cal.getTime());
	}
	
	/**
	 * 取得現在時間 yyyyMMddHHmmssSSS
	 * 可當作檔名處理
	 * @return
	 */
	public static String GetNowDateTimeFileName(){
		   DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		   Date date = new Date();
		   System.out.println(dateFormat.format(date));
		   Calendar cal = Calendar.getInstance();
		   return dateFormat.format(cal.getTime());
	}
	
	public static String CreateOKFile(String strSN, String strFileName, String okFilePath) throws IOException 
	{
		Document doc = DocumentHelper.createDocument();
		String errorMessage ="";
		try {
			 Element root = doc.addElement("pcap"); // 建立 <自訂XML>
			 Element root_sn = root.addElement("ImportLogSN"); 
			 root_sn.addText(strSN); 
			 Element root_fileName = root.addElement("FileName"); 
			 root_fileName.addText(strFileName);
			 // 儲存 XML 檔案：
			FileWriter fw;
			fw = new FileWriter(okFilePath);
			OutputFormat of = new OutputFormat(); // 格式化XML
			of.setIndentSize(4); // 設定 Tab 為 4 個空白
			of.setNewlines(true);// 設定 自動換行
			XMLWriter xw = new XMLWriter(fw, of);
			xw.write(doc);
			xw.close();
		} catch (IOException e) {
			throw e; 
		} // 可自
		return errorMessage;
	}

	
	
	/**
     * 
     * @param strFunction which function report 
     * @param strDesc log message
     * @param loglevel 1 info, 2 warn, 3 error
     */
    public static void WirteLog(String strFunction,String strDesc,int loglevel){
        
        switch(loglevel){
            case 1:
                log.info(strFunction+" "+strDesc);
                break;
            case 2:
                log.warn(strFunction+" "+strDesc);
                break;
            case 3:
                log.error(strFunction+" "+strDesc);
                break;
        }
    }
    

	/**
	 * 去除Solr result "[" "]"
	 * @param object
	 * @return
	 */
	public static String TrimSolrResult(Object object) {
		
		String rtn = "";
		rtn = object.toString();
		if(rtn.startsWith("["))
		{
			rtn = rtn.substring(1,rtn.length()-1);
		}
		
		if(rtn.endsWith("]"))
		{
			rtn = rtn.substring(0,rtn.length()-2);
		}
		return rtn;
	}

	/**
	 * 讀取 user ImportLog Meun 相關資訊
	 */
//	public static void reloadImprotLogData(String user_id){
//		reloadImprotLogData(user_id, 0);
//	}

//	public static void reloadImprotLogData(String user_id, int startIndex){
//		reloadImprotLogData(user_id, startIndex, NaviCount);
//	}

	
//	public static void reloadImprotLogData(String user_id, int startIndex, int limit){
//		ImportLogMainData importLogMainData = new ImportLogMainData();
//	    ApplicationContext context = getApplicationContext();
//		ImportLogDAO importDAO = (ImportLogDAO) context.getBean("importLogDAO");
//
//		//設定
//		List<ImportLogModel>  importLogGridList  =  importDAO.SearchFinishImportLog(user_id, startIndex,  limit);
//		importLogMainData.setImportLogGridList(importLogGridList);
//		int finishCount = importDAO.SearchFinishImprotLog(user_id);
//		importLogMainData.setBeforeFinishCount(finishCount);
//
//		m_ImportLogMainData.put(user_id, importLogMainData);
//
//		/*Common.finishImportLogSN.clear();
//		
//		for(int i = 0; i < Common.m_ImportLogMainData.getImportLogGridList().size();i++){
//			String sn =  Common.m_ImportLogMainData.getImportLogGridList()
//					.get(i).getImportlog_sn();
//			Common.finishImportLogSN.add(sn);
//		}*/
//	}
	
	 /**
     * 取得 i18n 多國語系 Message
     * @param messageKey
     * @return
     */
	public static String GetLocaleMessage(String messageKey) {
		String message = "";
		MessageSource messageSource = (MessageSource)ApplicationContextHelper.getBean("messageSource");
	
		if(Common.SystemLocale.equals("en"))
    	{
    		message = messageSource.getMessage(messageKey, null, Locale.ENGLISH);
    	}
    	else if(Common.SystemLocale.equals("zh_TW"))
    	{
    		message = messageSource.getMessage(messageKey ,null, Locale.TAIWAN);
    	}
		return message;
	}
	
}
