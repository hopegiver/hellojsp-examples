<%@ page contentType="application/json; charset=utf-8" %><%@ include file="/init.jsp" %><%

//Step1
BlogDao blog = new BlogDao();
DataSet list = blog.find("");

//Step2
p.setLoop("list", list);
p.print(1);

%>