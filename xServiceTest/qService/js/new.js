/**
 * Created by Administrator on 2016/10/17.
 */
//here is your code...
summerready = function () {

};
function getService() {
    summer.get("http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", {
        a: 1,
        b: 2
    }, {Authorization: "OAuth2: token"}, function (response) {
        // prints 200
        alert(response.status);
        try {
            response.data = JSON.parse(response.data);
            // prints test
            $summer.alert(response.data);
        } catch (e) {
           alert("JSON parsing error");
        }
    }, function (response) {
        // prints 403
       alert(response.status);

        //prints Permission denied
        alert(response.error);
    });
}

function postService() {
    summer.post("http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", {
        a: 1,
        b: 2
    }, {Authorization: "OAuth2: token"}, function (response) {
        // prints 200
       alert(response.status);
        try {
            response.data = JSON.parse(response.data);
            // prints test
            $summer.alert(response.data);
        } catch (e) {
            alert("JSON parsing error");
        }
    }, function (response) {
        // prints 403
       alert(response.status);

        //prints Permission denied
        alert(response.error);
    });

}
function ajaxService() {

    summer.ajax({
        type: 'post',
        url: 'http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=',
        param: {
            a: 1,
            b: 2
        },
        header: {Authorization: "OAuth2: token"}
    }, function (response) {
        // prints 200
        alert(response.status);
        try {
            response.data = JSON.parse(response.data);
            // prints test
            $summer.alert(response.data);
        } catch (e) {
            alert("JSON parsing error");
        }
    }, function (response) {
        // prints 403
        alert(response.status);

        //prints Permission denied
        alert(response.error);
    });


}
function callActionService() {
    summer.callAction({
        "viewid" : "a.b.data", //后台带包名的Controller名
        "action" : "getData", //方法名,
        "params" : '{"a":"123","b":"465"}', //自定义参数
        "autoDataBinding": true,//请求完毕后，是否进行数据绑定，如果没有该属性，则默认不绑定。
        "contextmapping": "fieldPath",//将返回结果映射到指定的Context字段上，如果没有该属性，则默认为替换整个Context
        "callback": function (args) {
            $summer.alert(args);
        },//请求回来后执行的js方法
        "error": function (error) {
            alert(error);
        }//失败回调的js方法
    })
}