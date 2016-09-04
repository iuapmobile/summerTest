

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
return;
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

function add(){
	var row = {
        				"sender" : "集团技术部1111",
        				"img" : "./img/org4.png",
        				"msgNum" : 2,
        				"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
        				"lastTime" : "16:22",
        			};
        			viewModel.data.push(row);
        			//listview.refresh();
}