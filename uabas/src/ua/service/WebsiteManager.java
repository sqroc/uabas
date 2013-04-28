package ua.service;

import java.util.List;

import ua.model.Website;

public interface WebsiteManager {

	public abstract void add(Website website) throws Exception;

	public abstract int deleletByid(int aid) throws Exception;

	public abstract void modify(Website website) throws Exception;

	public List<Website> getWebsites(int start ,int limit) throws Exception;

	public Website loadById(int aid) throws Exception;
	
	public int getTotalNum() throws Exception;
	
	public List<Website> getAllWebsites() throws Exception;
 

}
