package ua.dao;

import java.util.List;

import ua.model.Records;

public interface RecordsDao {

	public void save(Records records);

	public int deleletByid(int id);

	public Records loadByAid(int aid);

	public List<Records> getRecords(int start, int limit);

	public int getTotalNum();

	public List<Records> getAllRecords();
}
