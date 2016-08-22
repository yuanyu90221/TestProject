<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="js/userList.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			//var result = '${Result}';
			//console.log(userListArr);
			//putData(userListArr);
			console.log(JSON.stringify($("#result").html()));
		});
	</script>
</head>
<body>
	<c:if test="${Result!=null}">
		<div id="result" style="display:none;">${Result}</div>
		<c:set var="temp" value="${requestScope.userList[0].user_name}"></c:set>
	    <c:out value="${temp}"></c:out>
	</c:if>
	<table id="userList" class="table table-striped table-bordered" cellspacing="0" width="100%"></table>
	<script type="text/javascript">
	 
		
	</script>
</body>
</html>