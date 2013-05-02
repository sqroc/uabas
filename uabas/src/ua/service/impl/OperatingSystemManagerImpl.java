package ua.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ua.dao.OperatingSystemDao;
import ua.model.OperatingSystem;
import ua.service.OperatingSystemManager;

@Service("OperatingSystemManager")
public class OperatingSystemManagerImpl implements OperatingSystemManager {

	private OperatingSystemDao operatingSystemDao;

	public OperatingSystemDao getOperatingSystemDao() {
		return operatingSystemDao;
	}

	@Resource
	public void setOperatingSystemDao(OperatingSystemDao operatingSystemDao) {
		this.operatingSystemDao = operatingSystemDao;
	}

	@Override
	public void save(OperatingSystem operatingSystem) {
		operatingSystemDao.save(operatingSystem);

	}

	@Override
	public int deleletByid(int id) {
		// TODO Auto-generated method stub
		return operatingSystemDao.deleletByid(id);
	}

	@Override
	public void modify(OperatingSystem operatingSystem) {
		operatingSystemDao.modify(operatingSystem);

	}

	@Override
	public OperatingSystem loadByAid(int aid) {
		// TODO Auto-generated method stub
		return operatingSystemDao.loadByAid(aid);
	}

	@Override
	public List<OperatingSystem> getOperatingSystems(int start, int limit) {
		// TODO Auto-generated method stub
		return operatingSystemDao.getOperatingSystems(start, limit);
	}

	@Override
	public int getTotalNum() {
		// TODO Auto-generated method stub
		return operatingSystemDao.getTotalNum();
	}

	@Override
	public List<OperatingSystem> getAllOperatingSystems() {
		// TODO Auto-generated method stub
		return operatingSystemDao.getAllOperatingSystems();
	}

}
