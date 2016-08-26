<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<script type="text/javascript" src="js/showData.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$(window).resize(function(){
				console.log('window resize');
				try{
					if(import_datatable!=null){
						import_datatable.fnAdjustColumnSizing();
					}
					if(statistics_datatable!=null){
						statistics_datatable.fnAdjustColumnSizing();
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
	<table id="statisticsList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
	<table id="importLogList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
</body>
</html>