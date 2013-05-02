package ua.service;

import java.util.List;

import ua.model.OperatingSystem;

public interface OperatingSystemManager {

	public void save(OperatingSystem operatingSystem);

	public int deleletByid(int id);

	public void modify(OperatingSystem operatingSystem);

	public OperatingSystem loadByAid(int aid);

	public List<OperatingSystem> getOperatingSystems(int start, int limit);

	public int getTotalNum();

	public List<OperatingSystem> getAllOperatingSystems();
}
