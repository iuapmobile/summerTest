

summerready = function(){
    // here is your code...	
    var height= $summer.offset($summer.byId('win')).h;
   summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        position: {
            top: 0,
			bottom:0,
            left: 0,
            right: 0
        }
    });
    summer.openFrame({
        id: 'header',
        url: 'html/header.html',
        bounces: true,
       	opaque:false,
        position: {
            top:0,
			bottom: height-44,
            left: 0,
            right: 0
        }
    });
}