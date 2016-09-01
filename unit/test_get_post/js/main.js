//here is your code...
summerready = function () {
    $summer.byId("content").innerHTML += "<p>Hello friends, welcome to touch the summer frame!</p><p>The frame update at " +(new Date()).toLocaleString()+"</p>"; 
};


var	url1 = 'http://opentest.yonyoutelecom.cn/mobile/queryByAppName.do?account=qinfx&q=';
var	url2 = 'http://opentest.yonyoutelecom.cn/mobile/queryConvience.do?region_type=2&q=';
		
//使用jquery的ajax来访问请求
function jquery_ajax(type) {
	$.ajax({
		type : type,
		url : url2,
		data : {},
		cache : false,
		dataType : 'json',
		success : function(ret) {
			//data是对象
			alert("服务器端返回值的类型为" + typeof ret);
			alert(ret);//结果为[objet Object],[objet Object],[objet Object]这些
			alert(JSON.stringify(ret));//
			alert(ret.length);//获取返回数据的长度
			alert(ret[2].text);//获取返回值的第三条数据的text值
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
		 	alert(XMLHttpRequest.readyState);
		 	alert(textStatus);
   		}
	});
}

//使用cordova请求的数据
function cordova_ajax(type) {
	if(type == "get"){
		cordovaHTTP.get(url2, {}, {
		}, function(response) {
			alert("服务器端返回值的类型为" + typeof response);
			alert(response);//结果为[objet Object],[objet Object],[objet Object]这些
			alert(JSON.stringify(response));//
			
			alert(response.data);//response.data是字符串类型
			alert("共返回"+JSON.parse(response.data).length+"条数据");//获取返回数据的长度
			alert(JSON.parse(response.data)[2].text);//获取返回值的第三条数据的text值
		}, function(response) {
			alert("err");
			alert(typeof response);//结果为object
			
			alert(JSON.stringify(response));
			alert(response.error);//查看错误信息
		});
	}else if(type == "post"){
		//alert(type)
		cordovaHTTP.post(url2, {}, {
		}, function(response) {
			alert("服务器端返回值的类型为" + typeof response);
			alert(response);//结果为[objet Object],[objet Object],[objet Object]这些
			alert(JSON.stringify(response));//
			
			alert(response.data);//response.data是字符串类型
			alert("共返回"+JSON.parse(response.data).length+"条数据");//获取返回数据的长度
			alert(JSON.parse(response.data)[2].text);//获取返回值的第三条数据的text值
		}, function(response) {
			alert("err");
			alert(typeof response);//结果为object
			
			alert(JSON.stringify(response));
			alert(response.error);//查看错误信息
		});
		
	}
}


//使用$service来请求
function $service_ajax(type){
	var service_ajax = "";
	if(type == "post"){
		service_ajax = $service.post;
	}else if(type == "get"){
		service_ajax = $service.get;
	}
	
	
	service_ajax({
        //"url" : "http://opentest.yonyoutelecom.cn/mobile/queryByISVName.do?account=qinfx&q=",
        "url" : url2,
        "data" : {},
        "callback" : function (sender,args){
        	alert("ok")
			//alert(JSON.parse(args.result).data.totalItemNum)//业务数据
			//alert(JSON.parse(args.result).desc)//业务数据
			
			alert("共返回"+JSON.parse(args.result).length+"条数据");//获取返回数据的长度
			alert(JSON.parse(args.result)[2].text);//获取返回值的第三条数据的text值
		},
		error:function(err){
			alert("err")
			alert(typeof err);
			alert(JSON.stringify(err));
		},
        "header":{
                    
        },
        "timeout" :5
	});
	
}


function $service_ajax_err(type){
	debugger;
	if(type == "post"){
		$service.post({
            "url" : "http://opentest.yonyoutelecom.cn/mobile/queryByISVName.do?account=qinfx&q=",
            "data" : {},
            "callback" : "mycallback()",
            "header":{
                        
             },
            "timeout" :5
   		})
	}else if(type == "get"){
		$service.get({
            "url" : "http://opentest.yonyoutelecom.cn/mobile/queryByISVName.do?account=qinfx&q=",
            "data" : {},
            "callback" : "mycallback()",
            "header":{
                        
             },
            "timeout" :5
   		})
	}
	
	
	function mycallback(sender, args){
		alert(JSON.parse(args.result).data.totalItemNum)//业务数据
		alert(JSON.parse(args.result).desc)//业务数据
	}
	
}








