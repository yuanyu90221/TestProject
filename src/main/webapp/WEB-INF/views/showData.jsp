<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="css/jquery.dataTables.css" rel="stylesheet" />
	<script type="text/javascript" src="js/showData.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$(window).resize(function(){
				console.log('window resize');
				//$("#pcapDetailModal").css('width',$(window).width()-200);
				try{
					if(import_datatable!=null){
						import_datatable.fnAdjustColumnSizing();
					}
					if(statistics_datatable!=null){
						statistics_datatable.fnAdjustColumnSizing();
					}
					if(emailDetailList!=null){
						emailDetailList.fnAdjustColumnSizing();
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
	<table id="statisticsList" class="display table table-striped table-bordered nowrrap" style="cellspacing:0;width:100%"></table>
	<table id="importLogList" class="display table table-striped table-bordered nowrrap" style="cellspacing:0;width:100%"></table>
	
	<!-- Modal Contents -->
	<div id="showPcapDetail" class="modal fade "> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="pcapDetailModal">
			<div class="modal-content">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					
					<h4 class="modal-title" id="pcapTitle"></h4>
				</div>
				
				<div class="modal-body"> <!-- modal body -->
					<div>
						<ul class="nav nav-tabs">
							<li class="active" id="emailDetailbtn"><a data-toggle="tab" href="#emailDetail">emailDetail</a></li>
							<li><a data-toggle="tab" href="#httpDetail">httpDetail</a></li>
							<li><a data-toggle="tab" href="#netWorkDetail">netWorkDetail</a></li>
							<li><a data-toggle="tab" href="#othersDetail">othersDetail</a></li>
							<li><a data-toggle="tab" href="#voipDetail">othersDetail</a></li>
						</ul>
						
						<div class="tab-content">
							<div id="emailDetail" class="tab-pane fade in active">
								<table id="emailDetailList" class="table table-striped table-bordered display nowrrap" style="cellspacing:0;width:100%;"></table>
							</div>
							<div id="httpDetail" class="tab-pane fade">
								<table id="httpDetailList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="netWorkDetail" class="tab-pane fade">
								<table id="netWorkDetailList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="othersDetail" class="tab-pane fade">
								<table id="othersDetailList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="voipDetail" class="tab-pane fade">
								<table id="voipDetailList" class="table table-striped table-bordered" style="cellspacing:0;width:100%"></table>
							</div>
						</div>	
					</div>
				</div>
				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->

</body>
</html>