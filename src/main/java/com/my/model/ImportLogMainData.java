package com.my.model;

import java.util.List;

/**
 * 給 TreeView 以及 user 上傳檔案顯示 grid 使用之 Model
 * 其中紀載著 這次完成比數 以及 上次完成比數，方便做前端顯示使用
 * @author FredTeng
 *
 */
public class ImportLogMainData {
	
	public ImportLogMainData(){
		this.beforeFinishCount = 0;
	}
	

	private int beforeFinishCount;
	private List<ImportLogModel> importLogGridList;

	public int getBeforeFinishCount() {
		return beforeFinishCount;
	}
	public void setBeforeFinishCount(int beforeFinishCount) {
		this.beforeFinishCount = beforeFinishCount;
	}
	public List<ImportLogModel> getImportLogGridList() {
		return importLogGridList;
	}
	public void setImportLogGridList(List<ImportLogModel> importLogGridList) {
		this.importLogGridList = importLogGridList;
	}
	
	
}
