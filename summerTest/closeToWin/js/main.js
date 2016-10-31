
function openWin(id){
	summer.openWin({
        "id" : id,
        "url" : 'html/'+id+'.html',
        "animation" : {
	        'type' :"movein", //none|push|fade
	        'subType':"from_right", //from_left|from_top|from_bottom
	        'duration':300
    	}
    });
}
function closeWin(){
	summer.closeWin({
		"animation" : {
	        'type' :"movein", //none|push|fade
	        'subType':"from_top", //from_left|from_top|from_bottom
	        'duration':300
    	}
	})
}

function closeToWin(id){
	summer.closeToWin({"id":id})
}
