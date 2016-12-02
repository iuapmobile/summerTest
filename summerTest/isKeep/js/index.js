

summerready = function(){

    document.getElementById('qq').innerHTML= summer.pageParam.name;
   
}

function openWin(){
	summer.openWin({
	    url:'index.html',
	    pageParam: {
	        name: 'isKeep'
	    },
	    isKeep:false
	});
}