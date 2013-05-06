package ua.service;

import java.util.List;

import ua.model.Cacheurl;

public interface CacheurlManager {
	public void save(Cacheurl cacheurl);

	public int deleletByid(int id);

	public void modify(Cacheurl cacheurl);

	public Cacheurl loadByid(int id);
	
	public Cacheurl loadByurl(String url);

	public List<Cacheurl> getCacheurls(int start, int limit);

	public int getTotalNum();

	public List<Cacheurl> getAllCacheurls();
}
