<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

//Step1
BlogDao blog = new BlogDao();

//Step2
f.addElement("subject", null, "title:'subject', required:true");
f.addElement("content", null, "title:'content', required:true");
f.addElement("att_file", null, "title:'file'");

//Step3
if(m.isPost() && f.validate()) {

	blog.item("subject", f.get("subject"));
	blog.item("content", f.get("content"));

	File attFile = f.saveFile("att_file");
	if(attFile != null) {
		blog.item("att_file_name", f.getFileName("att_file"));
		blog.item("att_file_code", attFile.getName());
	}
	blog.item("reg_date", m.time("yyyyMMddHHmmss"));
	blog.item("status", 1);

	//blog.setDebug(out);
	if(!blog.insert()) {
		m.jsError(" occurred(insert)");
		return;
	}

	m.redirect("index.jsp");
	return;
}

//Step4
p.setDebug(out);
p.setLayout("blog");
p.setBody("sample.create");
p.setVar("form_script", f.getScript());
p.print();

%>