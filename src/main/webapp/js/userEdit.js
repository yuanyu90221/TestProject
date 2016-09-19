/**
 *  userEdit.js
 */
var log_userEdit_flag = false;

$(document).ready(function(){
	$(":submit[id=btnModify]").click(function(check){
		if(checkAccountEqUrName()==false){
			check.preventDefault();
			alert('帳號跟使用者名稱需要相同');
		}
		else if(checkModifyValue()==true){
			check.preventDefault();
			if($("#modifyform").find('input[name=username]').val()=='yuanyu'){
				alert('fuck you!!');
			}
			 $('#myPleaseWait').modal('show');
			setTimeout("doAjaxUpdate()",1000);
		}
		
	});
	$(":submit[id=btnAdd]").click(function(check){
		if(checkAccountEqUrName()==false){
			check.preventDefault();
			alert('帳號跟使用者名稱需要相同');
		}
		else if(checkModifyValue()==true){
			check.preventDefault();
			if($("#modifyform").find('input[name=username]').val()=='yuanyu'){
				alert('fuck you!!');
			}
			 $('#myPleaseWait').modal('show');
			setTimeout("doAjaxAdd()",1000);
		}
		
	});
});

function doAjaxUpdate(){
	// $('#myPleaseWait').modal('show');
	$.ajax({
		url:'/'+projectName+'/doModify',
		type:'post',
		data: $("#modifyform").serialize(),
		success: function(data){
			 $('#myPleaseWait').modal('hide');
			myConsoleLog(log_userEdit_flag,"modify success");
			alert('modify success');
			$('#content').html('');
			$('#content').html(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			 $('#myPleaseWait').modal('hide');
			myConsoleLog(log_userEdit_flag,xhr.status);
			myConsoleLog(log_userEdit_flag,thrownError);
		}
	});
		
}
function doAjaxAdd(){
	// $('#myPleaseWait').modal('show');
	$.ajax({
		url:'/'+projectName+'/doAddUser',
		type:'post',
		data: $("#modifyform").serialize(),
		success: function(data){
			 $('#myPleaseWait').modal('hide');
			myConsoleLog(log_userEdit_flag,"add success");
			alert('add success');
			$('#content').html('');
			$('#content').html(data);
		},
		error: function(xhr, ajaxOptions, thrownError){
			 $('#myPleaseWait').modal('hide');
			 alert("新增錯誤");
			myConsoleLog(log_userEdit_flag,xhr.status);
			myConsoleLog(log_userEdit_flag,thrownError);
		}
	});
		
}
function checkModifyValue(){
	var nameIsNotNull = ($('#modifyform').find('input[name=user_name]').val()!="");
	var passwordIsNotNull = ($('#modifyform').find('input[name=passwd]').val()!="");
	var accountIsNotNull = ($('#modifyform').find('input[name=account]').val()!="");
	var orgIsNotNull = ($('#modifyform').find('input[name=org]').val()!="");
	var decIsNotNull = ($('#modifyform').find('input[name=dec]').val()!="");
	return (nameIsNotNull==true)&&(passwordIsNotNull==true)&&(accountIsNotNull==true)
	        &&(orgIsNotNull==true)&&(decIsNotNull==true);
}

function checkAccountEqUrName(){
	var name = $('#modifyform').find('input[name=user_name]').val();
	var account =$('#modifyform').find('input[name=account]').val();
	return name==account;
}