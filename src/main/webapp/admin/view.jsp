<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
BlogDao blogDao = new BlogDao();

//Step2
int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

//Step3
DataSet blog = blogDao.find("id = " + id);
if(!blog.next()) { m.jsError("No Data"); return; }

//Step4
blog.put("content", m.htt(blog.s("content")));
blog.put("reg_date", m.time("yyyy-MM-dd HH:mm", blog.s("reg_date")));

//Step5
p.setLayout("admin");
p.setBody("admin/view");
p.setVar("blog", blog);
p.print();

%>