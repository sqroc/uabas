package ua.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ua.dao.WebsiteDao;
import ua.model.Website;
import ua.service.WebsiteManager;

@Service("WebsiteManager")
public class WebsiteManagerImpl implements WebsiteManager {
	
	private WebsiteDao websitedao;
	
	public WebsiteDao getWebsitedao() {
		return websitedao;
	}
	@Resource
	public void setWebsitedao(WebsiteDao websitedao) {
		this.websitedao = websitedao;
	}

	
	@Override
	public void add(Website website) throws Exception {
		websitedao.save(website);

	}

	@Override
	public int deleletByid(int aid) throws Exception {
		// TODO Auto-generated method stub
		return websitedao.deleletByid(aid);
	}

	@Override
	public void modify(Website website) throws Exception {
		// TODO Auto-generated method stub
		websitedao.modify(website);
	}

	@Override
	public List<Website> getWebsites(int start, int limit) throws Exception {
		// TODO Auto-generated method stub
		return websitedao.getWebsites(start, limit);
	}

	@Override
	public Website loadById(int aid) throws Exception {
		// TODO Auto-generated method stub
		return websitedao.loadByAid(aid);
	}

	@Override
	public int getTotalNum() throws Exception {
		// TODO Auto-generated method stub
		return websitedao.getTotalNum();
	}

	@Override
	public List<Website> getAllWebsites() throws Exception {
		// TODO Auto-generated method stub
		return websitedao.getAllWebsites();
	}

}
