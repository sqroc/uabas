(function() {
	// 基本参数
	var opt = {
		fps : 24,
		recTime : 120,
		postInterval : 2,
		warn : false,
		warnText : "是否同意记录您的鼠标行为？",
		trackingServer: "/uabas/",
		contRecording : true,
		id : null, // 网站id
		disabled : 0
	};
	// 引入函数库
	var fn = window.uabasfunction;
	if (typeof fn === "undefined") {
		throw ("函数库没有引入");
	}

	// 记录数据对象
	var uabasRec = {
		i : 0, // 计数
		mouse : {
			x : 0,
			y : 0
		},// 鼠标坐标
		page : {
			width : 0,
			height : 0
		},// 页面宽度和高度
		coords : {
			x : [],
			y : [],
			p : []
		},// 位置坐标和鼠标点击坐标
		elem : {
			hovered : [],
			clicked : []
		},// 鼠标点击和悬停的元素
		url : null,// 网页url
		rec : null,
		websiteId : null,// 网站ID
		paused : false, // 检测是否是激活的窗口
		clicked : false, // 鼠标是否点击
		timestamp : null, // 时间
		timeout : null, // 结束次数
		xmlhttp : fn.createXMLHTTPObject(),

		// 检测是否在当前窗口
		pauseRecording : function() {
			uabasRec.paused = true;
		},
		resumeRecording : function() {
			uabasRec.paused = false;
		},

		// 获取鼠标位置
		getMousePos : function(e) {
			if (!e)
				var e = window.event;

			var x = 0, y = 0;
			if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			} else if (e.clientX || e.clientY) {
				x = e.clientX + document.body.scrollLeft
						+ document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop
						+ document.documentElement.scrollTop;
			}
			if (x < 0 || !x)
				x = 0;
			if (y < 0 || !y)
				y = 0;

			uabasRec.mouse.x = x;
			uabasRec.mouse.y = y;
		},

		getMousePosIFrame : function(e, frame) {
			uabasRec.pause = false;

			var x = e.pageX || e.clientX;
			var y = e.pageY || e.clientY;
			var d = frame.contentDocument || frame.contentWindow;
			if (d.body) {
				x -= d.body.scrollLeft;
				y -= d.body.scrollTop;
			}
			if (d.documentElement) {
				x -= d.documentElement.scrollLeft;
				y -= d.documentElement.scrollTop;
			}
			var c = uabasRec.getFrameOffsets(frame);
			x += c.left;
			y += c.top;

			uabasRec.mouse.x = x;
			uabasRec.mouse.y = y;
		},

		// 获取边框宽度和高度
		getFrameOffsets : function(frame) {
			var frm = (frame && frame.frameElement) ? frame.frameElement
					: frame;
			var l = 0, t = 0;
			if (frm && frm.offsetParent) {
				do {
					l += frm.offsetLeft;
					t += frm.offsetTop;
				} while (frm = frm.offsetParent);
			}
			return {
				left : l,
				top : t
			}
		},

		setClick : function() {
			uabasRec.clicked = true;
		},

		releaseClick : function() {
			uabasRec.clicked = false;
		},

		// 循环记录鼠标位置
		recMouse : function() {
			if (uabasRec.paused) {
				return;
			}
			if (uabasRec.i < uabasRec.timeout) {
				uabasRec.coords.x.push(uabasRec.mouse.x);
				uabasRec.coords.y.push(uabasRec.mouse.y);
				uabasRec.coords.p.push(+uabasRec.clicked);
			} else {
				clearInterval(uabasRec.rec);
				clearInterval(uabasRec.append);
			}
			++uabasRec.i;
		},

		// 发送数据
		initMouseData : function() {
			uabasRec.computeAvailableSpace();

			var data = "url=" + uabasRec.url;
			data += "&urltitle=" + document.title;
			//data += "&cookies=" + document.cookie;
			data += "&swidth=" + screen.width;
			data += "&sheight=" + screen.height;
			data += "&pwidth=" + uabasRec.page.width;
			data += "&pheight=" + uabasRec.page.height;
			//data += "&sessDate=" + uabasRec.getTime();
			data += "&fps=" + opt.fps;
			data += "&coordsX=" + uabasRec.coords.x;
			data += "&coordsY=" + uabasRec.coords.y;
			data += "&clicks=" + uabasRec.coords.p;
			data += "&hovered=" + uabasRec.elem.hovered;
			data += "&clicked=" + uabasRec.elem.clicked;
			data += "&id=" + uabasRec.websiteId;

			var gatewayUrl = fn.ensureLastURLSlash(opt.trackingServer)
					+ "records!add.action";
			fn.sendAjaxRequest({
				url : gatewayUrl,
				callback : null,
				postdata : data,
				xmlhttp : uabasRec.xmlhttp
			});
			uabasRec.clearMouseData();
		},

		getTime : function() {
			var ms = (new Date()).getTime() - uabasRec.timestamp;
			return ms / 1000;
		},

		clearMouseData : function() {
			uabasRec.coords.x = [];
			uabasRec.coords.y = [];
			uabasRec.coords.p = [];
			uabasRec.elem.hovered = [];
			uabasRec.elem.clicked = [];
		},

		// 鼠标点击或悬浮所在的元素
		findElement : function(e) {
			if (!e) {
				e = window.event;
			}
			fn.widget.findDOMElement(e, function(name) {
				if (e.type == "mousedown" || e.type == "touchstart") {
					uabasRec.elem.clicked.push(name);
				} else if (e.type == "mousemove" || e.type == "touchmove") {
					uabasRec.elem.hovered.push(name);
				}
			});
		},

		computeAvailableSpace : function() {
			var doc = fn.getPageSize();
			uabasRec.page.width = doc.width;
			uabasRec.page.height = doc.height;
		},

		trackIFrames : function(d) {
			var iframes = d.getElementsByTagName('iframe'), doc, newdoc, frame;
			var onFrameLoaded = function(d) {
				fn.addEvent(d, "mousedown", uabasRec.setClick);
				fn.addEvent(d, "mouseup", uabasRec.releaseClick);
				fn.addEvent(d, "touchstart", uabasRec.setClick);
				fn.addEvent(d, "touchend", uabasRec.releaseClick);
			};
			for ( var i = 0, f = iframes.length; i < f; ++i) {
				doc = (window.opera) ? iframes[i] : iframes[i].contentWindow
						|| iframes[i].contentDocument;
				if (doc.attachEvent && !window.opera) {
					var cloned = iframes[i].cloneNode(true);
					iframes[i].parentNode.replaceChild(cloned, iframes[i]);
					iframes[i].onreadystatechange = function(e) {
						if (this.readyState === "complete") {
							frame = this.contentWindow;
							newdoc = frame.document;
							fn.addEvent(newdoc, "mousemove", function(e) {
								uabasRec.getMousePosIFrame(
										this.parentWindow.event,
										this.frames.frameElement);
							});
							fn.addEvent(newdoc, "touchmove", function(e) {
								uabasRec.getMousePosIFrame(
										this.parentWindow.event,
										this.frames.frameElement);
							});
							onFrameLoaded(newdoc);
						}
					};
				} else {
					if (doc.frameElement)
						doc = doc.frameElement;
					fn.addEvent(doc, "load", function(e) {
						frame = e.target || e.srcElement;
						newdoc = frame.contentDocument;
						fn.addEvent(newdoc, "mousemove", function(e) {
							uabasRec.getMousePosIFrame(e, frame);
						});
						fn.addEvent(newdoc, "touchmove", function(e) {
							uabasRec.getMousePosIFrame(e, frame);
						});
						onFrameLoaded(newdoc);
					});
				}
			}
		},

		init : function() {
			uabasRec.computeAvailableSpace();
			// 获取url
			uabasRec.url = escape(window.location.href);
			// 获取记录时间
			uabasRec.timeout = opt.fps * opt.recTime;
			// 主函数
			var interval = Math.round(1000 / opt.fps);
			uabasRec.rec = setInterval(uabasRec.recMouse, interval);
			fn.allowTrackingOnFlashObjects(document);
			uabasRec.trackIFrames(document);
			var onMove = function(e) {
				if (e.touches) {
					e = e.touches[0] || e.targetTouches[0];
				}
				uabasRec.getMousePos(e);
				uabasRec.findElement(e);
			};
			var onPress = function(e) {
				if (e.touches) {
					e = e.touches[0] || e.targetTouches[0];
				}
				uabasRec.setClick();
				uabasRec.findElement(e);
			};
			fn.addEvent(document, "mousedown", onPress);
			fn.addEvent(document, "mousemove", onMove);
			fn.addEvent(document, "mouseup", uabasRec.releaseClick);
			fn.addEvent(document, "touchstart", onPress);
			fn.addEvent(document, "touchmove", onMove);
			fn.addEvent(document, "touchend", uabasRec.releaseClick);
			fn.addEvent(window, "resize", uabasRec.computeAvailableSpace);
			if (!opt.contRecording) {
				if (document.attachEvent && !window.opera) {
					fn.addEvent(document.body, "focusout",
							uabasRec.pauseRecording);
					fn.addEvent(document.body, "focusin",
							uabasRec.resumeRecording);
				} else {
					fn.addEvent(window, "blur", uabasRec.pauseRecording);
					fn.addEvent(window, "focus", uabasRec.resumeRecording);
				}
			}
			if (typeof window.onbeforeunload == 'function') {
				fn.addEvent(window, "beforeunload", uabasRec.appendMouseData);
			} else {
				fn.addEvent(window, "unload", uabasRec.appendMouseData);
			}
			setTimeout(uabasRec.initMouseData, opt.postInterval * 1000);
			uabasRec.timestamp = (new Date()).getTime();
		}
	};

	// 主函数
	window.uabas = {
		// 开始记录
		record : function(opts) {
			// 加载参数
			if (typeof opts !== 'undefined') {
				fn.overrideTrackingOptions(opt, opts);
			}
			if (opt.disabled) {
				return;
			}
			uabasRec.websiteId = opts.id;
			/*
			 * try to auto-detect smt2 path to tracking scripts var scripts =
			 * document.getElementsByTagName('script'); for ( var i = 0, s =
			 * scripts.length; i < s; ++i) { var filename = scripts[i].src; if
			 * (/smt-record/i.test(filename)) { var paths = filename.split("/");
			 * var pos = aux.array.indexOf(paths, "smt2"); if (pos &&
			 * smtOpt.trackingServer === null) { smtOpt.trackingServer =
			 * paths.slice(0, pos + 1).join( "/"); } } }
			 */
			// 页面加载完后开始记录
			fn.onDOMload(uabasRec.init);
		}
	};

})();