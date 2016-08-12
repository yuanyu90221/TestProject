/**
 * 
 */
function redirect(url, method, data){
	var form = $('<form>',{
		method: method,
		action: url
	});
	for(var input in data){
		form.append(data[input]);
	}
	form.submit();
}