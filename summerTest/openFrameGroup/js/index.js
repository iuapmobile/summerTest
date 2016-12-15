summerready = function(){
    openFrameGroup()
}
var turn1=1;
var turn2=1;
//打开frame组
function openFrameGroup(){
	var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
    summer.openFrameGroup({
    	id: 'group1',    
	    background: '#ffffff',    
	    scrollEnabled: false,    
	    position: {    
	        top: y,    
	        left: 0,    
	        width: width,    
	        height: height    
	    },    
	    index: 0,    
	    frames: [{    
	        id: 'frame1',    
	        url: 'html/frame1.html',    
	        bgColor: '#ffffff',    
	        hidden: true
	    }, {    
	        id: 'frame2',    
	        url: 'html/frame2.html',    
	        bgColor: '#ffffff',     
	        hidden: false       
	    }, {    
	        id: 'frame3',    
	        url: 'html/frame3.html',    
	        bgColor: '#ffffff',    
	        hidden: true    
	    }, {    
	        id: 'frame4',    
	        url: 'html/frame4.html',    
	        bgColor: '#ffffff',    
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
	if(turn2==1){
		summer.closeFrameGroup({
			id : "group1"
		});
		turn2=2;
	}else{
		openFrameGroup()
		turn2=1;
	}

}
//设置frame的显示和隐藏

function setFrameGroupAttrHidden() {
	if (turn1 == 1) {
		summer.setFrameGroupAttr({
			id : 'group1',
			hidden : true
		});
		turn1 = 2;
	} else {
		summer.setFrameGroupAttr({
			id : 'group1',
			hidden : false
		});
		turn1 = 1;
	}

}

//设置frame的索引值显示在最上面
function setFrameGroupAttr(index){
	summer.setFrameGroupAttr({    
		id : 'group1',
		index : index
	});
}
summer.op