package ua.dao.impl;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import ua.dao.OperatingSystemDao;
import ua.model.OperatingSystem;

@Repository("OperatingSystemDao")
public class OperatingSystemDaoImpl implements OperatingSystemDao {

	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Override
	public void save(OperatingSystem operatingSystem) {
		hibernateTemplate.save(operatingSystem);

	}

	@Override
	public int deleletByid(int id) {
		OperatingSystem temp = new OperatingSystem();
		temp.setOsid(id);
		hibernateTemplate.delete(temp);
		return 1;
	}

	@Override
	public void modify(OperatingSystem operatingSystem) {
		hibernateTemplate.update(operatingSystem);

	}

	@Override
	public OperatingSystem loadByAid(int aid) {
		// TODO Auto-generated method stub
		return (OperatingSystem) this.hibernateTemplate.load(
				OperatingSystem.class, aid);
	}

	@Override
	public List<OperatingSystem> getOperatingSystems(final int start,
			final int limit) {
		List<OperatingSystem> operatingSystems = hibernateTemplate
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						org.hibernate.Query query = (org.hibernate.Query) session
								.createQuery("from OperatingSystem");
						query.setFirstResult(start);
						query.setMaxResults(limit);

						List<OperatingSystem> list = (List<OperatingSystem>) query
								.list();
						return list;
					}
				});

		return operatingSystems;
	}

	@Override
	public int getTotalNum() {
		String hql = "select count(*) from OperatingSystem as operatingSystem";
		return ((Long) getHibernateTemplate().iterate(hql).next()).intValue();
	}

	@Override
	public List<OperatingSystem> getAllOperatingSystems() {
		String sql = "from OperatingSystem";
		List<OperatingSystem> operatingSystems = hibernateTemplate.find(sql);
		return operatingSystems;
	}

}
