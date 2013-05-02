package ua.dao;

import java.util.List;

import ua.model.OperatingSystem;

public interface OperatingSystemDao {

	public void save(OperatingSystem operatingSystem);

	public int deleletByid(int id);

	public void modify(OperatingSystem operatingSystem);

	public OperatingSystem loadByAid(int aid);

	public List<OperatingSystem> getOperatingSystems(int start, int limit);

	public int getTotalNum();

	public List<OperatingSystem> getAllOperatingSystems();
}
