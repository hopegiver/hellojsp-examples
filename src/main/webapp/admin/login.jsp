<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

f.addElement("id", null, "title:'id', required:'Y'");
f.addElement("passwd", null, "title:'password', required:'Y'");

if(m.isPost()  && f.validate()) {
	
	if("admin".equals(f.get("id")) && "admin".equals(f.get("passwd"))) {
		
		auth.put("user_id", "admin");
		auth.save();		
		
		m.redirect("index.jsp");
	} else {
		m.jsError("login error");
	}
	
	return;
}

p.setLayout(null);
p.setBody("admin/login");
p.setVar("form_script", f.getScript());
p.print();

%>