package com.my.model;

import java.util.Date;



/**
 * Import File Data model
 * For List View 顯示 Model Object
 * @author FredTeng
 *
 */
public class ImportLogModel {
	
	private String importlog_sn ;
	private String filename;
	private String org_filename;
	private String state;
	private String stateContent;

	private String email_sum = "0";
	private String www_sum = "0";
	private String im_sum = "0";
	private String sn_sum = "0";
	private String other_sum = "0";
	private String voip_sum = "0";

	private Date importtime;
	private String dec;
	public String getImportlog_sn() {
		return importlog_sn;
	}
	public void setImportlog_sn(String importlog_sn) {
		this.importlog_sn = importlog_sn;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getOrg_filename() {
		return org_filename;
	}
	public void setOrg_filename(String org_filename) {
		this.org_filename = org_filename;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Date  getImporttime() {
		return importtime;
	}
	public void setImporttime(Date importtime) {
		this.importtime = importtime;
	}
	public String getDec() {
		return dec;
	}
	public void setDec(String dec) {
		this.dec = dec;
	}
	public String getStateContent() {
		return stateContent;
	}
	public void setStateContent(String stateContent) {
		this.stateContent = stateContent;
	}

	public String getEmail_sum(){
		return email_sum;
	}
	public void setEmail_sum(String value){
		email_sum = value;
	}
	public void setEmail_sum(int value){
		email_sum = String.valueOf(value);
	}
	
	public String getWww_sum(){
		return www_sum;
	}
	public void setWww_sum(String value){
		www_sum = value;
	}
	public void setWww_sum(int value){
		www_sum = String.valueOf(value);
	}

	public String getIm_sum(){
		return im_sum;
	}
	public void setIm_sum(String value){
		im_sum = value;
	}
	public void setIm_sum(int value){
		im_sum = String.valueOf(value);
	}

	public String getSn_sum(){
		return sn_sum;
	}
	public void setSn_sum(String value){
		sn_sum = value;
	}
	public void setSn_sum(int value){
		sn_sum = String.valueOf(value);
	}

	public String getOther_sum(){
		return other_sum;
	}
	public void setOther_sum(String value){
		other_sum = value;
	}
	public void setOther_sum(int value){
		other_sum = String.valueOf(value);
	}

	public String getVoip_sum(){
		return voip_sum;
	}
	public void setVoip_sum(String value){
		voip_sum = value;
	}
	public void setVoip_sum(int value){
		voip_sum = String.valueOf(value);
	}
}
