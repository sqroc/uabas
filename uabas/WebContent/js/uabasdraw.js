(function() {

	var drawOpt = {

		entryPt : "#9F6", // 鼠标起点颜色
		exitPt : "#F66", // 鼠标退出点颜色
		regPt : "#F0F", // 记录点颜色
		regLn : "#0CC", // 线条颜色
		click : "#F00", // 鼠标点击颜色
		dDrop : "#ABC", // 鼠标拖拉的颜色
		varCir : "#F99", // 用户停止
		cenPt : "#DDD", // 中心颜色
		clust : "#00F", // 集群颜色
		bgColor : "#555", // 背景颜色
		bgLayer : true, // 是否使用背景
		realTime : true,
		dirVect : false,
		layoutType : "liquid"
	};

	var mouseData = window.smt2data;
	var jsGraphics = window.jsGraphics;
	var fn = window.uabasfunction;

	// 获取鼠标坐标数据
	var user;
	var users = JSON.parse(unescape(mouseData.users));
	var numUsers = users.length;
	if (numUsers > 1) {
		for ( var i = 0; i < numUsers; ++i) {
			if (users[i].avg) {
				user = users[i];
				break;
			}
		}
	} else {
		user = users[0];
	}

	var xclean = [];
	var yclean = [];

	// 鼠标绘制对象
	var drawMouse = {
		i : 0, // 鼠标绘制出的坐标点的计数
		j : 1, // 坐标点记录的最大的计数
		jMax : 0, // 坐标点数量的限制
		play : null,
		jg : null, // canvas绘图区域
		jgClust : null,
		jgHelper : null,
		page : {
			width : 0,
			height : 0
		},
		viewport : {
			width : 0,
			height : 0
		},
		discrepance : {
			x : 1,
			y : 1
		},
		paused : false,

		// 创建canvas图层
		createCanvas : function(layerName) {

			var jg = document.createElement("div");
			jg.id = layerName;
			jg.style.position = "absolute";
			jg.style.top = 0;
			jg.style.left = 0;
			jg.style.width = 100 + '%';
			jg.style.height = 100 + '%';
			jg.style.zIndex = fn.getNextHighestDepth() + 1;

			var jgHelp = document.createElement("div");
			jgHelp.id = layerName + "Help";
			jgHelp.style.zIndex = jg.style.zIndex + 1;

			var opacity = 40;
			var jgClust = document.createElement("div");
			jgClust.id = layerName + "Clust";
			jgClust.style.position = "absolute";
			jgClust.style.top = 0;
			jgClust.style.left = 0;
			jgClust.style.width = 100 + '%';
			jgClust.style.height = 100 + '%';
			jgClust.style.opacity = opacity / 100;
			jgClust.style.filter = "alpha(opacity=" + opacity + ")";
			jgClust.style.zIndex = jg.style.zIndex + 2;

			var body = document.getElementsByTagName("body")[0];
			body.appendChild(jg);
			body.appendChild(jgHelp);
			body.appendChild(jgClust);

			drawMouse.jg = new jsGraphics(jg.id);
			drawMouse.jgHelper = new jsGraphics(jgHelp.id);
			drawMouse.jgClust = new jsGraphics(jgClust.id);
		},

		// 创建背景图层
		setBgCanvas : function(layerName) {
			var opacity = 80, jg = document.getElementById(layerName);

			var bg = document.createElement("div");
			bg.id = layerName + "Bg";
			bg.style.position = "absolute";
			bg.style.top = 0;
			bg.style.left = 0;
			bg.style.width = drawMouse.page.width + 'px';
			bg.style.height = drawMouse.page.height + 'px';
			bg.style.overflow = "hidden";
			bg.style.backgroundColor = drawOpt.bgColor;
			bg.style.opacity = opacity / 100; // for W3C browsers
			bg.style.filter = "alpha(opacity=" + opacity + ")"; // only for IE
			bg.style.zIndex = jg.style.zIndex - 1;

			var body = document.getElementsByTagName("body")[0];
			body.appendChild(bg);
		},

		// 绘制线条
		drawLine : function(ini, end) {
			drawMouse.jg.setColor(drawOpt.regLn);
			drawMouse.jg.drawLine(ini.x, ini.y, end.x, end.y);
			drawMouse.jg.paint();
		},

		// 绘制鼠标点击时的图形
		drawClick : function(x, y, isDragAndDrop) {
			var size;
			if (!isDragAndDrop) {
				size = 10;
				drawMouse.jg.setColor(drawOpt.click);
				drawMouse.jg.setStroke(5);
				drawMouse.jg.drawLine(x - size, y - size, x, y);
				drawMouse.jg.drawLine(x - size, y + size, x, y);
				drawMouse.jg.drawLine(x + size, y - size, x, y);
				drawMouse.jg.drawLine(x + size, y + size, x, y);

				drawMouse.jg.setStroke(0);
			} else {
				size = 6;
				drawMouse.jg.setColor(drawOpt.dDrop);
				drawMouse.jg.drawRect(x - size / 2, y - size / 2, size, size);
			}
			drawMouse.jg.paint();
		},

		drawDirectionArrow : function(ini, end) {
			var a = ini.x - end.x, b = ini.y - end.y, s = 4;
			if (a > 0 && b > 0) {
				drawMouse.jg.drawPolyline([ end.x - s, end.x, end.x + s ], [
						end.y + s, end.y, end.y + s ]);
			} else if (a < 0 && b > 0) {
				drawMouse.jg.drawPolyline([ end.x - s, end.x, end.x - s ], [
						end.y - s, end.y, end.y + s ]);
			} else if (a < 0 && b < 0) {
				drawMouse.jg.drawPolyline([ end.x - s, end.x, end.x + s ], [
						end.y - s, end.y, end.y - s ]);
			} else if (a > 0 && b < 0) {
				drawMouse.jg.drawPolyline([ end.x + s, end.x, end.x + s ], [
						end.y - s, end.y, end.y + s ]);
			}
			drawMouse.jg.paint();
		},

		// 绘制鼠标指针
		drawCursor : function(x, y, color) {
			drawMouse.jg.setColor(color);
			drawMouse.jg.fillPolygon(
					[ x, x, x + 4, x + 6, x + 9, x + 7, x + 15 ], [ y, y + 15,
							y + 15, y + 23, y + 23, y + 15, y + 15 ]);
			drawMouse.jg.paint();
		},

		// 绘制记录点
		drawRegistrationPoint : function(x, y) {
			drawMouse.jg.setColor(drawOpt.regPt);
			drawMouse.jg.fillRect(x - 1, y - 1, 3, 3);
			drawMouse.jg.paint();
		},

		drawVariableCircle : function(x, y, size) {
			var norm = fn.roundTo(size / drawMouse.jMax);
			if (size * norm === 0) {
				return;
			}
			if (size > mouseData.wcurr / 2) {
				size = Math.round(mouseData.wcurr / 2 * norm);
			}

			drawMouse.jg.setColor(drawOpt.varCir);
			drawMouse.jg.drawEllipse(x - size / 2, y - size / 2, size, size);
			drawMouse.jg.paint();
		},

		drawMouseStop : function(x, y) {
			if (!drawOpt.realTime) {
				return;
			}

			var fontSize = 16, circleSize = 50;
			drawMouse.jgHelper.setColor(drawOpt.varCir);
			drawMouse.jgHelper.fillEllipse(x - circleSize / 2, y - circleSize
					/ 2, circleSize, circleSize);
			drawMouse.jgHelper.setColor("black");
			drawMouse.jgHelper
					.setFont("sans-serif", fontSize + 'px', Font.BOLD);
			// center the text in vertical
			drawMouse.jgHelper.drawString("stopped...", x, y - fontSize / 2);
			drawMouse.jgHelper.paint();
		},

		drawCentroid : function() {
			drawMouse.jg.setColor(drawOpt.cenPt);
			var xsum = fn.array.sum(xclean) / xclean.length;
			var ysum = fn.array.sum(yclean) / yclean.length;

			if (drawOpt.layoutType == "liquid") {
				xsum *= drawMouse.discrepance.x;
				xsum *= drawMouse.discrepance.x;
			} else if (drawOpt.layoutType == "center") {
				xsum += drawMouse.discrepance.x;
				xsum += drawMouse.discrepance.x;
			}

			var u = Math.round(xsum), v = Math.round(ysum), l = 20;
			drawMouse.jg.setStroke(5);
			drawMouse.jg.drawLine(u, v, u + l, v - l);
			drawMouse.jg.drawLine(u, v, u - l, v - l);
			drawMouse.jg.drawLine(u, v, u - l, v + l);
			drawMouse.jg.drawLine(u, v, u + l, v + l);
			drawMouse.jg.setStroke(0);
			drawMouse.jg.paint();
		},

		drawClusters : function(response) {
			var K = JSON.parse(response);

			if (typeof K !== 'object') {
				K = JSON.parse(K);
			}
			drawMouse.jgClust.setColor(drawOpt.clust);
			for ( var i = 0, size = 0, numClusters = K.sizes.length; i < numClusters; ++i) {
				size = K.sizes[i];
				drawMouse.jgClust.fillEllipse(K.xclusters[i]
						* drawMouse.discrepance.x - size / 2, K.yclusters[i]
						* drawMouse.discrepance.y - size / 2, size, size);
			}
			drawMouse.jgClust.paint();
		},

		// 计算两点间的距离
		distance : function(a, b) {
			return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
		},

		checkAutoScrolling : function(x, y) {
			if (!drawOpt.realTime) {
				return;
			}
			// center current mouse coords on the viewport
			fn.doScroll({
				xpos : x,
				ypos : y,
				width : drawMouse.viewport.width,
				height : drawMouse.viewport.height
			});
		},

		// 绘制鼠标移动路径主函数
		playMouse : function() {
			if (drawMouse.paused) {
				return;
			}

			var iniMouse = {
				x : user.xcoords[drawMouse.i] * drawMouse.discrepance.x,
				y : user.ycoords[drawMouse.i] * drawMouse.discrepance.y
			};
			var endMouse = {
				x : user.xcoords[drawMouse.i + 1] * drawMouse.discrepance.x,
				y : user.ycoords[drawMouse.i + 1] * drawMouse.discrepance.y
			};

			var currClickType = user.clicks[drawMouse.i];
			var nextClickType = user.clicks[drawMouse.i + 1];
			var currClickX = currClickType > 0 ? user.xcoords[drawMouse.i] : 0;
			var nextClickX = nextClickType > 0 ? user.xcoords[drawMouse.i + 1]
					: 0;
			var currClickY = currClickType > 0 ? user.ycoords[drawMouse.i] : 0;
			var nextClickY = nextClickType > 0 ? user.ycoords[drawMouse.i + 1]
					: 0;

			var iniClick = {
				x : currClickX * drawMouse.discrepance.x,
				y : currClickY * drawMouse.discrepance.y
			};
			var endClick = {
				x : nextClickX * drawMouse.discrepance.x,
				y : nextClickY * drawMouse.discrepance.y
			};

			// 绘制起始点
			if (drawMouse.i === 0) {
				drawMouse.drawCursor(iniMouse.x, iniMouse.y, drawOpt.entryPt);
			}

			// 绘制鼠标路径主循环
			if (drawMouse.i < user.xcoords.length) {
				var mouseDistance = drawMouse.distance(iniMouse, endMouse);
				// 绘制记录点
				if (mouseDistance) {

					if (!drawOpt.dirVect) {
						drawMouse.drawRegistrationPoint(iniMouse.x, iniMouse.y);
					} else {
						drawMouse.drawDirectionArrow(iniMouse, endMouse);
					}

					if (drawMouse.j > 1) {
						drawMouse.drawVariableCircle(iniMouse.x, iniMouse.y,
								drawMouse.j);
						drawMouse.jgHelper.clear();
					}

					drawMouse.j = 1;
				} else {
					// 鼠标暂停
					++drawMouse.j;
					drawMouse.drawMouseStop(iniMouse.x, iniMouse.y);
				}
				// 绘制线条
				drawMouse.drawLine(iniMouse, endMouse);
				// 绘制鼠标点击
				if (iniClick.x) {
					var clickDistance = drawMouse.distance(iniClick, endClick);
					if (!clickDistance) {
						drawMouse.drawClick(endClick.x, endClick.y, false);
					} else if (endClick.x !== 0) {
						drawMouse.drawClick(iniClick.x, iniClick.y, true);
					}
				}
				++drawMouse.i;
				drawMouse.checkAutoScrolling(endMouse.x, endMouse.y);
			}

			// 绘制退出点
			else {
				--drawMouse.i;
				iniMouse.x = user.xcoords[drawMouse.i]
						* drawMouse.discrepance.x;
				iniMouse.y = user.ycoords[drawMouse.i]
						* drawMouse.discrepance.y;

				drawMouse.drawCursor(iniMouse.x, iniMouse.y, drawOpt.exitPt);

				var data = "xhr=1";
				data += "&xdata=" + JSON.stringify(user.xcoords);
				data += "&ydata=" + JSON.stringify(user.ycoords);

				drawMouse.drawCentroid();

				clearInterval(drawMouse.play);
				drawMouse.play = null;
				drawMouse.jgHelper.clear();
				if (numUsers == 1) {

					fn.loadNextMouseTrail(mouseData);
				}
			}
		},

		replay : function(realtime) {
			if (realtime) {
				var interval = Math.round(1000 / mouseData.fps);
				drawMouse.play = setInterval(drawMouse.playMouse, interval);
			} else {
				for ( var k = 0, total = user.xcoords.length; k <= total; ++k) {
					drawMouse.playMouse();
				}
			}
		},
		reset : function() {
			clearInterval(drawMouse.play);
			drawMouse.paused = false;
			drawMouse.i = 0;
			drawMouse.j = 1;
			drawMouse.jg.clear();
			drawMouse.jgClust.clear();
		},
		helpKeys : function(e) {
			if (!drawOpt.realTime) {
				return;
			}

			if (!e) {
				e = window.event;
			}
			var code = e.keyCode || e.which;
			if (code == 27) {
				clearInterval(drawMouse.play);
				drawMouse.paused = false;
				drawOpt.realTime = false;
				for ( var k = drawMouse.i, total = user.xcoords.length; k <= total; ++k) {
					drawMouse.playMouse();
				}
			} else if (code == 32) {
				drawMouse.paused = !drawMouse.paused;
			}
		},

		// 初始化
		init : function() {
			var vp = fn.getWindowSize();
			drawMouse.viewport.width = vp.width;
			drawMouse.viewport.height = vp.height;
			var doc = fn.getPageSize();
			drawMouse.page.width = doc.width;
			drawMouse.page.height = doc.height;
			if (user.wprev && user.hprev) {
				drawMouse.discrepance.x = fn.roundTo(doc.width / user.wprev);
				drawMouse.discrepance.y = fn.roundTo(doc.height / user.hprev);
			}

			var stops = [];
			var size = 1;
			for ( var k = 0, len = user.xcoords.length; k < len; ++k) {
				if (user.xcoords[k] == user.xcoords[k + 1]
						&& user.ycoords[k] == user.ycoords[k + 1]) {
					++size;
				} else {
					if (size > 1) {
						stops.push(size);
					}
					size = 1;
					xclean.push(user.xcoords[k]);
					yclean.push(user.ycoords[k]);
				}
			}
			drawMouse.jMax = fn.array.max(stops);
			var name = "drawCanvas";
			drawMouse.createCanvas(name);
			if (drawOpt.bgLayer) {
				drawMouse.setBgCanvas(name);
			}
			// 运行程序
			drawMouse.replay(drawOpt.realTime);
		}

	};

	window.draw = {
		replay : function(opts) {
			if (typeof opts !== "undefined") {
				fn.overrideTrackingOptions(drawOpt, opts);
			}
			fn.addEvent(document, "keyup", drawMouse.helpKeys);
			fn.onDOMload(function() {
				fn.allowTrackingOnFlashObjects(document);
			});
			fn.addEvent(window, "load", drawMouse.init);
		}
	}

})();
