/**
 *  showHttpDetail
 */
var log_showHttpDetail_flag = true;
var httpDetailList;
var HttpCurrentIdx = 1;
var search_Http_Column_index = 0;
var pre_Http_index = 0;
$(document).ready(function(){
	httpDetailList = $("#httpDetailList").dataTable(getHttpDetailDataTableOpt());
	var innerhtml = $("#httpDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchHttpTarget">'+ 
	            	'<option value="4">endTime</option>'+
	            	'<option value="5">startTime</option>'+
	            '</select>' + innerhtml;
	$("#httpDetailList_filter").html(innerhtml);
	$("#searchHttpTarget").on('change',function(){
		pre_Http_index = search_Http_Column_index;
		search_Http_Column_index = $("#searchHttpTarget").val();
		myConsoleLog(log_showHttpDetail_flag,"search_Http_Column_index : "+search_Http_Column_index);

	});
	$("#httpDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#httpDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#httpDetailList_filter").find('input[type="search"]').val())=='')?"":$("#httpDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showHttpDetail_flag,inputValue);
		search_Voip_Content(search_Http_Column_index, inputValue);
	});
	
	//設定分頁
	$(".httpPagination").pagy({
		totalPages: httpDetailList.fnGetNodes().length,
		currentPage: HttpCurrentIdx,
		page: function(page){
			createHttpPageNatePage(page);
		    return true;
		}
	});
	
	$("#showHttpDetail").off("hidden.bs.modal");
	$("#showHttpDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showVoipDetail_flag,"donothing3");
	});
});

function getHttpDetailDataTableOpt(){
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
			"aaSorting": [[4,'desc'],[5,'desc']],
			"sDom":'<"#ip_bar_left.pagebar-left col-sm-7"f><"#ip_bar_right.pagebar-right col-sm-5" ip>',
			 "aoColumnDefs": [{ "sWidth": "16%", "aTargets": [0,1,2,3,4,5]}],
			"aoColumns" : [
	           {
	        	   "sTitle":"requestURi",
	        	   "mData":"requestURi",
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
				   "sTitle":"serverIP",
				   "mData":"serverIP",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
				   "sTitle":"title",
				   "mData":"title",
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
				 var result_title = (aData.subject!=null)? aData.title:'';
				 var result_subject_html = '<label><a href="#" onclick="showHttpDetail('+indexOfArr+')">'+ result_title+'</a></label>';
				 $('td:eq(3)', nRow).html(result_subject_html);
			 }
		};
		return opts;
}

function putHttpDetailData(data){
	httpDetailList.fnClearTable();
	if(data.length > 0 ){
		httpDetailList.fnAddData(data);
	}
}
function showHttpDetail(num){
	HttpCurrentIdx = num + 1;
	myConsoleLog(log_showHttpDetail_flag, HttpCurrentIdx);
	createHttpPages(HttpCurrentIdx);
}

function createHttpPages(num){
	
	var totalNumber = httpDetailList.fnGetNodes().length;
	myConsoleLog(log_showHttpDetail_flag,"currentnum "+num);
	
	$(".httpPagination").pagy("page", num, totalNumber);
	createHttpPageNatePage(num);
}

function createHttpPageNatePage(page){
	var nodes = httpDetailList.fnGetNodes();
	var position = httpDetailList.fnGetPosition(nodes[page-1]);
	var result = httpDetailList.fnGetData(position);
	$("#requestURi").text(result.requestURi);
	$("#httpTitle").text(result.title);
	$("#httpClientIP").text(result.clientIP);
	$("#httpServerIP").text(result.serverIP);
	$("#httpPacketendDT").text(result.packetendDT);
	$("#packetstartDT").text(result.packetstartDT);
	$("#showHttpDetail").modal("show");
}

function search_Http_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showData_flag,columnNo+":" + myValue);
	httpDetailList.api().columns(pre_Http_index).search("").draw();
	httpDetailList.api().columns(columnNo).search(myValue).draw();
}