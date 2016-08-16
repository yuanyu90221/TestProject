/**
 * 
 */
function redirect(url, method, data){
	//console.log('redirect');
	var form = $('<form>',{
		method: method,
		action: url
	});
	//debugger;
	for(var input in data){
		//console.log(input);
		form.append(data[input]);
	}
	form.appendTo($('body')).submit();
	//form.submit();
}

function redirect1(url, method, data){
	var form = document.createElement('form');
	form.action = url;
	form.method = method;
	for(var input in data){
		//var i = document.createElement('input');
		form.appendChild(data[input]);
	}
	form.submit();
}