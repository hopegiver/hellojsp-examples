<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
BlogDao blogDao = new BlogDao();

//Step2
int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

//Step3
DataSet blog = blogDao.find("id = " + id);
if(!blog.next()) { m.jsError("No Data"); return; }

//Step4
f.addElement("subject", blog.s("subject"), "title:'subject', required:true");
f.addElement("content", blog.s("content"), "title:'content', required:true");
f.addElement("att_file_name", blog.s("att_file_name"), "title:'file'");

//Step5
if(m.isPost() && f.validate()) {

	blogDao.item("subject", f.get("subject"));
	blogDao.item("content", f.get("content"));

	if("Y".equals(f.get("att_file_del"))) {
		blogDao.item("att_file_name", "");
		blogDao.item("att_file_code", "");
		blog.put("att_file_code", "");
		m.delFile(f.uploadDir + "/" + blog.s("att_file_code"));
	}
	
	File attFile = f.saveFile("att_file");
	if(attFile != null) {
		blogDao.item("att_file_name", f.getFileName("att_file"));
		blogDao.item("att_file_code", attFile.getName());

		if(!"".equals(blog.s("att_file_code"))) {
			m.delFile(f.uploadDir + "/" + blog.s("att_file_code"));
		}
	}

	//blogDao.setDebug(out);
	if(!blogDao.update("id = " + id)) {
		m.jsAlert("Error occurred(update)");
		return;
	}

	m.redirect("index.jsp");
	return;
}

//Step6
p.setLayout("admin");
p.setBody("admin/edit");
p.setVar("blog", blog);
p.setVar("form_script", f.getScript());
p.print();

%>