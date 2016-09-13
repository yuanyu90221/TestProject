/**
 * showNetWorkDetail.js
 */
var log_showNetWorkDetail_flag = true;
var netWorkDetailList;
var netWorkCurrentIndex = 1;
var pre_Http_index = 0;
var search_Http_Column_index = 0;
$(document).ready(function(){
	netWorkDetailList = $("#netWorkDetailList").dataTable(getNetWorkDetailDataTableOpt());
	var innerhtml = $("#netWorkDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchNetWorkTarget">'+ 
	            	'<option value="5">endTime</option>'+
	            	'<option value="6">startTime</option>'+
	            '</select>' + innerhtml;
	$("#netWorkDetailList_filter").html(innerhtml);
	$("#searchNetWorkTarget").on('change',function(){
		pre_Http_index = search_Http_Column_index;
		search_Http_Column_index = $("#searchNetWorkTarget").val();
		myConsoleLog(log_showNetWorkDetail_flag,"search_Http_Column_index : "+search_Http_Column_index);

	});
	$("#netWorkDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#netWorkDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#netWorkDetailList_filter").find('input[type="search"]').val())=='')?"":$("#netWorkDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showNetWorkDetail_flag,inputValue);
		search_Http_Content(search_Http_Column_index, inputValue);
	});
	
	//設定分頁
	$(".netWorkPagination").pagy({
		totalPages: netWorkDetailList.fnGetNodes().length,
		currentPage: netWorkCurrentIndex,
		page: function(page){
			createNetWorkPageNatePage(page);
		    return true;
		}
	});
	
	$("#showNetWorkDetail").off("hidden.bs.modal");
	$("#showNetWorkDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showNetWorkDetail_flag,"donothing4");
	});
});

function getNetWorkDetailDataTableOpt(){
	var opts = {
			"bAutoWidth":false,
			"iDisplayLength":5,
			"bLengthChange":false,
			//"sPaginationType":"four_button",
			"sPaginationType" : "full",  
			"sScrollX": "100%",
			"sScrollXInner": "110%",
			"sScrollY": "100%",
			"bInfo":true,
			"bScrollCollapse": true,
			"aaSorting": [[5,'desc'],[6,'desc']],
			"sDom":'<"#ip_bar_left.pagebar-left col-sm-7"f><"#ip_bar_right.pagebar-right col-sm-5" ip>',
			"aoColumns" : [
	           {
	        	   "sTitle":"alias",
	        	   "mData":"alias",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
	    		   "sTitle":"serverIP",
	    		   "mData":"serverIP",
	    		   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
			   },
	           {
				   "sTitle":"clientIP",
				   "mData":"clientIP",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
				   "sTitle":"category",
				   "mData":"category",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	    	   {
	        	   "sTitle":"account",
	        	   "mData":"account",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	    	   },
	    	   {
				   "sTitle":"packetendDT",
				   "mData":"packetendDT",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": true
	           },
	    	   {
	        	   "sTitle":"packetstartDT",
	        	   "mData":"packetstartDT",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": true
	    	   },
	    	   {
	    		   "sTitle":"action",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false   
	    	   }
			 ],
			 "oLanguage":{
				 "sZeroRecords" : $.i18n.prop('ShowUserManagement.table.NoData'), 
				 "sInfo" : $.i18n.prop('DataTable.info',"_PAGE_","_PAGES_"),
				 "sLengthMenu": $.i18n.prop('DataTable.lengthMenu',"_MENU_"),
				 "oPaginate" : {
					 "sFirst": $.i18n.prop('RecoverFile.label.First'),
					 "sPrevious" : $.i18n.prop('RecoverFile.label.Back'),
					 "sNext" : $.i18n.prop('RecoverFile.label.Next'),
					 "sLast" : $.i18n.prop('RecoverFile.label.Last')
				 },
				 "sSearch" : $.i18n.prop('DataTable.search'),
				 "sInfoFiltered":"",
				 "sInfoEmpty": $.i18n.prop('ShowUserManagement.table.NoData')
			 },
			 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		    
				 var indexOfArr =0;
				 indexOfArr= this.fnGetNodes().indexOf(nRow);
				 var result_subject_html = '<label><a href="#" onclick="showNetWorkDetail('+indexOfArr+')">'+ $.i18n.prop("DateTable.showDetail")+'</a></label>';
				 $('td:eq(7)', nRow).html(result_subject_html);
			 }
		};
		return opts;
}

function showNetWorkDetail(num){
	netWorkCurrentIndex = num + 1;
	createNetWorkPages(netWorkCurrentIndex);
}

function putNetWorkDetailData(data){
	netWorkDetailList.fnClearTable();
	if(data.length > 0 ){
		netWorkDetailList.fnAddData(data);
	}
}

function createNetWorkPages(num){
	var totalNumber = netWorkDetailList.fnGetNodes().length;
	myConsoleLog(log_showNetWorkDetail_flag,"currentnum "+num);
	
	$(".netWorkPagination").pagy("page", num, totalNumber);
	createNetWorkPageNatePage(num);
	$("#showNetWorkDetail").modal("show");
}

function createNetWorkPageNatePage(page){
	var nodes = netWorkDetailList.fnGetNodes();
	var position = netWorkDetailList.fnGetPosition(nodes[page-1]);
	var result = netWorkDetailList.fnGetData(position);
	$("#netWorkAccount").text(result.account);
	$("#contactList").text(result.contactList);
	$("#netWorkAlias").text(result.alias);
	$("#netWorkCategory").text(result.category);
	$("#netWorkClientIP").text(result.clientIP);
	$("#netWorkServerIP").text(result.serverIP);
	$("#netWorkPacketendDT").text(result.packetendDT);
	$("#newtWorkPacketstartDT").text(result.packetstartDT);
	$("#networkContent").html(result.content);
}

function search_NetWork_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showData_flag,columnNo+":" + myValue);
	netWorkDetailList.api().columns(pre_Http_index).search("").draw();
	netWorkDetailList.api().columns(columnNo).search(myValue).draw();
}