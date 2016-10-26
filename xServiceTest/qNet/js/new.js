/**
 * Created by Administrator on 2016/10/17.
 */
summerready = function () {
	$summer.alert(summer.UMNet. getNetworkInfo()) 
};
function test1(){
    alert(summer.UMNet.available())  //返回值为boolean类型         true||false  ios返回值不正确
}

function test2(){
     //android返回值为json类型的 string key值为Type
	summer.openWin({
        "id" : 'a',
        "url" : 'html/a.html'
        
    });
}