package ua.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Records {

	private int rid; // 记录id
	private int id; // 该记录对应网站id
	private int imgId; // 截图id
	private int osId; // 操作系统ID
	private int browserId; // 浏览器id
	private int swidth;
	private int sheight;
	private int pwidth;
	private int pheight;
	private int fps;
	private float browserVer; // 浏览器版本
	private String useragent; // 用户访问信息
	private String ip;
	private Date sessDate; // 记录的时间
	private String coordsX; // X坐标
	private String coordsY; // Y坐标
	private String clicks;
	private String hovered;
	private String clicked;

	@Id
	@GeneratedValue
	public int getRid() {
		return rid;
	}

	public void setRid(int rid) {
		this.rid = rid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getImgId() {
		return imgId;
	}

	public void setImgId(int imgId) {
		this.imgId = imgId;
	}

	public int getOsId() {
		return osId;
	}

	public void setOsId(int osId) {
		this.osId = osId;
	}

	public int getBrowserId() {
		return browserId;
	}

	public void setBrowserId(int browserId) {
		this.browserId = browserId;
	}

	public float getBrowserVer() {
		return browserVer;
	}

	public void setBrowserVer(float browserVer) {
		this.browserVer = browserVer;
	}

	public String getUseragent() {
		return useragent;
	}

	public void setUseragent(String useragent) {
		this.useragent = useragent;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Date getSessDate() {
		return sessDate;
	}

	public void setSessDate(Date sessDate) {
		this.sessDate = sessDate;
	}

	@Column(columnDefinition = "mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci")
	public String getCoordsX() {
		return coordsX;
	}

	public void setCoordsX(String coordsX) {
		this.coordsX = coordsX;
	}

	@Column(columnDefinition = "mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci")
	public String getCoordsY() {
		return coordsY;
	}

	public void setCoordsY(String coordsY) {
		this.coordsY = coordsY;
	}

	@Column(columnDefinition = "mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci")
	public String getClicks() {
		return clicks;
	}

	public void setClicks(String clicks) {
		this.clicks = clicks;
	}

	@Column(columnDefinition = "longtext CHARACTER SET utf8 COLLATE utf8_general_ci")
	public String getHovered() {
		return hovered;
	}

	public void setHovered(String hovered) {
		this.hovered = hovered;
	}

	@Column(columnDefinition = "longtext CHARACTER SET utf8 COLLATE utf8_general_ci")
	public String getClicked() {
		return clicked;
	}

	public void setClicked(String clicked) {
		this.clicked = clicked;
	}

	public int getSwidth() {
		return swidth;
	}

	public void setSwidth(int swidth) {
		this.swidth = swidth;
	}

	public int getSheight() {
		return sheight;
	}

	public void setSheight(int sheight) {
		this.sheight = sheight;
	}

	public int getPwidth() {
		return pwidth;
	}

	public void setPwidth(int pwidth) {
		this.pwidth = pwidth;
	}

	public int getPheight() {
		return pheight;
	}

	public void setPheight(int pheight) {
		this.pheight = pheight;
	}

	public int getFps() {
		return fps;
	}

	public void setFps(int fps) {
		this.fps = fps;
	}

}
