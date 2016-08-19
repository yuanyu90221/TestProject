/**
 * 
 */
$(document).ready(function(){
	function i18nGetLang(){
	    return (navigator.userLanguage||navigator.browserLanguage||navigator.language).substr(0,2);
	}
	$(function () {
	    jQuery.i18n.properties({name:'messages',path:'resources/',mode:'both', language:i18nGetLang(),callback:function(){}});
	    var a=i18nGetLang();
	    alert(a);
	    var msg1 = jQuery.i18n.prop("login.label.account");
	    var msg2 = jQuery.i18n.prop("login.label.account");
	    alert(msg1 + msg2);
	   // var html='<p> '+msg1+msg2+' </p>';    
	  //$('#result').append(html);
	}); 
});