<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<jsp:include page="header.jsp"></jsp:include>
			
			<div id="content" class="span10">
			<!-- content starts -->

			<div>
				<ul class="breadcrumb">
					<li>
						<a href="#">Home</a> <span class="divider">/</span>
					</li>
					<li>
						<a href="#">用户管理</a>
					</li>
				</ul>
			</div>
			
			<div class="row-fluid sortable">
				<div class="box span12">
					<div class="box-header well" data-original-title>
						<h2><i class="icon-edit"></i> 添加用户</h2>
						<div class="box-icon">
							<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>
							 <a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<form class="form-horizontal">
						  <fieldset>
							<div class="control-group">
							  <label class="control-label">用户名</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="name" id="name" type="text"/>
							  </div>
							</div>
							<div class="control-group">
							  <label class="control-label">密码</label>
							  <div class="controls">
								<input type="password" class="input-xlarge" name="password" id="password" type="text"/>
							  </div>
							</div>

							<div class="control-group">
								<label class="control-label">性别</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="sex" id="optionsRadios1" value="男" checked="checked">
									男 
									</label>
									<div style="clear:both"></div>
									<label class="radio">
									<input type="radio" name="sex" id="optionsRadios2" value="女">
									女
								  </label>
								</div>
							  </div>         
							<div class="control-group">
							  <label class="control-label">Email</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="email" id="email" type="text"/>
							  </div>
							</div>
							<div class="form-actions">
							<input id="btn-adduser" type="button" class="btn btn-primary"  value="提交">
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
						<h2><i class="icon-user"></i> 用户列表</h2>
						<div class="box-icon">
							<a href="#" class="btn btn-minimize btn-round"><i class="icon-chevron-up"></i></a>
							<a href="#" class="btn btn-close btn-round"><i class="icon-remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<table id="userdatatable" class="table table-striped table-bordered bootstrap-datatable datatable1">
						  <thead>
							  <tr>
							      <th>ID号</th>
								  <th>用户名</th>
								  <th>性别</th>
								  <th>Email</th>
								  <th>操作</th>
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
		
		<div class="modal hide fade" id="edituserModel">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>修改用户</h3>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
						  <fieldset>
							<div class="control-group">
							  <label class="control-label">用户名</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="name" id="name2" type="text"/>
							  </div>
							</div>
							<div class="control-group">
							  <label class="control-label">密码</label>
							  <div class="controls">
								<input type="password" class="input-xlarge" name="password" id="password" type="text"/>
							  </div>
							</div>

							<div class="control-group">
								<label class="control-label">性别</label>
								<div class="controls">
								<label class="radio">
									<input type="radio" name="gender" id="optionsRadios11" value="男">
									男 
									</label>
									<div style="clear:both"></div>
									<label class="radio">
									<input type="radio" name="gender" id="optionsRadios22" value="女">
									女
								  </label>
								</div>
							  </div>         
							<div class="control-group">
							  <label class="control-label">Email</label>
							  <div class="controls">
								<input autofocus class="input-xlarge" name="email" id="email2" type="text"/>
							  </div>
							</div>
							<input name="aid" id="aid" type="hidden" value=""/>
							<div class="form-actions">
							<input id="btn-edituser" type="button" class="btn btn-primary"  value="提交">
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
		
		<div class="modal hide fade" id="deleteuserModel">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h3>删除用户</h3>
			</div>
			<div class="modal-body">
				<strong>请确认删除该用户？</strong>
				<input name="aiddelete" id="aiddelete" type="hidden" value=""/>
			</div>
			<div class="modal-footer">
				<a href="#" class="btn" data-dismiss="modal">取消</a>
				<a href="#" class="btn btn-primary" id="btn-deleteusers">确认删除</a>
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
