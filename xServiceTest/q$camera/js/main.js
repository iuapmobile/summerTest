//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function openTest(){
	$camera.open({
        callback : function(args){  	
		    $alert(JSON.parse(args.result).imgPath)
		    $('.pic').attr('src',JSON.parse(args.result).imgPath)
		}
   });     
}

function openTest1(){
	$camera.openPhotoAlbum({
        callback : function (arges){
		   $('.pic').attr('src',JSON.parse(args.result).imgPath)
        }
	})
}
