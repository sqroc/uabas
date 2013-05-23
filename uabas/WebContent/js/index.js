$.post("getnum.action", {

}, function(data) {
	$("#adminnum").html(data.numMessage.peoplenum);
	$("#websitenum").html(data.numMessage.websitenum);
	$("#recordnum").html(data.numMessage.recordnum);
}, "json");