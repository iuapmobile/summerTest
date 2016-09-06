function test0() {
	var param = {
		db : 'qq.db'
	}
	$sqlite.openDB(param);
}
function test1() {
	var sql = "CREATE TABLE person (_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, xclass VARCHAR)";
	var param = {
		db : 'qq.db',
		sql : sql
	}
	$sqlite.execSql(param);
}
	
function test2() { 
	var sql="INSERT INTO person (name, xclass) VALUES('屈海滨','石化')";
	 var param = {
		db : 'qq.db',
		sql : sql
	}
	for(var i=0;i<10;i++){  
		 $sqlite.execSql(param);
	}	
	 
}

function test3() {
	var sql = "select * from person";
	var param = {
		"db" : 'qq.db',
		"sql" : sql,
		"pageIndex" : 0,
		"pageSize" : 10
	}
	//var list=$sqlite.query(param);
	var list = $sqlite.queryByPage(param);
	alert(list);

}

function test4() {
	var param = {
		db : 'qq.db'
	}
	var list = $sqlite.exist(param)
	alert(list)
}



function test5() {
	 var sql = "select * from person";
	  var param = {
           db : 'qq.db',
           sql : sql,
           startIndex : 3, //起始记录索引号(含)
           endIndex : 5         //结束记录索引号(含)
	  }
  	var data = $sqlite.query(param);
  	alert(data);
}



