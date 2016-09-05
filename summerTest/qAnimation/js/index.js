function openFrame(type,subType,duration){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
    summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        },
        animation:{
		    type:type,                //动画类型（详见动画类型常量），例如滑动
		    subType:subType,       //动画子类型（详见动画子类型常量），从左到右，从右到左
		    duration:time               //动画过渡时间，默认300毫秒，可以不写该参数
		}
    });
}

function closeFrame(){
	summer.closeFrame({id:"main"})
}






