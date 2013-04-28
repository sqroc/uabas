package ua.dao.impl;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import ua.dao.WebsiteDao;
import ua.model.Admin;
import ua.model.Website;

@Repository("WebsiteDao")
public class WebsiteDaoImpl implements WebsiteDao {
	
	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Override
	public void save(Website website) {
		hibernateTemplate.save(website);

	}

	@Override
	public int deleletByid(int id) {

		Website temp = new Website();
		temp.setId(id);
		hibernateTemplate.delete(temp);
		return 1;
	}

	@Override
	public void modify(Website website) {
		hibernateTemplate.update(website);

	}

	@Override
	public Website loadByAid(int aid) {
		return (Website) this.hibernateTemplate.load(Website.class, aid);
	}

	@Override
	public List<Website> getWebsites(final int start, final int limit) {
		List<Website> websites = hibernateTemplate
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						org.hibernate.Query query = (org.hibernate.Query) session
								.createQuery("from Website");
						query.setFirstResult(start);
						query.setMaxResults(limit);

						List<Website> list = (List<Website>) query.list();
						return list;
					}
				});

		return websites;
	}

	@Override
	public int getTotalNum() {
		String hql = "select count(*) from Website as website";
		return ((Long) getHibernateTemplate().iterate(hql).next()).intValue();
	}


	@Override
	public List<Website> getAllWebsites() {
		String sql = "from Website";
		List<Website> websites = hibernateTemplate.find(sql);
		return websites;
	}

}
