package ua.service;

import java.util.List;

import ua.model.Browsers;

public interface BrowsersManager {

	public void save(Browsers browsers);

	public int deleletByid(int id);

	public void modify(Browsers browsers);

	public Browsers loadByAid(int aid);

	public List<Browsers> getBrowsers(int start, int limit);

	public int getTotalNum();

	public List<Browsers> getAllBrowsers();
}
