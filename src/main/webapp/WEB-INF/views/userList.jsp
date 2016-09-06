<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="js/userList.js"></script>
</head>
<body>
	<button class="btn btn-sm btn-warning" style="float:left" id="btnAddLink"><spring:message code="ShowUserManagement.label.userAdd"></spring:message></button>
	<table id="userList" class="display table table-striped table-bordered nowrap" style="cellspacing:0;width:100%"></table>
</body>
</html>