

summerready = function(){
    // here is your code...	
    var top = $summer.offset($summer.byId('header')).h;
	var bottom = $summer.offset($summer.byId('footer')).h;
    summer.window.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        position: {
            top: top,
			bottom: bottom+40,
            left: 0,
            right: 0
        },
        opaque: false
    });
}