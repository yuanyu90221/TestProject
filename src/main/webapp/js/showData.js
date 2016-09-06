/**
 * 
 */
var import_datatable;
var statistics_datatable;
var emailDetailList;
var checkedList = [];
var current_importLogSN = 0;
// default 4;
var search_Column_index = 4;
var pre_index = 4;
var currentNodeIdx = -1;
var log_showData_flag = true;
$(document).ready(function(){
	//初始化 dataTable
	import_datatable = $("#importLogList").dataTable(getImportDataTableOpt());
	statistics_datatable = $("#statisticsList").dataTable(getStatisticsTableOpt());
	emailDetailList = $("#emailDetailList").dataTable(getEmailDetailDataTableOpt());
	getInitImportData();
	getInitStatisticData();
	$("#emailDetailbtn").on('click', function(){
		getEmailDetail(current_importLogSN);
	});
	$("#othersDetailbtn").on('click', function(){
		getOthersDetailByImportLogSn(current_importLogSN);
	});
	$("#voipDetailbtn").on('click', function(){
		getVoipDetailByImportLogSn(current_importLogSN)
	});
	$("#httpDetailbtn").on('click', function(){
		getHttpDetailByImportLogSn(current_importLogSN);
	});
	$("#netWorkDetailbtn").on('click',function(){
		getNetWorkDetailByImportLogSn(current_importLogSN);
	});
	$("#emailDetailList_wrapper").css("display","flex");
	var innerhtml = $("#emailDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchTarget">'+ 
	            	'<option value="4">subject</option>'+
	            	'<option value="6">packetendDT</option>'+
	            	'<option value="7">packetstartDT</option>'+
	            '</select>' + innerhtml;
	$("#emailDetailList_filter").html(innerhtml);
	$("#searchTarget").on('change',function(){
		pre_index = search_Column_index;
		search_Column_index = $("#searchTarget").val();
		myConsoleLog(log_showData_flag,"search_Column_index : "+search_Column_index);

	});
	$("#emailDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#emailDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#emailDetailList_filter").find('input[type="search"]').val())=='')?"":$("#emailDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showData_flag,inputValue);
		search_Content(search_Column_index, inputValue);
	});
	//設定分頁
	$(".pagination").pagy({
		totalPages: emailDetailList.fnGetNodes().length,
		currentPage: currentNodeIdx,
		page: function(page){
			createPageNatePage(page);
		    return true;
		}
	});
	$("#showEmailDetail").off("hidden.bs.modal");
	$("#showEmailDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showData_flag,"donothing1");
	});
	$(".well").addClass("addWell");
});

