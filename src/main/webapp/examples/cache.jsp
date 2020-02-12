<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

Cache cache = new Cache();
boolean cacheFlag = false;

DataSet posts = cache.getDataSet("posts_cache");
if(posts == null) {
	DB db = new DB();
	posts = db.select("Blog.selectAll", null);
	cache.save("posts_cache", posts);
} else {
	cacheFlag = true;
}

m.p(cacheFlag);
m.p(posts);

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
Cache cache = new Cache();
boolean cacheFlag = false;

DataSet posts = cache.getDataSet("posts_cache");
if(posts == null) {
	DB db = new DB();
	posts = db.select("Blog.selectAll", null);
	cache.save("posts_cache", posts);
} else {
	cacheFlag = true;
}

m.p(cacheFlag);
m.p(posts);
</pre>