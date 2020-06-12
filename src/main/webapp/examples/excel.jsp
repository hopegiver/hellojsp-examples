<%@ page contentType="text/html; charset=utf-8" %><%@ include file="/init.jsp" %><%

Excel excel = new Excel();

String[] columns = {"login_id", "name", "passwd", "email", "cellphone", "zipcode", "address1", "address2", "reg_date"};
DataSet rs = excel.read(Config.getDataDir() + "/sample.xlsx", columns);

m.p(rs);

/*
rs.next();
String[] columns2 = {"login_id=>아이디", "name=>이름", "passwd=>암호", "email=>이메일", "cellphone=>휴대전화", "zipcode=>우편번호", "address1=>주소1", "address2=>주소2", "reg_date=>등록일"};
excel.write("/tmp/xxxx.xlsx", rs, columns2);

m.download("/tmp/xxxx.xlsx", "회원정보.xlsx");
m.delFile("/tmp/xxxx.xlsx");
*/

%>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<pre>
Excel excel = new Excel();

String[] columns = {"agent", "course", "cid", "step", "course_id", "class_id", "user_id"};
DataSet rs = excel.read(Config.getDataDir() + "/sample.xlsx", columns);

//m.p(rs);
String[] columns2 = {"agent=>에이전트", "course=>과정", "cid=>과정코드", "step=>차수", "course_id=>과정번호", "class_id=>강의실번호", "user_id=>회원번호"};
excel.write("/tmp/xxxx.xlsx", columns2, rs);

m.download("/tmp/xxxx.xlsx", "xxxx.xlsx");
m.delFile("/tmp/xxxx.xlsx");
</pre>