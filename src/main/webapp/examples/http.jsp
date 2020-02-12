<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

Http http = new Http("https://www.google.com");
String ret = http.send();

/*
http.setParam("key1", "value1");
http.setParam("key2", "value2");
http.setParam("key3", "value3");
String ret = http.send("POST");
*/

out.print(ret);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
Http http = new Http("https://www.google.com");
String ret = http.send();

/*
http.setParam("key1", "value1");
http.setParam("key2", "value2");
http.setParam("key3", "value3");
String ret = http.send("POST");
*/

out.print(ret);
</pre>