

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    });
}

$(function(){

	$("#item1").on("click", function(){
		summer.openWin({
            "id" : 'new_page1',
            "url" : 'html/new_page1.html',
            "pageParam" : {
                "count" : 1
            }
        });
        
        summer.closeWin();
	})
	
})