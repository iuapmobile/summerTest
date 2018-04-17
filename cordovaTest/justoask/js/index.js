

summerready = function(){
    // here is your  
}

function wechat() {
   // var name = summer.getStorage("userinfo").name;
    Wechat.isInstalled(function (installed) {
    	summer.toast({
             "msg" : "微信已经安装" 
        })
        // 朋友圈和好友
        var scene = Wechat.Scene.SESSION;
        // 标题
        var title = "张三邀请您加入" ;
        // 描述
        var description = "Moli让企业智能应用，触手可及 ！";
        // 跳转地址
        var webpageUrl = "www.baidu.com";
        var params = {
            scene: scene,
            message: {
                title: title,
                description: description,
                media: {
                    type: Wechat.Type.WEBPAGE,
                    webpageUrl: webpageUrl
                }
            }
        };
        Wechat.share(params, function () {
            summer.toast({"msg": "分享成功"});
        }, function (reason) {
            summer.toast({"msg": reason});
        });
    }, function (reason) {
        summer.toast({"msg": reason});
    });
    //closeMark();
}
