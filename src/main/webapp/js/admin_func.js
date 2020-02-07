$.ajaxSetup({cache:false});

//회원메일 발송
function OpenPopSendMail(idx, type) {
	//OpenWindows("../mail/pop_mail.jsp?idx=" + idx, "M607", 820, 795);
	if(type == undefined) type = "user";
	OpenAdminLayer("../mail/pop_mail.jsp?idx=" + idx + "&type=" + type, "M607", 820, 730);
}
//회원SMS 발송
function OpenPopSendSms(idx, type) {
	//OpenWindows("../sms/pop_sms.jsp?idx=" + idx, "S607", 535, 560);
	if(type == undefined) type = "user";
	OpenAdminLayer("../sms/pop_sms.jsp?idx=" + idx + "&type=" + type, "S607", 535, 620);
}
//회원쪽지 발송
function OpenPopSendMsg(idx, type) {
	//OpenWindows("../message/pop_message.jsp?idx=" + idx, "ME607", 720, 580);
	if(type == undefined) type = "user";
	OpenAdminLayer("../message/pop_message.jsp?idx=" + idx + "&type=" + type, "ME607", 720, 600);
}

//성적분포
function OpenStatGraph(id, type, mid) {
	OpenWindow("../management/pop_graph.jsp?cid=" + id + "&gtype=" + type + "&mid=" + mid, "_gr02", 720, 520);
}

//성적분포
function OpenStatExam(cid, eid, clid) {
	OpenWindow("../management/stat_exam.jsp?cid=" + cid + "&eid=" + eid + "&clid=" + clid, "MSE" + eid, 720, 540);
}
function OpenStatHomework(cid, hid, clid) {
	OpenWindow("../management/stat_homework.jsp?cid=" + cid + "&hid=" + hid + "&clid=" + clid, "MSH" + hid, 720, 540);
}
function OpenStatForum(cid, fid) {
	OpenWindow("../management/stat_forum.jsp?cid=" + cid + "&fid=" + fid, "MSF" + fid, 720, 540);
}

//CRM창 열기
function OpenCRM(id) {
	OpenWindows("../crm/index.jsp?uid=" + id, "CRM", 1300, 800);
}

//SET CRM
/*
function setCRM(closed) {
	$(".crm").each(function() {
		var id = $(this).attr("_id");
		var status = $(this).attr("_status");
		var userNm = $(this).attr("_usernm");
		if(status == "-1") {
			$(this).html("<i class=\"fa fa-user-times\" title=\"탈퇴\"></i> " + userNm + " <span class=\"font11\">(탈퇴회원)</span>");
		} else if(status == "0") {
			$(this).html("<i class=\"fa fa-stop-circle\" title=\"중지\"></i> " + $(this).html());
		} else if(status == "30") {
			$(this).html("<i class=\"fa fa-bell\" title=\"휴면대상\"></i> " + $(this).html());
		} else if(status == "31") {
			$(this).html("<i class=\"fa fa-bed\" title=\"휴면\"></i> " + $(this).html());
		} else if(status == "-99") {
			$(this).html("<span class=\"font11\">(삭제된회원)</span>");
			return;
		}
		if(!$.isNumeric(id)) { 
			$(this).removeClass("crm");
			return;
		}
		if(!closed) $(this).wrap("<a href=\"javascript:OpenCRM('" + $(this).attr("_id") + "');\"></a>");
	});
}
*/

