package com.my.model;

import java.util.HashMap;
import java.util.List;

/**
 * show data page 's Data Model.
 * @author FredTeng
 *
 */
public class ShowDataModel {
	
	private String protocolType;
	private String importLogSN;
	private long totalCount;
		
	
	public ShowDataModel(){
		this.protocolType = "";
		this.importLogSN ="";
	}
	
	//import Log 下 各 protocol 統計數量 
	private Statistics statistic;
	
	//importLog Inof 
	private List<ImportLogModel> importLog;
	
	//deatil 資料
	/**
	 * hashMap key is detail ID(serial number), value is object
	 */
	private HashMap<String,EmailDetailModel> emailList ;
	private HashMap<String,HttpDetailModel> wwwList;
	private HashMap<String,NetworkDetailModel> netWorkList;
	private HashMap<String,VoipDetailModel> voipList;
	private HashMap<String,OthersDetailModel> otherList;
	
	
	public String getProtocolType() {
		return protocolType;
	}
	public void setProtocolType(String protocolType) {
		this.protocolType = protocolType;
	}
	public String getImportLogSN() {
		return importLogSN;
	}
	public void setImportLogSN(String importLogSN) {
		this.importLogSN = importLogSN;
	}
	public long getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}
	public Statistics getStatistic() {
		return statistic;
	}
	public void setStatistic(Statistics statistic) {
		this.statistic = statistic;
	}	
	public List<ImportLogModel> getImportLog() {
		return importLog;
	}
	public void setImportLog( List<ImportLogModel> importLog) {
		this.importLog = importLog;
	}
	public HashMap<String, EmailDetailModel> getEmailList() {
		return emailList;
	}
	public void setEmailList(HashMap<String, EmailDetailModel> emailList) {
		this.emailList = emailList;
	}
	public HashMap<String, HttpDetailModel> getWwwList() {
		return wwwList;
	}
	public void setWwwList(HashMap<String, HttpDetailModel> wwwList) {
		this.wwwList = wwwList;
	}
	public HashMap<String, NetworkDetailModel> getNetWorkList() {
		return netWorkList;
	}
	public void setNetWorkList(HashMap<String, NetworkDetailModel> netWorkList) {
		this.netWorkList = netWorkList;
	}
	public HashMap<String, VoipDetailModel> getVoipList() {
		return voipList;
	}
	public void setVoipList(HashMap<String, VoipDetailModel> voipList) {
		this.voipList = voipList;
	}
	public HashMap<String, OthersDetailModel> getOtherList() {
		return otherList;
	}
	public void setOtherList(HashMap<String, OthersDetailModel> otherList) {
		this.otherList = otherList;
	}

	public void removeImportLogById(String id){
	    removeImportLogById(new String[]{id});
	}
	public void removeImportLogById(String[] ids){
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
	 * 清除內部資料
	 */
	public void clearDetailData(){
		if(emailList!=null){
			emailList.clear();
		}
		if(wwwList !=null){
			wwwList.clear();
		}
		if(netWorkList !=null){
			netWorkList.clear();
		}
		if(voipList !=null){
			voipList.clear();
		}
		if(otherList !=null){
			otherList.clear();
		}
	}
	
	
	
	
	

}
