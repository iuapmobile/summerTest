function test(){  //全屏有状态条 android应用全屏无状态条
	summer.openWin({
        "id" : 'new1',
        "url" : 'html/new1.html',
        "pageParam" : {
            "count" : 1
        },
        'statusBarStyle':"light",
        "statusBarAppearance" : true,
        "fullScreen" : true,
        "animation" : {
            'type' :"movein", //none|push|fade
            'subType':"from_right", //from_left|from_top|from_bottom
            'duration':300
        }
    });
}