function getImportDataTableOpt(){
	var opts = {
		"bAutoWidth":false,
		"iDisplayLength":5,
		"bLengthChange":false,
		"bInfo": true,
		//"sPaginationType":"full",
		"sPaginationType" : "full",  
		"sScrollX": "100%",
		"sScrollXInner": "110%",
		"sScrollY": "100%",
		"bScrollCollapse": true,
		"aaSorting": [[3,'desc']],
		"sDom":'<"#ip_bar.pagebar" ip>',
		"aoColumns" : [
           {
        	   "sTitle":$.i18n.prop('ShowDataOverview.Table.importInfo.sn'),
        	   "mData":"importlog_sn",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
    		   "sTitle":$.i18n.prop('ShowDataOverview.Table.importInfo.filename'),
    		   "mData":"org_filename",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
		   },
           {
			   "sTitle":$.i18n.prop('ShowDataOverview.Table.importInfo.state'),
			   "mData":"stateContent",
			   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":$.i18n.prop('ShowDataOverview.Table.importInfo.importDate'),
        	   "mData":"importtime",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": true,
    	   },
           {
    		   "sTitle": $.i18n.prop('ShowDataOverview.Table.importInfo.dec'),
    		   "mData" : "dec",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": '<button id="delLogBtn" type="button" class="btn btn-sm btn-danger" onclick="deleteFile()" disabled>'+$.i18n.prop('ShowDataOverview.Table.delete')+'</button>',
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
			 }
		 },
		 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	      // Bold the grade for all 'A' grade browsers
	       
	      var timeStr = new Date(aData.importtime).toLocaleString();
	      var importlog_sn = aData.importlog_sn;
	      var org_filename = aData.org_filename;
		  $('td:eq(3)', nRow).html(timeStr);
		  //myConsoleLog(log_showData_flag,"importlog_sn:"+importlog_sn);
		  var isChecked = (checkedList.indexOf(Number(importlog_sn))!=-1);
		  var result_html = '';
		  var result_email_html = '';
		  if(aData.state== "1"){
			  if(isChecked == true){
				  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkDelete('+importlog_sn+')" checked/></label></div>'
			  }
			  else{
				  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkDelete('+importlog_sn+')"/></label></div>';
			  }
		  }
		  else{
			  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkDelete('+importlog_sn+')" disabled/></label></div>';
		  }
		  result_email_html = '<div class="btn btn-sm"><a href="#" onclick="getPcapDetail('+importlog_sn+')">'+org_filename+'</a></div>';
		  $('td:eq(5)', nRow).html(result_html);
		  $('td:eq(1)', nRow).html(result_email_html);
	    }
	};
	return opts;
}

function putImportData(data){
	myConsoleLog(log_showData_flag,data);
	import_datatable.fnClearTable();
	if(data.length > 0){
		import_datatable.fnAddData(data);
	}
}

function getInitImportData(){
	setConfirmBtnText();
	$("#myPleaseWait").modal("show");
	$.ajax({
		url: '/mytest/getImportLog',
		type: 'POST',
		dataType: 'json',
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putImportData(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
			$("#myPleaseWait").modal("hide");
		}
	});
}

