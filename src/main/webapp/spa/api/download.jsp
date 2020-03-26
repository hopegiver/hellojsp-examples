<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

BlogDao blog = new BlogDao();

int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

DataSet info = blog.find("id = " + id);
if(!info.next()) { m.jsError("No Data"); return; }

m.download(f.uploadDir + "/" + info.s("att_file_code"), info.s("att_file_name"));

%>