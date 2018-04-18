

summerready = function(){
 	Wechat.isInstalled(function (installed) {
	    alert("Wechat installed: " + (installed ? "Yes" : "No"));
	}, function (reason) {
	    alert("Failed: " + reason);
	});
 
}
function getPrePay(){
	summer.ajax({
        "type":"get",//请求方式
        "url":"http://app.llhlec.com/index.php/WXAPI/Pay/wxPay_functions",//url地址
        "param":{},//可选参数，post请求的要写入的条件数据，须为json对象 
    }, function(response){//成功回调
        alert(response.data);
        console.log(response);
        var totalData=JSON.parse(response.data);
        // wechatpay()；
         var timeSt=String(parseInt(new Date().getTime()/1000));
         var totalMessage="appid="+totalData.appid+"&noncestr="+totalData.noncestr+"&package="+totalData.package+"&partnerid="+totalData.partnerid+"&prepayid="+totalData.prepayid+"&timestamp="+timeSt
	    var stringSignTemp=totalMessage+"&key=681ED567D9AA7286872B5672AC4FFA8A" //注：key为商户平台设置的密钥key
        var  signFinanl=hex_md5(stringSignTemp).toUpperCase(); //注：MD5签名方式
			var params = {
			"appid":totalData.appid,
			"package":totalData.package,
		    "partnerid":totalData.partnerid, // merchant id
		    "prepayid": totalData.prepayid, // prepay id
		    "noncestr":totalData.noncestr, // nonce
		    "timestamp": timeSt, // timestamp
		    "sign": signFinanl, // signed string
		};
		
		Wechat.sendPaymentRequest(params, function (arg) {
			console.log(arg);
		    alert("Success");
		}, function (reason) {
		    alert("Failed: " + reason);
		});
    }, function(response){ //失败回调
        alert(response.data);
        alert(response.error);
    });
}
function wechatpay(){
	
 
}