/**
 * Created by Administrator on 2016/10/17.
 */
function test0() {
    var param = {      //ios需要创建数据库，才能执行建表和插入数据等方法, android不需要创建数据库就可以执行建表与插入数据等方法。
        db : 'qq.db'
    }
    summer.UMSqlite.openDB(param);  //执行创建数据库语句，参数为json对象
}
function test1() {
    var sql = "CREATE TABLE person (_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, xclass VARCHAR)";
    var param = {
        db : 'qq.db',
        sql : sql
    }
    summer.UMSqlite.execSql(param);   //sql为创建表结构语句，作为参数传入summer.UMSqlite.execSql()方法中执行
}

function test2() {
    var sql="INSERT INTO person (name, xclass) VALUES('屈海滨','石化')";

    var param = {
        db : 'qq.db',
        sql : sql
    }
    for(var i=0;i<10;i++){
        summer.UMSqlite.execSql(param); //sql为向表中插入数据语句，作为参数传入summer.UMSqlite.execSql()方法中执行
    }

}

function test3() {
    var sql = "select * from person";
    var param = {
        "db" : 'qq.db',
        "sql" : sql,
        "pageIndex" : 0,    //页号，从0开始
        "pageSize" : 10		//每页的记录数，从1开始
    }
    var list = summer.UMSqlite.queryByPage(param); //sql为查询语句，作为参数传入summer.UMSqlite.queryByPage()方法中执行
    alert(list);

}

function test4() {
    var param = {
        db : 'qq.db'
    }
    var list = summer.UMSqlite.exist(param)    //summer.UMSqlite.exist()判断数据库是否已经创建存在  android在执行其他sq语句时自动建立数据库  ios必须先要建立数据库
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
    var data = summer.UMSqlite.query(param);  //用来查询数据库
    alert(data);
}



