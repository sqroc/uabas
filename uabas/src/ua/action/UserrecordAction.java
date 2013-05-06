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

import ua.model.RecordDisplay;
import ua.model.Records;
import ua.service.BrowsersManager;
import ua.service.OperatingSystemManager;
import ua.service.ReacordsManager;
import ua.service.WebsiteManager;

import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;

@ParentPackage("json-default")
@Namespace("")
@Controller("Userrecord")
@Results(

{ @Result(type = "json") })
public class UserrecordAction extends ActionSupport implements ModelDriven {

	private Records records = new Records();
	private ReacordsManager recordsManager;
	private BrowsersManager browsersManager;
	private OperatingSystemManager operatingSystemManager;
	private WebsiteManager websiteManager;
	private boolean success = false;
	private List<RecordDisplay> aaData;
	private String iTotalDisplayRecords;
	private String iTotalRecords;
	private int sEcho;

	@JSON(serialize = false)
	public String getAllRecords() throws Exception {
		aaData = new ArrayList<RecordDisplay>();
		List<Records> recordstemp = recordsManager.getAllRecords();
		for (int i = 0; i < recordstemp.size(); i++) {
			RecordDisplay rd = new RecordDisplay();
			rd.setRid(recordstemp.get(i).getRid());

			String browsername = browsersManager.loadByAid(
					recordstemp.get(i).getBrowserId()).getName();
			rd.setBrowsername(browsername);
			String osname = operatingSystemManager.loadByAid(
					recordstemp.get(i).getOsId()).getName();
			rd.setOsname(osname);
			String websitename = websiteManager.loadById(
					recordstemp.get(i).getId()).getUrl();
			rd.setWebsitename(websitename);
			rd.setSessDate(recordstemp.get(i).getSessDate());
			rd.setCoordsX(recordstemp.get(i).getCoordsX());
			rd.setCoordsY(recordstemp.get(i).getCoordsY());
			rd.setClicks(recordstemp.get(i).getClicks());
			aaData.add(rd);
		}
		this.sEcho = 1;
		this.iTotalRecords = recordsManager.getTotalNum() + "";
		this.iTotalDisplayRecords = recordsManager.getTotalNum() + "";

		return SUCCESS;
	}

	public String deleteByid() {
		try {
			recordsManager.deleletByid(records.getRid());
			this.success = true;
		} catch (Exception e) {
			this.success = false;
		}
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
	public void setBrowsersManager(BrowsersManager browsersManager) {
		this.browsersManager = browsersManager;
	}

	@Resource
	public void setOperatingSystemManager(
			OperatingSystemManager operatingSystemManager) {
		this.operatingSystemManager = operatingSystemManager;
	}

	@Resource
	public void setWebsiteManager(WebsiteManager websiteManager) {
		this.websiteManager = websiteManager;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
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

	public List<RecordDisplay> getAaData() {
		return aaData;
	}

	public void setAaData(List<RecordDisplay> aaData) {
		this.aaData = aaData;
	}

}
