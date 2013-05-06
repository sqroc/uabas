package ua.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ua.dao.BrowsersDao;
import ua.model.Browsers;
import ua.service.BrowsersManager;

@Service("BrowsersManager")
public class BrowsersManagerImpl implements BrowsersManager {

	private BrowsersDao browsersDao;

	public BrowsersDao getBrowsersDao() {
		return browsersDao;
	}

	@Resource
	public void setBrowsersDao(BrowsersDao browsersDao) {
		this.browsersDao = browsersDao;
	}

	@Override
	public void save(Browsers browsers) {
		browsersDao.save(browsers);

	}

	@Override
	public int deleletByid(int id) {
		// TODO Auto-generated method stub
		return browsersDao.deleletByid(id);
	}

	@Override
	public void modify(Browsers browsers) {
		browsersDao.modify(browsers);

	}

	@Override
	public Browsers loadByAid(int aid) {
		// TODO Auto-generated method stub
		return browsersDao.loadByAid(aid);
	}

	@Override
	public List<Browsers> getBrowsers(int start, int limit) {
		// TODO Auto-generated method stub
		return browsersDao.getBrowsers(start, limit);
	}

	@Override
	public int getTotalNum() {
		// TODO Auto-generated method stub
		return browsersDao.getTotalNum();
	}

	@Override
	public List<Browsers> getAllBrowsers() {
		// TODO Auto-generated method stub
		return browsersDao.getAllBrowsers();
	}

}
