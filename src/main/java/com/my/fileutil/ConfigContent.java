package com.my.fileutil;

public class ConfigContent {
	
	private String fileUploadPath;
	
	private String solrSrvLocate;
	
	private String xslEnPath;
	
	private String xslTwPath;
	
	private int solrCount;
	
	private String outFileServer;
	
	private long maxUploadSize;	
	
	private String outputPath;	
	
	private int menuCount;
	
	private int menuLoadNum;
	
	
	
	public String getParserPath() {
		return outputPath;
	}
	public void setParserPath(String outputPath) {
		this.outputPath = outputPath;
		Common.PARSER_PATH = outputPath;
	}
	public String getXslEnPath() {
		return xslEnPath;
	}
	public void setXslEnPath(String xslEnPath) {
		Common.XSL_EN_PATH = xslEnPath;
	}
	public String getXslTwPath() {
		return xslTwPath;
	}
	public void setXslTwPath(String xslTwPath) {
		Common.XSL_TW_PATH = xslTwPath;
	}
	public String getSummaryXslEnPath() {
		return Common.SUMMARY_XSL_EN_PATH;
	}
	public void setSummaryXslEnPath(String path) {
		Common.SUMMARY_XSL_EN_PATH = path;
	}
	public String getSummaryXslTwPath() {
		return Common.SUMMARY_XSL_TW_PATH;
	}
	public void setSummaryXslTwPath(String path) {
		Common.SUMMARY_XSL_TW_PATH = path;
	}
	public String getSummaryFileName() {
		return Common.SUMMARY_FILE_NAME;
	}
	public void setSummaryFileName(String path) {
		Common.SUMMARY_FILE_NAME = path;
	}
	public String getFileUploadPath() {
		return fileUploadPath;
	}
	public void setFileUploadPath(String fileUploadPath) {
		Common.FILE_UPLOAD_PATH = fileUploadPath;
	}

	public String getSolrSrvLocate() {
		return solrSrvLocate;
	}
	public void setSolrSrvLocate(String solrSrvLocate) {
		
		Common.solrLocation=solrSrvLocate;
	}
	public int getSolrCount() {
		return solrCount;
	}
	public void setSolrCount(int solrCount) {
		Common.solrRowCount = solrCount;
	}
	public String getOutFileServer() {
		return outFileServer;
	}
	public void setOutFileServer(String outFileServer) {
		Common.output_FileServer = outFileServer;
	}
	public long getMaxUploadSize() {
		return maxUploadSize;
	}
	public void setMaxUploadSize(long maxUploadSize) {
		//this.maxUploadSize = maxUploadSize;
		Common.MaxUploadSize = maxUploadSize;
	}
	
	public int getMenuCount() {
		return menuCount;
	}
	public void setMenuCount(int menuCount) {
		Common.menuCount = menuCount;
	}
	public int getMenuLoadNum() {
		return menuLoadNum;
	}
	public void setMenuLoadNum(int menuLoadNum) {
		Common.menuLoadNum = menuLoadNum;
	}
	public int getNaviCount() {
		return Common.NaviCount;
	}
	public void setNaviCount(int limit) {
		Common.NaviCount = limit;
	}
}
