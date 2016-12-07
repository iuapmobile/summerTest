function openWin(name,url){
	summer.openWin({
        "id" : name,
        "url" : url,
    });
}

function closeWin(id){
	summer.closeWin(id)
}

function set(obj){
	closeWin('newPage3')
	alert(obj);
}




