<%@page import="java.util.Locale"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>WebTactatical</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		 <!-- HTML5 shim and Respond.js 讓 IE8 支援 HTML5 元素與媒體查詢 -->
    	<!-- 警告：Respond.js 無法在 file:// 協定下運作 -->
    	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script> 
        <![endif]-->	
        <script src="js/jquery-3.1.0.js"></script>
    	<!-- 依需要參考已編譯外掛版本（如下），或各自獨立的外掛版本 -->
    	<script src="js/bootstrap.min.js"></script>
    	<script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript" src="js/login.js"></script>
        <script type="text/javascript" src="js/radioCtrl.js"></script>
        
       
    	<link href="css/login.css" rel="stylesheet" />
    	<link class="spec_logo" rel ="shortcut icon" type="image/x-icon" href="images/gorilla.ico"/>
	</head>
	<body>	
		<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
		 <script type="text/javascript" src="js/i18n.js"></script>	  
		<div class="wrapper">
			<form class="form-signin" id="loginform">
				       
				<h2 class="form-signin-heading text-center"><img src="images/gorilla.ico"class="spec_logo"/>Webtactical</h2>
				<input type="text" class="form-control" name="username" placeholder="<spring:message code="login.label.account"></spring:message>" required="" autofocus="" value='<c:if test="${username!=null}">${username}</c:if>'/>
				<br/>
				<input type="password" class="form-control" name="passwd" placeholder="<spring:message code="login.label.password"></spring:message>" required="" value='<c:if test="${passwd!=null}">${passwd}</c:if>'/>      
				<label class="checkbox">
				<input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"> Remember me
				</label>
				<div class="container checkbox">

					<div class="col-sm-8">
						<div class="col-sm-3 control-label" style="text-align:left;padding-left:0px;margin-left=:0px;">
							<label><spring:message code="login.Chinese"></spring:message></label>
							<c:choose>
								<c:when test="${pageContext.response.locale==\"zh_TW\"}">
									<input type="radio" class="radio-inline" name="lang" id="cb_zh_TW" checked value="zh_TW">
								</c:when>
								<c:otherwise>
									<input type="radio" class="radio-inline" name="lang" id="cb_zh_TW" value="zh_TW">
								</c:otherwise>
							</c:choose>
						</div>
						<div class="col-sm-3 control-label" style="text-align:left;padding-left:0px;margin-left=:0px;">
							<label><spring:message code="login.English"></spring:message></label>
							<c:choose>
								<c:when test="${pageContext.response.locale==\"zh_TW\"}">
									<input type="radio" class="radio-inline" name="lang" id="cb_en_US" value="en_US">
								</c:when>
								<c:otherwise>
									<input type="radio" class="radio-inline" name="lang" id="cb_en_US" checked value="en_US">
								</c:otherwise>
							</c:choose>
						</div>
					</div>
				</div>
				<button class="btn btn-lg btn-primary btn-block" type="submit" id="btnSumbit"><spring:message code="login.label.login"></spring:message></button>   
				<c:if test="${response!=null}">
				<div class="alert alert-danger fade in">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					<strong><spring:message code="login.SYSMSG"></spring:message></strong>${response}
				</div>
				</c:if>
				
			</form>
			
		</div>
		<footer class="container-fluid text-center">
			<p>Copyright&copy; 2015 Gorilla Technology, All Rights Reserved.</p>
		</footer>
	</body>
</html>