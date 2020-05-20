<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

ListManager lm = new ListManager();
//lm.setDebug(out);
lm.setRequest(request);
lm.setTable("tb_blog");
lm.setFields("*");
lm.addSearch("subject,content", f.get("keyword"), "LIKE");
lm.addSearch("status", f.getInt("status"), ">");
lm.setOrderBy("id DESC");

DataSet posts = lm.getDataSet();

p.setLayout("blog");
p.setBody("example/search");
p.setLoop("posts", posts);
p.print();

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
ListManager lm = new ListManager();
lm.setRequest(request);
lm.setTable("tb_blog");
lm.setFields("*");
lm.addSearch("subject,content", f.get("keyword"), "LIKE");
lm.setOrderBy("id DESC");

DataSet posts = lm.getDataSet();

p.setLayout("blog");
p.setBody("example/search");
p.setVar("posts", posts);
p.print();
</pre>