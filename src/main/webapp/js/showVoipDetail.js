/**
 * showVoipDetail
 */
var log_showVoipDetail_flag =true;
var voipDetailList;
var voipCurrentIdx = 1;
var search_Voip_Column_index = 0;
var pre_Voip_index = 0;
$(document).ready(function(){
	voipDetailList = $("#voipDetailList").dataTable(getVoipDetailDataTableOpt());
	var innerhtml = $("#voipDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchVoipTarget">'+ 
	            	'<option value="5">endTime</option>'+
	            	'<option value="6">startTime</option>'+
	            '</select>' + innerhtml;
	$("#voipDetailList_filter").html(innerhtml);
	$("#searchVoipTarget").on('change',function(){
		pre_Voip_index = search_Voip_Column_index;
		search_Voip_Column_index = $("#searchVoipTarget").val();
		myConsoleLog(log_showVoipDetail_flag,"search_Voip_Column_index : "+search_Voip_Column_index);

	});
	$("#voipDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#voipDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#voipDetailList_filter").find('input[type="search"]').val())=='')?"":$("#voipDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showVoipDetail_flag,inputValue);
		search_Voip_Content(search_Voip_Column_index, inputValue);
	});
	
	//設定分頁
	$(".voipPagination").pagy({
		totalPages: voipDetailList.fnGetNodes().length,
		currentPage: voipCurrentIdx,
		page: function(page){
			createVoipPageNatePage(page);
		    return true;
		}
	});
	
	$("#showVoipDetail").off("hidden.bs.modal");
	$("#showVoipDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showVoipDetail_flag,"donothing3");
	});
});

function getVoipDetailDataTableOpt(){
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
	    		   "sTitle":"fromIP",
	    		   "mData":"fromIP",
	    		   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
			   },
	           {
				   "sTitle":"toIP",
				   "mData":"toIP",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
				   "sTitle":"answerTime",
				   "mData":"answerTime",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	    	   {
	        	   "sTitle":"duration",
	        	   "mData":"duration",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	    	   },
	    	   {
				   "sTitle":"endTime",
				   "mData":"endTime",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": true
	           },
	    	   {
	        	   "sTitle":"startTime",
	        	   "mData":"startTime",
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
				 var result_subject_html = '<label><a href="#" onclick="showVoipDetail('+indexOfArr+')">'+ $.i18n.prop("DateTable.showDetail")+'</a></label>';
				 $('td:eq(7)', nRow).html(result_subject_html);
			 }
		};
		return opts;
}

function showVoipDetail(num){
	voipCurrentIdx = num+1;
	myConsoleLog(log_showVoipDetail_flag, voipCurrentIdx);
	createVoipPages(voipCurrentIdx);
}

function createVoipPages(num){
	var totalNumber = voipDetailList.fnGetNodes().length;
	myConsoleLog(log_showVoipDetail_flag,"currentnum "+num);
	
	$(".voipPagination").pagy("page", num, totalNumber);
	createVoipPageNatePage(num);
    $("#showVoipDetail").modal("show");
}
function createVoipPageNatePage(page){
	myConsoleLog(log_showVoipDetail_flag,"currentnum "+page)
	var nodes = voipDetailList.fnGetNodes();
	var position = voipDetailList.fnGetPosition(nodes[page-1]);
	var result = voipDetailList.fnGetData(position);
	$("#account").text(result.account);
	$("#alias").text(result.alias);
	$("#answerTime").text(result.answerTime);
	$("#protocol").text(result.protocol);
	$("#duration").text(result.duration);
	$("#fromIP").text(result.fromIP);
	$("#toIP").text(result.toIP);
	$("#startTime").text(result.startTime);
	$("#endTime").text(result.endTime);
}

function putVoipDetailData(data){
	voipDetailList.fnClearTable();
	if(data.length > 0){
		voipDetailList.fnAddData(data);
	}
}

function search_Voip_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showData_flag,columnNo+":" + myValue);
	voipDetailList.api().columns(pre_Voip_index).search("").draw();
	voipDetailList.api().columns(columnNo).search(myValue).draw();
}