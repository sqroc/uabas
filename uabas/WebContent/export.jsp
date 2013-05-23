<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="header.jsp"></jsp:include>
<div id="content" class="span10">
<div>
				<ul class="breadcrumb">
					<li>
						<a href="#">Home</a> <span class="divider">/</span>
					</li>
					<li>
						<a href="#">导出数据</a>
					</li>
				</ul>
			</div>
<a href="exportbrowser" class="btn btn-large"><i class="icon-download-alt"></i> 浏览器统计数据导出</a>
<a href="exportos" class="btn btn-large"><i class="icon-download-alt"></i> 操作系统统计数据导出</a>

<jsp:include page="footer.jsp"></jsp:include>