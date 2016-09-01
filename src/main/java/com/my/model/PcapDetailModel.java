package com.my.model;

import java.util.List;

public class PcapDetailModel {
	private String importlogsn;
	
	private List<EmailDetailModel> emailDetailList;
	
	private List<HttpDetailModel> httpDetailList;

	private List<NetworkDetailModel> networkDetailList;
	
	private List<OthersDetailModel> othersDetailList;
	
	private List<VoipDetailModel> voipDetailList;

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

	/**
	 * @return the emailDetailList
	 */
	public List<EmailDetailModel> getEmailDetailList() {
		return emailDetailList;
	}

	/**
	 * @param emailDetailList the emailDetailList to set
	 */
	public void setEmailDetailList(List<EmailDetailModel> emailDetailList) {
		this.emailDetailList = emailDetailList;
	}

	/**
	 * @return the httpDetailList
	 */
	public List<HttpDetailModel> getHttpDetailList() {
		return httpDetailList;
	}

	/**
	 * @param httpDetailList the httpDetailList to set
	 */
	public void setHttpDetailList(List<HttpDetailModel> httpDetailList) {
		this.httpDetailList = httpDetailList;
	}

	/**
	 * @return the networkDetailList
	 */
	public List<NetworkDetailModel> getNetworkDetailList() {
		return networkDetailList;
	}

	/**
	 * @param networkDetailList the networkDetailList to set
	 */
	public void setNetworkDetailList(List<NetworkDetailModel> networkDetailList) {
		this.networkDetailList = networkDetailList;
	}

	/**
	 * @return the othersDetailList
	 */
	public List<OthersDetailModel> getOthersDetailList() {
		return othersDetailList;
	}

	/**
	 * @param othersDetailList the othersDetailList to set
	 */
	public void setOthersDetailList(List<OthersDetailModel> othersDetailList) {
		this.othersDetailList = othersDetailList;
	}

	/**
	 * @return the voipDetailList
	 */
	public List<VoipDetailModel> getVoipDetailList() {
		return voipDetailList;
	}

	/**
	 * @param voipDetailList the voipDetailList to set
	 */
	public void setVoipDetailList(List<VoipDetailModel> voipDetailList) {
		this.voipDetailList = voipDetailList;
	}
	
	
}
