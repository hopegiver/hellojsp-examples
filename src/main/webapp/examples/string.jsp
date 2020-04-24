<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

String tag = "'<u>&nbsp;\"xxxx\"&nbsp;&nbsp;&nbsp;&nbsp;</u>\r\nxxxxxxxxxxxxxxxxxxxxxx'";
f.addElement("subject", tag, null);
f.addElement("description", tag, null);

%>
<form name="form1">
<input type="text" name="subject" style="width:500px"><br/><br/>
<textarea name="description" style="width:500px;height:100px"></textarea>
</form>
<%= f.getScript() %>