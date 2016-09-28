//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function test1(){
	alert(111)
	cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
}

function test2(){
   cordova.plugins.barcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.baidu.com", function(success) {
        alert("encode success: " + success);
      }, function(fail) {
        alert("encoding failed: " + fail);
      }
    );
}