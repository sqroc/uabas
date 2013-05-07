package ua.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Controller;

import ua.model.Browsertype;
import ua.model.OStype;
import ua.model.Records;
import ua.service.ReacordsManager;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller("Statistics")
@Results(

{ @Result(type = "json") })
public class StatisticsAction extends ActionSupport implements ModelDriven {
	private boolean success = false;
	private Browsertype browsertype = new Browsertype();
	private OStype ostype = new OStype();
	private ReacordsManager recordsManager;

	@JSON(serialize = false)
	public String getbrowser() throws Exception {
		List<Records> recordstemp = recordsManager.getAllRecords();
		int ie = 0;
		int ff = 0;
		int sf = 0;
		int ch = 0;
		int other = 0;
		for (int i = 0; i < recordstemp.size(); i++) {
			if (recordstemp.get(i).getBrowserId() == 1) {
				ff++;
			}
			if (recordstemp.get(i).getBrowserId() == 2) {
				ie++;
			}
			if (recordstemp.get(i).getBrowserId() == 3) {
				sf++;
			}
			if (recordstemp.get(i).getBrowserId() == 4) {
				ch++;
			}
			if (recordstemp.get(i).getBrowserId() == 5) {
				other++;
			}
		}
		browsertype.setIe(ie);
		browsertype.setChrome(ch);
		browsertype.setFirefox(ff);
		browsertype.setSafari(sf);
		browsertype.setOther(other);
		this.success = true;
		return SUCCESS;
	}
	
	@JSON(serialize = false)
	public String getos() throws Exception {
		List<Records> recordstemp = recordsManager.getAllRecords();
		int win = 0;
		int linux = 0;
		int mac = 0;
	    int other = 0;
		for (int i = 0; i < recordstemp.size(); i++) {
			if (recordstemp.get(i).getBrowserId() == 1) {
				mac++;
			}
			if (recordstemp.get(i).getBrowserId() == 2) {
				linux++;
			}
			if (recordstemp.get(i).getBrowserId() == 3) {
				win++;
			}
			if (recordstemp.get(i).getBrowserId() == 4) {
				other++;
			}
		}
		ostype.setLinux(linux);
		ostype.setMac(mac);
		ostype.setWindows(win);
		ostype.setOther(other);
		this.success = true;
		return SUCCESS;
	}

	@Override
	public Object getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Browsertype getBrowsertype() {
		return browsertype;
	}

	public void setBrowsertype(Browsertype browsertype) {
		this.browsertype = browsertype;
	}

	public OStype getOstype() {
		return ostype;
	}

	public void setOstype(OStype ostype) {
		this.ostype = ostype;
	}

	@Resource
	public void setRecordsManager(ReacordsManager recordsManager) {
		this.recordsManager = recordsManager;
	}

}
