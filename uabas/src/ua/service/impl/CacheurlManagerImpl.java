package ua.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ua.dao.CacheurlDao;
import ua.model.Cacheurl;
import ua.service.CacheurlManager;

@Service("CacheurlManager")
public class CacheurlManagerImpl implements CacheurlManager {

	private CacheurlDao cacheurlDao;

	public CacheurlDao getCacheurlDao() {
		return cacheurlDao;
	}

	@Resource
	public void setCacheurlDao(CacheurlDao cacheurlDao) {
		this.cacheurlDao = cacheurlDao;
	}

	@Override
	public void save(Cacheurl cacheurl) {
		cacheurlDao.save(cacheurl);

	}

	@Override
	public int deleletByid(int id) {
		// TODO Auto-generated method stub
		return cacheurlDao.deleletByid(id);
	}

	@Override
	public void modify(Cacheurl cacheurl) {
		cacheurlDao.modify(cacheurl);

	}

	@Override
	public Cacheurl loadByid(int id) {
		// TODO Auto-generated method stub
		return cacheurlDao.loadByid(id);
	}

	@Override
	public List<Cacheurl> getCacheurls(int start, int limit) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getTotalNum() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Cacheurl> getAllCacheurls() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cacheurl loadByurl(String url) {
		// TODO Auto-generated method stub
		return cacheurlDao.loadByurl(url);
	}

}
