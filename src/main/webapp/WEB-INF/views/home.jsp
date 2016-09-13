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
		<title>Login Page</title>
		<link href="css/bootstrap.min.css" rel="stylesheet">
		<link rel ="shortcut icon" type="image/x-icon" href="images/gorilla.ico"/>
    	<link href="css/home.css" rel="stylesheet" />
    	<link href="css/jquery.dataTables.css" rel="stylesheet" />
		 <!-- HTML5 shim and Respond.js 讓 IE8 支援 HTML5 元素與媒體查詢 -->
    	<!-- 警告：Respond.js 無法在 file:// 協定下運作 -->
    	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script> 
        <![endif]-->
        <script src="js/jquery-3.1.0.js"></script>
        <script type="text/javascript" src="js/jquery.form.min.js"></script>
      
    	<!-- 依需要參考已編譯外掛版本（如下），或各自獨立的外掛版本 -->
    	<script src="js/bootstrap.min.js"></script>
    	
    	 <script type="text/javascript">
        	var lang = '${pageContext.response.locale}';
        	lang = lang.substr(0,2);
        </script>
    	<script type="text/javascript" src="js/jquery.dataTables.js"></script>
    	<script type="text/javascript" src="js/bootstrap-pagy.js"></script>
    	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
    	<script type="text/javascript" src="js/i18n.js"></script>
    	<script type="text/javascript" src="js/common.js"></script>
		<script src="js/home.js"></script>
		
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
    			alert(username+' 被其他電腦登入');
    			window.location.href = '/mytest';
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
						<li id="first_page_nav"><a href="#"><spring:message code="tactical.label.home"></spring:message></a></li>
						<li id="import_file_nav"><a href="#"><spring:message code="tactical.label.import"></spring:message></a></li>
						<li id="recovery_file_nav"><a href="#"><spring:message code="tactical.label.recover"></spring:message></a></li>
						
						<c:if test="${username=='admin'}">
							<li id="user_manage_nav"><a href="#"><spring:message code="tactical.label.userManagement"></spring:message></a></li>
						</c:if>
						
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li id="userEdit_nav"><a href="#"><span class="glyphicon glyphicon-user"></span>&#x20;${username}</a></li>
						<li id="logout_nav"><a href="#"><span class="glyphicon glyphicon-log-in"></span>&#x20;<spring:message code="tactical.label.logout"></spring:message></a></li>
					</ul>
				</div>
			</div>
		</nav>
		  
		<div class="container-fluid text-center">
			<div class="row content">
				<div class="col-sm-2 sidenav">
				</div>
				<div class="col-sm-8 text-left">
					<div id="content">
					</div>
				</div>
			</div>
		</div>
		
		<footer class="container-fluid text-center">
			<p>Copyright&copy; 2015 Gorilla Technology, All Rights Reserved.</p>
		</footer>
		<!-- Modal Start here-->
		<div class="modal fade bs-example-modal-sm" id="myPleaseWait" tabindex="-1"
		    role="dialog" aria-hidden="true" data-backdrop="static">
		    <div class="modal-dialog modal-sm">
		        <div class="modal-content">
		            <div class="modal-header">
		                <h4 class="modal-title">
		                    <span class="glyphicon glyphicon-time">
		                    </span><div id="proccess_message"></div>
		                 </h4>
		            </div>
		            <div class="modal-body">
		                <div class="progress">
		                    <div class="progress-bar progress-bar-info
		                    progress-bar-striped active"
		                    style="width: 100%">
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>
		<!-- Modal ends Here -->
		<!-- Modal Start here-->
		<div class="modal fade" id="confirmDialog" tabindex="-1" role="dialog">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="confirmTitle"></h4>
					</div>
					<div class="modal-body">
						<p id="confirmContent" style="text-align:center;"></p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" id="cancelBtn"></button>
						<button type="button" class="btn btn-primary" id="confirmBtn"></button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		<!-- Modal ends Here -->
	</body>
</html>