package com.my.model;

public class VoipMediaModel {
	private String connnectionID;
	
	private String codec;
	
	private String fromFileName;
	
	private String toFileNaem;
	
	private String fromSrcName;
	
	private String toSrcName;

	/**
	 * @return the connnectionID
	 */
	public String getConnnectionID() {
		return connnectionID;
	}

	/**
	 * @param connnectionID the connnectionID to set
	 */
	public void setConnnectionID(String connnectionID) {
		this.connnectionID = connnectionID;
	}

	/**
	 * @return the codec
	 */
	public String getCodec() {
		return codec;
	}

	/**
	 * @param codec the codec to set
	 */
	public void setCodec(String codec) {
		this.codec = codec;
	}

	/**
	 * @return the fromFileName
	 */
	public String getFromFileName() {
		return fromFileName;
	}

	/**
	 * @param fromFileName the fromFileName to set
	 */
	public void setFromFileName(String fromFileName) {
		this.fromFileName = fromFileName;
	}

	/**
	 * @return the toFileNaem
	 */
	public String getToFileNaem() {
		return toFileNaem;
	}

	/**
	 * @param toFileNaem the toFileNaem to set
	 */
	public void setToFileNaem(String toFileNaem) {
		this.toFileNaem = toFileNaem;
	}

	/**
	 * @return the fromSrcName
	 */
	public String getFromSrcName() {
		return fromSrcName;
	}

	/**
	 * @param fromSrcName the fromSrcName to set
	 */
	public void setFromSrcName(String fromSrcName) {
		this.fromSrcName = fromSrcName;
	}

	/**
	 * @return the toSrcName
	 */
	public String getToSrcName() {
		return toSrcName;
	}

	/**
	 * @param toSrcName the toSrcName to set
	 */
	public void setToSrcName(String toSrcName) {
		this.toSrcName = toSrcName;
	}
	
	
}
