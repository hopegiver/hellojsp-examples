<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

m.mail("test@test.com", "Hellojsp Mail test", "Hellojsp Mail test");

Mail mail = new Mail();
mail.setDebug(out);
mail.send("test@test.com", "Hellojsp Mail test", "Hellojsp Mail test");

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
m.mail("test@test.com", "Hellojsp Mail test", "Hellojsp Mail test");

Mail mail = new Mail();
mail.setDebug(out);
mail.send("test@test.com", "Hellojsp Mail test", "Hellojsp Mail test");
</pre>