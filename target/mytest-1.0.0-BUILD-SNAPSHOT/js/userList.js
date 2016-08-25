/**
 * 
 */
var datatable;
$(document).ready(function(){
	//初始化 dataTable
	datatable = $("#userList").dataTable(getDataTableOpt());
	getInitData();
	
	bindAddLink();
});

function getDataTableOpt(){
	var opts = {
		"bPaginate" : false,	
		"bInfo" : false,
		"bFilter":false,
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
	console.log(data);
	datatable.fnAddData(data);
}

function getInitData(){
	$.ajax({
		url: '/mytest/userListResult',
		type: 'POST',
		dataType: 'json',
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			console.log(data);
			putData(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
			console.log(ajaxOptions);
		}
	});
}

function btnModifyClick(username){

	//var user = datatable.fnGetData(data);
	console.log(username);
	$.ajax({
		url:'/mytest/modifyUser',
		type:'post',
		data: '&modifyUr='+username,
		success: function(data){
			console.log(data);
			$('#content').html('');
			$('#content').html(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log(xhr.status);
			console.log(thrownError);
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
				console.log(data);
				$('#content').html('');
				$('#content').html(data);
				
			},
			error: function(xhr, ajaxOptions, thrownError){
				$("#confirmDialog").modal('hide');
				 $('#myPleaseWait').modal('hide');
				console.log(xhr.status);
				console.log(thrownError);
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
				console.log(data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log(xhr.status);
				console.log(thrownError);
			}
		});
	});
}


