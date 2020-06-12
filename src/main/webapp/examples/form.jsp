<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%


f.setName("form2");

f.addElement("id", "'hopegiver\"", "required:true");
f.addElement("passwd", "1", "required:true");
f.addElement("name", null, "required:true, maxlength:2");
f.addElement("url", null, "type:'url', required:true");
f.addElement("email", "1@1.com", "type:'email', required:true");
f.addElement("age", 20, "type:'number', required:true, max:50, maxlength:1");
f.addElement("gender", "M", "required:true");
f.addElement("description", "Hello, World!!\nThis is html tag.\n<h1>hi&nbsp;&nbsp;hi,'hi'</h1>", "required:true, allowhtml:true");
f.addElement("status", 1, "required:true");
f.addElement("agree", "Y", null);

if(m.isPost()) {
	m.p(f.validate() + ":" + f.getErrMsg());
	m.p(f.get("description"));
	m.p();
	return;
}

p.setBody("example/form");
p.setVar("form_script", f.getScript("form1"));
p.print();

%>