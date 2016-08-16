<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Login Page</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link rel ="shortcut icon" type="image/x-icon" href="images/gorilla.ico"/>
		 <!-- HTML5 shim and Respond.js 讓 IE8 支援 HTML5 元素與媒體查詢 -->
    	<!-- 警告：Respond.js 無法在 file:// 協定下運作 -->
    	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script> 
        <![endif]-->	
        <script src="js/jquery.min.js"></script>
    	<!-- 依需要參考已編譯外掛版本（如下），或各自獨立的外掛版本 -->
    	<script src="js/bootstrap.min.js"></script>
    	<script type="text/javascript" src="js/common.js"></script>
		<script src="js/home.js"></script>
    	<link href="css/home.css" rel="stylesheet" />
    	<script type="text/javascript">
    		var websocketUri = 'ws://'+'<%=request.getServerName()+":"+request.getServerPort()+request.getContextPath()%>/'+"websocket/"+'${username}';
    		$(document).ready(function(){
    			var websocket = new WebSocket(websocketUri);
    			websocket.onopen = onOpen;
    			websocket.onclose = onClose;
    		});
    		function onOpen(){
    			var username = "${username}";
    			console.log(username+' is connected');
    		}
    		function onClose(){
    			var username = '${username}';
    			console.log(username+' is close');
    			window.location.href = '/mytest/userlogin';
    		}
    	</script>
	</head>
	<body>
		
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav">
						<li id="first_page_nav"><a href="#">首頁</a></li>
						<li id="import_file_nav"><a href="#">匯入檔案</a></li>
						<li id="recovery_file_nav"><a href="#">還原檔案</a></li>
						<li id="user_manage_nav"><a href="#">使用者管理</a></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li id="userEdit_nav"><a href="#"><span class="glyphicon glyphicon-user"></span>${username}</a></li>
						<li id="logout_nav"><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登出</a></li>
					</ul>
				</div>
			</div>
		</nav>
		  
		<div class="container-fluid text-center">
			<div class="row content">
				<div class="col-sm-2 sidenav">
					<p><a href="#">Pcap1</a></p>
					<p><a href="#">Pcap2</a></p>
					<p><a href="#">Pcap3</a></p>
				</div>
				<div class="col-sm-8 text-left">
					<div id="content">
						<h1>Welcome</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						<hr>
						<h3>Test</h3>
						<p>Lorem ipsum...</p>
					</div>
				</div>
				<div class="col-sm-2 sidenav">
					<div class="well">
						<p>ADS</p>
					</div>
					<div class="well">
						<p>ADS</p>
					</div>
				</div>
			</div>
		</div>
		
		<footer class="container-fluid text-center">
			<p>Copyright&copy; 2015 Gorilla Technology, All Rights Reserved.</p>
		</footer>
	</body>
</html>