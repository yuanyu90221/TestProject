package com.my.model;

/**
 * WWW html Detail Model
 * @author FredTeng
 *
 */
public class HttpDetailModel {
	private String id;
	private String importlogsn;
	private String requestURi;
	private String title;
	
	private String type;
	private String clientIP;
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the importlogsn
	 */
	public String getImportlogsn() {
		return importlogsn;
	}
	/**
	 * @param importlogsn the importlogsn to set
	 */
	public void setImportlogsn(String importlogsn) {
		this.importlogsn = importlogsn;
	}
	private String serverIP;
	private String packetstartDT;
	private String packetendDT;
	private String filePath;
	private String content;
	
	public String getRequestURi() {
		return requestURi;
	}
	public void setRequestURi(String requestURi) {
		this.requestURi = requestURi;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
