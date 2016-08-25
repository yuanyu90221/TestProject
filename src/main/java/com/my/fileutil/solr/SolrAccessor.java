package com.my.fileutil.solr;

import org.apache.solr.client.solrj.*;
import org.apache.solr.client.solrj.impl.*;
import org.apache.solr.common.*;

import com.my.fileutil.Common;
import com.my.model.EmailDetailModel;
import com.my.model.HttpDetailModel;
import com.my.model.NetworkDetailModel;
import com.my.model.OthersDetailModel;
import com.my.model.ShowDataModel;
import com.my.model.VoipDetailModel;

import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;

import java.util.*;



import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.text.SimpleDateFormat;


public class SolrAccessor {
	

	private int rowCount=0;
	public SolrAccessor(int intRowCount){
		rowCount=intRowCount;
	}
	
	/**
	 * 
	 * @param protocolSN 3 mail, 4 www,5 socialnetwork ,6 IM,
	 * 8 others, 9 voip, 10 undecoded
	 * @param strQueryString solr query string
	 * @param batchNo page number
	 * @return
	 */
	public ShowDataModel QuerySolr(int protocolSN, String strQueryString, int batchNo){
		ShowDataModel rtnDataModel=null;
		String urlString="";
		urlString=this.GetSolrQuerySrv(protocolSN);
		SolrClient solr=new HttpSolrClient(urlString);
		SolrQuery query=new SolrQuery();
		query.set("qt", "/select");
		query.setIncludeScore(true);
		query.set("q", strQueryString);
		if(batchNo > 0){
			batchNo=batchNo-1;
		}
		query.setStart(batchNo*rowCount);//設定開始的index
		query.setRows(rowCount);//取多少筆回來
		try{
			QueryResponse response=solr.query(query);
			SolrDocumentList results = response.getResults();
			rtnDataModel=new ShowDataModel();
			rtnDataModel.setTotalCount(results.getNumFound());
			switch (protocolSN) {
			case 0:
				rtnDataModel.setEmailList(GetemailDetail(results));
				rtnDataModel.setWwwList(GetHttpDetail(results));
				rtnDataModel.setNetWorkList(GetNetWorkDetail(results));
				rtnDataModel.setOtherList(GetOthersDetail(results));
				rtnDataModel.setVoipList(GetVoipDetail(results));
				break;
			case 3:
				rtnDataModel.setEmailList(GetemailDetail(results));
				break;
			case 4:
				rtnDataModel.setWwwList(GetHttpDetail(results));
				break;
			case 5:
				rtnDataModel.setNetWorkList(GetNetWorkDetail(results));
				break;
			case 6:
				rtnDataModel.setNetWorkList(GetNetWorkDetail(results));
				break;
			case 8:
				rtnDataModel.setOtherList(GetOthersDetail(results));
				break;
			case 9:
				rtnDataModel.setVoipList(GetVoipDetail(results));
				break;
			case 10:
				break;
						
			}
		}
		catch (SolrServerException e) {
 			e.printStackTrace();
			Common.WirteLog("QuerySolr", e.getMessage(),3 );
		}
		catch(Exception e){
			Common.WirteLog("QuerySolr", e.getMessage(),3 );
		}
		return rtnDataModel;
	}
	
