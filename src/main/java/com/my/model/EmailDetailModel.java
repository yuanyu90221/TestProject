package com.my.model;

/**
 * Email Detail Model
 * @author FredTeng
 *
 */
public class EmailDetailModel{
	private String subject;
	private String from;
	private String to;
	private String cc;
	private String bcc;
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
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getCc() {
		return cc;
	}
	public void setCc(String cc) {
		this.cc = cc;
	}
	public String getBcc() {
		return bcc;
	}
	public void setBcc(String bcc) {
		this.bcc = bcc;
	}
	public String getContactList() {
		return contactList;
	}
	public void setContactList(String contactList) {
		this.contactList = contactList;
	}
	
	
	/* detail model */ 

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
