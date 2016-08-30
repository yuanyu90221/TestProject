/**
 * 
 */
$(document).ready(function(){
	unbindNav();
	bindNav();
	$.ajax({
		url:"/mytest/ShowData",
		type: "post",
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

function bindNav(){
	$("#first_page_nav").bind("click",function(){
		$.ajax({
			url:"/mytest/ShowData",
			type: "post",
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
	$("#import_file_nav").bind("click",function(){
		console.log('fileUpload');
		$.ajax({
			url:"/mytest/fileUpload",
			type: "post",
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
	$("#recovery_file_nav").bind("click", function(){
		console.log('recoverData!');
		$.ajax({
			url:"/mytest/recoverData",
			type: "post",
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
	$("#user_manage_nav").bind("click", function(){
		console.log('doUserList');
		$.ajax({
			url:"/mytest/userList",
			type: "post",
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
	$("#logout_nav").bind('click', function(){
		console.log('before login');
		redirect('/mytest/userlogout','post',null);
	});
	$("#userEdit_nav").bind("click", function(){
		console.log('doajax');
		 var user = $("#userEdit_nav").find('a').text();
		 console.log(user);
		$.ajax({
			url:'/mytest/modifyUser',
			type:'post',
			data: '&modifyUr='+user,
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

function unbindNav(){
	//console.log('unbind before bind');
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