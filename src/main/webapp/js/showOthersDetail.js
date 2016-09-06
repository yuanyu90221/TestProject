/**
 * showOthersDetail.js
 */
var log_showOthersDetail_flag = true;
var othersDetailList;
var otherCurrentNodeIdx = 1;
$(document).ready(function(){
	othersDetailList = $("#othersDetailList").dataTable(getOthersDetailDataTableOpt());
	var innerhtml = $("#othersDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchOthersTarget">'+ 
	            	'<option value="5">packetendDT</option>'+
	            	'<option value="6">packetstartDT</option>'+
	            '</select>' + innerhtml;
	$("#othersDetailList_filter").html(innerhtml);
	$("#searchOthersTarget").on('change',function(){
		pre_index = search_Column_index;
		search_Column_index = $("#searchOthersTarget").val();
		myConsoleLog(log_showOthersDetail_flag,"search_Column_index : "+search_Column_index);

	});
	$("#othersDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#othersDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#othersDetailList_filter").find('input[type="search"]').val())=='')?"":$("#othersDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showOthersDetail_flag,inputValue);
		search_Other_Content(search_Column_index, inputValue);
	});
	//設定分頁
	$(".othersPagination").pagy({
		totalPages: othersDetailList.fnGetNodes().length,
		currentPage: otherCurrentNodeIdx,
		page: function(page){
			createOthersPageNatePage(page);
		    return true;
		}
	});
	$("#showOthersDetail").off("hidden.bs.modal");
	$("#showOthersDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showOthersDetail_flag,"donothing2");
	});
});

function getOthersDetailDataTableOpt(){
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
        	   "sTitle":"category",
        	   "mData":"category",
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
			   "sTitle":"hostIP",
			   "mData":"hostIP",
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
			   "sTitle":"content",
			   "mData":"content",
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
			 var result_subject = (aData.subject!=null)? aData.subject:'';
			 var result_subject_html = '<label><a href="#" onclick="showOthersDetail('+indexOfArr+')">'+ $.i18n.prop("DateTable.showDetail")+'</a></label>';
			 $('td:eq(4)', nRow).html(result_subject_html);
		 }
	};
	return opts;
}

function putOthersDetailData(data){
	othersDetailList.fnClearTable();
	if(data.length > 0){
		othersDetailList.fnAddData(data);
	}
}

function showOthersDetail(num){
	otherCurrentNodeIdx = num+1;
	createOthersPage(otherCurrentNodeIdx);
}

function createOthersPage(num){
	var totalNumber = othersDetailList.fnGetNodes().length;
	myConsoleLog(log_showOthersDetail_flag,"currentnum "+num);
	
	$(".othersPagination").pagy("page", num, totalNumber);
	
	createOthersPageNatePage(num);
	$("#showOthersDetail").modal("show");
}

function createOthersPageNatePage(page){
	var nodes = othersDetailList.fnGetNodes();
	var position = othersDetailList.fnGetPosition(nodes[page-1]);
	var result = othersDetailList.fnGetData(position);
	$("#category").text(result.category);
	$("#clientIP").text(result.clientIP);
	$("#hostIP").text(result.hostIP);
	$("#serverIP").text(result.serverIP);
	$("#othersPacketstartDT").text(result.packetstartDT);
	$("#othersPacketendDT").text(result.packetendDT);
	$("#otherContent").html(result.content);
}
function search_Other_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showData_flag,columnNo+":" + myValue);
	othersDetailList.api().columns(pre_index).search("").draw();
	othersDetailList.api().columns(columnNo).search(myValue).draw();
}