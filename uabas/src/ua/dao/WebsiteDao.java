package ua.dao;

import java.util.List;

import ua.model.Website;

public interface WebsiteDao {

    public void save(Website website);
	
	public int deleletByid(int id);
	
	public void modify(Website website);
	
	public Website loadByAid(int aid);

    public List<Website> getWebsites(int start ,int limit);
    
    public int getTotalNum() ;
    
    public List<Website> getAllWebsites();
}
