### 1、qDevice
    包含原生device相关服务用例,包括获取时区ID、获取时区DisplayName、获取位置信息、打开网页、获取存储信息。
### 2、qService
    包含summer.get、summer.post、以及兼容方式$service.get、$service.post用例,通过get和post的方式向服务器索求数据的请求。    
### 3、qScanner
    包含summer.openScanner、summer.generateQRCode、以及兼容方式$scanner.open和$scanner.generateQRCode用例,扫描二维码和生成二维码。 
### 4、$cache
	包含 summer.writeFile、summer.readFile、以及兼容方式$cache.write、$cache.read用例，设置和读取缓存。
### 5、$tel
	包含 summer.callPhone、summer.sendMsg、summer.sendMail、以及兼容方式$tel.call、$tel.sendMsg、$tel.sendMail用例，打电话、发短信和发送邮件。
### 6、$camera
	包含summer.openPhotoAlbum、 summer.openCamera、以及兼容方式$camera.open、$camera.openPhotoAlbum用例,调取相机功能和打开本地相册功能。 
### 7、$sqlite
	包含summer.UMSqlite.openDB、 summer.UMSqlite.execSql、summer.UMSqlite.queryByPage、summer.UMSqlite.exist、summer.UMSqlite.query以及兼容方式$sqlite.openDB、$sqlite.execSql、$sqlite.queryByPage、 $sqlite.exist、$sqlite.query的用例,对数据的操作，包括新建、添加和查找。 
### 8、$net
	包含summer.netAvailable()、summer. getNetworkInfo()以及兼容方式$net.available()、$net. getNetworkInfo用例,获取网络是否可用的状态和设备网络信息。 
 

