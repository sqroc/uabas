package ua.dao.impl;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import ua.dao.BrowsersDao;
import ua.model.Browsers;

@Repository("BrowsersDao")
public class BrowsersDaoImpl implements BrowsersDao {

	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Override
	public void save(Browsers browsers) {
		hibernateTemplate.save(browsers);

	}

	@Override
	public int deleletByid(int id) {
		Browsers temp = new Browsers();
		temp.setBid(id);
		hibernateTemplate.delete(temp);
		return 1;
	}

	@Override
	public void modify(Browsers browsers) {
		hibernateTemplate.update(browsers);
	}

	@Override
	public Browsers loadByAid(int aid) {
		// TODO Auto-generated method stub
		return (Browsers) this.hibernateTemplate.load(Browsers.class, aid);
	}

	@Override
	public List<Browsers> getBrowsers(final int start, final int limit) {
		List<Browsers> browsers = hibernateTemplate
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						org.hibernate.Query query = (org.hibernate.Query) session
								.createQuery("from Browsers");
						query.setFirstResult(start);
						query.setMaxResults(limit);

						List<Browsers> list = (List<Browsers>) query.list();
						return list;
					}
				});

		return browsers;
	}

	@Override
	public int getTotalNum() {
		String hql = "select count(*) from Browsers as browsers";
		return ((Long) getHibernateTemplate().iterate(hql).next()).intValue();
	}

	@Override
	public List<Browsers> getAllBrowsers() {
		String sql = "from Browsers";
		List<Browsers> browsers = hibernateTemplate.find(sql);
		return browsers;
	}

}
