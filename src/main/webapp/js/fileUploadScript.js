var button_count = 1;
$(document).ready(function() {
    //button_count = 1;
	var options = {
		beforeSend : function() {
			$("#progressbox").show();
			// clear everything
			$("#progressbar").width('0%');
			$("#message").empty();
			$("#percent").html("0%");
		},
		uploadProgress : function(event, position, total, percentComplete) {
			$("#progressbar").width(percentComplete + '%');
			$("#percent").html(percentComplete + '%');
	
			// change message text and % to red after 50%
			if (percentComplete > 50) {
				$("#message").html("<font color='red'>File Upload is in progress .. </font>");
			}
		},
		success : function() {
			$("#progressbar").width('100%');
			$("#percent").html('100%');
		},
		complete : function(response) {
			console.log(response.responseText);
			if(response.responseText==''){
				$("#message").html("<font color='blue'>Your file has been uploaded!</font>");
			}
			else {
				$("#message").html("<font color='red'>"+response.responseText+"</font>");
			}
		},
		error : function() {
			$("#message").html("<font color='red'> ERROR: unable to upload files</font>");
		}
	};
	$("#myfile").val("");
	$("#sendUpload").css("display","none");
	$("#UploadForm").ajaxForm(options);
	$("#myfile").on("change",function(){
		console.log('file change');
		$("#progressbar").width('0%');
		$("#message").empty();
		$("#percent").html("0%");
		var fileArray = this.files;
		if(this.files[0]){
			var fileSize = 0;
			console.log(fileArray);
			console.log((typeof fileArray));
			for(var i = 0; i < fileArray.length ; i++){
				fileSize += fileArray[i].size/1000;
			}
//			fileArray.forEach(function(file){
//			   fileSize += file.size/1000;
//			});
			$("#filesize").html(fileSize.toFixed(3) +"KB");
			$("#sendUpload").css("display","inline");
		}
		else{
			$("#filesize").html("0KB");
			$("#sendUpload").css("display","none");
		}
	});
	$("#rm_btn").css("display","none");
	$("#addfile").on('click',function(){
		var result_btn_count = button_count;
		var append_btn_html ='<div id="btn_'+button_count+'">'+
							 '<input type="file" size="60" id="myfile'+button_count+'" name="file" multiple>'+
		     			     '<div id="respsonse"><label>'+$.i18n.prop('tactical.label.file.totalFileSize')+'</label><span id="filesize'+button_count+'"></span></div>'+
		     			     '</div>';
		$("#append_input").append(append_btn_html);
		
		button_count++;
	    if(button_count > 1){
	    	$("#rm_btn").css("display","inline");
	    }
	    else{
	    	$("#rm_btn").css("display","none");
	    }

	    var current_btn1 = button_count - 1;
		$("#myfile"+current_btn1).on("change",function(){
			console.log('file change');
		
			if(this.files[0]){
				var fileSize = 0;
				for(var i = 0 ; i < this.files.length; i ++){
					fileSize += this.files[i].size/1000;
				}
				$("#filesize"+current_btn1).html(fileSize.toFixed(3) +"KB");
			}
			else{
				$("#filesize"+current_btn1).html("0KB");
			}
		});
	});
	
	$("#btn_rm_input").bind('click', function() {
		var current_btn = button_count - 1;
		console.log(current_btn);
		$("#btn_" + current_btn).remove();
		button_count--;
		if (button_count > 1) {
			$("#rm_btn").css("display", "inline");
		} else {
			$("#rm_btn").css("display", "none");
		}
	});
});