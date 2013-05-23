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

	/*
	 * 用户行为数据的记录
	 */
	public String add() throws Exception {
		//获取记录页面的URL
		String url = org.apache.struts2.ServletActionContext.getRequest().getParameter("url");
		cacheurl.setSavetime(new Date());
		cacheurl.setUrl(url);
		cacheurlManager.save(cacheurl);
		//获取用户的IP地址
		records.setIp(org.apache.struts2.ServletActionContext.getRequest()
				.getRemoteAddr());
		//获取用户的user-agent信息
		String agent = org.apache.struts2.ServletActionContext.getRequest()
				.getHeader("user-agent");
		records.setUseragent(agent);
		//调用BrowerOS类将浏览器和操作系统信息从user-agent中取出，生成对应的数字ID存入数据库
		BrowerOS bo = new BrowerOS();
		records.setBrowserId(bo.browerId(agent));
		records.setOsId(bo.OsId(agent));
		records.setSessDate(new Date());
		records.setImgId(cacheurl.getCid());
		//保存所有用户信息
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
