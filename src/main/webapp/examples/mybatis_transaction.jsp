<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

DB db = new DB();
//db.setDebug(out);

DataMap map = new DataMap();
map.put("subject", "Nice to meet you.");
map.put("content", "Nice to meet you too.");
map.put("reg_date", Hello.time());
map.put("status", 1);

db.begin();
db.insert("Blog.insert", map);
map.put("id", 1);
db.update("Blog.update", map);
db.commit();

m.p(db.errMsg);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
DB db = new DB();
//db.setDebug(out);

DataMap map = new DataMap();
map.put("subject", "Nice to meet you.");
map.put("content", "Nice to meet you too.");
map.put("reg_date", Hello.time());
map.put("status", 1);

db.begin();
db.insert("Blog.insert", map);
map.put("id", 1);
db.update("Blog.update", map);
db.commit();

m.p(db.errMsg);
</pre>