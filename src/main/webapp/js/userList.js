/**
 * userList.js
 */
var log_userList_flag = false;
var datatable;

$(document).ready(function(){
	//初始化 dataTable
	datatable = $("#userList").dataTable(getDataTableOpt());
	getInitData();
	
	bindAddLink();
	$(window).resize(function(){
		try{
		 myConsoleLog(log_userList_flag,'resize change');
		 datatable.fnAdjustColumnSizing();
		}
		catch(e){
			//TO DO
			myConsoleLog(log_userList_flag,e);
		}
	});
});

function getDataTableOpt(){
	var opts = {
		"bLengthChange":false,
		"bAutoWidth":false,	
		"bPaginate" : false,	
		"bInfo" : false,
		"bFilter":false,
		
//		"sScrollX": "100%",
//		"sScrollXInner": "110%",
//		"bScrollCollapse": true,
		"aoColumns" : [
           {
        	   "sTitle":$.i18n.prop('ShowUserManagement.table.userName'),
        	   "mData":"user_name",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":$.i18n.prop('ShowUserManagement.table.Password'),
        	   "mData":"password",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle":$.i18n.prop('ShowUserManagement.table.Account'),
    		   "mData":"account",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
		   },
           {
			   "sTitle":$.i18n.prop('ShowUserManagement.table.Organization'),
			   "mData":"org",
			   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":$.i18n.prop('ShowUserManagement.table.addUser.Description'),
        	   "mData":"dec",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle":$.i18n.prop('ShowUserManagement.table.Action'),
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   }
		 ],
		 "oLanguage":{
			 "sZeroRecords" : $.i18n.prop('ShowUserManagement.table.NoData'), 
		 },
		 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	      // Bold the grade for all 'A' grade browsers
	       
	      $('td:eq(5)', nRow).html( '<button class="btn btn-sm btn-info" style="display:inline;" onclick="btnModifyClick(\''+aData.user_name+'\')">'+$.i18n.prop('ShowUserManagement.table.Modify')+'</button>'+
	    		                    '<button class="btn btn-sm btn-danger" style="display:inline;" onclick="btnDeleteClick(\''+aData.user_name+'\')">'+$.i18n.prop('ShowUserManagement.table.Delete')+'</button>');
	      
	    }
	};
	return opts;
}

function putData(data){
	myConsoleLog(log_userList_flag,data);
	datatable.fnClearTable();
	if(data.length > 0){
		datatable.fnAddData(data);
	}
}

function getInitData(){
	$.ajax({
		url: '/mytest/userListResult',
		type: 'POST',
		dataType: 'json',
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_userList_flag,data);
			putData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_userList_flag,xhr.status);
			myConsoleLog(log_userList_flag,thrownError);
			myConsoleLog(log_userList_flag,ajaxOptions);
		}
	});
}

function btnModifyClick(username){

	//var user = datatable.fnGetData(data);
	myConsoleLog(log_userList_flag,username);
	$.ajax({
		url:'/mytest/modifyUser',
		type:'post',
		data: '&modifyUr='+username,
		success: function(data){
			myConsoleLog(log_userList_flag,data);
			$('#content').html('');
			$('#content').html(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_userList_flag,xhr.status);
			myConsoleLog(log_userList_flag,thrownError);
		}
	});
}

function btnDeleteClick(username){
	setConfirmBtnText();
	openConfirmDialog($.i18n.prop("ConfirmDialog.title",$.i18n.prop('ShowUserManagement.table.Delete')),$.i18n.prop('ConfirmDialog.message',$.i18n.prop('ShowUserManagement.table.Delete'),username), function(){
		$('#myPleaseWait').modal('show');
		//
		$.ajax({
			url:"/mytest/doDeleteUser",
			data:"&deleteUr="+username,
			type:'post',
			success: function(data){
				$("#confirmDialog").modal('hide');
				 $('#myPleaseWait').modal('hide');
				myConsoleLog(log_userList_flag,data);
				$('#content').html('');
				$('#content').html(data);
				
			},
			error: function(xhr, ajaxOptions, thrownError){
				$("#confirmDialog").modal('hide');
				 $('#myPleaseWait').modal('hide');
				myConsoleLog(log_userList_flag,xhr.status);
				myConsoleLog(log_userList_flag,thrownError);
			}
		});
		
	});
}

function bindAddLink(){
	$("#btnAddLink").click(function(){
		$.ajax({
			url: '/mytest/addUser',
			type: 'post',
			success: function(data){
				myConsoleLog(log_userList_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_userList_flag,xhr.status);
				myConsoleLog(log_userList_flag,thrownError);
			}
		});
	});
}


