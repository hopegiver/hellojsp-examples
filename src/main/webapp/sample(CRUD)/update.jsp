<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

//Step1
BlogDao blog = new BlogDao();

//Step2
int id = m.reqInt("id");
if(id == 0) { m.jsError("Primary Key is required"); return; }

//Step3
DataSet info = blog.find("id = " + id);
if(!info.next()) { m.jsError("No Data"); return; }

//Step4
f.addElement("subject", info.s("subject"), "title:'subject', required:true");
f.addElement("content", info.s("content"), "title:'content', required:true");
f.addElement("att_file_name", info.s("att_file_name"), "title:'file'");

//Step5
if(m.isPost() && f.validate()) {

	blog.item("subject", f.get("subject"));
	blog.item("content", f.get("content"));

	if("Y".equals(f.get("att_file_del"))) {
		blog.item("att_file_name", "");
		blog.item("att_file_code", "");
		info.put("att_file_code", "");
		m.delFile(f.uploadDir + "/" + info.s("att_file_code"));
	}
	
	File attFile = f.saveFile("att_file");
	if(attFile != null) {
		blog.item("att_file_name", f.getFileName("att_file"));
		blog.item("att_file_code", attFile.getName());

		if(!"".equals(info.s("att_file_code"))) {
			m.delFile(f.uploadDir + "/" + info.s("att_file_code"));
		}
	}

	//blog.setDebug(out);
	if(!blog.update("id = " + id)) {
		m.jsAlert("Error occurred(update)");
		return;
	}

	m.redirect("index.jsp");
	return;
}

//Step6
p.setLayout("blog");
p.setBody("sample/update");
p.setVar("info", info);
p.setVar("form_script", f.getScript());
p.print();

%>