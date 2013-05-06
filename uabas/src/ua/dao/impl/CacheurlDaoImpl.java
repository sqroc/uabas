package ua.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import ua.dao.CacheurlDao;
import ua.model.Admin;
import ua.model.Cacheurl;
import ua.model.Website;

@Repository("CacheurlDao")
public class CacheurlDaoImpl implements CacheurlDao {
	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Override
	public void save(Cacheurl cacheurl) {
		hibernateTemplate.save(cacheurl);

	}

	@Override
	public int deleletByid(int id) {
		Cacheurl temp = new Cacheurl();
		temp.setCid(id);
		hibernateTemplate.delete(temp);
		return 1;
	}

	@Override
	public void modify(Cacheurl cacheurl) {
		hibernateTemplate.update(cacheurl);

	}

	@Override
	public Cacheurl loadByid(int id) {
		return (Cacheurl) this.hibernateTemplate.load(Cacheurl.class, id);
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
		String queryString = "from Cacheurl ca where ca.url='" + url;

		List<Cacheurl> cacheurls = hibernateTemplate.find(queryString);

		if (cacheurls != null && cacheurls.size() > 0)
			return cacheurls.get(0);

		else
			return null;
	}

}
