<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

XML xml = new XML(Config.getDocRoot() + "/data/sample.xml");
//xml.setDebug(out);

m.p(xml.getString("//config/env/logDir"));

m.p(xml.getDataSet("//config/users/user"));

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
XML xml = new XML(Config.getDocRoot() + "/data/sample.xml");
//xml.setDebug(out);

m.p(xml.getString("//config/env/logDir"));

m.p(xml.getDataSet("//config/users/user"));

</pre>