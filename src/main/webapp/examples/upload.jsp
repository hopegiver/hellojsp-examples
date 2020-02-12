<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

f.addElement("file", null, "required:'Y'");

if(m.isPost() && f.validate()) {
	
	File file = f.saveFile("file");
	if(file != null) {
		m.p(f.get("name"));
		m.p(file.getAbsolutePath());
		m.p(file.getName());
		m.p(f.getFileName("file"));
		
		//file.delete();
		return;
	}
}

p.setBody("example/upload");
p.setVar("form_script", f.getScript());
p.print();

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
f.addElement("file", null, "required:'Y'");

if(m.isPost() && f.validate()) {
	
	File file = f.saveFile("file");
	if(file != null) {
		m.p(f.get("name"));
		m.p(file.getAbsolutePath());
		m.p(file.getName());
		m.p(f.getFileName("file"));
		
		//file.delete();
		return;
	}
}

p.setBody("example/upload");
p.setVar("form_script", f.getScript());
p.print();
</pre>