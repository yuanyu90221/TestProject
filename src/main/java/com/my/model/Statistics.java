package com.my.model;


/**
 * 各類的統計數量
 * @author FredTeng
 *
 */
public class Statistics {
	private int emailCount;
	private int wwwCount;
	private int imCount;
	private int socialnetworkCount;
	private int otherCount;
	private int voipCount;
	private int undecodedCount;
	
	public Statistics(){
		this.emailCount=0;
		this.wwwCount=0;
		this.imCount=0;
		this.socialnetworkCount=0;
		this.otherCount=0;
		this.voipCount=0;
		this.undecodedCount=0;
	}
	
	public int getEmailCount() {
		return emailCount;
	}
	public void setEmailCount(int emailCount) {
		this.emailCount = emailCount;
	}
	public int getWwwCount() {
		return wwwCount;
	}
	public void setWwwCount(int wwwCount) {
		this.wwwCount = wwwCount;
	}
	public int getImCount() {
		return imCount;
	}
	public void setImCount(int imCount) {
		this.imCount = imCount;
	}
	public int getSocialnetworkCount() {
		return socialnetworkCount;
	}
	public void setSocialnetworkCount(int socialnetworkCount) {
		this.socialnetworkCount = socialnetworkCount;
	}
	public int getOtherCount() {
		return otherCount;
	}
	public void setOtherCount(int otherCount) {
		this.otherCount = otherCount;
	}
	public int getVoipCount() {
		return voipCount;
	}
	public void setVoipCount(int voipCount) {
		this.voipCount = voipCount;
	}
	public int getUndecodedCount() {
		return undecodedCount;
	}
	public void setUndecodedCount(int undecodedCount) {
		this.undecodedCount = undecodedCount;
	}
	
}
