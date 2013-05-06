package ua.action;

import java.util.Date;
import java.util.StringTokenizer;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import ua.model.Cacheurl;
import ua.model.Records;
import ua.service.CacheurlManager;
import ua.service.ReacordsManager;
import ua.service.WebsiteManager;
import ua.tool.BrowerOS;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller("Records")
@Results(

{ @Result(type = "json") })
public class RecordsAction extends ActionSupport implements ModelDriven {

	private Records records = new Records();
	private Cacheurl cacheurl = new Cacheurl();
	private ReacordsManager recordsManager;
	private CacheurlManager cacheurlManager;
	private boolean success = false;

	public String add() throws Exception {
		String url = org.apache.struts2.ServletActionContext.getRequest().getParameter("url");
		cacheurl.setSavetime(new Date());
		cacheurl.setUrl(url);
		cacheurlManager.save(cacheurl);
		records.setIp(org.apache.struts2.ServletActionContext.getRequest()
				.getRemoteAddr());
		System.out.println(org.apache.struts2.ServletActionContext.getRequest()
				.getHeader("user-agent"));
		String agent = org.apache.struts2.ServletActionContext.getRequest()
				.getHeader("user-agent");
		records.setUseragent(agent);
		BrowerOS bo = new BrowerOS();
		records.setBrowserId(bo.browerId(agent));
		records.setOsId(bo.OsId(agent));
		records.setSessDate(new Date());
		records.setImgId(cacheurl.getCid());
		recordsManager.save(records);
		this.success = true;

		return SUCCESS;

	}

	@Override
	@JSON(serialize = false)
	public Object getModel() {
		// TODO Auto-generated method stub
		return records;
	}

	@Resource
	public void setRecordsManager(ReacordsManager recordsManager) {
		this.recordsManager = recordsManager;
	}

	@Resource
	public void setCacheurlManager(CacheurlManager cacheurlManager) {
		this.cacheurlManager = cacheurlManager;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

}
