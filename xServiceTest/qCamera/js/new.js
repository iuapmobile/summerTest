/**
 * Created by Administrator on 2016/10/17.
 */
function test11(){
    summer.openPhotoAlbum({
        callback : function (sender,args){
            alert(typeof args); //object
            alert(typeof(args.imgPath)); //string
            alert(args.imgPath);
            $('.pic').attr('src',args.imgPath);
        }
    })
}

function test22(){
    function mycb22(sender, args){
        alert(typeof args); //object
        alert(typeof(args.imgPath)); //string
        alert(args.imgPath);
        $('.pic').attr('src',args.imgPath);
    }

    summer.openPhotoAlbum({
        callback : mycb22
    });
}

function test33(){
    summer.openCamera({
        callback : "mycb3()"
    });
}

function mycb3(sender, args){
    alert(typeof args); //object
    alert(typeof(args.imgPath)); //string
    alert(args.imgPath);
    $('.pic').attr('src',args.imgPath);
}



/*
function test44(){
    function mycb4(sender, args){
        alert(typeof args); //object
        alert(typeof(args.imgPath)); //string
        alert(args.imgPath);
        $('.pic').attr('src',args.imgPath);
    };

    summer.UMCamera.open({
        callback : "mycb4()"
    });
}*/
