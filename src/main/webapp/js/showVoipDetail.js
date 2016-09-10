/**
 * showVoipDetail
 */
var log_showVoipDetail_flag =true;
var voipDetailList;
var voipCurrentIdx = 1;
var search_Voip_Column_index = 0;
var pre_Voip_index = 0;
$(document).ready(function(){
	voipDetailList = $("#voipDetailList").dataTable(getVoipDetailDataTableOpt());
	var innerhtml = $("#voipDetailList_filter").html();
	innerhtml = '<label>搜尋項目:</label>'+
	            '<select id="searchVoipTarget">'+ 
	            	'<option value="5">endTime</option>'+
	            	'<option value="6">startTime</option>'+
	            '</select>' + innerhtml;
	$("#voipDetailList_filter").html(innerhtml);
	$("#searchVoipTarget").on('change',function(){
		pre_Voip_index = search_Voip_Column_index;
		search_Voip_Column_index = $("#searchVoipTarget").val();
		myConsoleLog(log_showVoipDetail_flag,"search_Voip_Column_index : "+search_Voip_Column_index);

	});
	$("#voipDetailList_filter").find('input[type="search"]').off('keyup click');
	$("#voipDetailList_filter").find('input[type="search"]').on('keyup click', function(){
		var inputValue = (($("#voipDetailList_filter").find('input[type="search"]').val())=='')?"":$("#voipDetailList_filter").find('input[type="search"]').val();
		myConsoleLog(log_showVoipDetail_flag,inputValue);
		search_Voip_Content(search_Voip_Column_index, inputValue);
	});
	
	//設定分頁
	$(".voipPagination").pagy({
		totalPages: voipDetailList.fnGetNodes().length,
		currentPage: voipCurrentIdx,
		page: function(page){
			createVoipPageNatePage(page);
		    return true;
		}
	});
	
	$("#showVoipDetail").off("hidden.bs.modal");
	$("#showVoipDetail").on('hidden.bs.modal', function(){
		myConsoleLog(log_showVoipDetail_flag,"donothing3");
	});
});

function getVoipDetailDataTableOpt(){
	var opts = {
			"bAutoWidth":false,
			"iDisplayLength":5,
			"bLengthChange":false,
			//"sPaginationType":"four_button",
			"sPaginationType" : "full",  
			"sScrollX": "100%",
			"sScrollXInner": "110%",
			"sScrollY": "100%",
			"bInfo":true,
			"bScrollCollapse": true,
			"aaSorting": [[5,'desc'],[6,'desc']],
			"sDom":'<"#ip_bar_left.pagebar-left col-sm-7"f><"#ip_bar_right.pagebar-right col-sm-5" ip>',
			"aoColumns" : [
	           {
	        	   "sTitle":"alias",
	        	   "mData":"alias",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
	    		   "sTitle":"fromIP",
	    		   "mData":"fromIP",
	    		   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
			   },
	           {
				   "sTitle":"toIP",
				   "mData":"toIP",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	           {
				   "sTitle":"answerTime",
				   "mData":"answerTime",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	           },
	    	   {
	        	   "sTitle":"duration",
	        	   "mData":"duration",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false
	    	   },
	    	   {
				   "sTitle":"endTime",
				   "mData":"endTime",
				   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": true
	           },
	    	   {
	        	   "sTitle":"startTime",
	        	   "mData":"startTime",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": true
	    	   },
	    	   {
	    		   "sTitle":"action",
	        	   "sDefaultContent" : "",  
	               "sClass" : "center",
	               "bSortable": false   
	    	   }
			 ],
			 "oLanguage":{
				 "sZeroRecords" : $.i18n.prop('ShowUserManagement.table.NoData'), 
				 "sInfo" : $.i18n.prop('DataTable.info',"_PAGE_","_PAGES_"),
				 "sLengthMenu": $.i18n.prop('DataTable.lengthMenu',"_MENU_"),
				 "oPaginate" : {
					 "sFirst": $.i18n.prop('RecoverFile.label.First'),
					 "sPrevious" : $.i18n.prop('RecoverFile.label.Back'),
					 "sNext" : $.i18n.prop('RecoverFile.label.Next'),
					 "sLast" : $.i18n.prop('RecoverFile.label.Last')
				 },
				 "sSearch" : $.i18n.prop('DataTable.search'),
				 "sInfoFiltered":"",
				 "sInfoEmpty": $.i18n.prop('ShowUserManagement.table.NoData')
			 },
			 "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
		    
				 var indexOfArr =0;
				 indexOfArr= this.fnGetNodes().indexOf(nRow);
				 var result_subject_html = '<label><a href="#" onclick="showVoipDetail('+indexOfArr+')">'+ $.i18n.prop("DateTable.showDetail")+'</a></label>';
				 $('td:eq(7)', nRow).html(result_subject_html);
			 }
		};
		return opts;
}

