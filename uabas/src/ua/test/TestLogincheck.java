package ua.test;

import static org.junit.Assert.*;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ua.dao.AdminDao;
import ua.model.Admin;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class TestLogincheck {
	@Resource
	private AdminDao admindao;

	@Test
	public void testCheck() {
		Admin admin = new Admin();
		admin.setName("admin");
		admin.setPassword("admin");
		assertNotNull(admindao.check(admin));
	}
}
