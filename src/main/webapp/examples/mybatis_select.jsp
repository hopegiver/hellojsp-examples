<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

DB db = new DB();
//db.setDebug(out);

DataSet posts = db.select("Blog.selectAll", null);

p.setLayout("blog");
p.setBody("example/blog");
p.setVar("posts", posts);
p.print();

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
DB db = new DB();
//db.setDebug(out);

DataSet posts = db.select("Blog.selectAll", null);

p.setLayout("blog");
p.setBody("example/blog");
p.setVar("posts", posts);
p.print();
</pre>