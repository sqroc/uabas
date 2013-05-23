$('#btn-login').click(function() {
	//提交用户名和密码
	$.post("login.action", {
		"name" : $("#username").val(),
		"password" : $("#password").val()
	}, function(data) {
		//接收返回的结果
		if(data.success == true){
			//成功则跳转到后台主界面
			window.location.href='index.jsp';
		}else{
			//失败则弹出错误提示框
			$('#loginModal').modal('show');
		}
	}, "json");
});
