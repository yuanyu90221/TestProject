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
var log_flag = false;
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
		console.log("search_Column_index : "+search_Column_index);

	});
	$("#emailDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#emailDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#emailDetailList_filter").find('input[type="search"]').val())=='')?"":$("#emailDetailList_filter").find('input[type="search"]').val();
		console.log(inputValue);
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
		console.log("donothing1");
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
		  //console.log("importlog_sn:"+importlog_sn);
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
	console.log(data);
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
			console.log(data);
			putImportData(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
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
			console.log(data);
			putStatisticData(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
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
	console.log(data);
	statistics_datatable.fnClearTable();
	if(data){
		statistics_datatable.fnAddData(data);
	}
}

function deleteFile(){
	console.log('checkedList:');
	console.log(checkedList);
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
				console.log(data);
				checkedList = [];
				$("#delLogBtn").prop("disabled",true);
				import_datatable.fnClearTable();
				putImportData(data);
				$("#myPleaseWait").modal("hide");
			},
			error: function(xhr, ajaxOptions, thrownError){
				$("#confirmDialog").modal('hide');
				console.log(xhr.status);
				console.log(thrownError);
				console.log(ajaxOptions);
				$("#myPleaseWait").modal("hide");
			}
		});
	});
}

function checkDelete(data){
	console.log(data);
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
	console.log('importlogsn: '+data);
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
			console.log(data);
			putEmailList(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
			$("#myPleaseWait").modal("hide");
		}
	});
}

function getHttpDetailByImportLogSn(data){
	
	console.log('importlogsn: '+data);
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
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function getNetWorkDetailByImportLogSn(data){
	console.log('importlogsn: '+data);
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
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function getOthersDetailByImportLogSn(data){
	console.log('importlogsn: '+data);
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
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function getVoipDetailByImportLogSn(data){
	console.log('importlogsn: '+data);
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
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function getStatisticsByImportLogSn(data){
	console.log(data);
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
			console.log(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function getPcapDetail(data){
	$("#myPleaseWait").modal("show");
	current_importLogSN = data;
	console.log(data);
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
			console.log(data);
			putEmailList(data.emailDetailList);
			$("#pcapTitle").text(current_importLogSN);
			$("#showPcapDetail").modal('show');
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
			$("#myPleaseWait").modal("hide");
		}
	});
}
function putEmailList(data){
	console.log(data);
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
               "bSortable": false
           },
           {
        	   "sTitle":"type",
        	   "mData":"type",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
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
			 $('td:eq(4)', nRow).html(result_subject_html);
		 }
	};
	return opts;
}

function search_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	console.log(columnNo+":" + myValue);
	emailDetailList.api().columns(pre_index).search("").draw();
	emailDetailList.api().columns(columnNo).search(myValue).draw();
}

function showContent(num){
	currentNodeIdx = num+1;
    if(console.log && log_flag){
    	console.log("currentNodeIdx: "+ currentNodeIdx);
    }
	createPageNate(currentNodeIdx);
}

function createPageNate(num){
	var totalNumber = emailDetailList.fnGetNodes().length;
	console.log("currentnum "+num);
	$(".pagination").pagy("page", num, totalNumber);
	$(".li").addClass("btn btn-sm");
	createPageNatePage(num);

	$("#showEmailDetail").modal("show");
	$("#showEmailDetail").off("hidden.bs.modal");
	$("#showEmailDetail").on('hidden.bs.modal', function(){
		console.log("donothing");
	})
	
}


function createPageNatePage(page){
	console.log("page: "+page);
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