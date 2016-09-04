summerready = function() {

	// here is your code...

	var y = $summer.offset($summer.byId('header')).h;
	var width = $summer.offset(document.getElementsByTagName("body")[0]).w;

	var height = $summer.offset($summer.byId('main')).h
	$summer.fixStatusBar($summer.byId('header'));
	var height2 = $summer.offset($summer.byId('main')).h

	//alert("height="+height+"        height2="+height2);
	summer.openFrame({
		name : 'main',
		url : 'html/main.html',
		bounces : true,
		rect : {
			x : 0,
			y : y,
			w : width,
			h : height2
		},
		alert:true
	});
	
	
	navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
	
	
}

function xx(){
	/ onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