//SET CRM
function setCRM(closed) {
	$(".crm").each(function() {
		var id = $(this).attr("_id");
		var status = $(this).attr("_status");
		var userNm = $(this).attr("_usernm");
		if(!$.isNumeric(id)) { $(this).removeClass("crm");return; }
		if(status == "-1") {
			$(this).html("" + userNm + "");
		} else if(status == "-99") {
			$(this).html("<span class=\"font11\">[삭제된회원]</span>");
			return;
		}

		var $el = null;
		if(!closed) { 
			$(this).wrap("<a href=\"javascript:OpenCRM('" + $(this).attr("_id") + "');\"></a>");
			$el = $(this).parent().parent();
		} else {
			$el = $(this).parent();
		}

		if(status == "-1") { $el.html("<i class=\"fa fa-sign-out\" title=\"탈퇴\"></i> " + $el.html() + " <span class=\"font11\">[탈퇴회원]</span>"); }
		else if(status == "0") { $el.html("<i class=\"fa fa-stop-circle\" title=\"중지\"></i> " + $el.html()); }
		else if(status == "30") { $el.html("<i class=\"fa fa-bell\" title=\"휴면대상\"></i> " + $el.html()); }
		else if(status == "31") { $el.html("<i class=\"fa fa-bed\" title=\"휴면\"></i> " + $el.html()); }

	});
}

//SET status
function setStatus() {
	var arr = { "사용" : "blue", "중지" : "gray" };
	$(".status").each(function() {
		var v = $(this).text();
		$(this).addClass(arr[v]);
	});
}

function toggleInfoArea(cookieName, display) {
	var area = document.getElementById("infoArea");
	var btn = document.getElementById("btnInfo");

	var flag = area.style.display == "none";
	if(display) flag = display == "Y";
	if(flag) {
		area.style.display = "block";
		btn.value = "접기";
		SetCookie(cookieName, "Y");
	} else {
		area.style.display = "none";
		btn.value = "펼치기";
		SetCookie(cookieName, "N");
	}
}

//**/
var _CalendarObject_;
function HtmlConvertor() {
	var tplRoot = "/sysop/html";
	var IE6 = /compatible; MSIE 6.0/.test(navigator.userAgent);
	var IE7 = /compatible; MSIE 7.0/.test(navigator.userAgent);
	var lteIE7 = IE6 || IE7;
	var FF = /Firefox/.test(navigator.userAgent);
	var inputs = document.getElementsByTagName("input");

	for(var i=0; i<inputs.length; i++) {
		//auto popup calendar
		try {
			if(inputs[i].className.indexOf("cal01") != -1 || inputs[i].className.indexOf("cal02") != -1) {
				if(inputs[i].className == "cal01") {
					var img = document.createElement("img");
					img.src = tplRoot + "/images/admin/common/calendar.gif";
					img.style.verticalAlign = "-3px";
					img.style.marginLeft = "1px";
					img.style.cursor = "pointer";
					img.onclick = function() {
						try { new CalendarFrame.Calendar(this.previousSibling); } catch(e) {}
					}
					inputs[i].parentNode.insertBefore(img, inputs[i].nextSibling);
				}
				inputs[i].readOnly = true;
				inputs[i].onfocus = function() {
					try { _CalendarObject_ = new CalendarFrame.Calendar(this); } catch(e) {}
				}
			}
		} catch(e) {}
		
		//readonly
		try {
			if(inputs[i].type == "text" && inputs[i].readOnly) { 
				inputs[i].style.backgroundColor = "#F4F4F4"; 
				inputs[i].style.border = "1px solid #DEDEDE"; 
				inputs[i].style.paddingLeft = "3px"; 
			}
		} catch(e) {}
	}
}

function setMaxLength(el, len) {
	if(el.value.length <= len) return true;
	el.value = el.value.substring(0, len);
	el.focus();
	alert(len + "자 이하로 입력하세요.");
	return false;
}

