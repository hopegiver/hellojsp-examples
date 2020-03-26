<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

auth.put("user_id", "");
auth.save();
auth.destroy();

j.success("logout", null);

%>