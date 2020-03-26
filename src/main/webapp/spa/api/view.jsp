<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
BlogDao blog = new BlogDao();

//Step2
int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

//Step3
DataSet info = blog.find("id = " + id);
if(!info.next()) { m.jsError("No Data"); return; }

//Step4
info.put("content", m.htt(info.s("content")));
info.put("reg_date", m.time("yyyy-MM-dd HH:mm", info.s("reg_date")));

//Step5
p.setVar("info", info);
p.print(1);

%>