function previewImg(s) {
	var cd;
	var ci;
	if(document.getElementById("_previewImage_")) {
		cd = document.getElementById("_previewImage_");
		ci = cd.getElementsByTagName("img")[0];
	} else {
		cd = document.createElement("div");
		cd.setAttribute('id',"_previewImage_");
		cd.style.backgroundColor= "#ffffff";
		cd.style.position= "absolute";
		cd.style.display= "none";
		cd.style.zIndex= "999";
		cd.style.border= "1px solid #707070";
		ci = document.createElement("img");
		ci.setAttribute('src',"");
		ci.setAttribute('width',"300");
		cd.appendChild(ci);
		document.getElementsByTagName('body')[0].appendChild(cd);
	}
	ci.src = s.getAttribute("isrc");

	ci.onload = function() {
		var offset = new Offset(s);
		cd.style.display = "block";

		if(Math.max(document.documentElement.clientHeight, document.body.clientHeight) - 200 <= offset.top) {
			cd.style.top = offset.top - (10 + ci.height) + "px";
			cd.style.left = offset.left  + "px";
		} else {
			cd.style.top = offset.top + 20 + "px";
			cd.style.left = offset.left  + "px";
		}
	}
	/*
	var offset = new Offset(s);
	cd.style.top = offset.top + 20 + "px";
	cd.style.left = offset.left  + "px";
	ci.src = s.getAttribute("isrc");
	cd.style.display = "block";
	*/

}
function hidePreviewImage() {
	try { document.getElementById("_previewImage_").style.display = "none";	document.getElementById("_previewImage_").getElementsByTagName("img")[0].src = ""; } catch (e) { }
}

//기수목록
function setStep(selId, fn) {
	if(!fn) fn = "form1";
	var f = document.forms[fn];
	var keys = new Array("course_id", "year");
	var valueArr = new Array();
	for(var i=0; i<keys.length; i++) {
		if(f["s_" + keys[i]])
			valueArr.push(keys[i] + "=" + escape(f["s_" + keys[i]].value));
	}
	valueArr.push("sel=" + selId);

	call("../management/call_step.jsp?" + valueArr.join("&"), "stepArea");
}

function OpenAdminLayer(nLink, nTarget, nWidth, nHeight, xPos, yPos, scr) {
	OpenLayer(nLink, nTarget, nWidth, nHeight);
	//parent.calcSize();
}
function resizeLayer(w, h) {
	if($(".dim-layer").length < 1) return;

	$("body").css("overflow", "hidden");
	$(window).scrollTop(0);
	$(window).scrollLeft(0);
	$(".dim-layer").animate({width:"100%", height:h}, 0);


	$(".wrap-layer").each(function() {
		$(this).animate({maxWidth:w - 40, maxHeight:h - 10}, 0, function() {
			pw = (w - $(this).width()) / 2;
			ph = (h - $(this).height()) / 2;
			//console.log("w : " + $(this).width() + " / pw : " + pw);
			$(this).css("left", pw < 5 ? 5 : pw);
			$(this).css("top", ph < 5 ? 5 : ph);
		});
	});
	$(".pop-frame").each(function() {
		$(this).animate({maxWidth:w - 40, maxHeight:h - 10}, 0);
		//$(".pop-frame").contents().find(".pop_content").css("max-height", h - 85);
	});
	//$(".pop-frame").contents().find(".pop_content").css("max-height", h - 85);


}

//lnb 개선 2016-08-25 CHH
function addAccNode(mid, id, pid, depth, name, link, target, open, icon) {
	if(target == '') target = '#';
	if(depth == 2) {
		$('#lnb-' + mid).append('<li class="acc-title acc-node-' + id + (open == 'Y' ? ' open' : '') + '"><a href="#"><i class="fa ' + icon + '"></i>' + name + '<span class="arrow"></span></a>');
	} else if(depth == 3) {
		if(1 > $('.acc-node-' + pid + ' > ul').length) $('.acc-node-' + pid).append('<ul class="acc-sub"></ul>');
		$('.acc-node-' + pid + ' > ul.acc-sub').append('<li class="acc-node-' + id + '"><a href="' + link + '" target="' + target + '"><i class="fa ' + icon + '"></i>' + name + '</a>');
	}
}

