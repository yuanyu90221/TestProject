<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %> 
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="css/jquery.dataTables.css" rel="stylesheet" />
	<script type="text/javascript" src="js/showNetWorkDetail.js"></script>
	<script type="text/javascript" src="js/showHttpDetail.js"></script>
	<script type="text/javascript" src="js/showVoipDetail.js"></script>
	<script type="text/javascript" src="js/showOthersDetail.js"></script>
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
	<table id="statisticsList" class="display table table-striped table-bordered nowrap" style="cellspacing:0;width:100%"></table>
	<table id="importLogList" class="display table table-striped table-bordered nowrap" style="cellspacing:0;width:100%"></table>
	
	<!-- Modal Contents -->
	<div id="showPcapDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="pcapDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					
					<h4 class="modal-title" id="pcapTitle"></h4>
				</div>
				
				<div class="modal-body"> <!-- modal body -->
					<div>
						<ul class="nav nav-tabs">
							<li ><a data-toggle="tab" href="#emailDetail" id="emailDetailbtn">emailDetail</a></li>
							<li><a data-toggle="tab" href="#httpDetail" id="httpDetailbtn">httpDetail</a></li>
							<li><a data-toggle="tab" href="#netWorkDetail" id="netWorkDetailbtn">netWorkDetail</a></li>
							<li><a data-toggle="tab" href="#othersDetail" id="othersDetailbtn">othersDetail</a></li>
							<li><a data-toggle="tab" href="#voipDetail" id="voipDetailbtn">othersDetail</a></li>
						</ul>
						
						<div class="tab-content">
							<div id="emailDetail" class="tab-pane fade in active">
								<table id="emailDetailList" class="table table-striped table-bordered display" style="cellspacing:0;width:100%;"></table>
							</div>
							<div id="httpDetail" class="tab-pane fade">
								<table id="httpDetailList" class="table table-striped table-bordered display" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="netWorkDetail" class="tab-pane fade">
								<table id="netWorkDetailList" class="table table-striped table-bordered display" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="othersDetail" class="tab-pane fade">
								<table id="othersDetailList" class="table table-striped table-bordered display" style="cellspacing:0;width:100%"></table>
							</div>
							<div id="voipDetail" class="tab-pane fade">
								<table id="voipDetailList" class="table table-striped table-bordered display" style="cellspacing:0;width:100%"></table>
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
	<!-- Modal Contents -->
	<div id="showEmailDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="emailDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<div class="row">
						<div class="pagination">
							<ul></ul>
						</div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>subject:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="subject"></h4>
					 </div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>from:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="from"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>to:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="to"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>cc:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="cc"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>packetstartDT</label></div>
						<div class="col-sm-3 well"><div id="packetstartDT"></div></div>
						<div class="col-sm-2 "><label>packetendDT</label></div>
						<div class="col-sm-3 well"><div id="packetendDT"></div></div>
					</div>
				</div>
				
				<div class="modal-body well col-sm-11 mail-content" id="emailcontent" style="min-height:400px;"> <!-- modal body -->
					
				</div>
				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->
	<!-- Modal Contents -->
	<div id="showOthersDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="othersDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<div class="row">
						<div class="othersPagination">
							<ul></ul>
						</div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>category:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="category"></h4>
					 </div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>clientIP:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="clientIP"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>hostIP:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="hostIP"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>serverIP</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="serverIP"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>packetstartDT</label></div>
						<div class="col-sm-3 well"><div id="othersPacketstartDT"></div></div>
						<div class="col-sm-2 "><label>packetendDT</label></div>
						<div class="col-sm-3 well"><div id="othersPacketendDT"></div></div>
					</div>
				</div>
				
				<div class="modal-body well col-sm-11 mail-content" style="min-height:400px;"> <!-- modal body -->
					<pre id="otherContent"></pre>
				</div>
				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->
	<!-- Modal Contents -->
	<div id="showVoipDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="voipDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<div class="row">
						<div class="voipPagination">
							<ul></ul>
						</div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>account:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="account"></h4>
					 </div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>alias:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="alias"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>answerTime:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="answerTime"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>protocol</label></div>
						<div class="col-sm-3 well"><div id="protocol"></div></div>
						<div class="col-sm-2 "><label>duration</label></div>
						<div class="col-sm-3 well"><div id="duration"></div></div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>fromIP</label></div>
						<div class="col-sm-3 well"><div id="fromIP"></div></div>
						<div class="col-sm-2 "><label>toIP</label></div>
						<div class="col-sm-3 well"><div id="toIP"></div></div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>startTime</label></div>
						<div class="col-sm-3 well"><div id="startTime"></div></div>
						<div class="col-sm-2 "><label>endTime</label></div>
						<div class="col-sm-3 well"><div id="endTime"></div></div>
					</div>
					<div class="row">
						<audio controls><source id="fromFileName" src="" type="audio/wav"></audio>
						<audio controls><source id="toFileNaem" src="" type="audio/wav"></audio>
					</div>
				</div>				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->
	<!-- Modal Contents -->
	<div id="showHttpDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="httpDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<div class="row">
						<div class="httpPagination">
							<ul></ul>
						</div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>requestUri:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="requestURi"></h4>
					 </div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>title:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="httpTitle"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>clientIP</label></div>
						<div class="col-sm-3 well"><div id="httpClientIP"></div></div>
						<div class="col-sm-2 "><label>serverIP</label></div>
						<div class="col-sm-3 well"><div id="httpServerIP"></div></div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>packetendDT</label></div>
						<div class="col-sm-3 well"><div id="httpPacketendDT"></div></div>
						<div class="col-sm-2 "><label>packetstartDT</label></div>
						<div class="col-sm-3 well"><div id="httpPacketstartDT"></div></div>
					</div>
				</div>				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->
	<!-- Modal Contents -->
	<div id="showNetWorkDetail" class="modal fade"> <!-- class modal and fade -->	
		<div class="modal-dialog modal-lg" id="netWorkDetailModal">
			<div class="modal-content containter-fluid">
			  
				<div class="modal-header"> <!-- modal header -->
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<div class="row">
						<div class="netWorkPagination">
							<ul></ul>
						</div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>account:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="netWorkAccount"></h4>
					 </div>
					</div>
					<div class="row">
					  <div class="col-sm-3"><label>contactList:</label></div>
					  <div class="col-sm-8 well">
					  	<h4 class="modal-title" id="contactList"></h4>
					 </div>
					</div>
					<div class="row">
						<div class="col-sm-3"><label>alias:</label></div>
						<div class="col-sm-8 well">
							<h4 class="modal-title" id="netWorkAlias"></h4>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>category</label></div>
						<div class="col-sm-3 well"><div id="netWorkCategory"></div></div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>clientIP</label></div>
						<div class="col-sm-3 well"><div id="netWorkClientIP"></div></div>
						<div class="col-sm-2 "><label>serverIP</label></div>
						<div class="col-sm-3 well"><div id="netWorkServerIP"></div></div>
					</div>
					<div class="row">
						<div class="col-sm-2"><label>packetendDT</label></div>
						<div class="col-sm-3 well"><div id="netWorkPacketendDT"></div></div>
						<div class="col-sm-2 "><label>packetstartDT</label></div>
						<div class="col-sm-3 well"><div id="newtWorkPacketstartDT"></div></div>
					</div>
				</div>
				<div class="modal-body well col-sm-11 mail-content" style="min-height:400px;"> <!-- modal body -->
					<pre id="networkContent"></pre>
				</div>				
				<div class="modal-footer"> <!-- modal footer -->
					<button type="button" class="btn btn-default" data-dismiss="modal">close</button>
				</div>
		
			</div> <!-- / .modal-content -->
		</div> <!-- / .modal-dialog -->
	</div><!-- / .modal -->
</body>
</html>