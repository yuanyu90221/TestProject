/**
 * 
 */
var import_datatable;
$(document).ready(function(){
	//初始化 dataTable
	import_datatable = $("#importLogList").dataTable(getImportDataTableOpt());
	getInitImportData();
	$(window).resize(function(){
		console.log('window resize');
		import_datatable.fnAdjustColumnSizing();
	});
});

function getImportDataTableOpt(){
	var opts = {
		"bAutoWidth":true,
		"iDisplayLength":5,
		"bLengthChange":false,
		"sPaginationType":"simple",
		"sScrollX": "100%",
		"sScrollXInner": "110%",
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
        	   "mData":"filename",
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
			   "mData":"state",
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
    		   "sTitle": "state",
    		   "mData" : "state",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": "stateContent",
    		   "mData" : "stateContent",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
    	   {
    		   "sTitle": "email_sum",
    		   "mData" : "email_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": "www_sum",
    		   "mData" : "www_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
    	   {
    		   "sTitle": "im_sum",
    		   "mData" : "im_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": "sn_sum",
    		   "mData" : "sn_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
    	   {
    		   "sTitle": "other_sum",
    		   "mData" : "other_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": "voip_sum",
    		   "mData" : "voip_sum",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle": $.i18n.prop('ShowDataOverview.Table.importInfo.dec'),
    		   "mData" : "dec",
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
		  $('td:eq(4)', nRow).html(timeStr);
	    }
	};
	return opts;
}

function putImportData(data){
	console.log(data);
	import_datatable.fnAddData(data);
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





