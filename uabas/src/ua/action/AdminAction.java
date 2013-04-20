package ua.action;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

import ua.model.Admin;
import ua.service.AdminManager;

@ParentPackage("json-default")
@Namespace("")
@Controller("Admin")
@Results(

{ @Result(type = "json") })
public class AdminAction extends ActionSupport implements ModelDriven {

	private List<Admin> aaData;
	private String iTotalDisplayRecords;
	private String iTotalRecords;
	private int sEcho;
	private boolean success = false;
	private Admin admin = new Admin();
	private AdminManager adminManager;
	private Admin adminEdit = new Admin();

	@JSON(serialize = false)
	public String getAllAdmins() throws Exception {
		aaData = adminManager.getAllAdmins();
		this.sEcho = 1;
		this.iTotalRecords = adminManager.getTotalNum()+"";
		this.iTotalDisplayRecords =  adminManager.getTotalNum()+"";
		
		return SUCCESS;
	}
	
	public String add() throws Exception {
		adminManager.add(admin);
		this.success = true;
		
		return SUCCESS;

	}
	
	public String deleteByid() {
		try {
			adminManager.deleletByid(admin.getAid());
			this.success = true;
		} catch (Exception e) {
			this.success = false;
		}
		return SUCCESS;
	}
	
	public String loadByAid() throws Exception {
		aaData = new ArrayList<Admin>();
	    adminEdit =  adminManager.loadById(admin.getAid());
	    Admin adminEdit2 = new Admin();
	    adminEdit2.setAid(adminEdit.getAid());
	    adminEdit2.setEmail(adminEdit.getEmail());
	    adminEdit2.setGender(adminEdit.getGender());
	    adminEdit2.setName(adminEdit.getName());
	    aaData.add(adminEdit2);
		return SUCCESS;
	}
	
	public String modify() throws Exception {
		adminManager.modify(admin);
		this.success = true;
		return SUCCESS;
	}




	@Override
	@JSON(serialize = false)
	public Object getModel() {
		// TODO Auto-generated method stub
		return admin;
	}

	/**
	 * @param adminManager
	 *            the adminManager to set
	 */

	@Resource
	public void setAdminManager(AdminManager adminManager) {
		this.adminManager = adminManager;
	}

	public List<Admin> getAaData() {
		return aaData;
	}

	public void setAaData(List<Admin> aaData) {
		this.aaData = aaData;
	}
	
	public int getsEcho() {
		return sEcho;
	}

	public void setsEcho(int sEcho) {
		this.sEcho = sEcho;
	}


	public String getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}

	public void setiTotalDisplayRecords(String iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}

	public String getiTotalRecords() {
		return iTotalRecords;
	}

	public void setiTotalRecords(String iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	

}
