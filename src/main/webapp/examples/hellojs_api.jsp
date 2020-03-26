<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

//j.error(1, "error1");
//j.error(2, "error2");

if(m.isPost()) {
	j.success("your name is " + f.get("name"), null);
	return;
}

HashMap<String, Object> data = new HashMap<String, Object>();
data.put("name", "kister");
data.put("age", 20);

j.success("success", data);

%>