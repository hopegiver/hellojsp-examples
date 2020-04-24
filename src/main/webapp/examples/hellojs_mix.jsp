<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

if(m.isPost()) {
	j.success("your name is " + f.get("name"), null);
	return;
}

p.setBody("example/hellojs_mix");
p.setVar("name", "kister");
p.setVar("age", 20);
p.print();

%>