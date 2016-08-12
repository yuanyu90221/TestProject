/**
 * 
 */
$(document).ready(function(){
	$(":submit[id=btnSumbit]").click(function(check){
		console.log($("#loginform"));
		//阻止form submit
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
	data.push($('<input>',{type:'text',name:'username',value:username}));
	var password = $('#loginform').find('input[name=password]').val();
	data.push($('<input>',{type:'password',name:'password',value:password}));
	var lang = $('#loginform').find('input[name=radioGroup]').val();
	data.push($('<input>',{type:'text',name:'lang',value:lang}));
	redirect('/mytest/userlogin','post',data);
}

function checkValue(){
	console.log('checkValue');
	var nameIsNotNull = ($('#loginform').find('input[name=username]').val()!="");
	var passwordIsNotNull = ($('#loginform').find('input[name=password]').val()!="");
	return (nameIsNotNull==true)&&(passwordIsNotNull==true);
}