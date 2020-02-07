var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
var isSF = navigator.userAgent.toLowerCase().indexOf("safari") != -1;

if(typeof(document.getElementsByClassName) !== "function") {
	document.getElementsByClassName = function(className) {
		var arr = [];
		var ele = document.getElementsByTagName("*");
		var cnt = ele.length;
		for(var i=0;i<cnt;i++) {
			if((" "+ele[i].className+" ").indexOf(" "+className+" ") > -1) {
				arr.push(ele[i]);
			}
		}
		return arr;
	};
}
function SetCookie(name, value, expires, path, domain, secure) { //expires : 초
	var date = new Date();
	date.setSeconds(date.getSeconds() + expires);

	document.cookie= name + "=" + escape(value) + "; path=" + ((path) ? path : "/") +
	((expires) ? "; expires=" + date.toGMTString() : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

function GetCookie(name) {
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
	return unescape(dc.substring(begin + prefix.length, end));
}

function DelCookie(name, path, domain)
{
    if (GetCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function OpenDialog(nLink, nWin, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;
	var qResult = window.showModalDialog( url, nWin, "dialogwidth:"+nWidth+"px;dialogheight:"+nHeight+"px;toolbar:no;location:no;help:no;directories:no;status:no;menubar:no;scroll:no;resizable:no");
}

function OpenWindow(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,scrollbars=no,resizable=no");
	//return qResult;
}

function OpenWindows(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,scrollbars=1,resizable=no");
	//return qResult;
}

function OpenWindowr(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,scrollbars=no,resizable=1");
	//return qResult;
}

var GlobalLayers = new Array();
var TopLayer = "";
function OpenLayer(nLink, nTarget, nWidth, nHeight, xPos, yPos, scr) {
	//isMobile = true;
	var layerId = new Date().getTime();
	GlobalLayers.push(layerId);
	TopLayer = layerId;

	var dim = document.createElement("div");
	document.body.appendChild(dim);
	dim.className = "dim-layer";
	dim.id = "dim-layer" + layerId;
	dim.style.position = "absolute";
	dim.style.zIndex = 999999 + GlobalLayers.length;
	dim.style.background = " url(/html/images/common/opa_bg.png) repeat 0 0";
//	dim.style.filter = "alpha(opacity=50)";
//	dim.style.opacity = 0.5;
	dim.style.top = "0px";
	dim.style.left = "0px";
	dim.style.width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) + "px";
	dim.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + "px";
	dim.onclick = function() {
		CloseLayer();
	}

	var wrap = document.createElement("div");
	wrap.className = "wrap-layer";
	wrap.id = "wrap-layer" + layerId;
	wrap.style.position = "fixed";
	wrap.style.zIndex = 999999 + GlobalLayers.length + 1;
	wrap.style.padding = "0px";
	wrap.style.background = "#fff";
//	wrap.style.border = "2px solid #777";
//	wrap.style.borderRadius = "5px";
//	wrap.style.boxShadow = "0 0 15px #222";
//	wrap.style.cursor = "move";
	if(nWidth == "100%") wrap.style.width = "100%";
	if(nHeight == "100%") wrap.style.height = "100%";

	var ch = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
	var cw = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
	if(xPos == "left") wrap.style.left = "5px";
	else if(xPos == "right") wrap.style.right = "5px";
	if(yPos == "top") wrap.style.top = "5px";
	else if(yPos == "bottom") wrap.style.bottom = "30px";

	//var ay = 40, ax = 38;
	var ay = 0, ax = 0;
	if(isMobile) { ay = 20; ax = 20; }
	if((nWidth + "").indexOf("%") != -1 && nWidth != "100%") nWidth = nWidth.replace("%", "") * 1 / 100 * cw - ax - 55;
	if((nHeight + "").indexOf("%") != -1 && nHeight != "100%") nHeight = nHeight.replace("%", "") * 1 / 100 * ch - ay - 55;

	if(typeof(yPos) != 'string') wrap.style.top = (nHeight != "100%" ? (typeof(yPos) == 'number' ? yPos : (ch / 2 - nHeight / 2 - ay)) + "px" : "0");
	if(typeof(xPos) != 'string') wrap.style.left = (nWidth != "100%" ? (typeof(xPos) == 'number' ? xPos : (cw / 2 - nWidth / 2 - ax)) + "px" : "0");

	var btn = document.createElement("div");
	btn.className = "btn-close";
	btn.id = "btn-close" + layerId;
	btn.style.position = "absolute";
//	if(isMobile) {
//		btn.style.top = "3px";
//		btn.style.right = "10px";
//	} else {
		btn.style.top = "15px";
		btn.style.right = "15px";
//	}
	btn.innerHTML = '<a href="javascript:;" onclick="CloseLayer(); return false;" style="display:block;"><img id="pop-close-btn" src="/html/images/common/post_closed.png" alt="닫기"></a>';
	wrap.appendChild(btn);

	if(nLink.substring(0,1) == '#') {
		var frm = document.createElement("div");
		frm.className = "pop-frame";
		frm.id = "pop-frame" + layerId;
		frm.style.width = nWidth + "px";
		frm.style.height = nHeight + "px";
		frm.innerHTML = document.getElementById(nLink.substring(1)).innerHTML;
	} else {
		var frm = document.createElement("iframe");
		frm.className = "pop-frame";
		frm.id = "pop-frame" + layerId;
		frm.width = nWidth;
		frm.height = nHeight;
		frm.frameBorder = 0;
		if(scr) frm.scrolling = scr;
		frm.src = nLink;
		frm.setAttribute("name", nTarget);
		frm.setAttribute("id", nTarget);
	}
	wrap.appendChild(frm);
	document.body.appendChild(wrap);

	wrap.ondblclick = function() { 
		if(frm.src) frm.src = frm.src;	
	}

//	MDrag.init(wrap);

	if(isMobile) {
		//if(!iPhone) addEvent("onresize", function() { try { CloseLayer(); } catch(e) {} });
	} else {
		addEvent("onkeydown", keydownListener, document.body);
	}

}
function keydownListener(e) {
	var ev = e || Event;
	if(ev.keyCode == 27) CloseLayer();
}

function CloseLayer(callback) {
	if(callback) { callback(); }

	var id = GlobalLayers.length > 0 ? GlobalLayers.pop() : "";
	var dimLayer = gi("dim-layer" + id);
	var wrapLayer = gi("wrap-layer" + id);
	var ifrm = wrapLayer.getElementsByTagName("iframe");
	if(ifrm.length > 0) ifrm[0].src = 'about:blank';
	if(dimLayer) dimLayer.parentNode.removeChild(dimLayer);
	if(wrapLayer) wrapLayer.parentNode.removeChild(wrapLayer);

	document.body.style.overflow = "auto";
	deleteEvent("onkeydown", keydownListener, document.body);
}

function StarPoint(n) {
	var str = "";
	for(var i=0; i<n; i++) {
		str += '<img src="/common/images/default/star_on.png">';
	}
	for(var i=n; i<5; i++) {
		str += '<img src="/common/images/default/star_off.png">';
	}
	document.write(str);
}


var MDrag = {
	init : function(element) {
		element.onmousedown = MDrag.start; 
		return element;
	}
	, start : function(e){
		MDrag.etarget = this;
		var e = window.event || e;
		MDrag.initmousex = e.clientX;
		MDrag.initmousey = e.clientY;
		MDrag.initx = this.offsetLeft;
		MDrag.inity = this.offsetTop;
		MDrag.width = this.offsetWidth;
		var frm = this.getElementsByTagName("iframe")[0];
		if(frm) { 
			frm.style.visibility = "hidden"; 
			MDrag.etarget.style.background = "#f0f0f0";
		}
		document.onmousemove = MDrag.distance;
		document.onmouseup = function() {
			if(frm) { 
				frm.style.visibility = "visible"; 
				MDrag.etarget.style.background = "#fff";
			}
			MDrag.stop();
		}
		return false;
	}
	, stop : function() {
		MDrag.etarget = null;
		document.onmousemove = null;
		document.onmouseup = null;
	}
	, distance : function(e) {
		var e = window.event || e;
		MDrag.distancex = e.clientX - MDrag.initmousex;
		MDrag.distancey = e.clientY - MDrag.initmousey;
		MDrag.move(MDrag.etarget, e);
		return false;
	}
	, move : function(el, e) {
		el.style.left = MDrag.distancex + MDrag.initx + "px";
		el.style.top = MDrag.distancey + MDrag.inity + "px";
	}
}

function gi(id, style) { 
	if(style) {
		var tmp = style.split(":");
		if(tmp.length == 2) {
			if(tmp[0] == "className") eval("document.getElementById(id)." + tmp[0] + " = '" + tmp[1] + "'");
			else eval("document.getElementById(id).style." + tmp[0] + " = '" + tmp[1] + "'");
		}
	}
	return document.getElementById(id); 
}




function ConfirmAction(obj) {
	if(confirm(obj.name + "하시겠습니까?")) {
		location.href = obj.href;
	}
}

function BtnConfirmGo(obj, url) {
	var msg;
	if(typeof obj == "object") msg = obj.value;
	else msg = obj;
	if(confirm(msg + "하시겠습니까?")) {
		location.href = url;
	}
}

function Go(url) {
	location.href = url;
}

function IfGo(msg, url, url2) {
	if(confirm(msg)) Go(url);
	else {
		if(!url2) return false;
		else Go(url2);
	}
	return true;
}

function ConfirmCheckGo(f, n, url, msg) {
    var idx = GetFormValue(f, n);
    if(idx == "") {
        alert("선택 항목이 없습니다.");
    } else {
        if(confirm(msg)) {
            location.href = url + idx;
        }
    }
}

function ResizeImage(el, w, h) {
	var img = new Image();
	img.src = el.src;

	if(el.width > img.width) el.width = img.width;
	if(el.height > img.height) el.height = img.height;

	var sheight = el.width * img.height / img.width;
	var swidth = el.height * img.width / img.height;

	if(swidth < el.width) el.width = swidth;
	if(sheight < el.height) el.height = sheight;
}

function ShowLayer(n) {
	var el = document.getElementById(n);
	if(el) {
		el.style.display = 'block';
	}
}

function HideLayer(n) {
	var el = document.getElementById(n);
	if(el) {
		el.style.display = 'none';
	}
}

function AutoLayer(n) {
	var el = document.getElementById(n);
	if(!el) return;
	if(el.style.display == 'none') {
		el.style.display = 'block'
	} else {
		el.style.display = 'none'
	}
}

function validate(el) {
	return true;
}

function SetElementValue(element, v, sep) {
	if(!element) return false;
	switch(element.type) {
		case 'text':
		case 'password':
		case 'hidden':
			element.value = v;
			break;
		case 'textarea':
			element.text = v;
			break;
		case 'checkbox':
			if(element.value == v) element.checked = true;
			break;
		case 'select-one':
			for(var i=0; i<element.options.length; i++) if(element.options[i].value == v) element.options[i].selected = true;
			break;
		default:
			if(sep) {
				var val = v.split(sep);
				for(var i=0; i<element.length; i++) {
					for(var j=0; j<val.length; j++) {
						if(element[i].value == val[j])  element[i].checked = true;
					}
				}
			}
			else {
				for(var i=0; i<element.length; i++) {
					if(element[i].value == v) element[i].checked = true;
				}
			}
			break;
	}
}

function SetFormValue(f, n, v, sep) {
	var f = document.forms[f];
	if(!f || !f[n]) return false;
	switch(f[n].type) {
		case 'text':
		case 'password':
		case 'hidden':
			f[n].value = v;
			break;
		case 'textarea':
			f[n].text = v;
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

function GetFormValue(f, n) {
	var f = document.forms[f];
	if(!f || !f[n]) return false;
	switch(f[n].type) {
		case 'text':
		case 'file':
		case 'password':
		case 'hidden':
			return f[n].value;
			break;
		case 'textarea':
			if(f[n].value != '') return f[n].value;
			else return f[n].text;
			break;
		case 'checkbox':
			if(f[n].checked == true) return f[n].value;
			break;
		case 'select-one':
			for(var i=0; i<f[n].options.length; i++) {
				if(f[n].options[i].selected == true) {
					return f[n].options[i].value;
				}
			}
			break;
		default:
			var arr = new Array();
			var j = 0;
			for(var i=0; i<f[n].length; i++) {
				if(f[n][i].checked == true) {
					 arr[j] = f[n][i].value;
					 j++;
				}
			}
			return arr.join(",");
			break;
	}
	return false;
}

var AUTO_CHECK_STATUS = true;

function AutoCheck(f, n, el) {
	var f = document.forms[f];
	if(!f || !f[n]) return;
	if(el) AUTO_CHECK_STATUS = el.checked;
	if(typeof(f[n]) == "object") {
		if(f[n].length > 0) {
			for(var i=0; i<f[n].length; i++) {
				f[n][i].checked = AUTO_CHECK_STATUS;
			}
		} else {
			f[n].checked = AUTO_CHECK_STATUS;
		}
		if(AUTO_CHECK_STATUS == true) {
			AUTO_CHECK_STATUS = false;
		} else {
			AUTO_CHECK_STATUS = true;
		}
	}
}
function ToggleCheck(el, name) {
	var elements = document.getElementsByName(name);
	for(var i=0; i<elements.length; i++) {
		elements[i].checked = el.checked;
	}
}

function CheckGo(f, n, url, msg, confMsg) {
	var idx = GetFormValue(f, n);
	if(idx == "") {
		alert(msg);
	} else {
		if(confMsg && !confirm(confMsg)) return;
		if(url.indexOf("javascript:") != -1) {
			eval(url.replace("javascript:", ""));
		} else {
			location.href = url + idx;
		}
	}
}

function ResizeIframe(n) {
	var nodes = document.body.childNodes;
	var preHeight = 0;
	for(var x in nodes) if(nodes[x].offsetHeight) preHeight += nodes[x].offsetHeight;

	var h;
	if(el = parent.document.getElementById(n)) {
		el.height = preHeight;
		if(isIE) h = document.body.scrollHeight;
		else h = document.documentElement.scrollHeight + 1;
		if(h > 10) el.height = h;
		else el.height = 0;
	}
}

function GoNext(fm,pos,size) {

	if(fm.elements[0].name == "PHPSESSID") {
		pos++;
	}

	next_pos = pos + 1;
	value = fm.elements[pos].value;
	len = value.length;
	is_num = Number(value);

	if(!is_num) {
		if((len > 0) && (value != '0') && (value != '00') && (value != '000')) {
			alert('숫자를 넣어주세요');
			fm.elements[pos].select();
			fm.elements[pos].focus();
			return false;
		}
	}

	if(len == size) {
		fm.elements[next_pos].focus();
		return true;
	}
}

function MoveNext(el, next, size) {
	var len = el.value.length;
	if(len == size) {
		next.focus();
		return true;
	}
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

   for (i = 0; i < sText.length && IsNumber == true; i++) {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1) {
         IsNumber = false;
      }
   }

   return IsNumber;
}

function OnlyNumber(el) {
	if(!IsNumeric(el.value)) {
		el.value = "";
		el.focus();
	}
}

function OnlyInteger(el) {
	if(!el.value) {
		el.value = 0;
		el.focus();
	}
	if(!IsNumeric(el.value)) {
		el.value = 0;
		el.focus();
	} else {
		el.value = parseInt(el.value);
	}
}

function PhotoViewer(el) {
	var photo = new PhotoLayer();
	photo.Initialized();
	photo.doPhotoClick(el);
}

function DrawBar(cnt, max, color, width) {
	var percent;
	if(!width) width = 400;
	if(max > 0) {
		percent = Math.floor((cnt / max) * 100);
	} else {
		percent = 0;
	}
	var other = 100 - percent;
	document.write("<table align='left' width='" + width + "' cellpadding=0 cellspacing=0 height=10><tr><td width='"+percent+"%' background='../html/images/stat/s_bg_"+color+".gif'></td><td width='"+ other +"%'></td></tr></table>");
}

/* example : <script>getBarchart(230, 103, "red", "orange", "100%", 20, 2, true);</script> */
function getBarchart(max, value, color, bgcolor, width, height, point, displayValue, displayAll) {
    if(!width) width = "100%";
    if(!height) height = 20;
    if(!color) color = "#ff0000";
    if(!bgcolor) bgcolor = "orange";
    if(!point) point = 0;
    if(!displayValue) displayValue = false;
    if(!displayAll) displayAll = false;

    var rate = max > 0 ? (parseInt(value) / max) * 100 : 0;

    var bar = '<table width="' + width + '" cellpadding="0" cellspacing="0" style="table-layout:fixed;">';
    bar += '<tr>';
    if(rate > 0) bar += '<td width="' + Math.ceil(rate) + '%"><div style="height:' + (height/2 - 1) + 'px;background:' + color + ';filter:alpha(opacity=50);opacity:0.5;"><!--ie--></div></td>';
    bar += '<td height="' + (height/2 - 1) + '" bgcolor="' + bgcolor + '"><!--ie--></td>';
    bar += '</tr>';
    bar += '<tr>';
    if(rate > 0) bar += '<td width="' + Math.ceil(rate) + '%"><div style="height:' + (height/2 + 1) + 'px;background:' + color + ';filter:alpha(opacity=100);opacity:1;"><!--ie--></div></td>';
    bar += '<td height="' + (height/2 + 1) + '" bgcolor="' + bgcolor + '"><!--ie--></td>';
    bar += '</tr>';
    bar += '<tr>';
    if(rate > 0) bar += '<td></td>';
    bar += '<td align="left" class="_grp_container_">'
        + ' <div style="position:relative;">'
        + '     <div class="_grp_tip_" style="position:absolute;top:-' + (height > 10 ? Math.round(height/2) + 5 : height) + 'px;left:1px;font-size:10px;font-family:굴림;">'
        + '<nobr>' + (displayAll ? (displayValue ? value+ '(' + number_format(rate, point) + '%)' : number_format(rate, point) + '%') : "") + '</nobr>'
        + '     </div>'
        + ' </div>'
        + '</td>'
        + '</tr>'
        + '</table>';
    document.write(bar);
}

var _patchBarchart = function() {
    var tds = document.getElementsByTagName("td");
    for(var i=0; i<tds.length; i++) {
        if(tds[i].className == "_grp_container_") {
            var ptip = tds[i];
            var tip = ptip.getElementsByTagName("div")[1];
            if(tip.offsetLeft + tip.offsetWidth > ptip.offsetWidth) {
                tip.style.left = (ptip.offsetWidth - tip.offsetWidth) + "px";
            }
        }
    }
}
function patchBarchart() {
    if(window.attachEvent) window.attachEvent("onload", _patchBarchart);
    else if(window.addEventListener) window.addEventListener("load", _patchBarchart, false);
}

function initTinyMCE(theme, toolbar, els) {
	initEditor(theme, toolbar, els);
}
var Editors = new Array();
function initEditor(theme, toolbar, els) {
	var undef;
	if(toolbar === undef) toolbar = true;

	$(document).ready(function() {
		var textareas = document.getElementsByTagName("textarea");
		for(var i=0; i<textareas.length; i++) {
			if(!textareas[i].getAttribute("id")) textareas[i].setAttribute("id", textareas[i].getAttribute("name"));
			if(textareas[i].className.indexOf("NoEditor") != -1) continue;

			var myeditor = new cheditor();

			if(theme == "advanced") myeditor.templatePath = myeditor.config.editorPath + "template_advanced.xml";
			else if(theme == "full") myeditor.templatePath = myeditor.config.editorPath + "template_full.xml";
			else if(theme == "simple") myeditor.templatePath = myeditor.config.editorPath + "template_simple.xml";
			else if(theme == "user") myeditor.templatePath = myeditor.config.editorPath + "template_user.xml";
			//myeditor.config.editorWidth = (textareas[i].offsetWidth - 4)+ "px";
			myeditor.config.editorWidth = "100%";
			myeditor.config.editorHeight = textareas[i].offsetHeight + "px";
			myeditor.config.useImage = true;
			myeditor.config.useMap = false;
			myeditor.inputForm = textareas[i].getAttribute("id");
			myeditor.run();

			Editors[textareas[i].getAttribute("id")] = myeditor;
		}
	});
}
function iContent(url, tgtName, width, height) {
	if(!tgtName) tgtName = "content";
	var editor = Editors[tgtName];
	if(!editor) {
		alert("iContent Error :대상을 지정하세요.");
		return;
	}

	if(editor.cheditor.mode != "rich") { alert("입력모드로 변경하세요."); return; }
	//	if(editor.cheditor.mode != "rich") { editor.switchEditorMode("rich"); }

	var ext = url.substring(url.lastIndexOf(".") + 1, url.length);
	var widthConv = !width ? 400 : width;
	var heightConv = !height ? 300 : height;

	var able = true;
	var img = false;
	switch (ext.toLowerCase()) {
		case "gif":
		case "jpg":
		case "jpeg":
		case "png":
		case "bmp":
			var img = new Image();
			img.src = url + "?d=" + (new Date()).getTime();
			img.onload = function() {
				if(isNaN(width)) width = 0;
				if(isNaN(height)) height = 0;
				var size = { width:this.width, height:this.height };
				if(!width && !height) {
					width = 730;
					if(width > size['width']) width = size['width'];
					size['height'] = Math.round(size['height'] * (width / size['width']));
					size['width'] = width;
				}
				if(width && !height) {
					if(width > size['width']) width = size['width'];
					size['height'] = Math.round(size['height'] * (width / size['width']));
					size['width'] = width;
				} else if(!width && height) {
					if(height > size['height']) height = size['height'];
					size['width'] = Math.round(size['width'] * (height / size['height']));
					size['height'] = height;
				} else if(width && height) {
					size['width'] = width;
					size['height'] = height;
				}
				width = size['width'];
				height = size['height'];

				var h = '<img src="'+ url +'" width="' + width + '" height="' + height + '">';
				if(isIE) editor.insertContents(h);
				else editor.insertHTML(h);
			}
			img.onerror = function() {
				alert("파일 삽입에 실패하였습니다.");
			}
			return;
		case "swf":
			h = '<object width="' + widthConv + '" height="' + heightConv + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">'
			+ '<param name="src" value="' + url + '" />'
			+ '<embed width="' + widthConv + '" height="' + heightConv + '" type="application/x-shockwave-flash" src="' + url + '"></embed></object>';
			break;
		case "mp4":
		case "flv":
			h = '<object width="' + widthConv + '" height="' + heightConv + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">'
			+ '<param name="src" value="/common/cheditor/moxieplayer.swf" />'
			+ '<param name="flashvars" value="url=' + url + '" />'
			+ '<param name="allowfullscreen" value="true" />'
			+ '<param name="allowscriptaccess" value="true" />'
			+ '<param name="play" value="true" />'
			+ '<embed  width="' + widthConv + '" height="' + heightConv + '"  type="application/x-shockwave-flash" src="/common/cheditor/moxieplayer.swf" flashvars="url=' + url + '" allowfullscreen="true" allowscriptaccess="true" play="true" />'
			+ '</object>';
			break;
		case "shockwave":
			h = '<object width="' + widthConv + '" height="' + heightConv + '" classid="clsid:166b1bca-3f9c-11cf-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0">'
			+ '<param name="src" value="' + url + '" />'
			+ '<param name="sound" value="true" />'
			+ '<param name="progress" value="true" />'
			+ '<param name="autostart" value="true" />'
			+ '<param name="swstretchstyle" value="none" />'
			+ '<param name="swstretchhalign" value="none" />'
			+ '<param name="swstretchvalign" value="none" />'
			+ '<embed width="' + widthConv + '" height="' + heightConv + '" type="application/x-director" src="' + url + '" sound="true" progress="true" autostart="true" swstretchstyle="none" swstretchhalign="none" swstretchvalign="none" />'
			+ '</object>';
			break;
		case "mov":
		case "qt":
			h = '<object width="' + widthConv + '" height="' + heightConv + '" classid="clsid:02bf25d5-8c17-4b23-bc80-d3488abddc6b" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0">'
			+ '<param name="src" value="' + url + '" />'
			+ '<embed width="' + widthConv + '" height="' + heightConv + '" type="video/quicktime" src="' + url + '" />'
			+ '</object>';
			break;
		case "mp3":
			h = '<audio controls><source src="' + url + '" type="audio/mpeg"></audio>';
			break;
		case "mpeg":
		case "wmv":
		case "wma":
		case "asf":
		case "avi":
		case "wmp":
			h = '<object classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6"'
			+ ' codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"'
			+ ' width="' + widthConv + '"'
			+ ' height="' + heightConv + '">'
			+ '<param name="URL" value="' + url + '" />'
			+ '<param name="allowFullScreen" value="true">'
			+ '<param name="rate" value="1" />'
			+ '<param name="balance" value="0" />'
			+ '<param name="currentPosition" value="0" />'
			+ '<param name="defaultFrame" />'
			+ '<param name="playCount" value="1" />'
			+ '<param name="autoStart" value="true" />'
			+ '<param name="currentMarker" value="0" />'
			+ '<param name="invokeURLs" value="-1" />'
			+ '<param name="baseURL" />'
			+ '<param name="volume" value="50" />'
			+ '<param name="mute" value="0" />'
			+ '<param name="uiMode" value="full" />'
			+ '<param name="stretchToFit" value="0" />'
			+ '<param name="windowlessVideo" value="0" />'
			+ '<param name="enabled" value="-1" />'
			+ '<param name="enableContextMenu" value="-1" />'
			+ '<param name="fullScreen" value="0" />'
			+ '<param name="SAMIStyle" />'
			+ '<param name="SAMILang" />'
			+ '<param name="SAMIFilename" />'
			+ '<param name="captioningID" />'
			+ '<param name="enableErrorDialogs" value="true" />'
			+ '<embed src="' + url + '" type="application/x-mplayer2" allowFullScreen="true" width="' + widthConv + '" height="' + heightConv + '" autostart="true"></embed>'
			+ '</object>';
			break;
		case "rmp":
		case "ra":
		case "rm":
			h = '<object width="' + widthConv + '" height="' + heightConv + '" classid="clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">'
			+ '<param name="src" value="' + url + '" />'
			+ '<embed width="' + widthConv + '" height="' + heightConv + '" type="audio/x-pn-realaudio-plugin" src="' + url + '" />'
			+ '</object>';
			break;
		default:
			able = false;
			break;
	}

	if(able) {
		if(isIE) editor.insertContents(h);
		else editor.insertHTML(h);
	} else { alert("삽입 할 수 없는 형식입니다."); }
}

function call(url, id, callback) {

	//if(!id) id = "AJAX_DIV";
	var client = false;

	if(window.ActiveXObject) {
		try {
			client = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				client = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {}
		}
	} else {
		client = new XMLHttpRequest();
	}
	if(client) {
		client.onreadystatechange = function() {
			if(client.readyState == 4) {

				//출력레이어가 없을 경우 생성
				var el = document.getElementById(id);
				if(!el) {
					el = document.createElement("div");
					el.style.display = 'none';
					document.body.appendChild(el);
				}

				//IE의 경우 버그가 존재함. 그래서 &nbsp를 추가
				if(isIE && client.responseText.indexOf("<script") == 0) {
					el.innerHTML = "<span style='display:none;'>&nbsp;</span>" + client.responseText;
				} else {
//					el.innerHTML = client.responseText;
					el.innerHTML = client.responseText.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
					el.outerHTML = el.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
				}

				if(callback) {
					//try {
						if(typeof callback === "function") {
							callback(client.responseText);
						} else if(typeof callback === "string") {
							eval(callback + "(client.responseText)");
						}
					//} catch(e) { alert(callback + " 함수가 없습니다."); }
				}

				//자바스크립트 실행 (defer는 IE 에서 실행되어 안씀)
				var scripts = el.getElementsByTagName("script");
				for(var i=0; i<scripts.length; i++) {
					eval(scripts[i].innerHTML.replace("<!--", "").replace("-->", ""));
				}
			}
		}
		var f;
		if(f = document.forms[url]) {
			var parameters = "";
			for(var i=0; i<f.elements.length; i++) {
				if(f.elements[i].name == "") continue;
				if(f.elements[i].type == "radio" || f.elements[i].type == "checkbox") {
					if(f.elements[i].checked == false) continue;
				}
				parameters += f.elements[i].name + "=" + encodeURI( f.elements[i].value ) + "&";
			}
			if(!f.action) f.action = location.href;
			client.open('POST', f.action, id ? true : false);
			client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			client.send(parameters);
		} else {
			client.open("GET", url, id ? true : false);
			client.send(null);
		}

		if(!id && client.readyState == 4) {
			return client.responseText;
		}
	}
}

function docWrite(str) {
	document.write(str);
}

function ToggleLayer(objName, tarName, addX, addY) {
	var obj = document.getElementById(objName);
	if(!obj) {
		alert(objName + ' 레이어가 존재하지 않습니다.');
		return;
	}

	var tar = tarName ? document.getElementById(tarName) : null;
	if(tar) {
		var curleft = curtop = 0;
		if (tar.offsetParent) {
			do {
				curleft += tar.offsetLeft;
				curtop += tar.offsetTop;
			} while (tar = tar.offsetParent);
		}
		obj.style.position = "absolute";
		obj.style.left = curleft + (addX ? parseInt(addX) : 0);
		obj.style.top = curtop + (addY ? parseInt(addY) : 0);
	}
	if(obj.style.display == "none") {
		obj.style.display = "block";
	} else {
		obj.style.display = "none";
	}
}

function ImageError(el, url) {

	if(url && url.toUpperCase() == "TEXTMODE") {
		if(el) el.parentNode.innerHTML = "<span><table width='" + (el.width * 1) + "' height='" + (el.height * 1)+ "' cellpadding='0' cellspacing='0' style='border:1px solid #f2f2f2;'><tr><td style='font-family:arial;color:#d0d0d0'>No Image.</td></tr></table></span>";
	} else {
		var noimg = new Image();
		noimg.src = url ? url : "../html/images/global/noimage.jpg";
		noimg.onerror = function() {
			//alert("[개발 Debug] common.js - function ImageError() 오류 : \n" + noimg.src + ' 파일이 존재 하지 않습니다.');
			return false;
		}
		if(el) el.src = noimg.src;
	}
}

function addSelectOption(element, val, txt) {
	var opt = element.ownerDocument.createElement("option");
	opt.setAttribute("value", val);
	opt.appendChild(element.ownerDocument.createTextNode(txt));
	element.appendChild(opt);
}
function removeSelectOption(element, idx) {
	var opts = element.getElementsByTagName("option");
	if (idx < 0 || idx > (opts.length - 1)) return;
	element.removeChild(opts[idx]);
}

function p(el, type) {
	var attributes = new Array(); var i = 0;
	for(e in el) {
		if(!type && !el[e]) continue;
		attributes[i] = e + "=" + el[e];
		i++;
	}
	if(document.body) {
		document.body.innerHTML = "<div style='position:absolute;top:10px;left:10px;overflow:auto;width:95%;height:95%;background:#f7f7f7;z-index:100'>" + attributes.join("<br>") + "</div>";
	} else {
		alert(attributes.join("\n"));
	}
}

function changeYear(element, d, num, limit) {
	if(!element) return;
	if(!num) num = 5;
	var year = parseInt(element.value * 1);
	var org = d ? d : element.value;
	if(!year) year = !d ? new Date().getFullYear() : d;
	year = parseInt(year * 1);
	var head = "";
	if(element.options.length > 0) {
		head = element.options[0].value == "" ? element.options[0].text : "";
	}
	var pattern = /[^0-9]/;
	var add = "";
	if(element.options.length > 1) {
		var idx = 0;
		for(var i=0; i<element.options.length; i++) {
			if(element.options[i].value) { idx = i; break; }
		}
		add = pattern.test(element.options[idx].text);
	}
	element.options.length = 0; var j = 0;
	if(head) {
		element.options[0] = new Option(head, "", false);
		j++;
	}

	var max = year + num;
	if(limit && max > limit) max = limit;
	for (var i=year-num; i<=max; i++, j++) {
		element.options[j] = new Option(i + (add ? "년" : ""), i, false);
		if (i == org) element.options[j].selected = true;
	}
}

Offset = function(element) {
	this.obj = element;
	this.left;
	this.top;
	this.height;
	this.width;
	this.centerLeft;
	this.getOffset();
}
Offset.prototype.getOffset = function() {
	var obj = this.obj;
	var top = left = 0;
	if (obj.offsetParent) {
		do {
			top += obj.offsetTop;
			left +=
			obj.offsetLeft;
		} while(obj = obj.offsetParent);
	}
	this.left = left;
	this.top = top;
	this.width = this.obj.offsetWidth;
	this.height = this.obj.offsetHeight;
	this.centerLeft = this.left + Math.round(this.width/2);
}

function number_format( number, decimals, dec_point, thousands_sep ) {
	if(typeof number == "string") number = number.replace(/,/g, "");
    var n = !isNaN(number) ? number * 1.0 : 0.00;

    decimals = isNaN(decimals = Math.abs(decimals)) ? 0 : decimals;
    var decSeparator = decSeparator == undefined ? "." : dec_point;
    var thouSeparator = thouSeparator == undefined ? "," : thousands_sep;
    var sign = n < 0 ? "-" : "";
    var i = parseInt(n = Math.abs(+n || 0).toFixed(decimals)) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decimals ? decSeparator + Math.abs(n - i).toFixed(decimals).slice(2) : "");
}

function addslashes( str ) {
    return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}

function strip_tags(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join('');var tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,'').replace(tags,function($0,$1){return allowed.indexOf('<'+$1.toLowerCase()+'>')>-1?$0:'';});}


function in_array(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
    return found;
}

/*
var descpreload = new Image(); descpreload.src = "/html/images/admin/common/s_desc.gif";
var ascpreload = new Image(); ascpreload.src = "/html/images/admin/common/s_asc.gif";
*/
function ListSort(element, ord) {
	if(element) {
		document.forms['form1']['ord'].value = element.getAttribute("id").replace("CL_", "") + " " + (ord.indexOf(" ASC") != -1 ? "DESC" : "ASC");
		document.forms['form1'].submit();
	} else {
		var arr = ord.split(" ");
		var element = document.getElementById("CL_" + arr[0])
		if(element && arr.length == 2) {
			var arrow = arr[1] == "ASC" ? ' <img src="/sysop/html/images/admin/common/s_asc.gif">' : ' <img src="/sysop/html/images/admin/common/s_desc.gif">';
			//var arrow = arr[1] == "ASC" ? ' <i class="icon-caret-up" style="color:red"></i>' : ' <i class="icon-caret-down" style="color:red"></i>';
			element.innerHTML = element.innerHTML + arrow;
		}
	}
}

function removeAttr(formName, keys, type) {
	var f = document.forms[formName];
	if(!f) return;
	type = !type ? "required" : type;
	var arr = keys.replace(/ +/g, "").split(",");

	for(var i=0; i<arr.length; i++) {
		if(f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.removeAttribute(type);
		}
	}
}
function setAttr(formName, keys, type, value) {
	var f = document.forms[formName];
	if(!f) return;
	var arr = keys.replace(/ +/g, "").split(",");
	for(var i=0; i<arr.length; i++) {
		if(f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.setAttribute(type, value);
		}
	}
}

function addEvent(type, func, element) {
	type = type.replace("on", "");
	if(!element) element = window;
	if(element.addEventListener) element.addEventListener(type, func, false);
	else if(element.attachEvent) element.attachEvent("on" + type, func);
}

function deleteEvent(type, func, element) {
	type = type.replace("on", "");
	if(!element) element = window;
	if(element.removeEventListener) element.removeEventListener(type, func, false);
	else if(element.detachEvent) element.detachEvent("on" + type, func);
}

function Player(url, width, height, img, autostart) {
	if(!autostart) autostart = "true";
	var type = url.substring(url.lastIndexOf(".") + 1, url.length).toLowerCase();
	var player = "";
	switch(type) {
		case "avi" :
		case "wmv" :
		case "wma" :
			player = '<object style="filter:gray();" classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6"'
			+ ' codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"'
			+ ' width="' + width + '"'
			+ ' height="' + height + '">'
			+ '<param name="URL" value="' + url + '" />'
			+ '<param name="allowFullScreen" value="true">'
			+ '<param name="rate" value="1" />'
			+ '<param name="balance" value="0" />'
			+ '<param name="currentPosition" value="0" />'
			+ '<param name="defaultFrame" />'
			+ '<param name="playCount" value="1" />'
			+ '<param name="autoStart" value="' + autostart + '" />'
			+ '<param name="currentMarker" value="0" />'
			+ '<param name="invokeURLs" value="-1" />'
			+ '<param name="baseURL" />'
			+ '<param name="volume" value="50" />'
			+ '<param name="mute" value="0" />'
			+ '<param name="uiMode" value="full" />'
			+ '<param name="stretchToFit" value="0" />'
			+ '<param name="windowlessVideo" value="0" />'
			+ '<param name="enabled" value="-1" />'
			+ '<param name="enableContextMenu" value="-1" />'
			+ '<param name="fullScreen" value="0" />'
			+ '<param name="SAMIStyle" />'
			+ '<param name="SAMILang" />'
			+ '<param name="SAMIFilename" />'
			+ '<param name="captioningID" />'
			+ '<param name="enableErrorDialogs" value="true" />'
			+ '<embed src="' + url + '" type="application/x-mplayer2" allowFullScreen="true" width="' + width + '" height="' + height + '" autostart="' + autostart + '"></embed>'
			+ '</object>';
			break;
		case "mp4" :
		case "flv" :
			player = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'
			+ ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"'
			+ ' width="' + width + '"'
			+ ' height="' + height + '"'
			+ '><param name="src" value="/player/player.swf?stretching=exactit&autostart=true&file=' + url + '">'
			+ '<param name="allowFullScreen" value="true">'
			+ '<param name="stretching" value="exactit">'
			+ '<param name="width" value="' + width + '">'
			+ '<param name="height" value="' + height + '">'
			+ '<param name="autostart" value="true" />'
			+ '<param name="bgcolor" value="#ffffff" />'
			+ '<param name="wmode" value="transparent" />'
			+ '<embed type="application/x-shockwave-flash"'
			+ ' src="/player/player.swf?stretching=exactit&autostart=true&file=' + url + '"'
			+ ' bgcolor="#ffffff"'
			+ ' width="' + width + '"'
			+ ' height="' + height + '"'
			+ ' salign="TL"'
			+ ' scale="noScale"'
			+ ' allowScriptAccess="always"'
			+ ' allowFullScreen="true"'
			+ ' stretching="exactit"'
			+ ' type="application/x-shockwave-flash"'
			+ ' wmode="transparent"'
			+ ' pluginspage="http://www.macromedia.com/go/getflashplayer" />'
			+ '</embed></object>';
			break;
		defalue :
			break;
	}
	document.write(player);
}

function phoneNumber(el) {
	el.value = _phoneNumber(el.value);
}
function _phoneNumber(value) {
	value = value.replace(/[^0-9]/g, "")
	var pattern = new RegExp("^(02|[0-9]{3})([0-9]{" + (value.length <= (/^02/.test(value) ? 9 : 10) ? 3 : 4) + "})?([0-9]{4})?");
	var arr = value.replace(pattern, "$1-$2-$3").replace(/--/g, "-").split("-");
	if(arr[2]) arr[2] = arr[2].substring(0, 4);
	return arr.join("-", arr);
}
function ssNumber(el) {
	el.value = _ssNumber(el.value);
}
function _ssNumber(value) {
	value = value.replace(/[^0-9]/g, "")
	var pattern = new RegExp("^([0-9]{6})([0-9]{7})?");
	var arr = value.replace(pattern, "$1-$2").replace(/--/g, "-").split("-");
	if(arr[1]) arr[1] = arr[1].substring(0, 7);
	return arr.join("-", arr);
}
function bizNumber(el) {
	el.value = _bizNumber(el.value);
}
function _bizNumber(value) {
	value = value.replace(/[^0-9]/g, "")
	var pattern = new RegExp("^([0-9]{3})([0-9]{2})?([0-9]{5})?");
	var arr = value.replace(pattern, "$1-$2-$3").replace(/--/g, "-").split("-");
	if(arr[2]) arr[2] = arr[2].substring(0, 5);
	return arr.join("-", arr);
}

function toggleTableRow(trElement, display) {
	if(!display) display = trElement.style.display == "none" ? "block" : "none";
	if(display == "none") {
		trElement.style.display = "none";
	} else {
		try { trElement.style.display = "table-row"; }
		catch(e) { trElement.style.display = "block"; }
	}
}

function _setDate(date, ymd) {
	ymd = ymd.replace(/-/g, '');
	date.setFullYear(ymd.substring(0, 4));
	date.setMonth(ymd.substring(4, 6) * 1 - 1);
	date.setDate(ymd.substring(6, 8) * 1);
	return date;
}
function addDate(type, diff, d, format) {
	var date = _setDate(new Date(), dateFormat(d ? d : new Date()));
	type = type.toUpperCase();
	if(type == "Y") date.setFullYear(date.getFullYear() + diff);
	if(type == "M") date.setMonth(date.getMonth() + diff);
	if(type == "D") date.setDate(date.getDate() + diff);
	return format ? dateFormat(date) : date;
}
function dateFormat(date, j) {
    if(!j) j = "-";
    return date.getFullYear()
        + j + ((date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1))
        + j + ((date.getDate() < 10 ? "0" : "") + date.getDate());
}
function checkDate(first, last) {
	if(first.value && last.value) {
		var sdate = new Date(first.value);
		var edate = new Date(last.value);
		if(edate < sdate) {
			var stitle = first.title || first.hname || "시작일";
			var etitle = last.title || last.hname || "종료일";
			alert(etitle + "은 " + stitle + "보다 같거나 나중이어야 합니다.");
			last.focus();
		} else {
			return true;
		}
	}
	return false;
}

//POPUP Function
function setPopCookie(name, value, expiredays) {
	   var todayDate = new Date();
	   todayDate.setDate( todayDate.getDate() + expiredays );
	   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function popupClose(id) {
	var el = document.getElementById("close" + id);
	if(el.checked) {
		setPopCookie("POPUP" + id , "done", 1);
	}
	document.getElementById("pop" + id).style.display = "none";
	document.getElementById("pop" + id).innerHTML = "";
}

//DOMloadcomplete
var ready = (function () {
    var ready_event_fired = false;
    var ready_event_listener = function (fn) {
        var idempotent_fn = function () {
            if (ready_event_fired) { return; }
            ready_event_fired = true;
            return fn();
        }
        var do_scroll_check = function () {
            if (ready_event_fired) { return; }
            try { document.documentElement.doScroll('left'); }
            catch(e) { setTimeout(do_scroll_check, 1); return; }
            return idempotent_fn();
        }
        if (document.readyState === "complete") {
            return idempotent_fn();
        }
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", idempotent_fn, false);
            window.addEventListener("load", idempotent_fn, false);
        } else if (document.attachEvent) {
           // document.attachEvent("onreadystatechange", idempotent_fn);
            window.attachEvent("onload", idempotent_fn);
            var toplevel = false;
            try { toplevel = window.frameElement == null; } catch (e) {}
            if (document.documentElement.doScroll && toplevel) {
                return do_scroll_check();
            }
        }
    };
    return ready_event_listener;
})();


$(document).ready(function() {
	$(".file01").each(function() {
		var a = this;
		var x = document.createElement("a");
		x.setAttribute("href", "javascript:void(0)");
		x.innerHTML = '&nbsp;<img src="/sysop/html/images/admin/btn/btn_x.gif" style="vertical-align:-3px;">';

		a.parentNode.insertBefore(x, a.nextSibling);
		x.onclick = function() { _goFileDelete(this.previousSibling, this); }
	});
	$(".image01").each(function() {
		var a = this;
		a.onmouseover = function() { previewImg(a); }
		a.onmouseout = function() { hidePreviewImage(); }
	});
});
function _goFileDelete(a, x) {
	if(!confirm("삭제하시겠습니까?")) return;
	if(a.getAttribute("del")) {
		call(a.getAttribute("del"), "test");
		a.parentNode.removeChild(a);
		x.parentNode.removeChild(x);
	}
}

var agent = navigator.userAgent;
var isMobile = false;
var mobileKeyWords = new Array("iPhone", "iPod", "iPad", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
for(var i=0; i<mobileKeyWords.length; i++) {
	if(agent.indexOf(mobileKeyWords[i]) != -1) { isMobile = true; break; }
}
var iPhone = agent.indexOf("iPhone") != -1;

function setPeriodDate() { }

function goPC() {
	SetCookie("IS_PCVERSION", "Y");
	location.href = "/main/index.jsp";
}

function goMobile() {
	SetCookie("IS_PCVERSION", "N");
	location.href = "/mobile/index.jsp";
}

var Mobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (Mobile.Android() || Mobile.BlackBerry() || Mobile.iOS() || Mobile.Opera() || Mobile.Windows());
    }
};

function resetPassword() {
	var el1 = document.getElementsByName('passwd');
	var el2 = document.getElementsByName('passwd2');
	for(var i = 0; i < el1.length; i++) el1[i].value = '';
	for(var j = 0; j < el2.length; j++) el2[j].value = '';
}

/*
 * js-sha256 v0.3.0
 * https://github.com/emn178/js-sha256
 *
 * Copyright 2014-2015, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(root, undefined) {
  'use strict';

  var NODE_JS = typeof(module) != 'undefined';
  if(NODE_JS) {
    root = global;
  }
  var TYPED_ARRAY = typeof(Uint8Array) != 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K =[0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  var blocks = [];

  var sha224 = function(message) {
    return sha256(message, true);
  };

  var sha256 = function(message, is224) {
    var notString = typeof(message) != 'string';
    if(notString && message.constructor == root.ArrayBuffer) {
      message = new Uint8Array(message);
    }

    var h0, h1, h2, h3, h4, h5, h6, h7, block, code, first = true, end = false,
        i, j, index = 0, start = 0, bytes = 0, length = message.length,
        s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    if(is224) {
      h0 = 0xc1059ed8;
      h1 = 0x367cd507;
      h2 = 0x3070dd17;
      h3 = 0xf70e5939;
      h4 = 0xffc00b31;
      h5 = 0x68581511;
      h6 = 0x64f98fa7;
      h7 = 0xbefa4fa4;
    } else { // 256
      h0 = 0x6a09e667;
      h1 = 0xbb67ae85;
      h2 = 0x3c6ef372;
      h3 = 0xa54ff53a;
      h4 = 0x510e527f;
      h5 = 0x9b05688c;
      h6 = 0x1f83d9ab;
      h7 = 0x5be0cd19;
    }
    block = 0;
    do {
      blocks[0] = block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      if(notString) {
        for (i = start;index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = start;index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }
      bytes += i - start;
      start = i - 64;
      if(index == length) {
        blocks[i >> 2] |= EXTRA[i & 3];
        ++index;
      }
      block = blocks[16];
      if(index > length && i < 56) {
        blocks[15] = bytes << 3;
        end = true;
      }

      var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
      for(j = 16;j < 64;++j) {
        // rightrotate
        t1 = blocks[j - 15];
        s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
        t1 = blocks[j - 2];
        s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
      }

      bc = b & c;
      for(j = 0;j < 64;j += 4) {
        if(first) {
          if(is224) {
            ab = 300032;
            t1 = blocks[0] - 1413257819;
            h = t1 - 150054599 << 0;
            d = t1 + 24177077 << 0;
          } else {
            ab = 704751109;
            t1 = blocks[0] - 210244248;
            h = t1 - 1521486534 << 0;
            d = t1 + 143694565 << 0;
          }
          first = false;
        } else {
          s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
          s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
          ab = a & b;
          maj = ab ^ (a & c) ^ bc;
          ch = (e & f) ^ (~e & g);
          t1 = h + s1 + ch + K[j] + blocks[j];
          t2 = s0 + maj;
          h = d + t1 << 0;
          d = t1 + t2 << 0;
        }
        s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
        s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
        da = d & a;
        maj = da ^ (d & b) ^ ab;
        ch = (h & e) ^ (~h & f);
        t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
        t2 = s0 + maj;
        g = c + t1 << 0;
        c = t1 + t2 << 0;
        s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
        s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
        cd = c & d;
        maj = cd ^ (c & a) ^ da;
        ch = (g & h) ^ (~g & e);
        t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
        t2 = s0 + maj;
        f = b + t1 << 0;
        b = t1 + t2 << 0;
        s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
        s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
        bc = b & c;
        maj = bc ^ (b & d) ^ cd;
        ch = (f & g) ^ (~f & h);
        t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
        t2 = s0 + maj;
        e = a + t1 << 0;
        a = t1 + t2 << 0;
      }

      h0 = h0 + a << 0;
      h1 = h1 + b << 0;
      h2 = h2 + c << 0;
      h3 = h3 + d << 0;
      h4 = h4 + e << 0;
      h5 = h5 + f << 0;
      h6 = h6 + g << 0;
      h7 = h7 + h << 0;
    } while(!end);

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
              HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
              HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
              HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
              HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
              HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
              HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
              HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
              HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
              HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
              HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
              HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
              HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
              HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
              HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
              HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
              HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
              HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
              HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
              HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
              HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
              HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
              HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
              HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
              HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
              HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
              HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
              HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if(!is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
             HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
             HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
             HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };
  
  if(!root.JS_SHA256_TEST && NODE_JS) {
    sha256.sha256 = sha256;
    sha256.sha224 = sha224;
    module.exports = sha256;
  } else if(root) {
    root.sha256 = sha256;
    root.sha224 = sha224;
  }
}(this));

/* sns share */
function shareLink(type, url, title) {
    url = encodeURIComponent(url).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    title = encodeURIComponent(title).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");

    if(type == 'facebook') {
		window.open("http://www.facebook.com/sharer/sharer.php?u=" + url + "&title=" + title, "_SHARE_FACEBOOK_", "width=600, height=450, top=50%, left=0");
	} else if(type == 'twitter') {
		window.open("https://twitter.com/intent/tweet?url=" + url + "&text=" + title, "_SHARE_TWITTER_", "width=600, height=450, top=50%, left=0");
	} else if(type == 'kakaostory') {
		window.open("http://story.kakao.com/share?url=" + url, "_SHARE_KAKAOSTORY_", "width=600, height=450, top=50%, left=0");
	} else if(type == 'naver') {
		window.open("http://share.naver.com/web/shareView.nhn?title=" + title + "&url=" + url, "_SHARE_NAVER_", "width=600, height=450, top=50%, left=0");
	} else if(type == 'band') {
		window.open("http://band.us/plugin/share?route=" + url + "&body=" + title + "%20" + url, "_SHARE_BAND_", "width=600, height=450, top=50%, left=0");
	}
}

/* cart renewal */
var cartItems = new Array();
function clearCart() {
	cartItems = new Array();
}

function addCommonCart(ptype, pid, qty) {
	if(isNaN(parseInt(qty)) || parseInt(qty) < 1) qty = 1;
	//cartItems.push([ptype, pid, qty]);
	cartItems[ptype + "," + pid] = qty;
}

function addCommonCartInput(ptype, fname, n) {
	var f = document.forms[fname];
	if(!f || !f[n]) return false;
	switch(f[n].type) {
		case 'checkbox':
			if(f[n].checked == true) addCommonCart(ptype, f[n].value, 1);
			break;
		case 'hidden' :
			addCommonCart(ptype, f[n].value, 1);
			break;
		default:
			if(f[n].length > 1) {
				for(var i=0; i<f[n].length; i++) {
					if(f[n][i].checked == true) addCommonCart(ptype, f[n][i].value, 1);
				}
			} else {
				if(f[n].checked == true) addCommonCart(ptype, f[n].value, 1);
			}
			break;
	}
}

function addCommonCartList(ptype, fname, pidx, qty) {
	var f = document.forms[fname];
	if(!f || !f[pidx] || !f[qty]) return false;

	if(!f[pidx].length && !f[qty].length) {
		var temp = parseInt(f[qty].value);
		if(!isNaN(temp) && temp > 0) addCommonCart(ptype, f[pidx].value, temp);
	} else if(f[pidx].length == f[qty].length) {
		for(var i = 0; i < f[pidx].length; i++) {
			var temp = parseInt(f[qty][i].value);
			if(!isNaN(temp) && temp > 0) addCommonCart(ptype, f[pidx][i].value, temp);
		}
	}
}

function goCommonCart(ctype) {
	if(!ctype) return;
	var temp = [];
	var keys = Object.keys(cartItems);
	for(var i = 0; i < keys.length; i++) temp.push(keys[i] + "," + cartItems[keys[i]]); 
	if(!temp.join("|")) {
		alert("선택한 항목이 없습니다.");
		return;
	}
	$.ajaxSetup({cache:false});
	$.get("../order/cart_insert.jsp?type=" + ctype + "&item=" + temp.join("|"), function(ret) {
		if(ret.indexOf("redirect") == 0) {
			location.href = ret.substring(9);
		} else if(ret == 'success') {
			if(confirm('상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?')) location.href = '../order/cart_list.jsp';
		} else {
			alert(ret);
			if(ret.indexOf('로그인') == 0) location.href = '../member/login.jsp';
		}
	});
}

var __sessTime = null;
function checkSession(minute) {
	if(minute > 0) {
		if(__sessTime != null) {
			var t = (new Date()).getTime() - __sessTime;
			if(t > (minute * 60000)) {
				$.get("/member/logout.jsp", function() {
					alert("세션이 종료되어 로그아웃되었습니다.");
					location.reload();
				});
				return;
			}
			console.log(getSessionTime(minute));
		} else {
			__sessTime = (new Date()).getTime();
		}
		setTimeout(function() { checkSession(minute); }, 10000);
	}
}

function getSessionTime(minute) {
	var t = minute * 60000 - ((new Date()).getTime() - __sessTime);
	var sec = parseInt(t / 1000);
	var hours   = Math.floor(sec / 3600);
	var minutes = Math.floor((sec - (hours * 3600)) / 60);
	var seconds = sec - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

if(!Object.keys) Object.keys = function(obj) {
	if(obj !== Object(obj)) throw new TypeError('Object.keys called on a non-object');
	var keys = [], p;
	for(p in obj) if (Object.prototype.hasOwnProperty.call(obj, p)) keys.push(p);
	return keys;
}