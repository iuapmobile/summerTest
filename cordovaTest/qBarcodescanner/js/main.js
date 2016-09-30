//ios和android都不执行  bug编号UMP-8802和UMP-8801
summerready = function () {
  $summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function test1(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +  //数据文本
                "Format: " + result.format + "\n" + //类型
                "Cancelled: " + result.cancelled); //是否取消扫描
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

function test2(){
   cordova.plugins.barcodeScanner.encode(
     BarcodeScanner.Encode.TEXT_TYPE, //类型
     "http://www.baidu.com",   //数据文本
     function(success) {
        alert("encode success: " + success); //成功会掉
      }, function(fail) {
        alert("encoding failed: " + fail);  //错误回调
      }
    );
}