function showVoipDetail(num){
	voipCurrentIdx = num+1;
	myConsoleLog(log_showVoipDetail_flag, voipCurrentIdx);
	createVoipPages(voipCurrentIdx);
}

function createVoipPages(num){
	var totalNumber = voipDetailList.fnGetNodes().length;
	myConsoleLog(log_showVoipDetail_flag,"currentnum "+num);
	
	$(".voipPagination").pagy("page", num, totalNumber);
	createVoipPageNatePage(num);
	var nodes = voipDetailList.fnGetNodes();
	var position = voipDetailList.fnGetPosition(nodes[num-1]);
	var result = voipDetailList.fnGetData(position);
	getVoipFile(result.filePath, fillData ,function(){
		 $("#showVoipDetail").modal("show");
	});
}
function createVoipPageNatePage(page){
	myConsoleLog(log_showVoipDetail_flag,"currentnum "+page)
	var nodes = voipDetailList.fnGetNodes();
	var position = voipDetailList.fnGetPosition(nodes[page-1]);
	var result = voipDetailList.fnGetData(position);
	$("#account").text(result.account);
	$("#alias").text(result.alias);
	$("#answerTime").text(result.answerTime);
	$("#protocol").text(result.protocol);
	$("#duration").text(result.duration);
	$("#fromIP").text(result.fromIP);
	$("#toIP").text(result.toIP);
	$("#startTime").text(result.startTime);
	$("#endTime").text(result.endTime);
//	getVoipFile(result.filePath, function(){
//		 $("#showVoipDetail").modal("show");
//	});
}

function putVoipDetailData(data){
	voipDetailList.fnClearTable();
	if(data.length > 0){
		voipDetailList.fnAddData(data);
	}
}

function search_Voip_Content(columnNo,myValue){
	//var regExSearch = '^\\s' + myValue +'\\s*$';
	myConsoleLog(log_showVoipDetail_flag,columnNo+":" + myValue);
	voipDetailList.api().columns(pre_Voip_index).search("").draw();
	voipDetailList.api().columns(columnNo).search(myValue).draw();
}

function getVoipFile(filepath , callback, callback1){
	myConsoleLog(log_showVoipDetail_flag, filepath);
	$.ajax({
		url: '/mytest/getVoipDetailFile',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({'filepath':filepath,'protocol':9}),
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showVoipDetail_flag,data);
			var fromFileName ="" + data.fromFileName;
			var temp = fromFileName.replace('\\\\','//');
			console.log(temp.replace("\\",'/'));
			console.log("file:"+fromFileName.replace('\\\\','//'));
			var toFileName ="" + data.toFileName;
			console.log(toFileName.replace('\\\\','//'));
			console.log("file:"+toFileName.replace('\\\\','//'));
			console.log("codec: "+ data.codec);
			var dataList = [fromFileName, toFileName];
//			$("#fromFileName").attr("src","file:"+temp).detach().appendTo("#fromFileName1");
//			$("#fromFileName").src = readMedia("file:"+temp);
//			$("#fromFileName").src = readMedia(fromFileName);
//			$("#fromFileName").prop("data-info-att",data.fromSrcName);
//			$("#toFileName").attr("src","file:"+toFileName.replace('\\\\','//')).detach().appendTo("#toFileName1");
			//$("#toFileName").prop("data-info-att",data.toSrcName);
			callback(dataList, callback1);
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showVoipDetail_flag,xhr.status);
			myConsoleLog(log_showVoipDetail_flag,thrownError);
			myConsoleLog(log_showVoipDetail_flag,ajaxOptions);
		}
	});
}

