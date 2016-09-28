//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function dilogs1() {
	navigator.notification.prompt('请输入你的名字', // message
	onPrompt, // callback to invoke
	'注册', // title
	['确定', '退出'], // buttonLabels
	'iuap mobile' // defaultText
	);
	
	function onPrompt(results) {
		alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
	}
}
	


function alertDismissed() {
    alert("ok")
}
function dilogs2(){
	navigator.notification.alert(
	    'You are the winner!',  // message
	    alertDismissed,         // callback
	    'Game Over',            // title
	    'Done'                  // buttonName
	);
	
	function alertDismissed() {
	    alert("ok")
	}
}

function dilogs3(){
	function onConfirm(buttonIndex) {
	    alert('You selected button ' + buttonIndex);
	}
	
	navigator.notification.confirm(
	    'You are the winner!', // message
	     onConfirm,            // callback to invoke with index of button pressed
	    'Game Over',           // title
	    ['Restart','Exit']     // buttonLabels
	);
	
}