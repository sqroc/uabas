//编辑用户
function useredit(e){
	//alert($(e).attr('id'));
	$('#edituserModel').modal('show');
	$.post("admin!loadByAid.action", {
		"aid" : $(e).attr('id')
	}, function(data) {
		$("#name2").val(data.aaData[0].name);
		$("#aid").val(data.aaData[0].aid);
		$("#optionsRadios11").attr("checked",false);
		$("#optionsRadios22").attr("checked",false);
		if(data.aaData[0].gender == '女'){
			$("#uniform-optionsRadios11>span").attr("class","");
			$("#uniform-optionsRadios22>span").attr("class","checked");
			$("#uniform-optionsRadios11").attr("class","radio");
			$("#uniform-optionsRadios22").attr("class","radio focus");
			$("#optionsRadios22").attr("checked",true);
		}else{
			$("#uniform-optionsRadios22>span").attr("class","");
			$("#uniform-optionsRadios11>span").attr("class","checked");
			$("#uniform-optionsRadios22").attr("class","radio");
			$("#uniform-optionsRadios11").attr("class","radio focus");
			$("#optionsRadios11").attr("checked",true);
		}
		$("#email2").val(data.aaData[0].email);
	}, "json");
	
}

$('#btn-edituser').click(function() {
	var gender = '男';
	if($("#uniform-optionsRadios22>span").attr("class") == 'checked'){
		gender = '女';
	}
	$.post("admin!modify.action", {
		"aid" : $("#aid").val(),
		"name" : $("#name2").val(),
		"password" : $("#password2").val(),
		"gender" : gender,
		"email" : $("#email2").val()
	}, function(data) {
		$('#edituserModel').modal('hide');
		if(data.success == true){
			$('#adduserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});

//删除用户
function userdelete(e){
	$('#deleteuserModel').modal('show');
	$("#aiddelete").val($(e).attr('id'));
}
$('#btn-deleteusers').click(function() {
	$.post("admin!deleteByid.action", {
		"aid" : $("#aiddelete").val()
	}, function(data) {
		$('#deleteuserModel').modal('hide');
		if(data.success == true){
			$('#deleteuserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});

//用户管理
$('#userdatatable')
		.dataTable(
				{
					"bProcessing" : true,
					"bServerSide" : true,
					"sAjaxSource" : "admin!getAllAdmins.action",
					"aoColumns" : [ {
						"mDataProp" : "aid"
					}, {
						"mDataProp" : "name"
					}, {
						"mDataProp" : "gender"
					}, {
						"mDataProp" : "email"
					},{
						"mDataProp" : null,
		                "sClass": "center",
		                "fnRender": function(obj) {
		                    var aid= obj.aData["aid"];
		                    var sReturn = '<a class="btn btn-info useredit" href="#" onclick="useredit(this)" id="'+aid+'"><i class="icon-edit icon-white"></i>编辑</a>'+
						'<a class="btn btn-danger userdelete" href="#" onclick="userdelete(this)" id="'+aid+'"><i class="icon-trash icon-white"></i>删除</a>'; 
		                    return sReturn;
		                }
		               // "sDefaultContent": '<a href="" class="editor_edit">Edit</a> / <a href="" class="editor_remove">Delete</a>'
					}],
					"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
					"sPaginationType" : "bootstrap",
					"oLanguage" : {
						"sLengthMenu" : "_MENU_ records per page"
					}
				});
//添加用户
$('#btn-adduser').click(function() {
	$.post("admin!add.action", {
		"name" : $("#name").val(),
		"password" : $("#password").val(),
		"gender" : $("input[@name=sex]:checked").val(),
		"email" : $("#email").val()
	}, function(data) {
		if(data.success == true){
			$('#adduserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});



