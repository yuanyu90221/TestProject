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

/**
* 自定義的console.log 透過log_flag來決定是否印console.log
*/

function myConsoleLog(log_flag, msg){
	if(console.log && log_flag==true){
		console.log(msg);
	}
}
/**
* 自定義的project Constant用來決定project url
*/
var projectName = 'WebTactical';