function fillData(voipDataKeyList, callback){
	myConsoleLog(log_showVoipDetail_flag, voipDataKeyList);
	$.ajax({
		url: '/mytest/getVoipDetailFileData',
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify({'voipDataKeyList':voipDataKeyList}),
		contentType:'application/json;charset=UTF-8',
		success: function(data){
			myConsoleLog(log_showVoipDetail_flag,data);
			var fileList = [];
			for(var i = 0 ; i < data.audioDataList.length; i++){
				myConsoleLog(log_showVoipDetail_flag,data.audioDataList[i].data.length);
				//var result = parseToBytes(data.audioDataList[i].data);
				
//				console.log(result);
				//myConsoleLog(log_showVoipDetail_flag,data.audioDataList[i].data);
//				console.log(file);
//				fileList.push(file);
				var result = parseToBytes(data.audioDataList[i].data);
				console.log('file parse finished');
				var file = new File(result,data.audioDataList[i].filename);
				var fileReader = new FileReader();
				fileReader.readAsArrayBuffer(file);
				fileReader.onload = function(event){
					//console.log(result);
					processConcatenatedFile(event.target.result);
				};
				
			}
//			$("#fromFileName").attr("src","file:"+temp).detach().appendTo("#fromFileName1");
//			$("#fromFileName").src = data.audioDataList[0].data;
//			$("#fromFileName").src = readMedia(fromFileName);
//			$("#fromFileName").prop("data-info-att",data.fromSrcName);
//			$("#toFileName").attr("src","file:"+toFileName.replace('\\\\','//')).detach().appendTo("#toFileName1");
			//$("#toFileName").prop("data-info-att",data.toSrcName);
			callback();
		},
		error: function(xhr, ajaxOptions, thrownError){
			myConsoleLog(log_showVoipDetail_flag,xhr.status);
			myConsoleLog(log_showVoipDetail_flag,thrownError);
			myConsoleLog(log_showVoipDetail_flag,ajaxOptions);
		}
	});
}

function parseToBytes(str){
	console.log('parse Start')
	var bytes = new Int8Array(str.length);
	for(var i =0; i < str.length; i++){
		//console.log(str.charAt(i));
		var code = str.charCodeAt(i);
		//console.log(code);
		bytes[i]= code&0xff;
		//console.log(bytes);
	}
	return bytes;
}

function saveTextAsFile(data,writeOut)
{
   
    var textToSaveAsBlob = new Blob([data], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = writeOut+".txt";
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function getArrayBuffer(data){
	var arrBf = new ArrayBuffer(data);
	return arrBf;
}
/*
Runs through the loaded array buffer and 
extract each individual chunk that contains
each original sound file buffer.
*/

function processConcatenatedFile( data ) {
    console.log("antest");
    console.log("bb")
	var bb = new DataView( data );
	var offset = 0;
	console.log(bb);
	while( offset < bb.byteLength ) {
	    console.log(bb);
	    var length = bb.getUint32( offset, true );
	    console.log(length);
	    offset += 4;
	    var sound = extractBuffer( data, offset, length );
	    offset += length;
	
	    createSoundWithBuffer( sound.buffer );
	
	}

}
/*
Create a new buffer to store the compressed sound
buffer from the concatenated buffer.
*/

function extractBuffer( src, offset, length ) {
    console.log('test');
	var dstU8 = new Uint8Array( length );
	var srcU8 = new Uint8Array( src, offset, length );
	dstU8.set( srcU8 );
	return dstU8;

}

/*
Uses Web Audio API decodeAudioData() to decode
the extracted buffer.
*/

function createSoundWithBuffer( buffer ) {

	/*
	    This audio context is unprefixed! 
	*/
	var context = new AudioContext();
	
	var audioSource = context.createBufferSource();
	audioSource.connect( context.destination );
	
	context.decodeAudioData( buffer, function( res ) {
		console.log("buffer");
		console.log(res);
	    console.log(buffer);
	    audioSource.buffer = res;
	
	    /* 
	       Do something with the sound, for instance, play it.
	       Watch out: all the sounds will sound at the same time!
	    */
	    audioSource.noteOn( 0 );
	
	} );
}