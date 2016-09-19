/**
 * home.js
 */
var log_home_flag = false;

$(document).ready(function(){
	unbindNav();
	bindNav();
	$.ajax({
		url:"/"+projectName+"/ShowData",
		type: "post",
		success: function(data){
			myConsoleLog(log_home_flag,data);
			$('#content').html('');
			$('#content').html(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_home_flag,xhr.status);
			myConsoleLog(log_home_flag,thrownError);
		}
	});
	
});

function bindNav(){
	$("#first_page_nav").bind("click",function(){
		$.ajax({
			url:"/"+projectName+"/ShowData",
			type: "post",
			success: function(data){
				myConsoleLog(log_home_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_home_flag,xhr.status);
				myConsoleLog(log_home_flag,thrownError);
			}
		});
	});
	$("#import_file_nav").bind("click",function(){
		myConsoleLog(log_home_flag,'fileUpload');
		$.ajax({
			url:"/"+projectName+"/fileUpload",
			type: "post",
			success: function(data){
				myConsoleLog(log_home_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_home_flag,xhr.status);
				myConsoleLog(log_home_flag,thrownError);
			}
		});
	});
	$("#recovery_file_nav").bind("click", function(){
		myConsoleLog(log_home_flag,'recoverData!');
		$.ajax({
			url:"/"+projectName+"/recoverData",
			type: "post",
			success: function(data){
				myConsoleLog(log_home_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_home_flag,xhr.status);
				myConsoleLog(log_home_flag,thrownError);
			}
		});
	});
	$("#user_manage_nav").bind("click", function(){
		myConsoleLog(log_home_flag,'doUserList');
		$.ajax({
			url:"/"+projectName+"/userList",
			type: "post",
			success: function(data){
				myConsoleLog(log_home_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_home_flag,xhr.status);
				myConsoleLog(log_home_flag,thrownError);
			}
		});
	});
	$("#logout_nav").bind('click', function(){
		myConsoleLog(log_home_flag,'before login');
		redirect('/'+projectName+'/userlogout','post',null);
	});
	$("#userEdit_nav").bind("click", function(){
		myConsoleLog(log_home_flag,'doajax');
		 var user = $("#userEdit_nav").find('a').text().trim();
		 myConsoleLog(log_home_flag,user);
		$.ajax({
			url:'/'+projectName+'/modifyUser',
			type:'post',
			data: '&modifyUr='+user,
			success: function(data){
				myConsoleLog(log_home_flag,data);
				$('#content').html('');
				$('#content').html(data);
			},
			error: function(xhr, ajaxOptions, thrownError){
				myConsoleLog(log_home_flag,xhr.status);
				myConsoleLog(log_home_flag,thrownError);
			}
		});
	});
	
}

function unbindNav(){
	//myConsoleLog(log_home_flag,'unbind before bind');
	$("#first_page_nav").unbind("click");
	$("#import_file_nav").unbind("click");
	$("#recovery_file_nav").unbind("click");
	$("#user_manage_nav").unbind("click");
	$("#logout_nav").unbind('click');
	$("#userEdit_nav").unbind('click');
}

function setConfirmBtnText(){
	$('#confirmBtn').text($.i18n.prop('ConfirmDialog.confirmBtnMsg'));
	$('#cancelBtn').text($.i18n.prop('ConfirmDialog.cancelBtnMsg'));
	$('#proccess_message').text($.i18n.prop('ProccessDialog.message'));
}

function openConfirmDialog(confirmTitle, confirmContent, callback){
	$("#confirmTitle").text(confirmTitle);
	$("#confirmContent").text(confirmContent);
	$("#confirmBtn").unbind('click');
	$("#confirmBtn").bind('click',callback);
	$("#confirmDialog").modal('show');
}