<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:include page="header.jsp"></jsp:include>
			
			<div id="content" class="span10">
			<!-- content starts -->
			

			<div>
				<ul class="breadcrumb">
					<li>
						<a href="#">Home</a> <span class="divider">/</span>
					</li>
					<li>
						<a href="#">后台主页</a>
					</li>
				</ul>
			</div>
			<div class="sortable row-fluid">
				<a data-rel="tooltip"  class="well span3 top-block" href="user.jsp">
					<span class="icon32 icon-red icon-user"></span>
					<div>后台管理员</div>
					<div id="adminnum">23</div>
					
				</a>

				<a data-rel="tooltip"  class="well span3 top-block" href="website.jsp">
					<span class="icon32 icon-color icon-star-on"></span>
					<div>网站数量</div>
					<div id="websitenum">2</div>
					
				</a>

				<a data-rel="tooltip"  class="well span3 top-block" href="record.jsp">
					<span class="icon32 icon-color icon-flag"></span>
					<div>数据量</div>
					<div id="recordnum">320</div>
					
				</a>
				
				<a data-rel="tooltip"  class="well span3 top-block" href="export.jsp">
					<span class="icon32 icon-color icon-attachment"></span>
					<div>数据导出</div>
				    <div>--</div>
				</a>
			</div>
			
			<div class="row-fluid">
				<div class="box span12">
					<div class="box-header well">
						<h2><i class="icon-info-sign"></i> 提示</h2>
						<div class="box-icon">
							<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>
							<a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<h3>用户访问行为分析系统</h3>
						<br>
						<p><b>
						系统分为用户管理、网站管理、基本数据统计和图形展示、鼠标路径的记录以及数据导出等功能。
						</b></p>
						<p>欢迎使用。</p>
						
						
						
					
						<div class="clearfix"></div>
					</div>
				</div>
			</div>
					
			
		
<jsp:include page="footer.jsp"></jsp:include>
<script src="js/index.js"></script>
	
