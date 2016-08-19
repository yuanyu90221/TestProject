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
        	   "sTitle":"使用者名稱",
        	   "mData":"user_name",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":"密碼",
        	   "mData":"password",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle":"帳戶",
    		   "mData":"account",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
		   },
           {
			   "sTitle":"組織",
			   "mData":"org",
			   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
           },
           {
        	   "sTitle":"描素",
        	   "mData":"dec",
        	   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   },
           {
    		   "sTitle":"動作",
    		   "sDefaultContent" : "",  
               "sClass" : "center",
               "bSortable": false
    	   }
		 ],
		 "oLanguage":{
			 "sZeroRecords" : "目前沒有資料", 
		 },
		 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
	      // Bold the grade for all 'A' grade browsers
	       
	      $('td:eq(5)', nRow).html( '<button class="btn btn-sm btn-info" style="display:inline;" onclick="btnModifyClick(\''+aData.user_name+'\')">修改</button>'+
	    		                    '<button class="btn btn-sm btn-danger" style="display:inline;" onclick="btnDeleteClick(\''+aData.user_name+'\')">刪除</button>');
	      
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
	openConfirmDialog("確認刪除","是否刪除"+username, function(){
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

function openConfirmDialog(confirmTitle, confirmContent, callback){
	$("#confirmTitle").text(confirmTitle);
	$("#confirmContent").text(confirmContent);
	$("#confirmBtn").unbind('click');
	$("#confirmBtn").bind('click',callback);
	$("#confirmDialog").modal('show');
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

//
//function getDataTableOpt(i18nKeys){
//	var opts = {
//		"bPaginate" : false,	
//		"bInfo" : false,
//		"bFilter":false,
//		"aoColumns" : [
//           {
//        	   "sTitle":i18nKeys.UserName,
//        	   "mData":"user_name",
//        	   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//           },
//           {
//        	   "sTitle":i18nKeys.Password,
//        	   "mData":"password",
//        	   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//    	   },
//           {
//    		   "sTitle":i18nKeys.Account,
//    		   "mData":"account",
//    		   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//		   },
//           {
//			   "sTitle":i18nKeys.Org,
//			   "mData":"org",
//			   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//           },
//           {
//        	   "sTitle":i18nKeys.Dec,
//        	   "mData":"dec",
//        	   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//    	   },
//           {
//    		   "sTitle":i18nKeys.Action,
//    		   "sDefaultContent" : "",  
//               "sClass" : "center",
//               "bSortable": false
//    	   }
//		 ],
//		 "oLanguage":{
//			 "sZeroRecords" : "目前沒有資料", 
//		 },
//		 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
//	      // Bold the grade for all 'A' grade browsers
//	       
//	      $('td:eq(5)', nRow).html( '<button class="btn btn-sm btn-info" style="display:inline;" onclick="btnModifyClick(\''+aData.user_name+'\')">修改</button>'+
//	    		                    '<button class="btn btn-sm btn-danger" style="display:inline;" onclick="btnDeleteClick(\''+aData.user_name+'\')">刪除</button>');
//	      
//	    }
//	};
//	return opts;
//}