var serverData = [{"com_amount":0,"gift_amount":0,"id":"341100","pay_type":-1,"text":"滁州市"},{"com_amount":0,"gift_amount":0,"id":"341200","pay_type":-1,"text":"阜阳市"},{"com_amount":0,"gift_amount":0,"id":"341300","pay_type":-1,"text":"宿州市"},{"com_amount":0,"gift_amount":0,"id":"341400","pay_type":-1,"text":"巢湖市"},{"com_amount":0,"gift_amount":0,"id":"451200","pay_type":-1,"text":"河池市"},{"com_amount":0,"gift_amount":0,"id":"451300","pay_type":-1,"text":"来宾市"},{"com_amount":0,"gift_amount":0,"id":"451400","pay_type":-1,"text":"崇左市"},{"com_amount":0,"gift_amount":0,"id":"460100","pay_type":-1,"text":"海口市"},{"com_amount":0,"gift_amount":0,"id":"460200","pay_type":-1,"text":"三亚市"},{"com_amount":0,"gift_amount":0,"id":"469000","pay_type":-1,"text":"省直辖县级行政单位"},{"com_amount":0,"gift_amount":0,"id":"421300","pay_type":-1,"text":"随州市"},{"com_amount":0,"gift_amount":0,"id":"422800","pay_type":-1,"text":"恩施土家族苗族自治州"},{"com_amount":0,"gift_amount":0,"id":"429000","pay_type":-1,"text":"省直辖县级行政单位"},{"com_amount":0,"gift_amount":0,"id":"430100","pay_type":-1,"text":"长沙市"},{"com_amount":0,"gift_amount":0,"id":"610500","pay_type":-1,"text":"渭南市"},{"com_amount":0,"gift_amount":0,"id":"610600","pay_type":-1,"text":"延安市"},{"com_amount":0,"gift_amount":0,"id":"610700","pay_type":-1,"text":"汉中市"},{"com_amount":0,"gift_amount":0,"id":"610800","pay_type":-1,"text":"榆林市"},{"com_amount":0,"gift_amount":0,"id":"542400","pay_type":-1,"text":"那曲地区"},{"com_amount":0,"gift_amount":0,"id":"542500","pay_type":-1,"text":"阿里地区"},{"com_amount":0,"gift_amount":0,"id":"542600","pay_type":-1,"text":"林芝地区"},{"com_amount":0,"gift_amount":0,"id":"110100","pay_type":-1,"text":"北京市辖区"},{"com_amount":0,"gift_amount":0,"id":"110200","pay_type":-1,"text":"北京市辖县"},{"com_amount":0,"gift_amount":0,"id":"120100","pay_type":-1,"text":"天津市辖区"},{"com_amount":0,"gift_amount":0,"id":"120200","pay_type":-1,"text":"天津市辖县"},{"com_amount":0,"gift_amount":0,"id":"130100","pay_type":-1,"text":"石家庄市"},{"com_amount":0,"gift_amount":0,"id":"510100","pay_type":-1,"text":"成都市"},{"com_amount":0,"gift_amount":0,"id":"320300","pay_type":-1,"text":"徐州市"},{"com_amount":0,"gift_amount":0,"id":"320400","pay_type":-1,"text":"常州市"},{"com_amount":0,"gift_amount":0,"id":"320500","pay_type":-1,"text":"苏州市"},{"com_amount":0,"gift_amount":0,"id":"320600","pay_type":-1,"text":"南通市"},{"com_amount":0,"gift_amount":0,"id":"320700","pay_type":-1,"text":"连云港市"},{"com_amount":0,"gift_amount":0,"id":"610900","pay_type":-1,"text":"安康市"},{"com_amount":0,"gift_amount":0,"id":"611000","pay_type":-1,"text":"商洛市"},{"com_amount":0,"gift_amount":0,"id":"620100","pay_type":-1,"text":"兰州市"},{"com_amount":0,"gift_amount":0,"id":"152900","pay_type":-1,"text":"阿拉善盟"},{"com_amount":0,"gift_amount":0,"id":"210100","pay_type":-1,"text":"沈阳市"},{"com_amount":0,"gift_amount":0,"id":"210200","pay_type":-1,"text":"大连市"},{"com_amount":0,"gift_amount":0,"id":"210300","pay_type":-1,"text":"鞍山市"},{"com_amount":0,"gift_amount":0,"id":"210400","pay_type":-1,"text":"抚顺市"},{"com_amount":0,"gift_amount":0,"id":"210500","pay_type":-1,"text":"本溪市"},{"com_amount":0,"gift_amount":0,"id":"511000","pay_type":-1,"text":"内江市"},{"com_amount":0,"gift_amount":0,"id":"511100","pay_type":-1,"text":"乐山市"},{"com_amount":0,"gift_amount":0,"id":"511300","pay_type":-1,"text":"南充市"},{"com_amount":0,"gift_amount":0,"id":"511400","pay_type":-1,"text":"眉山市"},{"com_amount":0,"gift_amount":0,"id":"511500","pay_type":-1,"text":"宜宾市"},{"com_amount":0,"gift_amount":0,"id":"210600","pay_type":-1,"text":"丹东市"},{"com_amount":0,"gift_amount":0,"id":"210700","pay_type":-1,"text":"锦州市"},{"com_amount":0,"gift_amount":0,"id":"210800","pay_type":-1,"text":"营口市"},{"com_amount":0,"gift_amount":0,"id":"430200","pay_type":-1,"text":"株洲市"},{"com_amount":0,"gift_amount":0,"id":"430300","pay_type":-1,"text":"湘潭市"},{"com_amount":0,"gift_amount":0,"id":"430400","pay_type":-1,"text":"衡阳市"},{"com_amount":0,"gift_amount":0,"id":"430500","pay_type":-1,"text":"邵阳市"},{"com_amount":0,"gift_amount":0,"id":"430600","pay_type":-1,"text":"岳阳市"},{"com_amount":0,"gift_amount":0,"id":"152200","pay_type":-1,"text":"兴安盟"},{"com_amount":0,"gift_amount":0,"id":"152500","pay_type":-1,"text":"锡林郭勒盟"},{"com_amount":0,"gift_amount":0,"id":"820100","pay_type":-1,"text":"澳门辖区"},{"com_amount":0,"gift_amount":0,"id":"130200","pay_type":-1,"text":"唐山市"},{"com_amount":0,"gift_amount":0,"id":"360500","pay_type":-1,"text":"新余市"},{"com_amount":0,"gift_amount":0,"id":"360600","pay_type":-1,"text":"鹰潭市"},{"com_amount":0,"gift_amount":0,"id":"360700","pay_type":-1,"text":"赣州市"},{"com_amount":0,"gift_amount":0,"id":"360800","pay_type":-1,"text":"吉安市"},{"com_amount":0,"gift_amount":0,"id":"360900","pay_type":-1,"text":"宜春市"},{"com_amount":0,"gift_amount":0,"id":"430700","pay_type":-1,"text":"常德市"},{"com_amount":0,"gift_amount":0,"id":"430800","pay_type":-1,"text":"张家界市"},{"com_amount":0,"gift_amount":0,"id":"371700","pay_type":-1,"text":"菏泽市"},{"com_amount":0,"gift_amount":0,"id":"620200","pay_type":-1,"text":"嘉峪关市"},{"com_amount":0,"gift_amount":0,"id":"620300","pay_type":-1,"text":"金昌市"},{"com_amount":0,"gift_amount":0,"id":"620400","pay_type":-1,"text":"白银市"},{"com_amount":0,"gift_amount":0,"id":"620500","pay_type":-1,"text":"天水市"},{"com_amount":0,"gift_amount":0,"id":"620600","pay_type":-1,"text":"武威市"},{"com_amount":0,"gift_amount":0,"id":"620700","pay_type":-1,"text":"张掖市"},{"com_amount":0,"gift_amount":0,"id":"620800","pay_type":-1,"text":"平凉市"},{"com_amount":0,"gift_amount":0,"id":"620900","pay_type":-1,"text":"酒泉市"},{"com_amount":0,"gift_amount":0,"id":"361000","pay_type":-1,"text":"抚州市"},{"com_amount":0,"gift_amount":0,"id":"361100","pay_type":-1,"text":"上饶市"},{"com_amount":0,"gift_amount":0,"id":"511700","pay_type":-1,"text":"达州市"},{"com_amount":0,"gift_amount":0,"id":"511800","pay_type":-1,"text":"雅安市"},{"com_amount":0,"gift_amount":0,"id":"511900","pay_type":-1,"text":"巴中市"},{"com_amount":0,"gift_amount":0,"id":"512000","pay_type":-1,"text":"资阳市"},{"com_amount":0,"gift_amount":0,"id":"513200","pay_type":-1,"text":"阿坝藏族羌族自治州"},{"com_amount":0,"gift_amount":0,"id":"513300","pay_type":-1,"text":"甘孜藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"621000","pay_type":-1,"text":"庆阳市"},{"com_amount":0,"gift_amount":0,"id":"621100","pay_type":-1,"text":"定西市"},{"com_amount":0,"gift_amount":0,"id":"621200","pay_type":-1,"text":"陇南市"},{"com_amount":0,"gift_amount":0,"id":"150500","pay_type":-1,"text":"通辽市"},{"com_amount":0,"gift_amount":0,"id":"150600","pay_type":-1,"text":"鄂尔多斯市"},{"com_amount":0,"gift_amount":0,"id":"150700","pay_type":-1,"text":"呼伦贝尔市"},{"com_amount":0,"gift_amount":0,"id":"150800","pay_type":-1,"text":"巴彦淖尔市"},{"com_amount":0,"gift_amount":0,"id":"150900","pay_type":-1,"text":"乌兰察布市"},{"com_amount":0,"gift_amount":0,"id":"230900","pay_type":-1,"text":"七台河市"},{"com_amount":0,"gift_amount":0,"id":"231000","pay_type":-1,"text":"牡丹江市"},{"com_amount":0,"gift_amount":0,"id":"231100","pay_type":-1,"text":"黑河市"},{"com_amount":0,"gift_amount":0,"id":"231200","pay_type":-1,"text":"绥化市"},{"com_amount":0,"gift_amount":0,"id":"232700","pay_type":-1,"text":"大兴安岭地区"},{"com_amount":0,"gift_amount":0,"id":"310100","pay_type":-1,"text":"上海市辖区"},{"com_amount":0,"gift_amount":0,"id":"310200","pay_type":-1,"text":"上海市辖县"},{"com_amount":0,"gift_amount":0,"id":"320100","pay_type":-1,"text":"南京市"},{"com_amount":0,"gift_amount":0,"id":"320200","pay_type":-1,"text":"无锡市"},{"com_amount":0,"gift_amount":0,"id":"513400","pay_type":-1,"text":"凉山彝族自治州"},{"com_amount":0,"gift_amount":0,"id":"130300","pay_type":-1,"text":"秦皇岛市"},{"com_amount":0,"gift_amount":0,"id":"130400","pay_type":-1,"text":"邯郸市"},{"com_amount":0,"gift_amount":0,"id":"130500","pay_type":-1,"text":"邢台市"},{"com_amount":0,"gift_amount":0,"id":"130600","pay_type":-1,"text":"保定市"},{"com_amount":0,"gift_amount":0,"id":"320800","pay_type":-1,"text":"淮安市"},{"com_amount":0,"gift_amount":0,"id":"320900","pay_type":-1,"text":"盐城市"},{"com_amount":0,"gift_amount":0,"id":"321000","pay_type":-1,"text":"扬州市"},{"com_amount":0,"gift_amount":0,"id":"341500","pay_type":-1,"text":"六安市"},{"com_amount":0,"gift_amount":0,"id":"341600","pay_type":-1,"text":"亳州市"},{"com_amount":0,"gift_amount":0,"id":"341700","pay_type":-1,"text":"池州市"},{"com_amount":0,"gift_amount":0,"id":"341800","pay_type":-1,"text":"宣城市"},{"com_amount":0,"gift_amount":0,"id":"350100","pay_type":-1,"text":"福州市"},{"com_amount":0,"gift_amount":0,"id":"350200","pay_type":-1,"text":"厦门市"},{"com_amount":0,"gift_amount":0,"id":"410100","pay_type":-1,"text":"郑州市"},
{"com_amount":0,"gift_amount":0,"id":"410200","pay_type":-1,"text":"开封市"},
{"com_amount":0,"gift_amount":0,"id":"410300","pay_type":-1,"text":"洛阳市"},
{"com_amount":0,"gift_amount":0,"id":"410400","pay_type":-1,"text":"平顶山市"},
{"com_amount":0,"gift_amount":0,"id":"410500","pay_type":-1,"text":"安阳市"}
,{"com_amount":0,"gift_amount":0,"id":"500100","pay_type":-1,"text":"重庆市辖区"},
{"com_amount":0,"gift_amount":0,"id":"410600","pay_type":-1,"text":"鹤壁市"},
{"com_amount":0,"gift_amount":0,"id":"410700","pay_type":-1,"text":"新乡市"},
{"com_amount":0,"gift_amount":0,"id":"130700","pay_type":-1,"text":"张家口市"},
{"com_amount":0,"gift_amount":0,"id":"370100","pay_type":-1,"text":"济南市"},
{"com_amount":0,"gift_amount":0,"id":"370200","pay_type":-1,"text":"青岛市"},
{"com_amount":0,"gift_amount":0,"id":"370300","pay_type":-1,"text":"淄博市"},
{"com_amount":0,"gift_amount":0,"id":"370400","pay_type":-1,"text":"枣庄市"},
{"com_amount":0,"gift_amount":0,"id":"370500","pay_type":-1,"text":"东营市"},
{"com_amount":0,"gift_amount":0,"id":"350300","pay_type":-1,"text":"莆田市"},
{"com_amount":0,"gift_amount":0,"id":"350400","pay_type":-1,"text":"三明市"},{"com_amount":0,"gift_amount":0,"id":"350500","pay_type":-1,"text":"泉州市"},{"com_amount":0,"gift_amount":0,"id":"510300","pay_type":-1,"text":"自贡市"},{"com_amount":0,"gift_amount":0,"id":"510400","pay_type":-1,"text":"攀枝花市"},{"com_amount":0,"gift_amount":0,"id":"510500","pay_type":-1,"text":"泸州市"},{"com_amount":0,"gift_amount":0,"id":"530700","pay_type":-1,"text":"丽江市"},{"com_amount":0,"gift_amount":0,"id":"530800","pay_type":-1,"text":"普洱市"},{"com_amount":0,"gift_amount":0,"id":"530900","pay_type":-1,"text":"临沧市"},{"com_amount":0,"gift_amount":0,"id":"532300","pay_type":-1,"text":"楚雄彝族自治州"},{"com_amount":0,"gift_amount":0,"id":"532500","pay_type":-1,"text":"红河哈尼族彝族自治州"},{"com_amount":0,"gift_amount":0,"id":"532600","pay_type":-1,"text":"文山壮族苗族自治州"},{"com_amount":0,"gift_amount":0,"id":"370600","pay_type":-1,"text":"烟台市"},{"com_amount":0,"gift_amount":0,"id":"370700","pay_type":-1,"text":"潍坊市"},{"com_amount":0,"gift_amount":0,"id":"520100","pay_type":-1,"text":"贵阳市"},{"com_amount":0,"gift_amount":0,"id":"520200","pay_type":-1,"text":"六盘水市"},{"com_amount":0,"gift_amount":0,"id":"520300","pay_type":-1,"text":"遵义市"},{"com_amount":0,"gift_amount":0,"id":"520400","pay_type":-1,"text":"安顺市"},{"com_amount":0,"gift_amount":0,"id":"522200","pay_type":-1,"text":"铜仁市"},{"com_amount":0,"gift_amount":0,"id":"510600","pay_type":-1,"text":"德阳市"},{"com_amount":0,"gift_amount":0,"id":"510700","pay_type":-1,"text":"绵阳市"},{"com_amount":0,"gift_amount":0,"id":"510800","pay_type":-1,"text":"广元市"},{"com_amount":0,"gift_amount":0,"id":"510900","pay_type":-1,"text":"遂宁市"},{"com_amount":0,"gift_amount":0,"id":"321100","pay_type":-1,"text":"镇江市"},{"com_amount":0,"gift_amount":0,"id":"321200","pay_type":-1,"text":"泰州市"},{"com_amount":0,"gift_amount":0,"id":"321300","pay_type":-1,"text":"宿迁市"},{"com_amount":0,"gift_amount":0,"id":"330100","pay_type":-1,"text":"杭州市"},{"com_amount":0,"gift_amount":0,"id":"330200","pay_type":-1,"text":"宁波市"},{"com_amount":0,"gift_amount":0,"id":"410800","pay_type":-1,"text":"焦作市"},{"com_amount":0,"gift_amount":0,"id":"411900","pay_type":-1,"text":"济源市"},{"com_amount":0,"gift_amount":0,"id":"410900","pay_type":-1,"text":"濮阳市"},{"com_amount":0,"gift_amount":0,"id":"411000","pay_type":-1,"text":"许昌市"},{"com_amount":0,"gift_amount":0,"id":"411100","pay_type":-1,"text":"漯河市"},{"com_amount":0,"gift_amount":0,"id":"411200","pay_type":-1,"text":"三门峡市"},{"com_amount":0,"gift_amount":0,"id":"411300","pay_type":-1,"text":"南阳市"},{"com_amount":0,"gift_amount":0,"id":"411400","pay_type":-1,"text":"商丘市"},{"com_amount":0,"gift_amount":0,"id":"522300","pay_type":-1,"text":"黔西南布依族苗族自治州"},{"com_amount":0,"gift_amount":0,"id":"522400","pay_type":-1,"text":"毕节市"},{"com_amount":0,"gift_amount":0,"id":"522600","pay_type":-1,"text":"黔东南苗族侗族自治州"},{"com_amount":0,"gift_amount":0,"id":"130800","pay_type":-1,"text":"承德市"},{"com_amount":0,"gift_amount":0,"id":"130900","pay_type":-1,"text":"沧州市"},{"com_amount":0,"gift_amount":0,"id":"131000","pay_type":-1,"text":"廊坊市"},{"com_amount":0,"gift_amount":0,"id":"330300","pay_type":-1,"text":"温州市"},{"com_amount":0,"gift_amount":0,"id":"330400","pay_type":-1,"text":"嘉兴市"},{"com_amount":0,"gift_amount":0,"id":"330500","pay_type":-1,"text":"湖州市"},{"com_amount":0,"gift_amount":0,"id":"440200","pay_type":-1,"text":"韶关市"},{"com_amount":0,"gift_amount":0,"id":"440300","pay_type":-1,"text":"深圳市"},{"com_amount":0,"gift_amount":0,"id":"440400","pay_type":-1,"text":"珠海市"},{"com_amount":0,"gift_amount":0,"id":"440500","pay_type":-1,"text":"汕头市"},{"com_amount":0,"gift_amount":0,"id":"440600","pay_type":-1,"text":"佛山市"},{"com_amount":0,"gift_amount":0,"id":"440700","pay_type":-1,"text":"江门市"},{"com_amount":0,"gift_amount":0,"id":"440800","pay_type":-1,"text":"湛江市"},{"com_amount":0,"gift_amount":0,"id":"210900","pay_type":-1,"text":"阜新市"},{"com_amount":0,"gift_amount":0,"id":"211000","pay_type":-1,"text":"辽阳市"},{"com_amount":0,"gift_amount":0,"id":"211100","pay_type":-1,"text":"盘锦市"},{"com_amount":0,"gift_amount":0,"id":"211200","pay_type":-1,"text":"铁岭市"},{"com_amount":0,"gift_amount":0,"id":"211300","pay_type":-1,"text":"朝阳市"},{"com_amount":0,"gift_amount":0,"id":"211400","pay_type":-1,"text":"葫芦岛市"},{"com_amount":0,"gift_amount":0,"id":"220100","pay_type":-1,"text":"长春市"},{"com_amount":0,"gift_amount":0,"id":"220200","pay_type":-1,"text":"吉林市"},{"com_amount":0,"gift_amount":0,"id":"220300","pay_type":-1,"text":"四平市"},{"com_amount":0,"gift_amount":0,"id":"131100","pay_type":-1,"text":"衡水市"},{"com_amount":0,"gift_amount":0,"id":"140100","pay_type":-1,"text":"太原市"},{"com_amount":0,"gift_amount":0,"id":"140200","pay_type":-1,"text":"大同市"},{"com_amount":0,"gift_amount":0,"id":"370800","pay_type":-1,"text":"济宁市"},{"com_amount":0,"gift_amount":0,"id":"370900","pay_type":-1,"text":"泰安市"},{"com_amount":0,"gift_amount":0,"id":"371000","pay_type":-1,"text":"威海市"},{"com_amount":0,"gift_amount":0,"id":"371100","pay_type":-1,"text":"日照市"},{"com_amount":0,"gift_amount":0,"id":"371200","pay_type":-1,"text":"莱芜市"},{"com_amount":0,"gift_amount":0,"id":"371300","pay_type":-1,"text":"临沂市"},{"com_amount":0,"gift_amount":0,"id":"440900","pay_type":-1,"text":"茂名市"},{"com_amount":0,"gift_amount":0,"id":"441200","pay_type":-1,"text":"肇庆市"},{"com_amount":0,"gift_amount":0,"id":"441300","pay_type":-1,"text":"惠州市"},{"com_amount":0,"gift_amount":0,"id":"650100","pay_type":-1,"text":"乌鲁木齐市"},{"com_amount":0,"gift_amount":0,"id":"650200","pay_type":-1,"text":"克拉玛依市"},{"com_amount":0,"gift_amount":0,"id":"652100","pay_type":-1,"text":"吐鲁番地区"},{"com_amount":0,"gift_amount":0,"id":"652200","pay_type":-1,"text":"哈密地区"},{"com_amount":0,"gift_amount":0,"id":"652300","pay_type":-1,"text":"昌吉回族自治州"},{"com_amount":0,"gift_amount":0,"id":"652700","pay_type":-1,"text":"博尔塔拉蒙古自治州"},{"com_amount":0,"gift_amount":0,"id":"652800","pay_type":-1,"text":"巴音郭楞蒙古自治州"},{"com_amount":0,"gift_amount":0,"id":"652900","pay_type":-1,"text":"阿克苏地区"},{"com_amount":0,"gift_amount":0,"id":"511600","pay_type":-1,"text":"广安市"},{"com_amount":0,"gift_amount":0,"id":"532800","pay_type":-1,"text":"西双版纳傣族自治州"},{"com_amount":0,"gift_amount":0,"id":"532900","pay_type":-1,"text":"大理白族自治州"},{"com_amount":0,"gift_amount":0,"id":"533100","pay_type":-1,"text":"德宏傣族景颇族自治州"},{"com_amount":0,"gift_amount":0,"id":"533300","pay_type":-1,"text":"怒江傈僳族自治州"},{"com_amount":0,"gift_amount":0,"id":"533400","pay_type":-1,"text":"迪庆藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"540100","pay_type":-1,"text":"拉萨市"},{"com_amount":0,"gift_amount":0,"id":"610100","pay_type":-1,"text":"西安市"},{"com_amount":0,"gift_amount":0,"id":"610200","pay_type":-1,"text":"铜川市"},{"com_amount":0,"gift_amount":0,"id":"610300","pay_type":-1,"text":"宝鸡市"},{"com_amount":0,"gift_amount":0,"id":"371400","pay_type":-1,"text":"德州市"},{"com_amount":0,"gift_amount":0,"id":"371500","pay_type":-1,"text":"聊城市"},{"com_amount":0,"gift_amount":0,"id":"371600","pay_type":-1,"text":"滨州市"},{"com_amount":0,"gift_amount":0,"id":"522700","pay_type":-1,"text":"黔南布依族苗族自治州"},{"com_amount":0,"gift_amount":0,"id":"530100","pay_type":-1,"text":"昆明市"},{"com_amount":0,"gift_amount":0,"id":"530300","pay_type":-1,"text":"曲靖市"},{"com_amount":0,"gift_amount":0,"id":"653000","pay_type":-1,"text":"克孜勒苏柯尔克孜自治州"},{"com_amount":0,"gift_amount":0,"id":"653100","pay_type":-1,"text":"喀什地区"},{"com_amount":0,"gift_amount":0,"id":"653200","pay_type":-1,"text":"和田地区"},{"com_amount":0,"gift_amount":0,"id":"230300","pay_type":-1,"text":"鸡西市"},{"com_amount":0,"gift_amount":0,"id":"230400","pay_type":-1,"text":"鹤岗市"},{"com_amount":0,"gift_amount":0,"id":"230500","pay_type":-1,"text":"双鸭山市"},{"com_amount":0,"gift_amount":0,"id":"230600","pay_type":-1,"text":"大庆市"},{"com_amount":0,"gift_amount":0,"id":"230700","pay_type":-1,"text":"伊春市"},{"com_amount":0,"gift_amount":0,"id":"610400","pay_type":-1,"text":"咸阳市"},{"com_amount":0,"gift_amount":0,"id":"350600","pay_type":-1,"text":"漳州市"},{"com_amount":0,"gift_amount":0,"id":"350700","pay_type":-1,"text":"南平市"},{"com_amount":0,"gift_amount":0,"id":"350800","pay_type":-1,"text":"龙岩市"},{"com_amount":0,"gift_amount":0,"id":"350900","pay_type":-1,"text":"宁德市"},{"com_amount":0,"gift_amount":0,"id":"360100","pay_type":-1,"text":"南昌市"},{"com_amount":0,"gift_amount":0,"id":"360200","pay_type":-1,"text":"景德镇市"},{"com_amount":0,"gift_amount":0,"id":"360300","pay_type":-1,"text":"萍乡市"},{"com_amount":0,"gift_amount":0,"id":"360400","pay_type":-1,"text":"九江市"},{"com_amount":0,"gift_amount":0,"id":"530400","pay_type":-1,"text":"玉溪市"},{"com_amount":0,"gift_amount":0,"id":"530500","pay_type":-1,"text":"保山市"},{"com_amount":0,"gift_amount":0,"id":"530600","pay_type":-1,"text":"昭通市"},{"com_amount":0,"gift_amount":0,"id":"141000","pay_type":-1,"text":"临汾市"},{"com_amount":0,"gift_amount":0,"id":"141100","pay_type":-1,"text":"吕梁市"},{"com_amount":0,"gift_amount":0,"id":"150100","pay_type":-1,"text":"呼和浩特市"},{"com_amount":0,"gift_amount":0,"id":"230800","pay_type":-1,"text":"佳木斯市"},{"com_amount":0,"gift_amount":0,"id":"441400","pay_type":-1,"text":"梅州市"},{"com_amount":0,"gift_amount":0,"id":"441500","pay_type":-1,"text":"汕尾市"},{"com_amount":0,"gift_amount":0,"id":"441600","pay_type":-1,"text":"河源市"},{"com_amount":0,"gift_amount":0,"id":"441700","pay_type":-1,"text":"阳江市"},{"com_amount":0,"gift_amount":0,"id":"441800","pay_type":-1,"text":"清远市"},{"com_amount":0,"gift_amount":0,"id":"441900","pay_type":-1,"text":"东莞市"},{"com_amount":0,"gift_amount":0,"id":"442000","pay_type":-1,"text":"中山市"},{"com_amount":0,"gift_amount":0,"id":"445100","pay_type":-1,"text":"潮州市"},{"com_amount":0,"gift_amount":0,"id":"445200","pay_type":-1,"text":"揭阳市"},{"com_amount":0,"gift_amount":0,"id":"622900","pay_type":-1,"text":"临夏回族自治州"},{"com_amount":0,"gift_amount":0,"id":"623000","pay_type":-1,"text":"甘南藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"630100","pay_type":-1,"text":"西宁市"},{"com_amount":0,"gift_amount":0,"id":"632100","pay_type":-1,"text":"海东地区"},{"com_amount":0,"gift_amount":0,"id":"632200","pay_type":-1,"text":"海北藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"632300","pay_type":-1,"text":"黄南藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"632500","pay_type":-1,"text":"海南藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"632600","pay_type":-1,"text":"果洛藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"150200","pay_type":-1,"text":"包头市"},{"com_amount":0,"gift_amount":0,"id":"150300","pay_type":-1,"text":"乌海市"},{"com_amount":0,"gift_amount":0,"id":"150400","pay_type":-1,"text":"赤峰市"},{"com_amount":0,"gift_amount":0,"id":"330600","pay_type":-1,"text":"绍兴市"},{"com_amount":0,"gift_amount":0,"id":"330700","pay_type":-1,"text":"金华市"},{"com_amount":0,"gift_amount":0,"id":"330800","pay_type":-1,"text":"衢州市"},{"com_amount":0,"gift_amount":0,"id":"330900","pay_type":-1,"text":"舟山市"},{"com_amount":0,"gift_amount":0,"id":"331000","pay_type":-1,"text":"台州市"},{"com_amount":0,"gift_amount":0,"id":"331100","pay_type":-1,"text":"丽水市"},{"com_amount":0,"gift_amount":0,"id":"445300","pay_type":-1,"text":"云浮市"},{"com_amount":0,"gift_amount":0,"id":"450100","pay_type":-1,"text":"南宁市"},{"com_amount":0,"gift_amount":0,"id":"450200","pay_type":-1,"text":"柳州市"},{"com_amount":0,"gift_amount":0,"id":"542100","pay_type":-1,"text":"昌都地区"},{"com_amount":0,"gift_amount":0,"id":"542200","pay_type":-1,"text":"山南地区"},{"com_amount":0,"gift_amount":0,"id":"542300","pay_type":-1,"text":"日喀则地区"},{"com_amount":0,"gift_amount":0,"id":"654000","pay_type":-1,"text":"伊犁哈萨克自治州"},{"com_amount":0,"gift_amount":0,"id":"411500","pay_type":-1,"text":"信阳市"},{"com_amount":0,"gift_amount":0,"id":"411600","pay_type":-1,"text":"周口市"},{"com_amount":0,"gift_amount":0,"id":"411700","pay_type":-1,"text":"驻马店市"},{"com_amount":0,"gift_amount":0,"id":"420100","pay_type":-1,"text":"武汉市"},{"com_amount":0,"gift_amount":0,"id":"420200","pay_type":-1,"text":"黄石市"},{"com_amount":0,"gift_amount":0,"id":"420300","pay_type":-1,"text":"十堰市"},{"com_amount":0,"gift_amount":0,"id":"420500","pay_type":-1,"text":"宜昌市"},{"com_amount":0,"gift_amount":0,"id":"340100","pay_type":-1,"text":"合肥市"},{"com_amount":0,"gift_amount":0,"id":"340200","pay_type":-1,"text":"芜湖市"},{"com_amount":0,"gift_amount":0,"id":"340300","pay_type":-1,"text":"蚌埠市"},{"com_amount":0,"gift_amount":0,"id":"450300","pay_type":-1,"text":"桂林市"},{"com_amount":0,"gift_amount":0,"id":"450400","pay_type":-1,"text":"梧州市"},{"com_amount":0,"gift_amount":0,"id":"450500","pay_type":-1,"text":"北海市"},{"com_amount":0,"gift_amount":0,"id":"450600","pay_type":-1,"text":"防城港市"},{"com_amount":0,"gift_amount":0,"id":"450700","pay_type":-1,"text":"钦州市"},{"com_amount":0,"gift_amount":0,"id":"654200","pay_type":-1,"text":"塔城地区"},{"com_amount":0,"gift_amount":0,"id":"654300","pay_type":-1,"text":"阿勒泰地区"},{"com_amount":0,"gift_amount":0,"id":"659000","pay_type":-1,"text":"自治区直辖县级行政单位"},{"com_amount":0,"gift_amount":0,"id":"220400","pay_type":-1,"text":"辽源市"},{"com_amount":0,"gift_amount":0,"id":"220500","pay_type":-1,"text":"通化市"},{"com_amount":0,"gift_amount":0,"id":"220600","pay_type":-1,"text":"白山市"},{"com_amount":0,"gift_amount":0,"id":"220700","pay_type":-1,"text":"松原市"},{"com_amount":0,"gift_amount":0,"id":"220800","pay_type":-1,"text":"白城市"},{"com_amount":0,"gift_amount":0,"id":"222400","pay_type":-1,"text":"延边朝鲜族自治州"},{"com_amount":0,"gift_amount":0,"id":"632700","pay_type":-1,"text":"玉树藏族自治州"},{"com_amount":0,"gift_amount":0,"id":"430900","pay_type":-1,"text":"益阳市"},{"com_amount":0,"gift_amount":0,"id":"431000","pay_type":-1,"text":"郴州市"},{"com_amount":0,"gift_amount":0,"id":"431100","pay_type":-1,"text":"永州市"},{"com_amount":0,"gift_amount":0,"id":"431200","pay_type":-1,"text":"怀化市"},{"com_amount":0,"gift_amount":0,"id":"431300","pay_type":-1,"text":"娄底市"},{"com_amount":0,"gift_amount":0,"id":"450800","pay_type":-1,"text":"贵港市"},{"com_amount":0,"gift_amount":0,"id":"450900","pay_type":-1,"text":"玉林市"},{"com_amount":0,"gift_amount":0,"id":"451000","pay_type":-1,"text":"百色市"},{"com_amount":0,"gift_amount":0,"id":"451100","pay_type":-1,"text":"贺州市"},{"com_amount":0,"gift_amount":0,"id":"140300","pay_type":-1,"text":"阳泉市"},{"com_amount":0,"gift_amount":0,"id":"140400","pay_type":-1,"text":"长治市"},{"com_amount":0,"gift_amount":0,"id":"140500","pay_type":-1,"text":"晋城市"},{"com_amount":0,"gift_amount":0,"id":"140600","pay_type":-1,"text":"朔州市"},{"com_amount":0,"gift_amount":0,"id":"140700","pay_type":-1,"text":"晋中市"},{"com_amount":0,"gift_amount":0,"id":"230100","pay_type":-1,"text":"哈尔滨市"},{"com_amount":0,"gift_amount":0,"id":"230200","pay_type":-1,"text":"齐齐哈尔市"},{"com_amount":0,"gift_amount":0,"id":"420600","pay_type":-1,"text":"襄樊市"},{"com_amount":0,"gift_amount":0,"id":"420700","pay_type":-1,"text":"鄂州市"},{"com_amount":0,"gift_amount":0,"id":"420800","pay_type":-1,"text":"荆门市"},{"com_amount":0,"gift_amount":0,"id":"420900","pay_type":-1,"text":"孝感市"},{"com_amount":0,"gift_amount":0,"id":"421000","pay_type":-1,"text":"荆州市"},{"com_amount":0,"gift_amount":0,"id":"421100","pay_type":-1,"text":"黄冈市"},{"com_amount":0,"gift_amount":0,"id":"421200","pay_type":-1,"text":"咸宁市"},{"com_amount":0,"gift_amount":0,"id":"433100","pay_type":-1,"text":"湘西土家族苗族自治州"},{"com_amount":0,"gift_amount":0,"id":"440100","pay_type":-1,"text":"广州市"},{"com_amount":0,"gift_amount":0,"id":"632800","pay_type":-1,"text":"海西蒙古族藏族自治州"},
{"com_amount":0,"gift_amount":0,"id":"640100","pay_type":-1,"text":"银川市"},
{"com_amount":0,"gift_amount":0,"id":"640200","pay_type":-1,"text":"石嘴山市"},
{"com_amount":0,"gift_amount":0,"id":"640300","pay_type":-1,"text":"吴忠市"},{"com_amount":0,"gift_amount":0,"id":"640400","pay_type":-1,"text":"固原市"},{"com_amount":0,"gift_amount":0,"id":"640500","pay_type":-1,"text":"中卫市"},{"com_amount":0,"gift_amount":0,"id":"140800","pay_type":-1,"text":"运城市"},{"com_amount":0,"gift_amount":0,"id":"140900","pay_type":-1,"text":"忻州市"},{"com_amount":0,"gift_amount":0,"id":"500200","pay_type":-1,"text":"重庆市辖县"},{"com_amount":0,"gift_amount":0,"id":"340400","pay_type":-1,"text":"淮南市"},{"com_amount":0,"gift_amount":0,"id":"340500","pay_type":-1,"text":"马鞍山市"},{"com_amount":0,"gift_amount":0,"id":"340600","pay_type":-1,"text":"淮北市"},{"com_amount":0,"gift_amount":0,"id":"340700","pay_type":-1,"text":"铜陵市"},{"com_amount":0,"gift_amount":0,"id":"340800","pay_type":-1,"text":"安庆市"},{"com_amount":0,"gift_amount":0,"id":"341000","pay_type":-1,"text":"黄山市"}
];

