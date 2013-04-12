$('#btn-login').click(function() {
	$.post("login.action", {
		"name" : $("#username").val(),
		"password" : $("#password").val()
	}, function(data) {
		if(data.success == true){
			window.location.href='index.jsp';
		}else{
			alert("帐号或密码错误！");
		}
	}, "json");
});
