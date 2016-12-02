//默认全屏加载main页面
summerready = function() {
	$summer.fixStatusBar($summer.byId('header'));
	var top = $summer.offset($summer.byId('header')).h;
	var bottom = $summer.offset($summer.byId('footer')).h;
	summer.openFrame({
		id : 'main',
		url : 'html/main.html',
		bounces : true,
		position : {
			top : top,
			bottom : bottom,
			left : 0,
			right : 0
		}
	});
};

//打开frame方法
function openFrame(name) {
	var top = $summer.offset($summer.byId('header')).h;
	var bottom = $summer.offset($summer.byId('footer')).h;
	summer.openFrame({
		id : name,
		url : 'html/' + name + '.html',
		bounces : true,
		position : {
			top : top,
			bottom : bottom,
			left : 0,
			right : 0
		}
	});
};
//打开window方法
function openWin(name) {
	summer.openWin({
		"id" : name,
		"url" : 'html/' + name + '.html',
		"fullScreen" : true,
		"animation" : {
			'type' : "movein", 
			'subType' : "from_right", 
			'duration' : 300
		}
	});
};
//执行登录页面定义的方法
function set(obj) {
	$('#name').html(obj);
	openFrame('main');
	$('.um-footerbar-item').eq(0).addClass('active').siblings('.um-footerbar-item').removeClass('active');

}
//执行登录页面定义的方法(安卓返回键)
function set2(obj) {
	openFrame('main');
	$('.um-footerbar-item').eq(0).addClass('active').siblings('.um-footerbar-item').removeClass('active');

}

