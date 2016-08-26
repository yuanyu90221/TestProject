/**
 * 
 */
var import_datatable;
var statistics_datatable;
var checkedList = [];
$(document).ready(function(){
	//初始化 dataTable
	import_datatable = $("#importLogList").dataTable(getImportDataTableOpt());
	statistics_datatable = $("#statisticsList").dataTable(getStatisticsTableOpt());
	getInitImportData();
	getInitStatisticData();
	
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
    		   "sTitle": '<button type="button" class="btn btn-sm btn-danger" onclick="deleteFile()">'+$.i18n.prop('ShowDataOverview.Table.delete')+'</button>',
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
		  $('td:eq(3)', nRow).html(timeStr);
		  //console.log("importlog_sn:"+importlog_sn);
		  var isChecked = (checkedList.indexOf(Number(importlog_sn))!=-1);
		  var result_html = '';
		  if(isChecked == true){
			  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkDelete('+importlog_sn+')" checked/></label></div>'
		  }
		  else{
			  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkDelete('+importlog_sn+')"/></label></div>';
		  }
		  $('td:eq(5)', nRow).html(result_html);
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
}

function parseValue(key,array){
	var resultStr = '';
	array.forEach(function(item){
		resultStr+='&'+key+"="+item;
	});
	return resultStr;
}