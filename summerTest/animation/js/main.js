function openWin(type,subType,time){
	 summer.openWin({
		id:'newPage',
		url: 'html/newPage.html',
		animation:{
		    type:type,                //动画类型（详见动画类型常量），例如滑动
		    subType:subType,       //动画子类型（详见动画子类型常量），从左到右，从右到左
		    duration:time               //动画过渡时间，默认300毫秒，可以不写该参数
		}
	})	
}