	private HashMap<String, EmailDetailModel>GetemailDetail(SolrDocumentList docs){
		HashMap<String, EmailDetailModel> rtnHashMap=null;
		EmailDetailModel model=null;
		int counter=1;
		rtnHashMap=new HashMap<String, EmailDetailModel>(); 
		for(int i=0;i<docs.size();i++){
			SolrDocument doc=docs.get(i);
			model=new EmailDetailModel();
			model.setSubject(Common.TrimSolrResult(doc.get(SolrField.subject.name())));
			model.setType(Common.TrimSolrResult(doc.get(SolrField.type.name())));
			model.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));			
			model.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));			
			//model.setPacketstartDT(doc.get(SolrField.packetstartdt.name()).toString());
			//model.setPacketendDT(doc.get(SolrField.packetenddt.name()).toString());
			model.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
			model.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
			model.setFrom(Common.TrimSolrResult(doc.get(SolrField.from.name())));
			model.setTo(Common.TrimSolrResult(doc.get(SolrField.to.name())));
			model.setCc(Common.TrimSolrResult(doc.get(SolrField.cc.name())));
			model.setBcc(Common.TrimSolrResult(doc.get(SolrField.bcc.name())));
			model.setContactList(Common.TrimSolrResult(doc.get(SolrField.contactlist.name())));
			model.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
			model.setFilePath(Common.TrimSolrResult(doc.get(SolrField.filepath.name())));
			model.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
			model.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
			rtnHashMap.put(String.valueOf(counter), model);
			counter++;
		}
		return rtnHashMap;
	}
	
	private HashMap<String, HttpDetailModel>GetHttpDetail(SolrDocumentList docs){
		HashMap<String, HttpDetailModel> rtnHashMap=null;
		HttpDetailModel model=null;
		int counter=1;
		rtnHashMap=new HashMap<String, HttpDetailModel>(); 
		for(int i=0;i<docs.size();i++){
			SolrDocument doc=docs.get(i);
			model=new HttpDetailModel();
			model.setRequestURi(Common.TrimSolrResult(doc.get(SolrField.requesturi.name())));
			model.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
			model.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));
			model.setTitle(Common.TrimSolrResult(doc.get(SolrField.title.name())));
			model.setType(Common.TrimSolrResult(doc.get(SolrField.type.name())));
			//model.setPacketstartDT(doc.get(SolrField.packetstartdt.name()).toString());
			//model.setPacketendDT(doc.get(SolrField.packetenddt.name()).toString());
			model.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
			model.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
			model.setFilePath(doc.get(SolrField.filepath.name()).toString());
			
			//model.setContent(doc.get(SolrField.content.name()).toString());
			rtnHashMap.put(String.valueOf(counter), model);
			counter++;
		}
		return rtnHashMap;
	}
	
	
	private HashMap<String, NetworkDetailModel>GetNetWorkDetail(SolrDocumentList docs){
		HashMap<String, NetworkDetailModel> rtnHashMap=null;
		NetworkDetailModel model=null;
		int counter=1;
		rtnHashMap=new HashMap<String, NetworkDetailModel>(); 
		for(int i=0;i<docs.size();i++){
			SolrDocument doc=docs.get(i);
			model=new NetworkDetailModel();
			
			model.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
			model.setServerIP(Common.TrimSolrResult(doc.get(SolrField.serverip.name())));
			model.setType(Common.TrimSolrResult(doc.get(SolrField.category.name())));
			//model.setPacketstartDT(doc.get(SolrField.packetstartdt.name()).toString());
			//model.setPacketendDT(doc.get(SolrField.packetenddt.name()).toString());
			model.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
			model.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
			model.setFilePath(doc.get(SolrField.filepath.name()).toString());
			model.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
			model.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
			model.setAccount(Common.TrimSolrResult(doc.get(SolrField.account.name())));
			model.setAlias(Common.TrimSolrResult(doc.get(SolrField.alias.name())));
			model.setContactList(Common.TrimSolrResult(doc.get(SolrField.contactlist.name())));
			model.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
			model.setType(Common.TrimSolrResult(doc.get(SolrField.ndtype.name())));
			rtnHashMap.put(String.valueOf(counter), model);
			counter++;
		}
		return rtnHashMap;
	}
	
	private HashMap<String, VoipDetailModel>GetVoipDetail(SolrDocumentList docs){
		HashMap<String, VoipDetailModel> rtnHashMap=null;
		VoipDetailModel model=null;
		int counter=1;
		rtnHashMap=new HashMap<String, VoipDetailModel>(); 
		for(int i=0;i<docs.size();i++){
			SolrDocument doc=docs.get(i);
			model=new VoipDetailModel();
						
			model.setFromIP(Common.TrimSolrResult(doc.get(SolrField.fromip.name())));
			model.setToIP(Common.TrimSolrResult(doc.get(SolrField.toip.name())));
			model.setProtocol(Common.TrimSolrResult(doc.get(SolrField.protocol.name())));
			
			//model.setStartTime(doc.get(SolrField.starttime.name()).toString());
			//model.setAnswerTime(doc.get(SolrField.answertime.name()).toString());
			//model.setEndTime(doc.get(SolrField.endtime.name()).toString());
			model.setStartTime(GetUtcDateTimeString(doc.get(SolrField.starttime.name())));
			model.setAnswerTime(GetUtcDateTimeString(doc.get(SolrField.answertime.name())));
			model.setEndTime(GetUtcDateTimeString(doc.get(SolrField.endtime.name())));
			
			model.setDuration(Common.TrimSolrResult(doc.get(SolrField.duration.name())));
			model.setResult(Common.TrimSolrResult(doc.get(SolrField.result.name())));
			model.setFilePath(doc.get(SolrField.filepath.name()).toString());
			model.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
			model.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
			model.setAccount(Common.TrimSolrResult(doc.get(SolrField.account.name())));
			model.setAlias(Common.TrimSolrResult(doc.get(SolrField.alias.name())));
			rtnHashMap.put(String.valueOf(counter), model);
			counter++;
		}
		return rtnHashMap;
	}
	private HashMap<String, OthersDetailModel>GetOthersDetail(SolrDocumentList docs){
		HashMap<String, OthersDetailModel> rtnHashMap=null;
		OthersDetailModel model=null;
		int counter=1;
		rtnHashMap=new HashMap<String, OthersDetailModel>(); 
		for(int i=0;i<docs.size();i++){
			SolrDocument doc=docs.get(i);
			model=new OthersDetailModel();
						
			model.setHostIP(Common.TrimSolrResult(doc.get(SolrField.hostip.name())));
			model.setClientIP(Common.TrimSolrResult(doc.get(SolrField.clientip.name())));
			model.setFileName(Common.TrimSolrResult(doc.get(SolrField.filename.name())));
			model.setCategory(Common.TrimSolrResult(doc.get(SolrField.category.name())));
			
			model.setPacketstartDT(GetUtcDateTimeString(doc.get(SolrField.packetstartdt.name())));
			model.setPacketendDT(GetUtcDateTimeString(doc.get(SolrField.packetenddt.name())));
			model.setFilePath(doc.get(SolrField.filepath.name()).toString());
			model.setEnFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),1));
			model.setTwFilePath(GetMultiLanguageFilePath(doc.get(SolrField.filepath.name()).toString(),0));
			model.setContent(Common.TrimSolrResult(doc.get(SolrField.content.name())));
			
			rtnHashMap.put(String.valueOf(counter), model);
			counter++;
		}
		return rtnHashMap;
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
	 * 根據importlog sn 刪除資料
	 * @param importlogSnList
	 * @return
	 */
	public int CleanDataByImportLogSn(List<Long> importlogSnList){
		int rtn=-1;
		SolrClient solr=null;
		List<String>coreUrlList=null;
		String queryString="";
		try{
			coreUrlList=GetSolrAllCoreUrl();
			for (String strurl : coreUrlList) {
				solr = new HttpSolrClient(strurl);
				for (Long sn : importlogSnList) {
					queryString="importlogsn:"+sn;
					UpdateResponse response =solr.deleteByQuery(queryString);
					solr.deleteByQuery(queryString);
					solr.commit();
				}
				solr=null;
			}
			rtn =0;
		}
		catch (SolrServerException | IOException e) {

			Writer writer = new StringWriter();
			PrintWriter printWriter = new PrintWriter(writer);
			e.printStackTrace(printWriter);
						String s = writer.toString();
			
			Common.WirteLog("SolrAccessor.CleanDataByImportLogSn", 
					s,3);
			rtn=-9;
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
}
