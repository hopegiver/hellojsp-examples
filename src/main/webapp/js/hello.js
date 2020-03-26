_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

$.ajaxSetup({cache:false});

$.fn.template = function(component) {
	var el = this;
	if(_.isString(component.el)) el = $(component.el);

	//폼 서브밋 함수 : 템플릿에 form 태그가 존재할 경우 연동된다.
	var submit = function(component) {
		el.find('form').each(function(index, f) {
			var f = this;
			$(this).on('submit', function(ret) {
				event.preventDefault();
				if(_.isFunction(component.submit)) {
					component.submit(f);					
				} else {
					$.ajax({
						url: component.dataUrl,
						type: 'POST',
						dataType: 'json',
						//processData: false,
						//contentType: false,
						//data: new FormData(f),
						data: $(f).serialize(),
						success: function(ret) {
							if(ret.error == 0) {
								if(_.isFunction(component.success)) component.success(ret);
								else if(ret.message != '') alert(ret.message);
							} else {
								if(_.isFunction(component.error)) component.error(ret);
								else alert(ret.message);
							}
						},
						error: function(ret) {
							console.log(component.dataUrl + ' has error.');
							console.log(ret.responseText);
						}
					})
				}
				return false;
			});
		});
	}

	//렌더링 함수 : 템플릿과 데이타를 조합하여 출력하는 함수
	var render = function(component) {
		if(_.isFunction(component.before)) component.before(el);
		if(_.isObject(component.data)) {
			el.$data = component.data;
			el.html(component.$template(component.data));
			if(_.isFunction(component.after)) component.after(el);
			if(_.isFunction(component.submit) || _.isFunction(component.success)) submit(component);
		} else if(_.isString(component.dataUrl)) {
			var url = component.dataUrl
			if(_.isString(el.$serverUrl) && url.indexOf('http:') != 0  && url.indexOf('https:') != 0 && url.indexOf('//') != 0) {
				url = el.$serverUrl + component.dataUrl;
			}
			if(el.$query != '') url += (component.dataUrl.indexOf("?") > 0 ? "&" : "?") + el.$query;
			$.getJSON(url, function(ret) {
				el.$data = ret;
				if(ret.error == 0) {
					el.html(component.$template(ret.data));
					if(_.isFunction(component.after)) component.after(el);
					if(_.isFunction(component.submit) || _.isFunction(component.success)) submit(component);
				} else if(_.isFunction(component.error)) {
					component.error(ret);					
				} else if(_.isFunction(el.$error)) {
					el.$error(ret);
				} else {
					alert(ret.message);
				}
			}).fail(function(ret) {
				console.log(url + ' has error.');
				console.log(ret.responseText);
			});
		} else {
			el.html(component.$template());
			if(_.isFunction(component.after)) component.after(el);
			if(_.isFunction(component.submit) || _.isFunction(component.success)) submit(component);
		}
	}

	//템플릿을 가져와서 템플릿 함수를 생성한 후 렌더링 실행
	if(_.isFunction(component.$template)) {
		render(component);
	} else if(_.isString(component.templateUrl)) {
		$.get(component.templateUrl, function(ret) {
			component.$template = _.template(ret);
			render(component);
		}).fail(function() {
			console.log(component.templateUrl + ' is not exists.');
		});
	} else if(_.isString(component.templateId)) {
		component.$template = _.template($(component.templateId).html());
		render(component);
	} else if(_.isString(component.template)) {
		component.$template = _.template(component.template);
		render(component);
	} else {
		component.$template = _.template(el.html());
		render(component);
	}
};

$.fn.router = function(config) {
	var el = this;
	if(_.isObject(config)) {
		if(_.isString(config.serverUrl)) el.$serverUrl = config.serverUrl;
		if(_.isFunction(config.error)) el.$error = config.error;
		if(_.isObject(config.routes)) {
			el.$routes = config.routes;
			if(window.addEventListener) {
			  window.addEventListener('hashchange', function() { el.router(); }, false);
			} else {
			  window.attachEvent('onhashchange', function() { el.router(); });
			}
		}
	}

	var hash = window.location.hash.substring(1);
	if(hash == '') {
		location.replace('#/');
		return;
	}
	if(hash[0] != '/') {
		location.replace('#/' + hash);
		return;
	}

	var arr = hash.split('?');
	var path = el.$path = arr[0];
	var query = el.$query = arr.length == 2 ? arr[1] : "";

	if(_.isObject(el.$routes[path])) {
		el.template(el.$routes[path]);
	} else {
		var url = window.location.pathname + hash.substring(1);
		if(_.isString(el.$serverUrl)) url = el.$serverUrl + url;
		$.get(url, function(ret) {
			el.html(ret);
		}).fail(function() {
			location.replace('#/');
		});
	}
};

function MovePage(no) {
    var hash = window.location.hash;
    var arr = hash.split('?');
    
    if(arr.length == 2) {
	    var vars = arr[1].split('&');
	    var flag = false;
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split('=');
	        if (decodeURIComponent(pair[0]) == 'page') {
	            vars[i] = 'page=' + no;
	            flag = true;
	        }
	    }
	    if(flag == false) vars.push('page=' + no);
	    hash = arr[0] + '?' + vars.join('&');
    } else {
    	hash = arr[0] + '?page=' + no;
    } 
    
    location.href = hash;
}