
function test1(){
	$camera.openPhotoAlbum({
        callback : function (arges){
        $alert(args.imgPath);
		   $('.pic').attr('src',args.imgPath)
        }
	})
}

function test2(){
	$camera.open({
        callback : function(args){  	
		    $alert(args.imgPath);
		    $('.pic').attr('src',args.imgPath);
		}
   });     
}
