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
						<a href="#">网站管理</a>
					</li>
				</ul>
			</div>
			
			<div class="row-fluid sortable">
				<div class="box span12">
					<div class="box-header well" data-original-title>
						<h2><i class="icon-edit"></i> 添加网站</h2>
						<div class="box-icon">
							<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>
							 <a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<form class="form-horizontal">
						  <fieldset>
							<div class="control-group">
							  <label class="control-label">网站名称</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="name" id="name" type="text"/>
							  </div>
							</div>
							<div class="control-group">
							  <label class="control-label">网站URL</label>
							  <div class="controls">
								<input class="input-xlarge" name="url" id="url" type="text"/>
							  </div>
							</div>
   
							<div class="control-group">
							  <label class="control-label">网站描述</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="description" id="description" type="text"/>
							  </div>
							</div>
							<div class="form-actions">
							<input id="btn-addwebsite" type="button" class="btn btn-primary"  value="提交">
							 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							  <button type="reset" class="btn">清空</button>
							</div>
						  </fieldset>
						</form>   

					</div>
				</div><!--/span-->

			</div><!--/row-->


			<div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header well" data-original-title>
						<h2><i class="icon-user"></i> 网站列表</h2>
						<div class="box-icon">
							<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>
							<a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<table id="websitedatatable" class="table table-striped table-bordered bootstrap-datatable datatable1">
						  <thead>
							  <tr>
							      <th>网站ID</th>
								  <th>网站名称</th>
								  <th>网站URL</th>
								  <th>网站描述</th>
								  <th>操作与获取代码</th>
							  </tr>
						  </thead>   
						  <tbody>
							
						  </tbody>
					  </table>            
					</div>
				</div><!--/span-->
			
			</div><!--/row-->
    
					<!-- content ends -->
			</div><!--/#content.span10-->
				</div><!--/fluid-row-->
				
		<hr>

		<div class="modal hide fade" id="myModal">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>Settings</h3>
			</div>
			<div class="modal-body">
				<p>Here settings can be configured...</p>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal">Close</a>
				<a href="#" class="btn btn-primary">Save changes</a>
			</div>
		</div>
		
		<div class="modal hide fade" id="editwebsiteModel">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>修改网站信息</h3>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
						  <fieldset>
							<div class="control-group">
							  <label class="control-label">网站名称</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="name2" id="name2" type="text"/>
							  </div>
							</div>
							<div class="control-group">
							  <label class="control-label">网站URL</label>
							  <div class="controls">
								<input class="input-xlarge" name="url2" id="url2" type="text"/>
							  </div>
							</div>
   
							<div class="control-group">
							  <label class="control-label">网站描述</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="description2" id="description2" type="text"/>
							  </div>
							</div>
							<input name="aid" id="aid" type="hidden" value=""/>
							<div class="form-actions">
							<input id="btn-editwebsite" type="button" class="btn btn-primary"  value="提交">
							 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							  <button type="reset" class="btn">清空</button>
							</div>
						  </fieldset>
						</form>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal">返回</a>
				<!--  <a href="#" class="btn btn-primary">保存</a>-->
			</div>
		</div>
		
		<div class="modal hide fade" id="deletewebsiteModel">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>删除网站</h3>
			</div>
			<div class="modal-body">
				<strong>请确认删除该网站信息？</strong>
				<input name="aiddelete" id="aiddelete" type="hidden" value=""/>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal">取消</a>
				<a href="#" class="btn btn-primary" id="btn-deletewebsites">确认删除</a>
			</div>
		</div>
		
		<div class="modal hide fade" id="websitecodeModel">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>网站代码</h3>
			</div>
			<div class="modal-body">
				<strong>请将下列代码复制粘贴到所需统计的网站页面中</strong><br>
				<textarea rows="10" style="width: 500px;"><script type="text/javascript" src="core/js/smt-aux.min.js"></script>  
<script type="text/javascript" src="core/js/smt-record.min.js"></script>
<script type="text/javascript">
  try {
    smt2.record({
      recTime: 300,
      disabled: Math.round(Math.random()),
      warn: true, 
      warnText: "We are going to record your mouse movements for a remote usability study."
    });
  } catch(err) {}
  </script>
				</textarea>
			</div>
			
		</div>
		
		<div class="modal hide fade alert alert-error alerttab" id="adduserErrorModal">
				<button type="button" class="close" data-dismiss="alert">×</button>
				<strong>数据提交时发生错误！</strong> 请重新输入.
			</div>
		
		<div class="modal hide fade alert alert-success alerttab" id="adduserSuccessModal">
				<button type="button" class="close" data-dismiss="alert">×</button>
				<strong>提交成功！</strong> 
			</div>
		<div class="modal hide fade alert alert-success alerttab" id="deleteuserSuccessModal">
				<button type="button" class="close" data-dismiss="alert">×</button>
				<strong>删除成功！</strong> 
			</div>

<jsp:include page="footer.jsp"></jsp:include>