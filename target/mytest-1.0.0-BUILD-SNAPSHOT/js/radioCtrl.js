/**
 * this is four radio button controller
 */
$(document).on('change','input:radio[id^="cb"]', function(event){
	var id = event.currentTarget.id;
	getCheckeid(id);
});

function getCheckeid(id){
	
	console.log(id);
	console.log('change lang to '+ $('#'+id).val());
	$.ajax({
		 type: 'POST',
	     url : "/mytest/changeLanguange",
	     data: "&lang="+$('#'+id).val(),
	     success : function(data) {
	    	 console.log(data);
	    	 var input = $("#loginform").find('input[name=lang]:checked');
	    	 console.log("lang"+input.val());
	    	 alert("lang"+input.val());
	    	 navigator.language = input.val();
	    	 alert(navigator.language);
	    	 var inputs = [];
	    	 //inputs.push($('<input>',{type:'hidden',name:'lang',value:input.val()}));
	    	 redirect("/mytest/","get", null);
	     }
	});
}
