package com.my.fileutil.solr;

import java.util.List;


/**
 * 產生 Solr 查詢字串元件
 * @author FredTeng
 *
 */
public class SolrQueryStringGenerater {
	
	
	/**
	 * 所有 imporlogSN 集合 查詢字串
	 * @param imporlogSNList
	 * @return
	 */
	public static String queryImportSn(List<String> imporlogSNList, String protocolType){
		String queryString ="";
		for(int i=0; i< imporlogSNList.size(); i++){
			if(i!= imporlogSNList.size() -1){
				queryString += " "+SolrField.importlogsn.name()+":" +imporlogSNList.get(i) +" "+ SolrOperator.OR.name()+" ";
			}else{
				queryString += SolrField.importlogsn.name()+":" +imporlogSNList.get(i);
			}
		}
		//5、6 要將 帶給 solr 去過濾
		if(protocolType.equals("5") || protocolType.equals("6") ){
			queryString += " "+SolrOperator.AND.name()+" "+ SolrField.ndtype.name()+"="+ protocolType;
		}
		return queryString;
	}
}
