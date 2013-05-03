//==============用户管理模块==================
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
					"bProcessing" : false,
					"bServerSide" : true,
					"bPaginate": false, // 是否使用分页
					"iDisplayLength": 10, //默认每页显示的记录数
					"bLengthChange": true, //是否启用设置每页显示记录数
					"bFilter": false, //是否使用搜索
					"bSort": false, //是否使用排序 
					"sAjaxSource" : "admin!getAllAdmins.action?rand="+Math.random(),
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

//==============网站管理模块==================

//编辑网站
function websiteedit(e){
	//alert($(e).attr('id'));
	$('#editwebsiteModel').modal('show');
	$.post("website!loadByAid.action", {
		"id" : $(e).attr('id')
	}, function(data) {
		$("#name2").val(data.aaData[0].name);
		$("#aid").val(data.aaData[0].id);
		$("#url2").val(data.aaData[0].url);
		$("#description2").val(data.aaData[0].description);
	}, "json");
	
}

$('#btn-editwebsite').click(function() {
	$.post("website!modify.action", {
		"id" : $("#aid").val(),
		"name" : $("#name2").val(),
		"url" : $("#url2").val(),
		"description" : $("#description2").val()
	}, function(data) {
		$('#editwebsiteModel').modal('hide');
		if(data.success == true){
			$('#adduserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});

//删除网站
function websitedelete(e){
	$('#deletewebsiteModel').modal('show');
	$("#aiddelete").val($(e).attr('id'));
}
$('#btn-deletewebsites').click(function() {
	$.post("website!deleteByid.action", {
		"id" : $("#aiddelete").val()
	}, function(data) {
		$('#deletewebsiteModel').modal('hide');
		if(data.success == true){
			$('#deleteuserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});


//获取网站代码
function websitecode(e){
	//alert($(e).attr('id'));
	$('#websitecodeModel').modal('show');
	/*$.post("website!loadByAid.action", {
		"id" : $(e).attr('id')
	}, function(data) {
		$("#name2").val(data.aaData[0].name);
		$("#aid").val(data.aaData[0].id);
		$("#url2").val(data.aaData[0].url);
		$("#description2").val(data.aaData[0].description);
	}, "json");*/
	
}

//添加网站
$('#btn-addwebsite').click(function() {
	$.post("website!add.action", {
		"name" : $("#name").val(),
		"url" : $("#url").val(),
		"description" : $("#description").val()
	}, function(data) {
		if(data.success == true){
			$('#adduserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});

//网站管理
$('#websitedatatable')
		.dataTable(
				{
					"bProcessing" : false,
					"bServerSide" : true,
					"bPaginate": false, // 是否使用分页
					"iDisplayLength": 10, //默认每页显示的记录数
					"bLengthChange": true, //是否启用设置每页显示记录数
					"bFilter": false, //是否使用搜索
					"bSort": false, //是否使用排序 
					"sAjaxSource" : "website!getAllWebsites.action?rand="+Math.random(),
					"aoColumns" : [ {
						"mDataProp" : "id"
					}, {
						"mDataProp" : "name"
					}, {
						"mDataProp" : "url"
					}, {
						"mDataProp" : "description"
					},{
						"mDataProp" : null,
		                "sClass": "center",
		                "fnRender": function(obj) {
		                    var aid= obj.aData["id"];
		                    var sReturn = '<a class="btn btn-success useredit" href="#" onclick="websitecode(this)" id="'+aid+'"><i class="icon-zoom-in icon-white"></i>获取代码</a>'+
		                    	'<a class="btn btn-info useredit" href="#" onclick="websiteedit(this)" id="'+aid+'"><i class="icon-edit icon-white"></i>编辑</a>'+
						'<a class="btn btn-danger userdelete" href="#" onclick="websitedelete(this)" id="'+aid+'"><i class="icon-trash icon-white"></i>删除</a>'; 
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


//======================基本数据的图表模块========================
//网站浏览量与访问量数据
if($("#webvisits").length)
{
	var visits = [], pages = [];

	visits.push([1,11]);pages.push([1,80]);
	visits.push([2,56]);pages.push([2,130]);
	visits.push([3,100]);pages.push([3,300]);
	visits.push([4,25]);pages.push([4,180]);
	visits.push([5,99]);pages.push([5,280]);
	visits.push([6,38]);pages.push([6,80]);
	visits.push([7,56]);pages.push([7,69]);
	visits.push([8,50]);pages.push([8,55]);
	visits.push([9,55]);pages.push([9,68]);
	visits.push([10,22]);pages.push([10,40]);
	visits.push([11,37]);pages.push([11,50]);
	visits.push([12,80]);pages.push([12,139]);
	visits.push([13,25]);pages.push([13,50]);
	visits.push([14,39]);pages.push([14,78]);
	visits.push([15,55]);pages.push([15,111]);
	/*for (var i = 0; i < 14; i += 0.5) {
		sin.push([i, Math.sin(i)/i]);
		cos.push([i, Math.cos(i)]);
	}*/

	var plot = $.plot($("#webvisits"),
		   [ { data: visits, label: "网站访问量"}, { data: pages, label: "网站浏览量" } ], {
			   series: {
				   lines: { show: true  },
				   points: { show: true }
			   },
			   grid: { hoverable: true, clickable: true, backgroundColor: { colors: ["#fff", "#eee"] } },
			   xaxis: { min: 1, max: 15},
			   yaxis: { min: 0, max: 350 },
			   colors: ["#539F2E", "#3C67A5"]
			 });

	function showTooltip(x, y, contents) {
		$('<div id="tooltip">' + contents + '</div>').css( {
			position: 'absolute',
			display: 'none',
			top: y + 5,
			left: x + 5,
			border: '1px solid #fdd',
			padding: '2px',
			'background-color': '#dfeffc',
			opacity: 0.80
		}).appendTo("body").fadeIn(200);
	}

	var previousPoint = null;
	$("#webvisits").bind("plothover", function (event, pos, item) {
		$("#x").text(pos.x.toFixed(2));
		$("#y").text(pos.y.toFixed(2));

			if (item) {
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;

					$("#tooltip").remove();
					var x = item.datapoint[0],
						y = item.datapoint[1];

					showTooltip(item.pageX, item.pageY,
							"本月"+x+"号的" +item.series.label + "为" +y);
				}
			}
			else {
				$("#tooltip").remove();
				previousPoint = null;
			}
	});
	


	$("#webvisits").bind("plotclick", function (event, pos, item) {
		if (item) {
			$("#clickdata").text("本月"+item.datapoint[0]+"号的" +item.series.label + "为" +item.datapoint[1]);
			plot.highlight(item.series, item.datapoint);
		}
	});
}


//浏览器统计
var data = [
{ label: "Internet Explorer",  data: 12},
{ label: "Mobile",  data: 27},
{ label: "Safari",  data: 85},
{ label: "Opera",  data: 64},
{ label: "Firefox",  data: 90},
{ label: "Chrome",  data: 112}
];

if($("#browserpiechart").length)
{
	$.plot($("#browserpiechart"), data,
	{
		series: {
				pie: {
						show: true
				}
		},
		grid: {
				hoverable: true,
				clickable: true
		},
		legend: {
			show: false
		}
	});
	
	function pieHover(event, pos, obj)
	{
		if (!obj)
				return;
		percent = parseFloat(obj.series.percent).toFixed(2);
		$("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
	}
	$("#piechart").bind("plothover", pieHover);
}

//操作系统统计
var data2 = [
{ label: "Win7",  data: 90},
{ label: "WindowsXP",  data: 70},
{ label: "Linux",  data: 20},
{ label: "MAC",  data: 20}
];
if($("#OSdonutchart").length)
{
	$.plot($("#OSdonutchart"), data2,
	{
			series: {
					pie: {
							innerRadius: 0.5,
							show: true
					}
			},
			legend: {
				show: false
			}
	});
}


//==============鼠标路径记录模块==================


//删除记录
function recorddelete(e){
	$('#deletewebsiteModel').modal('show');
	$("#aiddelete").val($(e).attr('id'));
}
$('#btn-deletewebsites').click(function() {
	$.post("website!deleteByid.action", {
		"id" : $("#aiddelete").val()
	}, function(data) {
		$('#deletewebsiteModel').modal('hide');
		if(data.success == true){
			$('#deleteuserSuccessModal').modal('show');
		}else{
			$('#adduserErrorModal').modal('show');
		}
	}, "json");
});


//跳转至鼠标移动路径图页面
function showmousedraw(e){
	//alert($(e).attr('id'));
	window.location.href='draw.jsp';
}


//鼠标记录
$('#recorddatatable')
		.dataTable(
				{
					"bProcessing" : false,
					"bServerSide" : true,
					"bPaginate": false, // 是否使用分页
					"iDisplayLength": 10, //默认每页显示的记录数
					"bLengthChange": true, //是否启用设置每页显示记录数
					"bFilter": false, //是否使用搜索
					"bSort": false, //是否使用排序 
					"sAjaxSource" : "website!getAllWebsites.action?rand="+Math.random(),
					"aoColumns" : [ {
						"mDataProp" : "id"
					}, {
						"mDataProp" : "name"
					}, {
						"mDataProp" : "url"
					}, {
						"mDataProp" : "description"
					},{
						"mDataProp" : null,
		                "sClass": "center",
		                "fnRender": function(obj) {
		                    var aid= obj.aData["id"];
		                    var sReturn = '<a class="btn btn-success useredit" href="#" onclick="showmousedraw(this)" id="'+aid+'"><i class="icon-zoom-in icon-white"></i>查看路径图</a>'+
						'<a class="btn btn-danger userdelete" href="#" onclick="recorddelete(this)" id="'+aid+'"><i class="icon-trash icon-white"></i>删除记录</a>'; 
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
