package com.my.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import com.my.dao.UserDAO;
import com.my.fileutil.Common;
import com.my.fileutil.solr.SolrField;
import com.my.model.EmailDetailModel;
import com.my.model.HttpDetailModel;
import com.my.model.NetworkDetailModel;
import com.my.model.OthersDetailModel;
import com.my.model.VoipDetailModel;
import com.my.service.SessionService;

@Controller
public class SolrAccessController {
	
	@Autowired
	SessionService sessionService;
	@Autowired
	public UserDAO userDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(SolrAccessController.class);
	@RequestMapping(value="getEmailDetailAll", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<EmailDetailModel> getEmailDetailAll(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception
	{
		List<EmailDetailModel> emailDetailList = null;
		int protocolSn = 3;
		String queryStr = "*:*";
		SolrDocumentList docs = getSolrQueryResult(protocolSn, queryStr);
		if(docs!=null){
			emailDetailList = new ArrayList<EmailDetailModel>();
			int size = docs.size();
			for(int i = 0 ; i < size; i++){
				SolrDocument doc = docs.get(i);
				EmailDetailModel emaildetail = new EmailDetailModel();
				emaildetail.setSubject(Common.TrimSolrResult(doc.get(SolrField.subject.name())));
				emaildetail.setType(Common.TrimSolrResult(doc.get(SolrField.type.name())));
				emaildetail.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));			
				emaildetail.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));
				emaildetail.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
				emaildetail.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
				emaildetail.setFrom(Common.TrimSolrResult(doc.get(SolrField.from.name())));
				emaildetail.setTo(Common.TrimSolrResult(doc.get(SolrField.to.name())));
				emaildetail.setCc(Common.TrimSolrResult(doc.get(SolrField.cc.name())));
				emaildetail.setBcc(Common.TrimSolrResult(doc.get(SolrField.bcc.name())));
				emaildetail.setContactList(Common.TrimSolrResult(doc.get(SolrField.contactlist.name())));
				emaildetail.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
				emaildetail.setFilePath(Common.TrimSolrResult(doc.get(SolrField.filepath.name())));
				emaildetail.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
				emaildetail.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
				emailDetailList.add(emaildetail);
			}
		}
		return emailDetailList;
	}
	
	@RequestMapping(value="getHttpDetailAll", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<HttpDetailModel> getHttpDetailAll(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception{
		List<HttpDetailModel> httpDetailList = null;
		int protocolSn = 4;
		String queryStr = "*:*";
		SolrDocumentList docs = getSolrQueryResult(protocolSn, queryStr);
		if(docs!=null){
			httpDetailList = new ArrayList<HttpDetailModel>();
			int size = docs.size();
			logger.info("size : "+ size);
			
			for(int i = 0 ; i < size; i++){
				SolrDocument doc = docs.get(i);
				logger.info(doc.toString());
				HttpDetailModel httpDetail = new HttpDetailModel();
				if(doc!=null&&doc.containsKey(SolrField.requesturi.name())){
				  httpDetail.setId(doc.get(SolrField.id.name()).toString());
				  httpDetail.setImportlogsn(doc.get(SolrField.importlogsn.name()).toString());
				  httpDetail.setRequestURi(Common.TrimSolrResult(doc.get(SolrField.requesturi.name())));
				  httpDetail.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
				  httpDetail.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));
				  httpDetail.setTitle(doc.get(SolrField.title.name()).toString());
				  httpDetail.setType(doc.get(SolrField.type.name()).toString());
				  httpDetail.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
				  httpDetail.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
				  httpDetail.setFilePath(doc.get(SolrField.filepath.name()).toString());
				  httpDetailList.add(httpDetail);
				}
			}
		}
		return httpDetailList;
	}
	
	@RequestMapping(value="getNetWorkDetailAll", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<NetworkDetailModel> getNetWorkDetailAll(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception{
		List<NetworkDetailModel> networkDetailList = null;
		int protocolSn = 5;
		String queryStr = "*:*";
		SolrDocumentList docs = getSolrQueryResult(protocolSn, queryStr);
		if(docs!=null){
			networkDetailList = new ArrayList<NetworkDetailModel>();
			int size = docs.size();
			for(int i = 0 ;  i < size; i++){
				SolrDocument doc = docs.get(i);
				NetworkDetailModel networkDetail = new NetworkDetailModel();
				networkDetail.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
				networkDetail.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));
				networkDetail.setType(Common.TrimSolrResult(doc.get(SolrField.category.name())));
				networkDetail.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
				networkDetail.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
				networkDetail.setFilePath(doc.get(SolrField.filepath.name()).toString());
				networkDetail.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
				networkDetail.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
				networkDetail.setAccount(Common.TrimSolrResult(doc.get(SolrField.account.name())));
				networkDetail.setAlias(Common.TrimSolrResult(doc.get(SolrField.alias.name())));
				networkDetail.setContactList(Common.TrimSolrResult(doc.get(SolrField.contactlist.name())));
				networkDetail.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
				networkDetail.setType(Common.TrimSolrResult(doc.get(SolrField.ndtype.name())));
				networkDetailList.add(networkDetail);
			}
		}
		return networkDetailList;
	}
	
	@RequestMapping(value="getOthersDetailAll", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<OthersDetailModel> getOthersDetailAll(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception{
		List<OthersDetailModel> othersDetailList = null;
		int protocolSn = 8;
		String queryStr = "*:*";	
		SolrDocumentList docs = getSolrQueryResult(protocolSn, queryStr);
		if(docs!=null){
			othersDetailList = new ArrayList<OthersDetailModel>();
			int size = docs.size();
			for(int i = 0; i < size; i++){
				SolrDocument doc = docs.get(i);
				OthersDetailModel othersDetail = new OthersDetailModel();
				othersDetail.setHostIP(Common.TrimSolrResult(doc.get(SolrField.hostip.name())));
				othersDetail.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
				othersDetail.setFileName(Common.TrimSolrResult(doc.get(SolrField.filename.name())));
				othersDetail.setCategory(Common.TrimSolrResult(doc.get(SolrField.category.name())));
				
				othersDetail.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
				othersDetail.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
				othersDetail.setFilePath(doc.get(SolrField.filepath.name()).toString());
				othersDetail.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
				othersDetail.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
				othersDetail.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
				othersDetailList.add(othersDetail);
			}
		}
		return othersDetailList;
	}
	
	@RequestMapping(value="getVoipDetailAll", method = {RequestMethod.GET, RequestMethod.POST}, produces="application/json;charset=utf-8")
	@ResponseBody
	public List<VoipDetailModel> getVoipDetailAll(ModelMap model, HttpServletRequest request, HttpSession session, HttpServletResponse response)throws Exception{
		List<VoipDetailModel> voipDetailList = null;
		int protocolSn = 9;
		String queryStr = "*:*";	
		SolrDocumentList docs = getSolrQueryResult(protocolSn, queryStr);
		if(docs!=null){
			voipDetailList = new ArrayList<VoipDetailModel>();
			int size = docs.size();
			for(int i = 0 ; i < size; i++){
				SolrDocument doc = docs.get(i);
				VoipDetailModel voipDetail = new VoipDetailModel();
				voipDetail.setFromIP(Common.TrimSolrResult(doc.get(SolrField.fromip.name())));
				voipDetail.setToIP(Common.TrimSolrResult(doc.get(SolrField.toip.name())));
				voipDetail.setProtocol(Common.TrimSolrResult(doc.get(SolrField.protocol.name())));
				
				voipDetail.setStartTime(GetUtcDateTimeString(doc.get(SolrField.starttime.name())));
				voipDetail.setAnswerTime(GetUtcDateTimeString(doc.get(SolrField.answertime.name())));
				voipDetail.setEndTime(GetUtcDateTimeString(doc.get(SolrField.endtime.name())));
				
				voipDetail.setDuration(Common.TrimSolrResult(doc.get(SolrField.duration.name())));
				voipDetail.setResult(Common.TrimSolrResult(doc.get(SolrField.result.name())));
				voipDetail.setFilePath(doc.get(SolrField.filepath.name()).toString());
				voipDetail.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
				voipDetail.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
				voipDetail.setAccount(Common.TrimSolrResult(doc.get(SolrField.account.name())));
				voipDetail.setAlias(Common.TrimSolrResult(doc.get(SolrField.alias.name())));
				
				voipDetailList.add(voipDetail);
			}
		}
		return voipDetailList;
	}
	/**
	 * 取得solr 個別core 的URL
	 * @param protocolSN
	 * @return
	 */
	private String GetSolrQuerySrv(int protocolSN){
		 
		 String rtn="";
		 switch (protocolSN) {
		case 3:
			rtn =Common.solrLocation+"emaildetail";
			break;
		case 4:
			rtn =Common.solrLocation+"httpdetail";
			break;
		case 5:
			rtn =Common.solrLocation+"networkdetail";
			break;
		case 6:
			rtn =Common.solrLocation+"networkdetail";
			break;
		case 8:
			rtn =Common.solrLocation+"othersdetail";
			break;
		case 9:
			rtn =Common.solrLocation+"voipdetail";
			break;
		case 10:
			
			break;
		
		}
		 return rtn;
	 }
	
	private SolrDocumentList getSolrQueryResult(int protocolSn, String queryStr) throws Exception{
		
		SolrDocumentList docs = null;
		String urlString = this.GetSolrQuerySrv(protocolSn);
		SolrClient solr = new HttpSolrClient(urlString);
		SolrQuery query = new SolrQuery();
		query.set("qt", "/select");
		query.setIncludeScore(true);

		query.set("q", queryStr);
		int start = 0, rowCount = 50;
		query.setStart(start);// 設定開始的index
		query.setRows(rowCount);// 取多少筆回來
		try {
			QueryResponse solrResponse = solr.query(query);
			SolrDocumentList results = solrResponse.getResults();
			docs = new SolrDocumentList();
			while (results.size() > 0) {
                   docs.addAll(results);
                   start+=rowCount;
                   logger.info("numFounds : " +results.size());
                   logger.info("start : " + start);
                   query.setStart(start);
                   solrResponse = solr.query(query);
                   results = solrResponse.getResults();
                   
			}
		} catch (SolrServerException e) {
			e.printStackTrace();
			Common.WirteLog("QuerySolr", e.getMessage(), 3);
			throw e;
		} catch (Exception e) {
			Common.WirteLog("QuerySolr", e.getMessage(), 3);
			throw e;
		}
		return docs;
	}
	
	/**
	 * 
	 * @param strPath chewbacca.xml path
	 * @param lanType 0 中文 1 英文
	 * @return
	 */
	private String GetMultiLanguageFilePath(String strPath,int lanType){
		String rtn="";
		
		String chewbacca_zhTW = "_zhTW";
		String chewbacca_enUS = "_enUS";
		if(strPath.toLowerCase().endsWith("chewbacca.xml")){
			int idx=strPath.lastIndexOf(".");
			if(lanType==0){
				rtn=strPath.substring(0,idx)+chewbacca_zhTW+".xml";
						
			}
			else if (lanType==1) {
				rtn=strPath.substring(0,idx)+chewbacca_enUS+".xml";
			}
		}
		return rtn;
	}
	
	/**
	 * Trnasfer date to string
	 * @param input
	 * @return UTC yyyy-MM-dd HH:mm:ss
	 */
	private String GetUtcDateTimeString(Object input ){
		String rtn="";
		SimpleDateFormat out=null;
		
		try	
		{
			out=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			out.setTimeZone(TimeZone.getTimeZone("UTC"));
			rtn=out.format(input);	
		}
		catch(Exception e)
		{
			rtn="";
		}
		
		return rtn;
	}
	
	private List<String> GetSolrAllCoreUrl(){
		List<String> rtnList =null;
		rtnList= new ArrayList<>();
		rtnList.add(GetSolrQuerySrv(3));
		rtnList.add(GetSolrQuerySrv(4));
		rtnList.add(GetSolrQuerySrv(5));
		rtnList.add(GetSolrQuerySrv(6));
		rtnList.add(GetSolrQuerySrv(8));
		rtnList.add(GetSolrQuerySrv(9));
		return rtnList;
	}
}
