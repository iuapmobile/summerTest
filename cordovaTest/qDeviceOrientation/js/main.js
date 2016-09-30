function test1(){
	function onSuccess(heading) {
	    alert('Heading: ' + heading.magneticHeading); //磁航向
	};
	
	function onError(error) {
	    alert('CompassError: ' + error.code);
	};
	
	navigator.compass.getCurrentHeading(onSuccess, onError);
}

var watchID;
function test2(){
	function onSuccess(heading) {
	    var element = document.getElementById('heading');
	    element.innerHTML = 'Heading: ' + heading.magneticHeading; //磁航向
	};
	
	function onError(compassError) {
	    alert('Compass error: ' + compassError.code);
	};
	
	var options = {
	    frequency: 3000
	}; // Update every 3 seconds
	
	watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}

function test3(){
	navigator.compass.clearWatch(watchID);
}