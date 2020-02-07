
function OpenWindow(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=no,resizable=no");
	//return qResult;
}

function OpenWindows(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=1,resizable=no");
	//return qResult;
}



window.m = { 
	SetCookie: function(name, value, expires, path, domain, secure) { //expires : 초
		var date = new Date();
		date.setSeconds(date.getSeconds() + expires);

		document.cookie= name + "=" + encodeURIComponent(value) + "; path=" + ((path) ? path : "/") +
		((expires) ? "; expires=" + date.toGMTString() : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	}
	, GetCookie: function(name) {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0) return null;
		} else {
			begin += 2;
		}
		var end = document.cookie.indexOf(";", begin);
		if (end == -1) {
			end = dc.length;
		}
		return decodeURIComponent(dc.substring(begin + prefix.length, end)).replace(/\+/g, ' ');
	}
	, SetFormValue: function(form, n, v, sep) {
		var f = typeof(form) == 'string' ? document.forms[form] : form;	
		if(!f || !f[n]) return false;
		switch(f[n].type) {
			case 'text':
			case 'password':
			case 'hidden':
				f[n].value = v;
				break;
			case 'textarea':
				f[n].value = v;
				break;
			case 'checkbox':
				if(f[n].value == v) f[n].checked = true;
				break;
			case 'select-one':
				for(var i=0; i<f[n].options.length; i++) if(f[n].options[i].value == v) f[n].options[i].selected = true;
				break;
			default:
				if(sep) {
					var val = v.split(sep);
					for(var i=0; i<f[n].length; i++) {
						for(var j=0; j<val.length; j++) {
							if(f[n][i].value == val[j])  f[n][i].checked = true;
						}
					}
				}
				else {
					for(var i=0; i<f[n].length; i++) if(f[n][i].value == v) f[n][i].checked = true;			
				}
				break;
		}
	}
	, SetFormValues: function(form, data) {
		var f = typeof(form) == 'string' ? document.forms[form] : form;	
		for(var name in data) {
			utils.SetFormValue(f, name, data[name]);
		}
	}
	, GetFormValue: function(f, n) {
		if(f == document) {
			var el = document.getElementsByName(n);
			if(el.length == 1) el = el[0];
		} else {
			var f = document.forms[f];
			var el = f[n];
		}
		if(!f || !el) return false;
		switch(el.type) {
			case 'text':
			case 'file':
			case 'password':
			case 'hidden':
				return el.value;
				break;
			case 'textarea':
				return el.text;
				break;
			case 'checkbox':
				if(el.checked == true) return el.value;
				break;
			case 'select-one':
				for(var i=0; i<el.options.length; i++) {
					if(el.options[i].selected == true) {
						return el.options[i].value;
					}
				}
				break;
			default:
				var arr = new Array();
				var j = 0;
				for(var i=0; i<el.length; i++) {
					if(el[i].checked == true) {
						 arr[j] = el[i].value;
						 j++;
					}
				}
				return arr.join(",");
				break;
		}
		return false;
	}
	, API: function(url, callback) {
		var initailize = {
			  "url": ''
			, cache: false
			, dataType: 'json'
			, type: 'get'
			, data: null
		}
		if(typeof url == 'string') initailize.url = url;
		else if(typeof url == 'object') $.extend(initailize, url);

		$.ajax(initailize).done(function(data) {
			if(null != data) {
				if(data.authcode == '00') {
					alert(new FormChecker().FORM_ERROR_MSG.expiredSession);
					window.location.href = '../jsp/login.jsp';
				} else {
					// 에러 처리 //
					//if(data.errmsg != "00") { 
					if(data.errmsg) { 
						utils.OpenWindow("popup-error", {
							group: "ERROR"	
							, afterOpen: function() {
								$("#errmsg").html(data.errmsg);
								$("#errmsg-detail").val(data.errdetail);
							}
						});
					}
					callback(data);
				}
			}
		}).always(function() { })
		;
	}
	, JsonToQuery: function(obj) {
		return decodeURIComponent($.param(obj));
	}
	, Validator: function(f, validatorName, values, callback) {
		$.getJSON("/lib/validator.json?_" + new Date().getTime(), function(data) {
			var attrs = data[validatorName];
			if(typeof(f) == "string") f = document.forms[f];
			for(var name in attrs) {
				if(el = f[name]) {
					var a = attrs[name];
					if(typeof(a) == 'object') { 
						if(el.type != 'select-one' && el.length > 1) el = el[0]; 
						for(var k in a) el.setAttribute(k, a[k]); 
					}
				}
			}
			for(var name in values) {
				if(el = f[name]) {
					if(values && values[name]) {
						utils.SetFormValue(f, name, values[name]);
					}
				}
			}
			if(!f.onsubmit) f.onsubmit = function() {
				return validate(f);
			};

			if(callback) callback(data);
		});
	}

	, request: function(name) {
		var value = '';
		var url = decodeURIComponent(location.href);
		var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
		for(var i = 0 ; i < parameters.length ; i++) {
			var key = parameters[i].split('=')[0];
			if(key.toUpperCase() == name.toUpperCase()) {
				value = parameters[i].split('=')[1];
				break;
			}
		}
		return value;
	}
	, rs: function(name) {
		return this.request(name);
	}
	, PhoneNumber: function(el) {
		el.value = this._PhoneNumber(el.value);
	}
	, _PhoneNumber: function(value) {
		value = value.replace(/[^0-9]/g, "")
		var pattern = new RegExp("^(02|[0-9]{3})([0-9]{" + (value.length <= (/^02/.test(value) ? 9 : 10) ? 3 : 4) + "})?([0-9]{4})?");
		var arr = value.replace(pattern, "$1-$2-$3").replace(/--/g, "-").split("-");
		if(arr[2]) arr[2] = arr[2].substring(0, 4);
		return arr.join("-", arr);
	}
	, GlobalLayers: new Array()
	, GlobalLayerGroups: new Array()
	, GlobalLayerFuncs: []
	, OpenLayer: function(nId, opts) {
		var layerId = new Date().getTime();
		var group = "GEN";
		if(opts && opts.group) group = opts.group;
		this.GlobalLayers.push(layerId);
		if(!this.GlobalLayerGroups[group]) this.GlobalLayerGroups[group] = new Array();
		this.GlobalLayerGroups[group].push(layerId);
		this.GlobalLayerFuncs[layerId] = opts;

		if(this.GlobalLayerFuncs[layerId] && this.GlobalLayerFuncs[layerId].beforeOpen) {
			if(this.GlobalLayerFuncs[layerId].beforeOpen() === false) return;
		}

		if(!opts || (opts && !opts.nodim)) {
			var dim = document.createElement("div");
			document.body.appendChild(dim);
			dim.id = "dim-layer" + layerId;
			dim.style.position = "absolute";
			dim.style.zIndex = 999999 + this.GlobalLayers.length;
			dim.style.background = "#aaa";
			dim.style.filter = "alpha(opacity=0)";
			dim.style.opacity = 0;
			dim.style.top = "0px";
			dim.style.left = "0px";
			dim.style.width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) + "px";
			dim.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + "px";
			dim.onclick = function() {
				utils.CloseLayer(group);
			}
		}

		var wrap = document.createElement("div");
		wrap.id = "wrap-layer" + layerId;
		wrap.setAttribute("group", group);
		wrap.style.zIndex = 1999999 + this.GlobalLayers.length + 1;
		wrap.style.padding = "0px";
		wrap.style.background = "#fff";
		wrap.style.position = "absolute";
		//wrap.style.boxShadow = "0px 0px 15px #bbb";

		var area = document.createElement("div");
		//area.innerHTML = document.getElementById(nId).innerHTML;
		$(area).html($("#" + nId).html());

		wrap.appendChild(area);

		if(opts && opts.el) {
			document.body.appendChild(wrap);
			var offset = $(opts.el).offset();
			wrap.style.top = offset.top + (opts.y ? eval(opts.y) : 0) + "px";
			wrap.style.left = offset.left + (opts.x ? eval(opts.x) : 0) + "px";

		} else {
			document.body.appendChild(wrap);
			var ch = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
			var cw = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
			var nHeight = area.offsetHeight;
			var nWidth = area.offsetWidth;
			wrap.style.top = (typeof(yPos) == 'number' ? yPos : (ch / 2 - nHeight/2)) + "px";
			wrap.style.left = (typeof(xPos) == 'number' ? xPos : (cw / 2 - nWidth / 2)) + "px";
		}

		if(this.GlobalLayerFuncs[layerId] && this.GlobalLayerFuncs[layerId].afterOpen) {
			if(this.GlobalLayerFuncs[layerId].afterOpen() === false) return;
		}

		$("[placeholder]").stickyPlaceholders();

		if(window.addEventListener) window.addEventListener("resize", function() { utils.CloseLayer(); });
		else if(window.attachEvent) window.attachEvent("onresize", function() { utils.CloseLayer(); });

		return wrap;

	}
	, CloseLayer: function(group) {
		this.HideValidatorMsg();

		if(!group) group = "GEN";
		layerId = this.GlobalLayerGroups[group].pop();
		if(this.GlobalLayerFuncs[layerId] && this.GlobalLayerFuncs[layerId].beforeClose) {
			if(this.GlobalLayerFuncs[layerId].beforeClose() === false) return;
		}
		if(document.getElementById("dim-layer" + layerId)) 
			document.getElementById("dim-layer" + layerId).parentNode.removeChild(document.getElementById("dim-layer" + layerId));
		if(document.getElementById("wrap-layer" + layerId)) 
			document.getElementById("wrap-layer" + layerId).parentNode.removeChild(document.getElementById("wrap-layer" + layerId));
		if(document.getElementById("oo-layer" + layerId)) 
			document.getElementById("oo-layer" + layerId).parentNode.removeChild(document.getElementById("oo-layer" + layerId));

		if(this.GlobalLayerFuncs[layerId] && this.GlobalLayerFuncs[layerId].afterClose) {
			if(this.GlobalLayerFuncs[layerId].afterClose() === false) return;
		}
	}
	, HideValidatorMsg: function() {
		//임시
		var altId = "#_VALIDATOR_MSG_";
		$(altId).hide();
		$(altId + "arrow").hide(); 
	}

	, GlobalWinLayers: new Array()
	, GlobalWinLayerGroups: new Array()
	, GlobalWinLayerFuncs: []
	, OpenWindows: this.OpenWindow(nId, opts, nWidth, nHeight, xPos, yPos, true)
	, OpenWindow: function(nId, opts, nWidth, nHeight, xPos, yPos, scr) {
		//var layerId = new Date().getTime();
		var layerId = nId;
		var group = "GEN";
		if(opts && opts.group) group = opts.group;
		this.GlobalWinLayers.push(layerId);
		if(!this.GlobalWinLayerGroups[group]) this.GlobalWinLayerGroups[group] = new Array();
		this.GlobalWinLayerGroups[group].push(layerId);
		this.GlobalWinLayerFuncs[layerId] = opts;

		if(this.GlobalWinLayerFuncs[layerId] && this.GlobalWinLayerFuncs[layerId].beforeOpen) {
			if(this.GlobalWinLayerFuncs[layerId].beforeOpen() === false) return;
		}

		var dim = document.createElement("div");
		document.body.appendChild(dim);
		dim.id = "dim-layer" + layerId;
		dim.style.position = "absolute";
		dim.style.zIndex = 999999 + this.GlobalWinLayers.length;
		dim.style.background = "#aaa";
		dim.style.filter = "alpha(opacity=50)";
		dim.style.opacity = 0.5;
		dim.style.top = "0px";
		dim.style.left = "0px";
		dim.style.width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) + "px";
		dim.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + "px";
		dim.onclick = function() {
			utils.CloseWindow(group);
		}

		var wrap = document.createElement("div");
		wrap.id = "wrap-layer" + layerId;
		wrap.setAttribute("group", group);
		wrap.style.position = "absolute";
		wrap.style.zIndex = 999999 + this.GlobalWinLayers.length + 1;
		wrap.style.padding = "0px";
		wrap.style.background = "#fff";
		wrap.style.boxShadow = "0 0 15px #444";

		var area = document.createElement("div");
		if(scr) area.style.overflow = auto;
		//area.innerHTML = document.getElementById(nId).innerHTML;
		$(area).html($("#" + nId).html());

		wrap.appendChild(area);
		document.body.appendChild(wrap);

		var ch = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
		var cw = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
		if(!nHeight) nHeight = area.offsetHeight;
		if(!nWidth) nWidth = area.offsetWidth;
		wrap.style.top = (typeof(yPos) == 'number' ? yPos : (ch / 2 - nHeight/2)) + "px";
		wrap.style.left = (typeof(xPos) == 'number' ? xPos : (cw / 2 - nWidth / 2)) + "px";

		if(this.GlobalWinLayerFuncs[layerId] && this.GlobalWinLayerFuncs[layerId].afterOpen) {
			if(this.GlobalWinLayerFuncs[layerId].afterOpen() === false) return;
		}

		try { 
			var el = wrap.getElementsByTagName("h1")[0];
			el.style.cursor = "move";
			utils.MDrag(el, wrap);
		} catch(e) {
			alert("Can not found h1!");
		}
		$("[placeholder]").stickyPlaceholders();
	}
	, CloseWindow: function(group) {

		this.HideValidatorMsg();

		if(!group) group = "GEN";
		layerId = this.GlobalWinLayerGroups[group].pop();
		if(this.GlobalWinLayerFuncs[layerId] && this.GlobalWinLayerFuncs[layerId].beforeClose) {
			if(this.GlobalWinLayerFuncs[layerId].beforeClose() === false) return;
		}
		if(document.getElementById("dim-layer" + layerId)) 
			document.getElementById("dim-layer" + layerId).parentNode.removeChild(document.getElementById("dim-layer" + layerId));
		if(document.getElementById("wrap-layer" + layerId)) 
			document.getElementById("wrap-layer" + layerId).parentNode.removeChild(document.getElementById("wrap-layer" + layerId));

		if(this.GlobalWinLayerFuncs[layerId] && this.GlobalWinLayerFuncs[layerId].afterClose) {
			if(this.GlobalWinLayerFuncs[layerId].afterClose() === false) return;
		}
	}
	, MDrag: function(element, tgt) {
		var self = this;
		element.onmousedown = function(e){
			self.etarget = tgt;
			var e = window.event || e;
			var initmousex = e.clientX;
			var initmousey = e.clientY;
			var initx = tgt.offsetLeft;
			var inity = tgt.offsetTop;
			var width = tgt.offsetWidth;
			document.onmousemove = function(e) {
				var e = window.event || e;
				var distancex = e.clientX - initmousex;
				var distancey = e.clientY - initmousey;
				self.etarget.style.left = distancex + initx + "px";
				self.etarget.style.top = distancey + inity + "px";
				return false;
			}
			document.onmouseup = function() {
				self.etarget = null;
				document.onmousemove = null;
				document.onmouseup = null;
			}
			//임시
			var altId = "#_VALIDATOR_MSG_";
			$(altId).hide();
			$(altId + "arrow").hide(); 
			//
			return false;
		}
		return element;
	}
	, p: function(obj, flag) { //개발용..
		if(!flag) {
			var id = "__TE2323KF__";
			var area = document.getElementById(id) || document.createElement("div");
			area.style.display = "none";
			area.id = id;
			var s = "";
			if(typeof obj == 'string' || typeof obj == 'number' || typeof obj == 'boolean') {
				s = obj;
			} else {
				for(var x in obj) {
					s += '<strong>' + x + '</strong> = '; 
					s += ("" + obj[x]).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "<br>";
				}
			}
			area.innerHTML = "<div style='border:3px solid #c0c0c0'>"
				+ "<h1 style='font-size:16px; font-family:tahoma; background:#d0d0d0; padding:10px;'>Dev Message</h1>" 
				+ "<div style='min-width:150px; min-height:100px; max-width:900px; max-height:500px; overflow:auto; padding:10px;'>" 
				+ s
				+ "</div>"
			;
			document.body.appendChild(area);
			this.OpenWindow(id, { group: 'DEBUG' });
		} else {
			for(var x in el) {
				alert(x + " === " + el[x]);
			}
		}
	}
	, Alert: function(obj, func) {
		alert(obj); //재 정의 할거다. 할려나?
	}
	, Confirm: function(obj, func) {
		return confirm(obj); //재 정의 할거다. 할려나?
	}
	, ImageError: function(el, url) {
		var noimg = new Image();
		noimg.src = url ? url : "../html/images/no_img_s.gif";
		if(el) el.src = noimg.src;
	}
	, GetFileIcon: function(filename) {
		var ext = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
		return '<img src="../html/images/icon/' + ext + '.gif" onerror="utils.ImageError(this, \'../html/images/icon/unknown.gif\')">';
	}
}


String.prototype.format = function(args) {
	var newStr = this;
	for(var key in args) {
		newStr = newStr.replace(new RegExp("{" + key + "}", "g"), args[key]);
	}
	return newStr;
}