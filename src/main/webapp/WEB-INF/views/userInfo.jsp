<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
				<label class="text-center" id="title_lbl" style="width:100%;">修改個人資訊</label>
				</c:when>
				<c:otherwise>
				<label class="text-center" id="title_lbl" style="width:100%;">新增</label>
				</c:otherwise>
			</c:choose>
			</div>
		</div>       
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="username_lbl" for="username">username</label>
			<div class="col-sm-4">
				<input type="text" name="user_name" placeholder="username" value='<c:if test="${User!=null}">${User.user_name}</c:if>' required="" autofocus="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="passwd_lbl" for="passwd">password</label>
			<div class="col-sm-4">
				<input type="text" name="passwd" placeholder="Password" value='<c:if test="${User!=null}">${User.password}</c:if>' required="" style="width:100%;"/>      
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="account_lbl" for="account">account</label>
			<div class="col-sm-4">
				<input type="text" name="account" placeholder="account" value='<c:if test="${User!=null}">${User.account}</c:if>' required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="org_lbl" for="org">org</label>
			<div class="col-sm-4">
				<input type="text" name="org" placeholder="org" value='<c:if test="${User!=null}">${User.org}</c:if>' required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="dec_lbl" for="dec">dec</label>
			<div class="col-sm-4">
				<input type="text" name="dec" placeholder="dec" value='<c:if test="${User!=null}">${User.dec}</c:if>'required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group">
		   
			<div class="col-sm-offset-4 col-sm-2" style="text-algin:right;">
				<button class="btn btn-sm btn-primary btn-block" type="submit" id='<c:choose><c:when test="${User!=null}">btnModify</c:when><c:otherwise>btnAdd</c:otherwise></c:choose>'
					><c:choose><c:when test="${User!=null}">確認修改</c:when><c:otherwise>確認新增</c:otherwise></c:choose></button>
			</div>
		</div>   
	</form>
		
</body>
</html>