/**
 * 
 */
var recover_datatable;
var recover_list = [];
$(document).ready(function(){
	console.log(lang);
	recover_datatable = $("#importRecoverLogList").dataTable(getImportRecoverDataTableOpt());
	getInitRecoverData();
});

/**
 * 取得RecoverTable option
 * 
 * @returns {___anonymous247_3651}
 */
function getImportRecoverDataTableOpt(){
	var opts = {
		"bAutoWidth":false,
		"iDisplayLength":5,
		"bLengthChange":false,
		"sPaginationType":"four_button",
		"sScrollX": "100%",
		"sScrollXInner": "110%",
		"sScrollY": "100%",
		"bScrollCollapse": true,
		"sDom":'<"#ip_bar1.pagebar" ip>',
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
    		   "sTitle": '<button id="recoverLogBtn" type="button" class="btn btn-sm btn-danger" onclick="recoverFile()" disabled>'+$.i18n.prop('ShowData.label.recover')+'</button>',
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
		  var isChecked = (recover_list.indexOf(Number(importlog_sn))!=-1);
		  var result_html = '';
		  if(aData.state== "1"){
			  if(isChecked == true){
				  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkRecover('+importlog_sn+')" checked/></label></div>'
			  }
			  else{
				  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkRecover('+importlog_sn+')"/></label></div>';
			  }
		  }
		  else{
			  result_html = '<div class="checkbox"><label><input type="checkbox" value="'+importlog_sn+'" onclick="checkRecover('+importlog_sn+')" disabled/></label></div>';
		  }

		  $('td:eq(5)', nRow).html(result_html);
	    }
	};
	return opts;
}

function recoverFile(){
	console.log('recoverFile');
	var recoverArray = [];
	recover_list.forEach(function(item){
		console.log(item);
		recoverArray.push(item);
	});
	console.log(JSON.stringify({"recoverIds":recoverArray}));
	openConfirmDialog($.i18n.prop("ConfirmDialog.title",$.i18n.prop('RecoverFile.label.recover')),$.i18n.prop('ConfirmDialog.message',$.i18n.prop('RecoverFile.label.recover'), recover_list), function(){
		setConfirmBtnText();
		console.log(recoverArray);
		$("#myPleaseWait").modal("show");
		$.ajax({
			url: '/mytest/multipleRecover',
			type: 'POST',
			data: JSON.stringify({"recoverIds":recoverArray}),
			dataType: 'json',
			headers : {
	             'Accept' : 'application/json',
	             'Content-Type' : 'application/json;charset=utf-8'
	        },
	        contentType:'application/json;charset=utf-8',
			success: function(data){
				$("#confirmDialog").modal('hide');
				console.log(data);
				recover_list = [];
				$("#recoverLogBtn").prop("disabled",true);
				recover_datatable.fnClearTable();
				putRecoverData(data);
				processDelete(recoverArray);
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

function getInitRecoverData(){
	setConfirmBtnText();
	$("#myPleaseWait").modal("show");
	$.ajax({
		url: '/mytest/getRecoverLog',
		type: 'POST',
		dataType: 'json',
		contentType:'application/json;charset=utf-8',
		success: function(data){
			console.log(data);
			putRecoverData(data);
			$("#myPleaseWait").modal("hide");
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function putRecoverData(data){
	console.log('put RecoverData');
	console.log(data);
	recover_datatable.fnClearTable();
	if(data.length > 0 ){
		recover_datatable.fnAddData(data);
	}
}

function checkRecover(data){
	console.log('checkRecover');
	if(recover_datatable.find('input[value="'+data+'"]').prop("checked")==true){
		if(recover_list.indexOf(data)==-1){
			recover_list.splice(recover_list.length,0,data);
		}
	}
	else{
		if(recover_list.indexOf(data)!=-1){
			recover_list.splice(recover_list.indexOf(data),1);
		}
	}
	console.log(recover_list);
	if(recover_list.length==0){
		$("#recoverLogBtn").prop("disabled",true);
	}
	else{
		$("#recoverLogBtn").prop("disabled",false);
	}
}

function processDelete(recoverArray){
	console.log(recoverArray);
}