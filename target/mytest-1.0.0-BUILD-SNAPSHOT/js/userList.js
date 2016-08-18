/**
 * 
 */
var datatable;
$(document).ready(function(){
	//初始化 dataTable
	datatable = $("#userList").dataTable(getDataTableOpt());
	getInitData();
});

function getDataTableOpt(){
	var opts = {
		"bPaginate" : false,	
		"bInfo" : false,
		"aoColumns" : [
           {
        	   "sTitle":"使用者名稱",
        	   "mData":"user_name",
        	   "sDefaultContent" : "",  
               "sClass" : "center"  
           },
           {
        	   "sTitle":"密碼",
        	   "mData":"password",
        	   "sDefaultContent" : "",  
               "sClass" : "center"  
    	   },
           {
    		   "sTitle":"帳戶",
    		   "mData":"account",
    		   "sDefaultContent" : "",  
               "sClass" : "center"  
		   },
           {
			   "sTitle":"組織",
			   "mData":"org",
			   "sDefaultContent" : "",  
               "sClass" : "center"  
           },
           {
        	   "sTitle":"描素",
        	   "mData":"dec",
        	   "sDefaultContent" : "",  
               "sClass" : "center"  
    	   },
           {
    		   "sTitle":"動作",
    		   "sDefaultContent" : "",  
               "sClass" : "center"  
    	   }
		 ],
		 "oLanguage":{
			 "sZeroRecords" : "目前沒有資料", 
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
		accept:{
			json: 'application/json',
            xml: 'application/xml'
		},
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