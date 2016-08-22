package com.my.model;

/**
 * IM, social network通用5 ,6 Data Model
 * @author FredTeng
 *
 */
public class NetworkDetailModel {

	private String category;
	private String account;
	private String alias;
	private String contactList;
	
	private String type;
	private String clientIP;
	private String serverIP;
	private String packetstartDT;
	private String packetendDT;
	private String filePath;
	private String content;
	private String enFilePath;
	private String twFilePath;
	//private String ndType;
	
	
	
	public String getEnFilePath() {
		return enFilePath;
	}
	public void setEnFilePath(String enFilePath) {
		this.enFilePath = enFilePath;
	}
	
	public String getTwFilePath() {
		return twFilePath;
	}
	public void setTwFilePath(String twFilePath) {
		this.twFilePath = twFilePath;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getContactList() {
		return contactList;
	}
	public void setContactList(String contactList) {
		this.contactList = contactList;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getClientIP() {
		return clientIP;
	}
	public void setClientIP(String clientIP) {
		this.clientIP = clientIP;
	}
	public String getServerIP() {
		return serverIP;
	}
	public void setServerIP(String serverIP) {
		this.serverIP = serverIP;
	}
	public String getPacketstartDT() {
		return packetstartDT;
	}
	public void setPacketstartDT(String packetstartDT) {
		this.packetstartDT = packetstartDT;
	}
	public String getPacketendDT() {
		return packetendDT;
	}
	public void setPacketendDT(String packetendDT) {
		this.packetendDT = packetendDT;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
	
}
