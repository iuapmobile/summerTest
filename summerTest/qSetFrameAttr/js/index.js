

summerready = function(){
    var y = $summer.offset($summer.byId('header')).h;
    var width = $summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        id: 'main1',
        url: 'html/main1.html',
        bounces: true,
        position: {
            top:y,
            bottom: height/3,
            left:0,
            right: 0
        }
    });
    
     summer.openFrame({
        id: 'main2',
        url: 'html/main2.html',
        bounces: true,
        position: {
            top:height/2,
            bottom: 100,
            left:0,
            right: 0
        }
    });
}
function testAll(turn){
	summer.setFrameAttr({
        "id" : 'main1',
        "hidden" : turn
     },null,null);
     
     summer.setFrameAttr({
        "id" : 'main2',
        "hidden" : turn
     },null,null);
}


function test(url){
	summer.setFrameAttr({
        "id" : url,
        "hidden" : true
     },null,null);
}
function test1(url){
	summer.setFrameAttr({
        "id" : url,
        "hidden" : false
     },null,null);   
}