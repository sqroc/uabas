package ua.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import ua.model.Website;
import ua.service.WebsiteManager;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller("Website")
@Results(

{ @Result(type = "json") })
public class WebsiteAction extends ActionSupport implements ModelDriven {

	private Website website = new Website();
	private List<Website> aaData;
	private String iTotalDisplayRecords;
	private String iTotalRecords;
	private int sEcho;
	private boolean success = false;
	private WebsiteManager websiteManager;
	private Website websiteEdit = new Website();
	
	@JSON(serialize = false)
	public String getAllWebsites() throws Exception {
		aaData = websiteManager.getAllWebsites();
		this.sEcho = 1;
		this.iTotalRecords = websiteManager.getTotalNum()+"";
		this.iTotalDisplayRecords =  websiteManager.getTotalNum()+"";
		
		return SUCCESS;
	}
	
	public String add() throws Exception {
		websiteManager.add(website);
		this.success = true;
		
		return SUCCESS;

	}
	
	public String deleteByid() {
		try {
			websiteManager.deleletByid(website.getId());
			this.success = true;
		} catch (Exception e) {
			this.success = false;
		}
		return SUCCESS;
	}
	
	public String loadByAid() throws Exception {
		aaData = new ArrayList<Website>();
		websiteEdit =  websiteManager.loadById(website.getId());
		Website websiteEdit2 = new Website();
		websiteEdit2.setId(websiteEdit.getId());
		websiteEdit2.setName(websiteEdit.getName());
		websiteEdit2.setUrl(websiteEdit.getUrl());
		websiteEdit2.setDescription(websiteEdit.getDescription());
	    aaData.add(websiteEdit2);
		return SUCCESS;
	}
	
	public String modify() throws Exception {
		websiteManager.modify(website);
		this.success = true;
		return SUCCESS;
	}

	
	
	@Override
	@JSON(serialize = false)
	public Object getModel() {
		// TODO Auto-generated method stub
		return website;
	}

	public List<Website> getAaData() {
		return aaData;
	}

	public void setAaData(List<Website> aaData) {
		this.aaData = aaData;
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

	public int getsEcho() {
		return sEcho;
	}

	public void setsEcho(int sEcho) {
		this.sEcho = sEcho;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	@Resource
	public void setWebsiteManager(WebsiteManager websiteManager) {
		this.websiteManager = websiteManager;
	}
	
	

}
