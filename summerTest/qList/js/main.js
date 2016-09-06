//here is your code...
summerready = function () {
	var listview = UM.listview("#listview");
	//Knockout绑定
	var ViewModel = function() {};
	var jsonArray = [{
		"sender" : "集团IT服务台",
		"img" : "../img/org1.png",
		"msgNum" : 0,
		"lastMsg" : "因无线网络后台故障，暂停服务。",
		"lastTime" : "15:24"
	}, {
		"sender" : "集团行政部",
		"img" : "../img/org2.png",
		"msgNum" : 4,
		"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
		"lastTime" : "12:40"
	}, {
		"sender" : "集团人力资源部",
		"img" : "../img/org3.png",
		"msgNum" : 5,
		"lastMsg" : "各位同仁，跟据国务院发布的放假安排，2016年元旦、春节放假安排如下。",
		"lastTime" : "12:21"
	}];
	for(var i=0,len=20;i<len;i++){
		jsonArray.push({
			"sender" : "集团行政部",
			"img" : "../img/b"+i%3+".png",
			"msgNum" : i%5,
			"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
			"lastTime" : "12:40"
		});
    }
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(jsonArray);
	ko.applyBindings(viewModel);
	summer.window.setRefreshHeaderInfo({
                visible: true,
                bgColor: '#F5F5F5',
                textColor: '#4d4d4d',
                textDown: '下拉刷新...',
                textUp: '松开刷新...',                                                                                                                                                                                     textDo : '正在刷新数据...',                                                                                                                                                                                     showTime: true
    }, function (ret, err) {
                //从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
               alert("下拉刷新成功");
			   var row = {
    				"sender" : "集团技术部",
    				"img" : "../img/org4.png",
    				"msgNum" : 2,
    				"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
    				"lastTime" : "16:22",
    			};
    			viewModel.data.unshift(row);
    			listview.refresh();
                summer.window.refreshHeaderLoadDone();           
 	});
 	
 	summer.window.setRefreshFooterInfo({
                     visible: true,
                     bgColor: '#F5F5F5',
                     textColor: '#4d4d4d',
                     textDown: '上拉刷新...',
                     textUp: '松开刷新...',
                     textDo : '正在刷新数据...',                                                                                                                                                                                   showTime: true
        }, function (ret, err) {
                      //从服务器加载数据，加载完成后调用api.refreshFooterLoadDone()方法恢复组件到默认状态
                  	var row = {
	    				"sender" : "集团咨询部",
	    				"img" : "../img/org5.png",
	    				"msgNum" : 6,
	    				"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
	    				"lastTime" : "12月22日"
        			};
        			viewModel.data.push(row);
        			listview.refresh();
                    summer.window.refreshFooterLoadDone();
     })
};