##summer.UMScanner是提供二维码扫描的服务对象
### summer.UMScanner.open ()
   打开二维码扫描
##### 代码演示
    summer.UMScanner.open({
        callback : function (arges){
            var qq =args  // 返回值 object类型   key值为result
        }
    })

### summer.UMScanner.generateQRCode()
   把字符串生成二维码
##### 代码演示
    var twocodepath=summer.UMScanner.generateQRCode({
        size : 30,//二维码正方形的宽高
        content : "text"//生成二维码所需的源文字
    });
    //返回类型string,是图片路径
    $('.pic').attr('src',twocodepath)

## [用例github下载地址](https://github.com/iuapmobile/summerTest/tree/master/xServiceTest/qScanner)