/**
 * 
 */
var import_datatable;
var statistics_datatable;
var emailDetailList;
var checkedList = [];
var current_importLogSN = 0;
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
});

function getImportDataTableOpt(){
	var opts = {
		"bAutoWidth":false,
		"iDisplayLength":5,
		"bLengthChange":false,
		"sPaginationType":"four_button",
		"sScrollX": "100%",
		"sScrollXInner": "110%",
		"sScrollY": "100%",
		"bScrollCollapse": true,
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
               "bSortable": true
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
		"sPaginationType":"four_button",
		"sScrollX": "100%",
		"sScrollXInner": "110%",
		"sScrollY": "100%",
		"bScrollCollapse": true,
		"sDom":'<"#ip_bar.pagebar" ipf>',
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
        	   "sTitle":"packetendDT",
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
			 "sSearch" : $.i18n.prop('DataTable.search')	
		 },
		 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	      // Bold the grade for all 'A' grade browsers
	       
		
	    }
	};
	return opts;
}