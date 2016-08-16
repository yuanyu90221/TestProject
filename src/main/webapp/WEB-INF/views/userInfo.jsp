<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
			<label class="text-center" id="title_lbl" style="width:100%;">修改個人資訊</label>
			</div>
		</div>       
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="username_lbl" for="username">username</label>
			<div class="col-sm-4">
				<input type="text" name="user_name" placeholder="username" value="${User.user_name}" required="" autofocus="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="passwd_lbl" for="passwd">password</label>
			<div class="col-sm-4">
				<input type="text" name="passwd" placeholder="Password" value="${User.password}"required="" style="width:100%;"/>      
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="account_lbl" for="account">account</label>
			<div class="col-sm-4">
				<input type="text" name="account" placeholder="account" value="${User.account}"required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="org_lbl" for="org">org</label>
			<div class="col-sm-4">
				<input type="text" name="org" placeholder="org" value="${User.org}"required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group text-center">
			<label class="col-sm-4 control-label" id="dec_lbl" for="dec">dec</label>
			<div class="col-sm-4">
				<input type="text" name="dec" placeholder="dec" value="${User.dec}"required="" style="width:100%;"/>
			</div>
		</div>
		<div class="form-group">
		   
			<div class="col-sm-offset-4 col-sm-2" style="text-algin:right;">
				<button class="btn btn-sm btn-primary btn-block" type="submit" id="btnModify">確認修改</button>
			</div>
		</div>   
	</form>
		
</body>
</html>