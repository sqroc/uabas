package ua.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ua.dao.RecordsDao;
import ua.model.Records;
import ua.service.ReacordsManager;

@Service("ReacordsManager")
public class ReacordsManagerImpl implements ReacordsManager {

	private RecordsDao recordsDao;

	public RecordsDao getRecordsDao() {
		return recordsDao;
	}

	@Resource
	public void setRecordsDao(RecordsDao recordsDao) {
		this.recordsDao = recordsDao;
	}

	@Override
	public void save(Records records) {
		recordsDao.save(records);

	}

	@Override
	public int deleletByid(int id) {
		// TODO Auto-generated method stub
		return recordsDao.deleletByid(id);
	}

	@Override
	public Records loadByAid(int aid) {
		// TODO Auto-generated method stub
		return recordsDao.loadByAid(aid);
	}

	@Override
	public List<Records> getRecords(int start, int limit) {
		// TODO Auto-generated method stub
		return recordsDao.getRecords(start, limit);
	}

	@Override
	public int getTotalNum() {
		// TODO Auto-generated method stub
		return recordsDao.getTotalNum();
	}

	@Override
	public List<Records> getAllRecords() {
		// TODO Auto-generated method stub
		return recordsDao.getAllRecords();
	}

}
