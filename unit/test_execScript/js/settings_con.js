function execWinScript(p) {
	alert(p)
	summer.execScript({
		winId : "root",
		//frameId:"",
		//script:'script : "test_win('settings frame'"+(new Date()).valueOf()+");"
		script : 'test_indexWin("' + p + '");'//test_indexWin()定义在index.js中

	})

}

function execWinFrameScript(p) {
	alert(p);
	summer.execScript({
		winId : "root",
		frameId : "main",
		script : 'test_mainFrame("' + p + '");'//test_mainFrame()定义在index.js中

	})
}