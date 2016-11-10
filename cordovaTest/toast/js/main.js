//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h3 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h3><h3 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h3>";
};

function test1() {
  window.plugins.toast.showWithOptions(
    {
      message: "hey there",
      duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself. 
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0) 
    }
  );
}

function hide() {
  // this function takes an optional success callback, but you can do without just as well 
  window.plugins.toast.hide();
}

function test2(){
	 window.plugins.toast.showWithOptions({
	    message: "hello",
	    duration: "short", // 2000 ms 
	    position: "bottom",
	    styling: {
	      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8 
	      backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333 
	      textColor: '#FFFF00', // Ditto. Default #FFFFFF 
	      textSize: 20.5, // Default is approx. 13. 
	      cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100 
	      horizontalPadding: 20, // iOS default 16, Android default 50 
	      verticalPadding: 16 // iOS default 12, Android default 30 
	    }
	  });
}