function getInitStatisticData(){
	setConfirmBtnText();
	$("#myPleaseWait").modal("show");
	$.ajax({
		url: '/mytest/getStatistics',
		type: 'POST',
		dataType: 'json',
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putStatisticData(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}
function getStatisticsTableOpt(){
	var opts = {
		"bLengthChange":false,	
		"bAutoWidth":false,
		"bPaginate" : false,	
		"bInfo" : false,
		"bFilter":false,
		//"bJQueryUI":true,
		"aaSorting": [],
		"aoColumns" : [
           {
        	   "sTitle":$.i18n.prop('ShowDataOverview.Table.statistic.Email'),
        	   "mData":"emailCount",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
    		   "sTitle":$.i18n.prop('ShowDataOverview.Table.statistic.HTML'),
    		   "mData":"wwwCount",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
		   },
           {
			   "sTitle":$.i18n.prop('ShowDataOverview.Table.statistic.IM'),
			   "mData":"imCount",
			   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":$.i18n.prop('ShowDataOverview.Table.statistic.Network'),
        	   "mData":"socialnetworkCount",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": $.i18n.prop('ShowDataOverview.Table.statistic.Voip'),
    		   "mData" : "voipCount",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": $.i18n.prop('ShowDataOverview.Table.statistic.Other'),
    		   "mData" : "otherCount",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   }
		 ],
		 "oLanguage":{
			 "sZeroRecords" : $.i18n.prop('ShowUserManagement.table.NoData'), 
		 }
	};
	return opts;
}

function putStatisticData(data){
	myConsoleLog(log_showData_flag,data);
	statistics_datatable.fnClearTable();
	if(data){
		statistics_datatable.fnAddData(data);
	}
}

function deleteFile(){
	myConsoleLog(log_showData_flag,'checkedList:');
	myConsoleLog(log_showData_flag,checkedList);
	var deleteArray = [];

	checkedList.forEach(function(item){
		deleteArray.push(item);
	});
	openConfirmDialog($.i18n.prop("ConfirmDialog.title",$.i18n.prop('ShowUserManagement.table.Delete')),$.i18n.prop('ConfirmDialog.message',$.i18n.prop('ShowUserManagement.table.Delete'), checkedList), function(){
		setConfirmBtnText();
		$("#myPleaseWait").modal("show");
		$.ajax({
			url: '/mytest/multipleDelete',
			type: 'POST',
			data: JSON.stringify({'deleteIds':deleteArray}),
			dataType: 'json',
			headers : {
	             'Accept' : 'application/json',
	             'Content-Type' : 'application/json'
	        },
			contentType:'application/json;charset=UTF-8',
			success: function(data){
				$("#confirmDialog").modal('hide');
				myConsoleLog(log_showData_flag,data);
				checkedList = [];
				$("#delLogBtn").prop("disabled",true);
				import_datatable.fnClearTable();
				putImportData(data);
				$("#myPleaseWait").modal("hide");
			},
			error: function(xhr, ajaxOptions, thrownError){
				$("#confirmDialog").modal('hide');
				myConsoleLog(log_showData_flag,xhr.status);
				myConsoleLog(log_showData_flag,thrownError);
				myConsoleLog(log_showData_flag,ajaxOptions);
				$("#myPleaseWait").modal("hide");
			}
		});
	});
}

function checkDelete(data){
	myConsoleLog(log_showData_flag,data);
	if(import_datatable.find('input[value="'+data+'"]').prop("checked")==true){
		if(checkedList.indexOf(data)==-1){
			checkedList.splice(checkedList.length,0,data);
		}
	}
	else{
		if(checkedList.indexOf(data)!=-1){
			checkedList.splice(checkedList.indexOf(data),1);
		}
	}
	if(checkedList.length==0){
		$("#delLogBtn").prop("disabled",true);
	}
	else{
		$("#delLogBtn").prop("disabled",false);
	}
}

function parseValue(key,array){
	var resultStr = '';
	array.forEach(function(item){
		resultStr+='&'+key+"="+item;
	});
	return resultStr;
}

function getEmailDetail(data){
	$("#myPleaseWait").modal("hide");
	myConsoleLog(log_showData_flag,'importlogsn: '+data);
	$.ajax({
		url: '/mytest/getEmailDetailByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putEmailList(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
			$("#myPleaseWait").modal("hide");
		}
	});
}

function getHttpDetailByImportLogSn(data){
	
	myConsoleLog(log_showData_flag,'importlogsn: '+data);
	$.ajax({
		url: '/mytest/getHttpDetailByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putHttpDetailData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}

function getNetWorkDetailByImportLogSn(data){
	myConsoleLog(log_showData_flag,'importlogsn: '+data);
	$.ajax({
		url: '/mytest/getNetWorkDetailByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
//			putNetWorkDetailData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}

function getOthersDetailByImportLogSn(data){
	myConsoleLog(log_showData_flag,'importlogsn: '+data);
	$.ajax({
		url: '/mytest/getOthersDetailByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putOthersDetailData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}

function getVoipDetailByImportLogSn(data){
	myConsoleLog(log_showData_flag,'importlogsn: '+data);
	$.ajax({
		url: '/mytest/getVoipDetailByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
			putVoipDetailData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}

function getStatisticsByImportLogSn(data){
	myConsoleLog(log_showData_flag,data);
	$.ajax({
		url: '/mytest/getStatisticsByImportLogSn',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showData_flag,data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
		}
	});
}

function getPcapDetail(data){
	$("#myPleaseWait").modal("show");
	current_importLogSN = data;
	myConsoleLog(log_showData_flag,data);
	$.ajax({
		url: '/mytest/getPcapDetail',
		type: 'POST',
		data: JSON.stringify({'importlogsn':data}),
		dataType: 'json',
		headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
        },
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			$("#myPleaseWait").modal("hide");
			myConsoleLog(log_showData_flag,data);
			$("#emailDetailbtn").text("emailDetail("+data.emailDetailList.length+")");
			$("#othersDetailbtn").text("othersDetail("+ data.othersDetailList.length+")");
			$("#voipDetailbtn").text("voipDetail("+data.voipDetailList.length+")");
			$("#httpDetailbtn").text("httpDetail("+data.httpDetailList.length+")");
//			$("#netWorkDetailbtn").text("netWorkDetail("+data.networkDetailList.length+")");
			putEmailList(data.emailDetailList);
			putOthersDetailData(data.othersDetailList);
			putVoipDetailData(data.voipDetailList);
			putHttpDetailData(data.httpDetailList);
//			putNetWorkDetailData(data.networkDetailList);
			$(".nav nav-tabs:nth-child(1)").addClass("active");
			$("#pcapTitle").text(current_importLogSN);
			$("#showPcapDetail").modal('show');
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showData_flag,xhr.status);
			myConsoleLog(log_showData_flag,thrownError);
			myConsoleLog(log_showData_flag,ajaxOptions);
			$("#myPleaseWait").modal("hide");
		}
	});
}
function putEmailList(data){
	myConsoleLog(log_showData_flag,data);
	emailDetailList.fnClearTable();
	if(data.length > 0 ){
		emailDetailList.fnAddData(data);
	}
}
function getEmailDetailDataTableOpt(){
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
		"aaSorting": [[6,'desc'],[7,'desc']],
		"sDom":'<"#ip_bar_left.pagebar-left col-sm-7"f><"#ip_bar_right.pagebar-right col-sm-5" ip>',
		"aoColumns" : [
           {
        	   "sTitle":"from",
        	   "mData":"from",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
    		   "sTitle":"to",
    		   "mData":"to",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
		   },
           {
			   "sTitle":"cc",
			   "mData":"cc",
			   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false,
               "bVisible": false
           },
           {
        	   "sTitle":"type",
        	   "mData":"type",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false,
               "bVisible": false
    	   },
    	   {
        	   "sTitle":"subject",
        	   "mData":"subject",
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
			 var result_subject_html = '<label><a href="#" onclick="showContent('+indexOfArr+')">'+ result_subject+'</a></label>';
			 $('td:eq(2)', nRow).html(result_subject_html);
		 }
	};
	return opts;
}

function search_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showData_flag,columnNo+":" + myValue);
	emailDetailList.api().columns(pre_index).search("").draw();
	emailDetailList.api().columns(columnNo).search(myValue).draw();
}

function showContent(num){
	currentNodeIdx = num+1;
  
    myConsoleLog(log_showData_flag,"currentNodeIdx: "+ currentNodeIdx);
    
	createPageNate(currentNodeIdx);
}

function createPageNate(num){
	var totalNumber = emailDetailList.fnGetNodes().length;
	myConsoleLog(log_showData_flag,"currentnum "+num);
	//修改目前頁面
	$(".pagination").pagy("page", num, totalNumber);
	$(".li").addClass("btn btn-sm");
	createPageNatePage(num);

	$("#showEmailDetail").modal("show");
	$("#showEmailDetail").off("hidden.bs.modal");
	$("#showEmailDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showData_flag,"donothing");
	})
	
}


function createPageNatePage(page){
	myConsoleLog(log_showData_flag,"page: "+page);
    var nodes = emailDetailList.fnGetNodes();
    var curNode = nodes[page-1];
    var position = emailDetailList.fnGetPosition(curNode);
    var resultTemp = emailDetailList.fnGetData(position);
    if(resultTemp!=null){
		$("#emailcontent").html(resultTemp.content.trim());
		$("#subject").text(resultTemp.subject.trim());
		$("#from").text(resultTemp.from.trim());
		$("#to").text(resultTemp.to.trim());
		$("#cc").text(resultTemp.cc.trim());
		$("#packetstartDT").text(resultTemp.packetstartDT);
		$("#packetendDT").text(resultTemp.packetendDT);
    }
  
}