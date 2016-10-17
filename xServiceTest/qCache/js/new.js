/**
 * Created by Administrator on 2016/10/17.
 */
function test1(){
    summer.UMCache.write('qq','{name:"屈海滨"}')
}
function test2(){
    summer.UMCache.write('qq',{age:32})
}

function test3(){
    var qq=summer.UMCache.read('qq');
    alert(qq)
}

function test4(){
    var qq=summer.UMCache.read('qq');
    alert(JSON.parse(qq).age)
}





