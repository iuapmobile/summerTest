summerready = function(){
    // here is your code...	
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
function openGroup(index){
	summer.setFrameGroupAttr({
		id : "group1",
		index : index
	});
}