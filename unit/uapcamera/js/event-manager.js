
/**
 * 全局事件监听对象
 * 
 * @param {Object} subject 监听的事件名称
 * @param {method} callback 事件处理器
 */
var EventListener = function (subject, callback) {
    try {
        /**
	 * @description {string} 所订阅的主题，即全局事件的名称
	 * @field
	 */
	this.subject = subject;
        
        /**
	 * @description {method} 执行的函数
	 * @field
	 */
	this.callback = callback || function (event, data) {
            console.log("默认的事件Callback:" + event);
        };
    } catch (err) {
        console.log("全局事件监听对象构造函数出错:" + err);
    }
};


var EventManager = function () {
    try {
        /**
	 * @description {Object} 存储自定义的全局事件监听器，结构为{name1:[listener1,listener2],name2:[listener3]...}
	 * @field
	 */
	this.events = new Object();
    } catch (err) {
        console.log("存储自定义的全局事件监听器:" + err);
    }
};

EventManager.getInstance = function () {
    try {
        if (!EventManager._instance) {
            EventManager._instance = new EventManager();
            if (EventManager._instance && EventManager._instance._init && typeof EventManager._instance._init == "function") {
                EventManager._instance._init();
            }
        }
        return EventManager._instance;
    } catch (err) {
        console.log("获取存储自定义的全局事件监听器对象:" + err);
        return EventManager._instance;
    }
    
};

/**
 * 触发监听事件
 * @param {string} subject
 * @param {Array} data
 */
EventManager.prototype.trigger = function (subject, data) {
    try {
        console.log("触发监听事件: " + subject);
        
        // 触发同步监听事件
        if (this.events[subject] && this.events[subject] instanceof Array) {
            var eventList = this.events[subject];
            for (var i = 0; i < eventList.length; i++) {
                var listener = eventList[i];
                try {
                    //console.log("触发监听事件: " + data); 大数据写入卡;
                    listener.callback(subject, data);
                } catch (e) {
                    console.log("触发监听事件异常" + subject + " :exception:" + e);
                    break;
                }
            }
        }
    } catch (err) {
        console.log("触发监听事件错误: " + err);
    }

};

/**
 * 异步触发监听事件
 * @param {string} subject
 * @param {Array} data
 */
EventManager.prototype.triggerAsync = function (subject, data) {
    try {
        console.log("异步触发监听事件: " + subject);
        setImmediate(function () {
            this.trigger(subject, data);
        }, 13);
    } catch (err) {
        console.log("异步触发监听事件错误: " + err);
    }

};

/**
 * 注册全局事件监听函数
 * @param {Object} subject 监听的事件名称
 * @param {method} callback 事件处理器
 * @return Whether register was successful
 * @type boolean
 */
EventManager.prototype.registerEventHandler = function (subject, callback) {
    try {
        if (!this.events[subject]) {
            this.events[subject] = new Array();
        }
        this.events[subject].push(new EventListener(subject, callback));
    } catch (err) {
        console.log("注册全局事件监听函数错误: " + err);
    }
};
EventManager.prototype.getInfo = function () {
    var info = "";
    try {
        for (var key in this.events) {
            info += key + "," + this.events[key].length;
        }
    } catch (err) {
        console.log("获取事件函数信息错误: " + err);
    }
    
    return info;
};