function setAccNav() {
	$('.acc-nav').each(function() {
		var mid = $(this).attr('id');
		var node_cookie = GetCookie('malgn-acc-nav-' + mid);
/*
		if(node_cookie != null) {
			$('#' + mid + ' .acc-title').removeClass('open');

			var node_info = JSON.parse(node_cookie);
			for(var i = 0; i < node_info.length; i++) {
				if(node_info[i].openYn) $('.' + node_info[i].nodeId).addClass('open');
			}
		}
*/
		$('#' + mid + ' .acc-title').each(function(i) {
			if(!$(this).hasClass('open')) $(this).find('ul').hide(0);
		});

		setAccCookie(mid);

		$('#' + mid + ' .acc-title > a').each(function(i) {
			$(this).click(function(event){
				var el = $(this).closest('.acc-title');
				if(el.hasClass('open')) {
					el.removeClass('open');
					el.find('ul').slideUp(200, setAccCookie(mid));
				} else {
					el.addClass('open');
					el.find('ul').slideDown(200, setAccCookie(mid));
				}
				
			});
		});

		$('#' + mid + ' .acc-title .acc-sub a').each(function(i) {
			$(this).click(function(event){
				$('#' + mid + ' .acc-title .acc-sub a').removeClass('active');
				$(this).addClass('active');
			});
		});
	});
}

function setAccCookie(mid) {
	var nodes = new Array();
	$('#' + mid + ' .acc-title').each(function(j) {
		var node_info = $(this).attr('class').replace('acc-title ', '').split(' ');
		var node_id = "";
		var open_yn = false;
		for(var i = 0; i < node_info.length; i++) {
			if(-1 < node_info[i].indexOf('acc-node-')) node_id = node_info[i];
			else if('open' == node_info[i]) open_yn = true;
		}
		nodes[j] = {nodeId:node_id, openYn:open_yn};
	});
	var node_json = JSON.stringify(nodes);
	SetCookie('malgn-acc-nav-' + mid, node_json);
}

$.fn.tableSortable = function() {
	$(this).find("tbody").sortable({
		start: function(e, ui) { ui.placeholder.height(ui.item.height() - 1); },
		helper: function(e, tr) {
			var $originals = tr.children();
			var $helper = tr.clone();
			$helper.css("box-shadow", "0 2px 10px 0px #333333").css("background-color", "#ffffff");
			$helper.children().each(function(index) {
				$(this).width($originals.eq(index).width() + 1);
			});
			return $helper;
		},
		placeholder: "ui-state-highlight"
	});
};

function initFineUploader(md, mid, vid) {
	//파인업로더 스크립트 로딩
	var JS = document.createElement("script");
	JS.type= "text/javascript";
	JS.src= "https://cdnjs.cloudflare.com/ajax/libs/file-uploader/5.16.2/fine-uploader.core.min.js";
	document.getElementsByTagName('head')[0].appendChild(JS);
	
	//업로드 페이지 출력
	addEvent("onload", function() { uploadPage(md, mid, vid); });
}

function uploadPage(md, mid, vid) {
	$.get('../main/upload.jsp?md=' + md + '&mid=' + mid, function(ret) {
		$('#' + vid).html(ret);

		var uploader = new qq.FineUploaderBasic({
			debug: true,
			button: document.getElementById("find-uploader-button"),
			request: {
				endpoint: '../main/upload.jsp?md=' + md + '&mid=' + mid
			},
			callbacks: {
				onAllComplete: function(success, fail) {
					uploadPage(md, mid, vid);
				},
				onProgress: function(id, name, size, total) {
					//alert(name + ", size:" + size + ", total:" + total);
				},
				onError: function(id, name, reason) {
					alert(name + " 업로드 실패 : " + reason);
				}
			}
		});

		$("#file-delete-button").on("click", function() {
			var id = $("#fine-uploader-files").val();
			if(id == null || id == '') { alert('삭제할 파일을 선택해주세요.'); return; }
			if(!confirm('파일을 삭제하시겠습니까?')) return;
			$.get('../main/upload.jsp?md=' + md + '&mid=' + mid + '&mode=del&id=' + id, function(ret) {
				if(ret == 'success') uploadPage(md, mid, vid);
				else alert(ret);
			});
		});
	});
}