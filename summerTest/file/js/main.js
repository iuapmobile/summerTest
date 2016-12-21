function opwnWin(name){
	summer.openWin({
        "id" : name,
        "url" : 'html/'+name+'.html',
        "animation" : {
            'type' :"movein", //none|push|fade
            'subType':"from_right", //from_left|from_top|from_bottom
            'duration':300
        }
    });
}
