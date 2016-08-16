/**
 * Dom Ready function
 */
$(document).ready(function(){
	setInterval(function(){
		console.log(new Date().toLocaleString());
	},1000);
});