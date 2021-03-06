package ua.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import ua.model.Records;
import ua.service.CacheurlManager;
import ua.service.ReacordsManager;
import ua.tool.HTMLSpirit;

/**
 * Servlet implementation class MouseServlet
 */
public class MouseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public MouseServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 *  生成鼠标移动路径图 
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		HTMLSpirit hs = new HTMLSpirit();//读取HTML页面的工具类
		//从Spring中读取相对应的Bean，用于数据的读取
		ServletContext context = request.getSession().getServletContext();
		ApplicationContext ctx = WebApplicationContextUtils
				.getWebApplicationContext(context);
		ReacordsManager reacordsManager = (ReacordsManager) ctx
				.getBean("ReacordsManager");
		CacheurlManager cacheurlManager = (CacheurlManager) ctx
				.getBean("CacheurlManager");
		int rid = Integer.parseInt(request.getParameter("rid"));
		//通过记录Id号调用对应的函数读取鼠标信息
		Records record = reacordsManager.loadByAid(rid);
		//封装鼠标信息，用于传递给JS绘图库
		String xcoords = "[" + record.getCoordsX() + "]";
		String ycoords = "[" + record.getCoordsY() + "]";
		String clicks = "[" + record.getClicks() + "]";
		int wprev = record.getPwidth();
		int hprev = record.getPheight();
		String timestamp = "\'cb9e0019ad\\n02:33 PM\'";
		PrintWriter out = response.getWriter();
		String url = cacheurlManager.loadByid(record.getImgId()).getUrl();
		//向前台输出记录的HTML页面
		out.println(hs.getHTML(url, "UTF-8").replaceAll("uabas", "uabasdrop"));
		//配置绘图参数
		String dataopt = "<script type='text/javascript' src='js/uabasfunction.js'></script><script type='text/javascript'>var recorddata = {fps : 24, xcoords : "
				+ xcoords
				+ ",ycoords : "
				+ ycoords
				+ ",clicks : "
				+ clicks
				+ ",timestamp : "
				+ timestamp
				+ ",wprev : "
				+ wprev
				+ ",hprev : "
				+ hprev
				+ ",trails : [ 2, 3, 4 ],currtrail : 4};</script>";
		out.print(dataopt);
		//输出需要加载的JS文件
		String jsfile = "<script type='text/javascript' src='js/selector.js'></script><script type='text/javascript' src='js/wz_jsgraphics.js'></script><script type='text/javascript' src='js/json2.js'></script><script type='text/javascript' src='js/uabasdraw.js'></script>";
		out.print(jsfile);
		String option = "<script type='text/javascript'>draw.replay({entryPt : '#99FF66',exitPt : '#FF6666',regPt : '#FF00FF',regLn : '#00CCCC',click : '#FF0000',dDrop : '#AABBCC',varCir : '#FF9999',cenPt : '#555',clust : '#0000FF',bgColor : '#000000',bgLayer : 1,realTime : 1,dirVect : 0,loadNextTrail : 0});</script>";
		out.print(option);
	}

}
