package ua.export;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import ua.model.Records;
import ua.service.ReacordsManager;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

/**
 * Servlet implementation class exportos
 */
public class exportos extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public exportos() {
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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			response.reset();
			response.setContentType("application/vnd.ms-excel"); // 改成输出excel文件
			response.setHeader("Content-disposition",
					"attachment; filename=os.xls");
			OutputStream os = response.getOutputStream();
			// 打开文件
			Workbook wb;
			wb = Workbook.getWorkbook(new java.io.File(request.getRealPath("/")
					+ "test.xls"));
			WritableWorkbook book = Workbook.createWorkbook(os, wb);
			// 生成名为“第一页”的工作表，参数0表示这是第一页
			WritableSheet sheet = book.createSheet(" 第一页 ", 0);
			ServletContext context = request.getSession().getServletContext();
			ApplicationContext ctx = WebApplicationContextUtils
					.getWebApplicationContext(context);
			ReacordsManager reacordsManager = (ReacordsManager) ctx
					.getBean("ReacordsManager");
			List<Records> recordstemp = reacordsManager.getAllRecords();
			int win = 0;
			int linux = 0;
			int mac = 0;
			int other = 0;
			for (int i = 0; i < recordstemp.size(); i++) {
				if (recordstemp.get(i).getBrowserId() == 1) {
					mac++;
				}
				if (recordstemp.get(i).getBrowserId() == 2) {
					linux++;
				}
				if (recordstemp.get(i).getBrowserId() == 3) {
					win++;
				}
				if (recordstemp.get(i).getBrowserId() == 4) {
					other++;
				}
			}
			// 在Label对象的构造子中指名单元格位置是第一列第一行(0,0)
			// 以及单元格内容为test
			Label label = new Label(0, 0, " 操作系统数据统计信息 ");
			// 将定义好的单元格添加到工作表中
			sheet.addCell(label);
			sheet.addCell(new Label(0, 1, " 操作系统类型 "));
			sheet.addCell(new Label(0, 2, " mac "));
			sheet.addCell(new Label(0, 3, " linux "));
			sheet.addCell(new Label(0, 4, " win "));
			sheet.addCell(new Label(0, 5, " 其他 "));
			sheet.addCell(new Label(1, 1, " 数量 "));
			sheet.addCell(new Label(1, 2, mac + ""));
			sheet.addCell(new Label(1, 3, linux + ""));
			sheet.addCell(new Label(1, 4, win + ""));
			sheet.addCell(new Label(1, 5, other + ""));

			// 写入数据并关闭文件
			book.write();
			book.close();

		} catch (Exception e) {
			System.out.println(e);
		}
	}

}
