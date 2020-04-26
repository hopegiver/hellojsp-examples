<%@ page contentType="text/html; charset=utf-8" %><%@ include file="init.jsp" %><%

//Step1
DataSet tree = new DataSet();
tree.addRow();
tree.put("id", "grade");
tree.put("pid", "");
tree.put("name", "Grade");
tree.addRow();
tree.put("id", "type");
tree.put("pid", "");
tree.put("name", "Type");
tree.addRow();
tree.put("id", "g01");
tree.put("pid", "grade");
tree.put("name", "Grade 01");
tree.addRow();
tree.put("id", "g02");
tree.put("pid", "grade");
tree.put("name", "Grade 02");
tree.addRow();
tree.put("id", "gg01");
tree.put("pid", "g01");
tree.put("name", "Grade 0101");
tree.addRow();
tree.put("id", "gg02");
tree.put("pid", "g02");
tree.put("name", "Grade 0202");
tree.addRow();
tree.put("id", "t03");
tree.put("pid", "type");
tree.put("name", "Type 03");
tree.addRow();
tree.put("id", "t04");
tree.put("pid", "type");
tree.put("name", "Type 04");


//Step5
p.setLayout("admin");
p.setBody("admin/tree");
p.setLoop("list", tree);
p.print();


%>