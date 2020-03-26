<%@ page contentType="application/json; charset=utf-8" %><%@ include file="/init.jsp" %><%

f.addElement("id", null, "title:'id', required:'Y'");
f.addElement("passwd", null, "title:'password', required:'Y'");

if(m.isPost()  && f.validate()) {
	
	if("admin".equals(f.get("id")) && "admin".equals(f.get("passwd"))) {
		
		auth.put("user_id", "admin");
		auth.save();		
		
		j.success("", null);
	} else {
		j.error(1, "login error");
	}
	
	return;
}

p.setVar("form_script", f.getScript());
p.print(1);

%>