var list = {
	templateUrl: 'tpl/index.html',
	dataUrl: 'api/index.jsp',
	submit: function(f) {
		alert('회원 검색폼 서브밋');
	}
};

var edit = {
	templateUrl: 'tpl/edit.html',
	dataUrl: 'api/edit.jsp',
	success: function(ret) {
		location.href = '#/list';
	}
}

var view = {
	templateUrl: 'tpl/view.html',
	dataUrl: 'api/view.jsp'
}

var add = {
	templateUrl: 'tpl/add.html',
	dataUrl: 'api/add.jsp',
	success: function(ret) {
		location.href = '#/list';
	}
}

var del = {
	templateUrl: 'tpl/delete.html',
	dataUrl: 'api/delete.jsp',
	success: function(ret) {
		location.href = '#/list';
	}
};

var logout = {
	dataUrl: 'api/logout.jsp',
	after: function(ret) {
		location.href = 'login.html';
	}
};

$(document).ready(function() {
	$('#main').router({
		routes: {
			'/': list,
			'/list': list,
			'/edit': edit,
			'/view': view,
			'/add': add,
			'/del': del,
			'/logout': logout
		},
		error: function(ret) {
			if(ret.error == 100) {
				location.href = 'login.html';
			} else {
				alert(ret.message);
			}
		}
	});
});