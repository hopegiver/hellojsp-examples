<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

msg.setLocale(Locale.ENGLISH);
m.p(Locale.ENGLISH);
m.p(msg.get("name"));
m.p(msg.get("course"));

msg.setLocale(Locale.KOREAN);
m.p(Locale.KOREAN);
m.p(msg.get("name"));
m.p(msg.get("course"));


%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
msg.setLocale(Locale.ENGLISH);
//msg.setLocale(Locale.KOREAN);
//msg.reload();

m.p(msg.get("name"));
m.p(msg.get("course"));
</pre>