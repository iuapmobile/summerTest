

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        id: 'main1',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height/2
        }
    });
    
     summer.openFrame({
        id: 'main2',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: height/2,
            w: width,
            h: height/2
        }
    });
}