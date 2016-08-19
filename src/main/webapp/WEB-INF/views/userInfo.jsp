<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/userEdit.js"></script>
</head>
<body>
	
	<form class="form-horizontal" id="modifyform">
		<div class="form-group">
			<div class="text-center">
			<c:choose>
				<c:when test="${User!=null}">
				<label class="text-center" id="title_lbl" style="width:100%;"><spring:message code="tactical.label.edit"></spring:message></label>
				</c:when>
				<c:otherwise>
				<label class="text-center" id="title_lbl" style="width:100%;"><spring:message code="ShowUserManagement.label.userAdd"></spring:message></label>
				</c:otherwise>
			</c:choose>
			</div>
		</div>       
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="username_lbl" for="username"><spring:message code="ShowUserManagement.table.userName"></spring:message></label>
			<div class="col-sm-4">
				<input type="text" name="user_name" placeholder="username" value='<c:if test="${User!=null}">${User.user_name}</c:if>' required="" autofocus="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="passwd_lbl" for="passwd"><spring:message code="ShowUserManagement.table.Password"></spring:message></label>
			<div class="col-sm-4">
				<input type="text" name="passwd" placeholder="Password" value='<c:if test="${User!=null}">${User.password}</c:if>' required="" style="width:100%;"/>      
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="account_lbl" for="account"><spring:message code="ShowUserManagement.table.Account"></spring:message></label>
			<div class="col-sm-4">
				<input type="text" name="account" placeholder="account" value='<c:if test="${User!=null}">${User.account}</c:if>' required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="org_lbl" for="org"><spring:message code="ShowUserManagement.table.Organization"></spring:message></label>
			<div class="col-sm-4">
				<input type="text" name="org" placeholder="org" value='<c:if test="${User!=null}">${User.org}</c:if>' required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="dec_lbl" for="dec"><spring:message code="ShowUserManagement.table.Description"></spring:message></label>
			<div class="col-sm-4">
				<input type="text" name="dec" placeholder="dec" value='<c:if test="${User!=null}">${User.dec}</c:if>'required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group">
		   
			<div class="col-sm-offset-4 col-sm-2" style="text-algin:right;">
				<button class="btn btn-sm btn-primary btn-block" type="submit" id='<c:choose><c:when test="${User!=null}">btnModify</c:when><c:otherwise>btnAdd</c:otherwise></c:choose>'
					><c:choose><c:when test="${User!=null}"><spring:message code="tactical.label.edit"></spring:message></c:when><c:otherwise><spring:message code="ShowUserManagement.label.userAdd"></spring:message></c:otherwise></c:choose></button>
			</div>
		</div>   
	</form>
		
</body>
</html>