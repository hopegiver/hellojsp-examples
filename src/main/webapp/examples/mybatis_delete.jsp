<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

DB db = new DB();
//db.setDebug(out);

int ret = db.delete("Blog.delete", 10);

m.p(ret);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
DB db = new DB();
//db.setDebug(out);

int ret = db.delete("Blog.delete", 10);

m.p(ret);
</pre>