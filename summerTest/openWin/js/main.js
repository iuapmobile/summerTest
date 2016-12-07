
function openWin1(){
	summer.openWin({
         id: 'newWin1',
         url: 'html/newWin1.html'
     });
}

function openWin2(){
	summer.openWin({
         id: 'newWin2',
         url: 'html/newWin2.html',
         pageParam:{
	        count : "mobile平台"
	     }
     });
}

function closeWin(){
	summer.closeWin();
}
