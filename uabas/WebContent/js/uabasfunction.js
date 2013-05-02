var uabasfunction = {
	// 覆盖选择参数
	overrideTrackingOptions : function(OptionsObj, customOptionsObj) {
		for ( var prop in OptionsObj) {
			if (customOptionsObj.hasOwnProperty(prop)
					&& customOptionsObj[prop] !== null) {
				OptionsObj[prop] = customOptionsObj[prop];
			}
		}
	},

	// 追踪flash元素
	allowTrackingOnFlashObjects : function(d) {
		var obj = d.getElementsByTagName("object");
		for ( var i = 0, t = obj.length; i < t; ++i) {
			var param = d.createElement("param");
			param.setAttribute("name", "wmode");
			param.setAttribute("value", "opaque");
			obj[i].appendChild(param);
		}

		var embed = d.getElementsByTagName("embed");
		for ( var j = 0, u = embed.length; j < u; ++j) {
			embed[j].setAttribute("wmode", "opaque");
			if (!/MSIE/i.test(navigator.userAgent)) {
				var cloned = embed[j].cloneNode(true);
				embed[j].parentNode.replaceChild(cloned, embed[j]);
			}
		}
	},

	log : function() {
		if (!window.console && !window.console.log) {
			return false;
		}
		console.log(arguments);
	},

	onDOMload : function(callback) {
		if (arguments.callee.done) {
			return;
		}
		arguments.callee.done = true;

		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', callback, false);
		} else if (document.attachEvent) {
			try {
				document.write("<scr"
						+ "ipt id=__ie_onload defer=true src=//:><\/scr"
						+ "ipt>");
				var script = document.getElementById("__ie_onload");
				script.onreadystatechange = function() {
					if (this.readyState === 'complete') {
						callback();
					}
				};
			} catch (err) {
			}
		} else {
			this.addEvent(window, 'load', callback);
		}
	},

	reloadPage : function() {
		window.location.replace(window.location.href);
	},

	loadNextMouseTrail : function(uabasData) {
		if (typeof uabasData.api === 'undefined') {
			uabasData.api = "js";
		}
		var currTrailPos = this.array.indexOf(uabasData.trails,
				uabasData.currtrail);
		if (currTrailPos < uabasData.trails.length - 1) {
			var navigateTo = uabasData.trailurl + '?id='
					+ uabasData.trails[currTrailPos + 1] + '&api='
					+ uabasData.api;
			if (uabasData.autoload) {
				window.location.href = navigateTo;
			} else if (confirm("这位用户浏览了多个网页，想要查看下一个记录吗？")) {
				window.location.href = navigateTo;
			}
		} else {
			alert("所有记录已播放完毕。");
		}
	},

	findPos : function(obj) {
		var curleft = curtop = 0;
		if (obj && obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}

		return {
			x : curleft,
			y : curtop
		};
	},
	getStyle : function(oElm, strCssRule) {
		var strValue = "";
		if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(oElm, "")
					.getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
			strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}

		return strValue;
	},

	getWindowSize : function() {
		var d = document;
		var w = (window.innerWidth) ? window.innerWidth
				: (d.documentElement && d.documentElement.clientWidth) ? d.documentElement.clientWidth
						: (d.body && d.body.clientWidth) ? d.body.clientWidth
								: 0;
		var h = (window.innerHeight) ? window.innerHeight
				: (d.documentElement && d.documentElement.clientHeight) ? d.documentElement.clientHeight
						: (d.body && d.body.clientHeight) ? d.body.clientHeight
								: 0;
		return {
			width : w,
			height : h
		};
	},

	getWindowOffset : function() {
		var d = document;
		var xpos = (window.pageXOffset) ? window.pageXOffset
				: (d.documentElement && d.documentElement.scrollLeft) ? d.documentElement.scrollLeft
						: (d.body && d.body.scrollLeft) ? d.body.scrollLeft : 0;
		var ypos = (window.pageYOffset) ? window.pageYOffset
				: (d.documentElement && d.documentElement.scrollTop) ? d.documentElement.scrollTop
						: (d.body && d.body.scrollTop) ? d.body.scrollTop : 0;

		return {
			x : xpos,
			y : ypos
		};
	},

	getDocumentSize : function() {
		var d = document;
		var w = (window.innerWidth && window.scrollMaxX) ? window.innerWidth
				+ window.scrollMaxX
				: (d.body && d.body.scrollWidth > d.body.offsetWidth) ? d.body.scrollWidth
						: (d.body && d.body.offsetWidth) ? d.body.offsetWidth
								: 0;
		var h = (window.innerHeight && window.scrollMaxY) ? window.innerHeight
				+ window.scrollMaxY
				: (d.body && d.body.scrollHeight > d.body.offsetHeight) ? d.body.scrollHeight
						: (d.body && d.body.offsetHeight) ? d.body.offsetHeight
								: 0;

		return {
			width : w,
			height : h
		};
	},

	getPageSize : function() {
		var win = this.getWindowSize(), doc = this.getDocumentSize();

		var w = (doc.width < win.width) ? win.width : doc.width;
		var h = (doc.height < win.height) ? win.height : doc.height;

		return {
			width : w,
			height : h
		};
	},

	getNextHighestDepth : function(e) {
		var highestIndex = 0;
		var currentIndex = 0;
		var elementArray = [];
		if (document.getElementsByTagName) {
			elementArray = document.getElementsByTagName('*');
		} else if (e.getElementsByTagName) {
			elementArray = document.getElementsByTagName('*');
		}
		for ( var i = 0, l = elementArray.length; i < l; ++i) {
			if (elementArray[i].currentStyle) {
				currentIndex = parseFloat(elementArray[i].currentStyle.zIndex);
			} else if (window.getComputedStyle) {
				currentIndex = parseFloat(document.defaultView
						.getComputedStyle(elementArray[i], null)
						.getPropertyValue('z-index'));
			}
			if (currentIndex > highestIndex) {
				highestIndex = currentIndex;
			}
		}

		return highestIndex + 1;
	},

	getBaseURL : function() {
		var basepath = window.location.href;
		var dirs = basepath.split("/");
		delete dirs[dirs.length - 1];

		return dirs.join("/");
	},
	ensureLastURLSlash : function(url) {
		if (url.lastIndexOf("/") != url.length - 1) {
			url += "/";
		}

		return url;
	},

	addEvent : function(obj, type, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(type, fn, false);
		} else if (obj.attachEvent) {
			obj["e" + type + fn] = fn;
			obj[type + fn] = function() {
				obj["e" + type + fn](window.event);
			};
			obj.attachEvent("on" + type, obj[type + fn]);
		}
	},

	roundTo : function(number, digits) {
		if (!digits) {
			digits = 2;
		}
		var exp = 100;
		return Math.round(exp * number) / exp;
	},

	doScroll : function(obj) {
		var off = this.getWindowOffset();
		var xto = Math.round(obj.xpos - obj.width) + obj.width / 2;
		var yto = Math.round(obj.ypos - obj.height) + obj.height / 2;
		window.scrollBy(xto - off.x, yto - off.y);
	},

	createXMLHTTPObject : function() {
		var xmlhttp = false;
		var XMLHttpFactories = [ function() {
			return new XMLHttpRequest();
		}, function() {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}, function() {
			return new ActiveXObject("Msxml3.XMLHTTP");
		}, function() {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} ];
		for ( var i = 0; i < XMLHttpFactories.length; ++i) {
			try {
				xmlhttp = XMLHttpFactories[i]();
			} catch (err) {
				continue;
			}
			break;
		}

		return xmlhttp;
	},

	sendAjaxRequest : function(setup) {
		var request = (setup.xmlhttp) ? setup.xmlhttp : this
				.createXMLHTTPObject();
		if (!request) {
			return;
		}

		var method = (setup.postdata) ? "POST" : "GET";
		request.open(method, setup.url, true);
		if (setup.postdata) {
			request.setRequestHeader('Content-Type',
					"application/x-www-form-urlencoded");
		}
		request.onreadystatechange = function() {
			if (request.readyState == 4 && typeof setup.callback === 'function') {
				setup.callback(request.responseText);
			}
		};
		request.send(setup.postdata);
	},

	cookies : {

		setCookie : function(name, value, expiredays, domainpath) {
			var path = domainpath || "/";
			var expires = "";
			if (expiredays) {
				var date = new Date();
				date.setTime(date.getTime()
						+ (expiredays * 24 * 60 * 60 * 1000)); // ms
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + escape(value) + expires + "; path="
					+ path;
		},

		getCookie : function(name) {
			var cStart, cEnd;
			if (document.cookie.length > 0) {
				cStart = document.cookie.indexOf(name + "=");
				if (cStart != -1) {
					cStart = cStart + name.length + 1;
					cEnd = document.cookie.indexOf(";", cStart);
					if (cEnd == -1) {
						cEnd = document.cookie.length;
					}

					return unescape(document.cookie.substring(cStart, cEnd));
				}
			}
			return false;
		},

		checkCookie : function(name) {
			var c = this.getCookie(name);
			return (c);
		},

		deleteCookie : function(name) {
			if (this.checkCookie(name)) {
				this.setCookie(name, null, -1);
			}
		}
	},

	widget : {
		chainer : ">",
		findDOMElement : function(e, callback) {
			if (!e) {
				e = window.event;
			}
			var t = e.target || e.srcElement;
			if (t.nodeType == 3) {
				t = t.parentNode;
			}
			var check = (t.id) ? this.getID(t) : this.getParents(t);
			if (check) {
				callback(check);
			}
		},
		getID : function(o) {
			return o.nodeName + "#" + o.id;
		},
		getClass : function(o) {
			return (o.className) ? o.nodeName + "." + o.className.split(" ")[0]
					: o.nodeName;
		},
		getParents : function(o) {
			var elem = (o.id) ? this.getID(o) : this.getClass(o);
			var list = (elem) ? [ elem ] : [];
			while (o.parentNode) {
				o = o.parentNode;
				if (o.nodeType == 1) {
					if (o.id) {
						elem = this.getID(o);
						list.unshift(elem);
						return list.join(this.chainer);
					} else {
						elem = this.getClass(o);
						list.unshift(elem);
					}
					if (o == parent) {
						return list.join(this.chainer);
					}
				}
			}
			return list.join(this.chainer);
		}
	},

	array : {
		max : function(arr) {
			return Math.max.apply(Math, arr);
		},
		min : function(arr) {
			return Math.max.apply(Math, arr);
		},
		sum : function(arr) {
			var s = 0;
			for ( var i = 0, l = arr.length; i < l; ++i) {
				s += arr[i];
			}
			return s;
		},
		push : function(arr, content) {
			var args = Array.prototype.slice.call(content);
			var n = arr.length >>> 0;
			for ( var i = 0; i < args.length; ++i) {
				arr[n] = args[i];
				n = n + 1 >>> 0;
			}
			arr.length = n;
			return n;
		},
		pop : function(arr) {
			var n = arr.length >>> 0, value;
			if (n) {
				value = arr[--n];
				delete arr[n];
			}
			arr.length = n;
			return value;
		},
		remove : function(arr, from, to) {
			var rest = arr.slice((to || from) + 1 || arr.length);
			arr.length = (from < 0) ? arr.length + from : from;
			return array.push.apply(arr, rest);
		},
		indexOf : function(arr, search, from) {
			for ( var i = (from || 0), total = arr.length; i < total; ++i) {
				if (arr[i] == search) {
					return i;
				}
			}
			return -1;
		}
	}
};