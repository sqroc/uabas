package ua.action;

import javax.annotation.Resource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import ua.model.Admin;
import ua.model.NumMessage;
import ua.service.AdminManager;
import ua.service.ReacordsManager;
import ua.service.WebsiteManager;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller
@Results(

{ @Result(type = "json") })
public class GetnumAction extends ActionSupport implements ModelDriven {

	private NumMessage numMessage = new NumMessage();
	private AdminManager adminManager;
	private WebsiteManager websiteManager;
	private ReacordsManager recordManager;

	public String execute() throws Exception {
		numMessage.setPeoplenum(adminManager.getTotalNum());
		numMessage.setWebsitenum(websiteManager.getTotalNum());
		numMessage.setRecordnum(recordManager.getTotalNum());
		return SUCCESS;
	}

	@Override
	@JSON(serialize = false)
	public Object getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Resource
	public void setAdminManager(AdminManager adminManager) {
		this.adminManager = adminManager;
	}

	@Resource
	public void setWebsiteManager(WebsiteManager websiteManager) {
		this.websiteManager = websiteManager;
	}

	@Resource
	public void setRecordManager(ReacordsManager recordManager) {
		this.recordManager = recordManager;
	}

	public NumMessage getNumMessage() {
		return numMessage;
	}

	public void setNumMessage(NumMessage numMessage) {
		this.numMessage = numMessage;
	}

}
