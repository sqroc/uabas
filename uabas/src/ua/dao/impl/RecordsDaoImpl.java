package ua.dao.impl;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import ua.dao.RecordsDao;
import ua.model.Records;

@Repository("RecordsDao")
public class RecordsDaoImpl implements RecordsDao {

	private HibernateTemplate hibernateTemplate;

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	@Override
	public void save(Records records) {
		hibernateTemplate.save(records);

	}

	@Override
	public int deleletByid(int id) {
		Records temp = new Records();
		temp.setRid(id);
		hibernateTemplate.delete(temp);
		return 1;
	}

	@Override
	public Records loadByAid(int aid) {
		return (Records) this.hibernateTemplate.load(Records.class, aid);
	}

	@Override
	public List<Records> getRecords(final int start, final int limit) {
		List<Records> records = hibernateTemplate
				.executeFind(new HibernateCallback() {
					public Object doInHibernate(Session session)
							throws HibernateException, SQLException {
						org.hibernate.Query query = (org.hibernate.Query) session
								.createQuery("from Records");
						query.setFirstResult(start);
						query.setMaxResults(limit);

						List<Records> list = (List<Records>) query.list();
						return list;
					}
				});

		return records;
	}

	@Override
	public int getTotalNum() {
		String hql = "select count(*) from Records as records";
		return ((Long) getHibernateTemplate().iterate(hql).next()).intValue();
	}

	@Override
	public List<Records> getAllRecords() {
		String sql = "from Records";
		List<Records> records = hibernateTemplate.find(sql);
		return records;
	}

}
