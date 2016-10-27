

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    //var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
    
    var bottom = $summer.offset($summer.byId('footer')).h;

    summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        position: {
            left: 0,
            right:0,
            top: y,
            bottom:bottom
        }
    });
}