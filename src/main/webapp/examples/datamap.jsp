<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

DataMap map = new DataMap();

map.put("id", 1);
map.put("score", 92.5);
map.put("name", "Daniel");
map.put("date", new Date());

int id = map.getInt("id");
double score = map.getDouble("score");
String name = map.getString("name");
Date now = (Date)map.get("date");

m.p(id);
m.p(score);
m.p(name);
m.p(now);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
DataMap map = new DataMap();

map.put("id", 1);
map.put("score", 92.5);
map.put("name", "Daniel");
map.put("date", new Date());

int id = map.getInt("id");
double score = map.getDouble("score");
String name = map.getString("name");
Date now = (Date)map.get("date");

m.p(id);
m.p(score);
m.p(name);
m.p(now);
</pre>