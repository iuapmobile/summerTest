summerready = function(){
    // here is your code...	
}

//打开frame组
function openFrameGroup(){
	var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
    summer.openFrameGroup({
    	id: 'group1',    
	    background: '#fff',    
	    scrollEnabled: false,    
	    position: {    
	        top: 0,    
	        left: 0,    
	        width: width,    
	        height: height    
	    },    
	    index: 0,    
	    frames: [{    
	        id: 'frame1',    
	        url: 'html/frame1.html',    
	        bgColor: '#fff',    
	        hidden: true
	    }, {    
	        id: 'frame2',    
	        url: 'html/frame2.html',    
	        bgColor: '#fff',     
	        hidden: false       
	    }, {    
	        id: 'frame3',    
	        url: 'html/frame3.html',    
	        bgColor: '#fff',    
	        hidden: true    
	    }, {    
	        id: 'frame4',    
	        url: 'html/frame4.html',    
	        bgColor: '#fff',    
	        hidden: true    
	    }]    
    },
    function(){
    	//success
    },
    function(){
    	//error
    });
}
//关闭frame组
function closeFrameGroup(){
	summer.closeFrameGroup({
		id : "group1"
	});
}
//设置frame的显示和隐藏
function setFrameGroupAttrHidden(boo){
	summer.setFrameGroupAttr({    
	    id: 'group1',    
	    hidden: boo    
	});    
}
//设置frame的索引值显示在最上面
function setFrameGroupAttr(index){
	summer.setFrameGroupAttr({    
		id : 'group1',
		index : index
	});
}