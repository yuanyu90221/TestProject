/**
 * 把指定的url用form submit 方式送出
 */
function redirect(url, method, data){
	var form = $('<form>',{
		method: method,
		action: url
	});
	for(var input in data){
		console.log(data[input]);
		form.append(data[input]);
	}
	form.appendTo("body").submit();
}

