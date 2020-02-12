<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

if(m.isPost()) {
	String path = Config.getDataDir() + "/sample.pdf";
	m.download(path, "sample.pdf");
	return;
}

p.setBody("example/download");
p.print();

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
if(m.isPost()) {
	String path = Config.getDataDir() + "/sample.pdf";
	m.download(path, "sample.pdf");
	return;
}

p.setBody("example/download");
p.print();
</pre>