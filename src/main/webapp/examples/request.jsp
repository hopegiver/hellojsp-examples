<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

//request.jsp?id=a&no=1&ids=a&ids=b&etc_a=a&etc_b=b

String id = m.request("id");
if("".equals(id)) {
	m.redirect("request.jsp?id=a&no=1&ids=a&ids=b&etc_a=a&etc_b=b");
	return;
}

m.p(id);

int no = m.reqInt("no");
m.p(no);

String[] ids = m.reqArr("ids");
m.p(ids);

HashMap<String, Object> map = m.reqMap("etc_");
m.p(map);

m.p(f.getMap("etc_"));

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
String id = m.request("id");
m.p(id);

int no = m.reqInt("no");
m.p(no);

String[] ids = m.reqArr("ids");
m.p(ids);

HashMap<String, Object> map = m.reqMap("etc_");
m.p(map);
</pre>