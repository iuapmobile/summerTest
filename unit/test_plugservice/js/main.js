//here is your code...
summerready = function () {
	//$summer.byId("content").innerHTML += "<h3 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h3><h3 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h3>";
	
	if($summer.os == "ios"){
		//初始化语音
		summer.callService("SpeechService.init", {"appid" : "54ff9af9"}, false);
	}else{
		summer.callService("SpeechService.init", {"appid" : "58a105c0"}, false);
	}
};

function speechToString(){
	$alert("开始语音识别");
	//语音识别
	/*
	$service.call("SpeechService.openSpeechBackString", {
		"bindfield" : "text",
		"callback" : "microPhoneCallback()",
		"error" : "microPhoneCallback()"
	}, false);
	*/
	summer.callService("SpeechService.openSpeechBackString", {
		"callback" : "microPhoneCallback()",
		"error" : "microPhoneCallback()"
	}, false);
	
}

function microPhoneCallback(args) {
	if(typeof args != "object"){
		alert("callback参数args不是一个有效的json，请通知平台开发人员修改为标准json格式");
	}
	alert("您刚才说的是:"+args.result);
	
}

function stringToSpeech(){
	$alert("开始语音合成");
	//语音合成
	$service.call("SpeechService.openStringBackSpeech", {
		"text" : "巴山楚水凄凉地，二十三年弃置身。怀旧空吟闻笛赋，到乡翻似烂柯人。",
		"callback" : "initSpeechCallback()",
		"error" : "initSpeechCallback()"
	}, false);
}

function initSpeechCallback(){}