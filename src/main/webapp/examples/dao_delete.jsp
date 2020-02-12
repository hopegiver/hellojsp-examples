<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

BlogDao blog = new BlogDao();
//blog.setDebug(out);

boolean ret = blog.delete("id = " + 10);

m.p(ret);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
BlogDao blog = new BlogDao();
//blog.setDebug(out);

boolean ret = blog.delete("id = " + 10);

m.p(ret);
</pre>