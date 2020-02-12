<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

Config.load();

m.p(Config.getDocRoot());

m.p(Config.getTplRoot());

m.p(Config.getDataDir());

m.p(Config.get("mailFrom"));

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
Config.load();

m.p(Config.getDocRoot());

m.p(Config.getTplRoot());

m.p(Config.getDataDir());

m.p(Config.get("mailFrom"));
</pre>