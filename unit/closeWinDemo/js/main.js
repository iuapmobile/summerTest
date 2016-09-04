//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

$(function(){
  $("#content").on("touchstart",function(){
     summer.openWin({
         "id" : 'one',
         "url" : 'html/one.html',
         "pageParam" : {
             "count" : 1
         }
     });

});

})

function test(str){
   $("#content").html(str);
   summer.closeWin();
}