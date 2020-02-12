<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

BlogDao blog = new BlogDao();
//blog.setDebug(out);

blog.item("subject", "Nice to meet you. " + Hello.getUnixTime());
blog.item("content", "Nice to meet you too.");

boolean ret = blog.update("id = " + 1);
m.p(ret);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
BlogDao blog = new BlogDao();
//blog.setDebug(out);

blog.item("subject", "Nice to meet you. " + Hello.getUnixTime());
blog.item("content", "Nice to meet you too.");

boolean ret = blog.update("id = " + 1);
m.p(ret);
</pre>