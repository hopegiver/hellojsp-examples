<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
BlogDao blogDao = new BlogDao();

//Step2
f.addElement("subject", null, "title:'subject', required:true");
f.addElement("content", null, "title:'content', required:true");
f.addElement("att_file", null, "title:'file'");

//Step3
if(m.isPost() && f.validate()) {

	blogDao.item("subject", f.get("subject"));
	blogDao.item("content", f.get("content"));

	File attFile = f.saveFile("att_file");
	if(attFile != null) {
		blogDao.item("att_file_name", f.getFileName("att_file"));
		blogDao.item("att_file_code", attFile.getName());
	}
	blogDao.item("reg_date", m.time("yyyyMMddHHmmss"));
	blogDao.item("status", 1);

	//blogDao.setDebug(out);
	if(!blogDao.insert()) {
		m.jsError(" occurred(insert)");
		return;
	}

	m.redirect("index.jsp");
	return;
}

//Step4
p.setLayout("admin");
p.setBody("admin/add");
p.setVar("form_script", f.getScript());
p.print();

%>