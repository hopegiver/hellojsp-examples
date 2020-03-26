<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
BlogDao blog = new BlogDao();

//Step2
int id = m.reqInt("id");
if(id == 0) { j.error(1, "Primary Key is required"); return; }

//Step3
DataSet info = blog.find("id = " + id);
if(!info.next()) { j.error(1, "No Data"); return; }

f.addElement("id", info.s("id"), "title:'ID', required:true");

//Step5
if(m.isPost() && f.validate()) {

	if(!"".equals(info.s("att_file_code"))) {
		m.delFile(f.uploadDir + "/" + info.s("att_file_code"));
	}
	blog.item("status", -1);

	//blog.setDebug(out);
	if(!blog.update("id = " + id)) {
		j.error(1, "Error occurred(delete)");
		return;
	}

	j.success("success", null);
	return;
}

//Step6
p.setVar("info", info);
p.setVar("form_script", f.getScript());
p.print(1);

%>