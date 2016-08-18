/**
 * 
 */
$(document).ready(function(){
	$(":submit[id=btnSumbit]").click(function(check){
		if(checkValue()==true){
			check.preventDefault();
			if($("#loginform").find('input[name=username]').val()=='yuanyu'){
				alert('fuck you!!');
			}
			formAjax();
		}
		
	});
	
});

function formAjax(){
	var data = [];
	var username = $('#loginform').find('input[name=username]').val();
	data.push($('<input>',{type:'hidden',name:'username',value:username}));
	var password = $('#loginform').find('input[name=passwd]').val();
	data.push($('<input>',{type:'hidden',name:'passwd',value:password}));
	var lang = $('#loginform').find('input[name=radioGroup]').val();
	data.push($('<input>',{type:'hidden',name:'lang',value:lang}));
	redirect('/mytest/userlogin','post',data);
}

function checkValue(){
	//console.log('checkValue');
	var nameIsNotNull = ($('#loginform').find('input[name=username]').val()!="");
	var passwordIsNotNull = ($('#loginform').find('input[name=passwd]').val()!="");
	return (nameIsNotNull==true)&&(passwordIsNotNull==true);
}