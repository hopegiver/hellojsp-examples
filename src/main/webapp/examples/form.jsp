<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

f.addElement("id", null, "required:true");
f.addElement("passwd", null, "required:true, :true");
f.addElement("email", null, "required:true");
f.addElement("age", 20, "required:true");
f.addElement("gender", "F", "required:true");
f.addElement("description", "Hello, World!!\nThis is html tag.\n<h>hi&nbsp;&nbsp;hi,'hi'</h>", "required:true, allow-html:true");
f.addElement("status", null, "required:true");
f.addElement("agree", "Y", null);

if(m.isPost()) {
	
	m.p(f.get("id"));
	return;
}

p.setLayout("blog");
p.setBody("example/form");
p.setVar("form_script", f.getScript());
p.print();

%>