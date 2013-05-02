package ua.service;

import java.util.List;

import ua.model.Records;

public interface ReacordsManager {
	public void save(Records records);

	public int deleletByid(int id);

	public Records loadByAid(int aid);

	public List<Records> getRecords(int start, int limit);

	public int getTotalNum();

	public List<Records> getAllRecords();

}
