<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link href="css/style.css" rel="stylesheet">
		<script type="text/javascript" src="js/fileUploadScript.js"></script>
	</head>
	<body>
		<form id="UploadForm" action="multipleSave" method="post" enctype="multipart/form-data">
			<fieldset>
				<input type="button" id="addfile" value="+">
				<span id="rm_btn"><input type="button" id="btn_rm_input" value="-"></span><br/>
				<legend><spring:message code="tactical.label.file.Files" /></legend>
				<br/>
				<spring:message code="tactical.label.file.dec" />
				<br/>
				<textarea name="description" id="description"></textarea><br/>
				<input type="file" size="60" id="myfile" name="file" value="<spring:message code="tactical.label.file.fileUpload" />"> 
				<input type="submit" value="<spring:message code="tactical.label.file.upload" />" id="sendUpload">
				<div id="respsonse"><label><spring:message code="tactical.label.file.totalFileSize" /></label><span id="filesize"></span></div>
				<span id="append_input"></span>
				<div id="progressbox">
				<div id="progressbar"></div>
				<div id="percent">0%</div>
				</div>
				<span><div id="message"></div></span>
			</fieldset>
		</form>
	</body>
</html>