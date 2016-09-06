<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="js/recoverData.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		$(window).resize(function(){
			console.log('window resize');
			try{
				
				if(recover_datatable!=null){
					recover_datatable.fnAdjustColumnSizing();
				}
			}
			catch(e){
				//console.log(e);
			}
		});
	}); 
	</script>
</head>
<body>
	<table id="importRecoverLogList" class="display table table-striped table-bordered nowrap" style="cellspacing:0;width:100%"></table>
</body>
</html>