/**
 * Created by Administrator on 2016/10/17.
 */
function test1(){
    summer.writeFile('qq1','{name:"屈海滨"}')
}
function test2(){
    summer.writeFile('qq2',{age:32})
}

function test3(){
    var qq1=summer.readFile('qq1');
    alert(qq1)
}

function test4(){
    var qq2=summer.readFile('qq2');
    alert(typeof qq2);
    alert(qq2);
}





