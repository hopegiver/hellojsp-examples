<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

BlogDao blogDao = new BlogDao();

int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

DataSet blog = blogDao.find("id = " + id);
if(!blog.next()) { m.jsError("No Data"); return; }

m.download(f.uploadDir + "/" + blog.s("att_file_code"), blog.s("att_file_name"));

%>