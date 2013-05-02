package ua.action;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.stereotype.Controller;

import ua.model.Records;
import ua.service.ReacordsManager;
import ua.service.WebsiteManager;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller("Records")
@Results(

{ @Result(type = "json") })
public class RecordsAction extends ActionSupport implements ModelDriven {

	private Records records = new Records();
	private ReacordsManager recordsManager;
	private boolean success = false;

	public String add() throws Exception {
		System.out.println("test");
		recordsManager.save(records);
		this.success = true;

		return SUCCESS;

	}

	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return records;
	}

	@Resource
	public void setRecordsManager(ReacordsManager recordsManager) {
		this.recordsManager = recordsManager;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
