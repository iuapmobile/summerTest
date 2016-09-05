//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function test(){
	summer.getLocation(
		function successFn(position) {
		    $alert(position.coords);
		},
		function onError(error) {
		    $alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		})		
}