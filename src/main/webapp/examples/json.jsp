<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

DataMap map = new DataMap();
map.put("subject", "Nice to meet you.");
map.put("content", "Nice to meet you too.");
map.put("reg_date", Hello.time());
map.put("status", 1);

String json = Json.encode(map);
m.p(json);

HashMap<String, Object> map2 = Json.decode(json);
m.p(map2);

Json j = new Json(Config.getDocRoot() + "/data/sample.json");
//j.setDebug(out);

String value = j.getString("menu.popup.menuitem[0].value");
m.p(value);

DataSet items = j.getDataSet("menu.popup.menuitem");
m.p(items);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
DataMap map = new DataMap();
map.put("subject", "Nice to meet you.");
map.put("content", "Nice to meet you too.");
map.put("reg_date", Hello.time());
map.put("status", 1);

String json = Json.encode(map);
m.p(json);

HashMap<String, Object> map2 = Json.decode(json);
m.p(map2);

Json j = new Json(Config.getDocRoot() + "/data/sample.json");
//j.setDebug(out);

String value = j.getString("menu.popup.menuitem[0].value");
m.p(value);

DataSet items = j.getDataSet("menu.popup.menuitem");
m.p(items);
</pre>