/**
 * Created by Administrator on 2016/10/17.
 */
//here is your code...
function test() {
    $summer.alert(summer.getTimeZoneID());
}

function test1() {
    $summer.alert(summer.getTimeZoneDisplayName());
}

function test2() {
    $summer.alert(summer.getDeviceInfo());
}

function test3() {
    $summer.alert(summer.captureTwodcode());
}

function test4() {
    summer.getLocation({
        "single" : "true", //是否只获取1次
        "isgetaddress" : "true", //是否获取地址
        "network" : "true", //是否wify定位
        "callback" : function(args){
             $summer.alert(args);

        }
    });
}

function test6() {
    summer.capturePhoto({
        bindfield : "image",
        callback : function(args) {
            $summer.alert(args)
        }
    });
}

function test7() {
    $summer.alert(summer.getAlbumPath());
}

function test8() {
    $summer.alert(summer.getAppAlbumPath());
}


function test11() {
    summer.saveContact({
        tel : "10080", //手机号码
        employeename : "中国移动", //联系人名称
        jobname : "", //职位
        orgname : "", //部门名称
        address : "", //单位地址
        email : "", //邮箱
        officetel : ""//办公电话
    });
}

function test12() {
    $summer.alert(summer.getContacts());
}

function test13() {
    $summer.alert(summer.openAddressBook());
}

function test14() {
    $summer.alert(summer.getInternalMemoryInfo());
}

function test15() {
    $summer.alert(summer.getExternalStorageInfo());
}

function test16() {
    $summer.alert(summer.getMemoryInfo());
}

function test18() {
    summer.openWebView({
        url : "http://www.baidu.com"
    });
}

function test19() {
    summer.screenShot({
        callback : function(args) {
            $summer.alert(args);
        }
    });
}

function test20() {
    summer.notify({
        "sendTime" : "2015-02-03 13:54:30",
        "sendBody" : "您设置了消息提醒事件",
        "icon" : "app.png"
    });
}

function test21() {
    $summer.alert(summer.getScreenWidth());
}

function test22() {
    $summer.alert(summer.getScreenHeight());
}

function test23() {
    $summer.alert(summer.getScreenDensity());
}

function test24() {
    $summer.alert(summer.currentOrientation());
}

summerready = function() {

};