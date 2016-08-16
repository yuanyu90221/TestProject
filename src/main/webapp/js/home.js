/**
 * 
 */
$(document).ready(function(){
	unbindNav();
	bindNav();
});

function bindNav(){
	$("#first_page_nav").bind("click",function(){
		$("#content").html('');
		$("#content").html('This is  first_page');
	});
	$("#import_file_nav").bind("click",function(){
		$("#content").html('');
		$("#content").html('This is  import_page');
	});
	$("#recovery_file_nav").bind("click", function(){
		$("#content").html('');
		$("#content").html('This is  recovery_page');
	});
	$("#user_manage_nav").bind("click", function(){
		$("#content").html('');
		$("#content").html('This is  user_manage_page');
	});
	$("#logout_nav").bind('click', function(){
		console.log('before login');
		redirect('/mytest/userlogout','post',null);
	});
	
}

function unbindNav(){
	//console.log('unbind before bind');
	$("#first_page_nav").unbind("click");
	$("#import_file_nav").unbind("click");
	$("#recovery_file_nav").unbind("click");
	$("#user_manage_nav").unbind("click");
	$("#logout_nav").unbind('click');
}