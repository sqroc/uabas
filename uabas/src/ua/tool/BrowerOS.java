package ua.tool;

public class BrowerOS {
	public int browerId(String user_agent) {
		// 火狐浏览器
		if (user_agent.contains("Firefox")) {
			return 1;
		}
		// IE浏览器
		if (user_agent.contains("MSIE")) {
			return 2;
		}
		// Safari浏览器
		if (user_agent.contains("Safari")) {
			return 3;
		}
		// Chrome浏览器
		if (user_agent.contains("Chrome")) {
			return 4;
		}
		return 0;
	}

	public int OsId(String user_agent) {
	
		if (user_agent.contains("Mac")) {
			return 1;
		}
		
		if (user_agent.contains("Linux")) {
			return 2;
		}
		
		if (user_agent.contains("Windows")) {
			return 3;
		}
		return 0;
	}

}
