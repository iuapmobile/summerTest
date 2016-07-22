function SNSBaseList(){
	this._list;
	this._size = 0;
}

SNSBaseList.prototype.size = function() {
	return this._size;
};

SNSBaseList.prototype._get = function(key) {
	return this.get(key);
}

SNSBaseList.prototype._add = function(key, item) {
	return this.add(key,item);
}

SNSBaseList.prototype._update = function(key, item) {
	this.update(key,item);
}

SNSBaseList.prototype._remove = function(key) {
	return this.remove(key);
}

SNSBaseList.prototype._contains = function(key) {
	return this.contains(key);
}


SNSBaseList.prototype.add = function(key, item) {
	if (this._contains(key)) {
		this._list[key] = item;
		return false;
	}
	this._size++;
	if (!this._list || this._list==null) {
		this._list = new Object();
	}
	this._list[key] = item;
	return true;
};

SNSBaseList.prototype.update = function(key, item) {
	if (!this._contains(key)) {
		this.add(key, item);
		return true;
	}
	this._list[key] = item;
};

SNSBaseList.prototype.contains = function(key) {
	return this._list != undefined && this._list[key] != undefined;
};

SNSBaseList.prototype.get = function(key) {
	if (!this._list || this._list==null) {
		return;
	}
	return this._list[key];
};

SNSBaseList.prototype.remove = function(key) {
	if (this._contains(key)) {
		delete this._list[key];
		this._size--;
		return true;
	}
};

SNSBaseList.prototype.removeAll = function(key) {
	this._list = new Object();
	this._size = 0;
};

SNSBaseList.prototype.toArray = function() {
	var results = [];
	for ( var item in this._list) {
		if (this._list[item] && typeof this._list[item] != "function") {
			results.push(this._list[item]);
		}
	}
	return results;
};

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
};

String.prototype.notEmpty = function() {
	return this != null && this.trim() != '';
};

String.prototype.isEmpty = function() {
	return !this.notEmpty();
};

String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
};

String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};

Object.clone = function(sObj) {

	if (typeof sObj !== "object") {
		return sObj;
	}

    var s = {}; 
    if(sObj.constructor == Array){ 
        s = []; 
    } 

    for(var i in sObj){ 
        s[i] = sObj[i]? Object.clone(sObj[i]) : null; 
    } 
    return s; 
};

if(!Date.now){
	Date.now = function(){
		return new Date().getTime();
	};
}

Date.prototype.format = function(fmt){
	var o = { 
	 "M+" : this.getMonth()+1,                 //月份 
	 "d+" : this.getDate(),                    //日 
	 "h+" : this.getHours(),                   //小时 
	 "m+" : this.getMinutes(),                 //分 
	 "s+" : this.getSeconds(),                 //秒 
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	 "S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
		}
	} 
	return fmt; 
};

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError(
					"Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function() {}, 
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
/**
 * 本地存储数据时，将数据封装到该对象中存储 id为本页面id, 防止浏览器对storage事件的不同处理的影响
 */
var SNSStroageItem = function(val){
	this.user = YYIMChat.getUserNode();
	this.id = SNSStorage.id;
	this.timestamp = new Date().getTime(),
	this.val = val;
};

/**
 * 本地存储服务， 封装了存储常用的方法， 和应用相关的存储逻辑
 */
var SNSStorage = {
		TYPE:{
			SESSION:"session",
			LOCAL:"local"
		}
};

SNSStorage.id = Math.uuid();

SNSStorage.setLocal = function(key, val){
	this._set(this.TYPE.LOCAL, key, val);
};

SNSStorage.appendLocal = function(key, val){
	this._append(this.TYPE.LOCAL, key, val);
};

SNSStorage.deleteLocalItem = function(key, val){
	this._deleteItem(this.TYPE.LOCAL, key, val);
};

/**
 * 获取存储对象
 * 
 * @return Object
 */
SNSStorage.getLocal = function(key, val){
	return	this._get(this.TYPE.LOCAL, key, val);
};

/**
 * 获取存储对象中的字符串值
 * 
 * @return string
 */
SNSStorage.getLocalVal = function(key, val){
	var result = this.getLocal(key, val);
	if(result){
		if(result.val){
			return result.val;
		}else{
			if(typeof result == "string"){
				return result;
			}else{
				return val;
			}
		}
	} 
};

SNSStorage.removeLocal = function(key){
	this._remove(this.TYPE.LOCAL, key);
};

SNSStorage.clearLocal = function(){
	this._clear(this.TYPE.LOCAL);
};


SNSStorage.setSession = function(key, val){
	this._set(this.TYPE.SESSION, key, val);
};

SNSStorage.getSession = function(key, val){
	return this._get(this.TYPE.SESSION, key, val);
};

SNSStorage.removeSession = function(key){
	this._remove(this.TYPE.SESSION, key);
};

SNSStorage.clearSession = function(){
	this._clear(this.TYPE.SESSION);
};


SNSStorage._set = function(type, key, val){
	 
	switch(type){
		case this.TYPE.LOCAL:
			store.set(key, JSON.stringify(new SNSStroageItem(val)));
			break;
		case this.TYPE.SESSION:
			sessionStorage.setItem(key, JSON.stringify(new SNSStroageItem(val)));
			break;
		default:
			YYIMChat.log("invalid storage type", 0, type);
		return;
	}
};

/**
 * 以字符串存储的数组数据中添加条目， 目前以|分隔开 TODO 将数组的存储结构改为数组，替代当前的字符串分隔符形式
 */
SNSStorage._append = function(type, key, val){
	 
	YYIMChat.log("append storage", 3, key, val);
	if(typeof val != "string"){
		YYIMChat.log("append storage: invalid val", 3, val);
		return;
	}
	var old = this._get(type, key);
	if(old){
		old = old.val;
		if(old.indexOf(val)==-1){
			this._set(type, key, old+"|"+val);
		}
	}else{
		this._set(type, key, "|"+val);
	}
	
	return this._get(type, key);
}

/**
 * 删除以字符串存储的数组数据中的条目 TODO 将数组的存储结构改为数组，替代当前的字符串分隔符形式
 */
SNSStorage._deleteItem = function( type, key, val){
	 
	if(typeof val != "string"){
		YYIMChat.log("_deleteItem storage: invalid val", 3, val);
		return;
	}
	var old = this._get(type, key).val;
	if(old){
		this._set(type, key, old.replace("|"+val,""));
	}
	return this._get(type, key);
}

SNSStorage._get = function(type,key, val){
	 
	var obj;
	switch(type){
		case this.TYPE.LOCAL:
			obj =  JSON.parse(store.get(key))
			break;
		case this.TYPE.SESSION:
			obj =  JSON.parse(sessionStorage.getItem(key));
			break;
		default:
			YYIMChat.log("invalid storage type", 0, type);
	}
	return obj==null?val:obj;
};

SNSStorage._remove = function(type, key){
	try{
		switch(type){
		case this.TYPE.LOCAL:
			store.remove(key);
			break;
		case this.TYPE.SESSION:
			sessionStorage.removeItem(key);
			break;
		default:
			YYIMChat.log("invalid storage type", 0, type);
		return;
		}
	}catch(e){
		YYIMChat.log("Storage remove error : "+e, 1, type);
	}
};

SNSStorage._clear = function(type){
	 
	YYIMChat.log("clear storage", 1, type);
	switch(type){
		case this.TYPE.LOCAL:
			store.clear();
			break;
		case this.TYPE.SESSION:
			sessionStorage.clear();
			break;
		default:
			YYIMChat.log("invalid storage type", 0, type);
		return;
	}
};
/*
    json2.js
    2014-02-04

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx,
        escapable,
        gap,
        indent,
        meta,
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

var store = (function () {
    var api               = {},
        win               = window,
        doc               = win.document,
        localStorageName  = 'localStorage',
        globalStorageName = 'globalStorage',
        storage;

    api.set    = function (key, value) {};
    api.get    = function (key)        {};
    api.remove = function (key)        {};
    api.clear  = function ()           {};

    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };

    } else if (globalStorageName in win && win[globalStorageName]) {
        storage    = win[globalStorageName][win.location.hostname];
        api.set    = function (key, val) { storage[key] = val };
        api.get    = function (key)      { return storage[key] && storage[key].value };
        api.remove = function (key)      { delete storage[key] };
        api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

    } else if (doc.documentElement.addBehavior) {
        function getStorage() {
            if (storage) { return storage }
            storage = doc.body.appendChild(doc.createElement('div'));
            storage.style.display = 'none';
            // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
            // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
            storage.addBehavior('#default#userData');
            storage.load(localStorageName);
            return storage;
        }
        api.set = function (key, val) {
            var storage = getStorage();
            storage.setAttribute(key, val);
            storage.save(localStorageName);
        };
        api.get = function (key) {
            var storage = getStorage();
            return storage.getAttribute(key);
        };
        api.remove = function (key) {
            var storage = getStorage();
            storage.removeAttribute(key);
            storage.save(localStorageName);
        }
        api.clear = function () {
            var storage = getStorage();
            var attributes = storage.XMLDocument.documentElement.attributes;;
            storage.load(localStorageName);
            for (var i=0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name);
            }
            storage.save(localStorageName);
        }
    }
    return api;
})();

var YYIMCommonUtil = {
	isFunction : function(func){
		return typeof func == 'function';
	},
	isStringAndNotEmpty : function(str){
		if(typeof str == 'string')
			return str.notEmpty();
		return false;
	},
	chatNumInString : function(str1, str2) {
		if(typeof str1 == 'string' && typeof str2 == 'string'){
			var r = new RegExp('\\' + str2, "gi");
			var m = str1.match(r);
			if(m)
				return m.length;
		}
		return 0;
	},
	isNumber : function(num) {
		return Object.prototype.toString.call(num) === '[object Number]';
	}
};

/**
 * @deprecated since version 2.0, use YYIMCommonUtil instead.
 */
var SNSCommonUtil = {
	/**
	 * @deprecated since version 2.0, use YYIMCommonUtil.isFunction instead.
	 */
	isFunction : YYIMCommonUtil.isFunction,
	/**
	 * @deprecated since version 2.0, use YYIMCommonUtil.isStringAndNotEmpty instead.
	 */
	isStringAndNotEmpty : YYIMCommonUtil.isStringAndNotEmpty,
	/**
	 * @deprecated since version 2.0, use YYIMCommonUtil.chatNumInString instead.
	 */
	chatNumInString : YYIMCommonUtil.chatNumInString,
	/**
	 * @deprecated since version 2.0, use YYIMCommonUtil.isNumber instead.
	 */
	isNumber : YYIMCommonUtil.isNumber
};

var YYIMArrayUtil = {
	contains : function(arr, val) {
		if(Object.prototype.toString.call(arr) === '[object Array]'){
			for(var i=0;i<arr.length;i++){
		        if(arr[i] === val){  
		        	return true;  
		        }  
		    }
			return false;
		}

		// 不是数组
		return false;
	},
	isArray : function(arr){
		return Object.prototype.toString.call(arr) === '[object Array]';
	},
	unique : function(array){
		array.sort();
		var re = [array[0]];
		for(var i =1; i<array.length;i++){
			if(array[i] !==re[re.length-1]){
				re.push(array[i]);
			}
		}
		return re;
	},
	insert : function(arr, index, item){
		arr.splice(index, 0, item);
	}
};

/**
 * @deprecated since version 2.0, use YYIMArrayUtil instead.
 */
var SNSArrayUtil = {
	/**
	 * @deprecated since version 2.0, use YYIMArrayUtil.contains instead.
	 */
	contains : YYIMArrayUtil.contains,
	/**
	 * @deprecated since version 2.0, use YYIMArrayUtil.isArray instead.
	 */
	isArray : YYIMArrayUtil.isArray,
	/**
	 * @deprecated since version 2.0, use YYIMArrayUtil.unique instead.
	 */
	unique : YYIMArrayUtil.unique,
	/**
	 * @deprecated since version 2.0, use YYIMArrayUtil.insert instead.
	 */
	insert : YYIMArrayUtil.insert
};

var YYIMUtil = {
		'cookie': {
			'get':function(name){  //获取cookie
			    var str_cookies = document.cookie;  
			    var arr_cookies = str_cookies.split(';');  
			    var num_cookies = arr_cookies.length;  
			    for(var i = 0; i < num_cookies; i++){  
			         var arr = arr_cookies[i].split("=");  
			         if(arr[0].replace(/(^\s+)|(\s+$)/g,"") == name) return unescape(arr[1]);  
			    }  
			    return null;  
			},
			'set':function(name, value, minutes, path, domain, secure){   //设置cookie
			    var cookie = name + '=' + escape(value);  
			    if (minutes){  
			        var expiration = new Date((new Date()).getTime() + minutes*60000);  
			        cookie += ';expires=' + expiration.toGMTString();  
			    }  
			    if (path) cookie += ';path=' + path;  
			    if (domain) cookie += ';domain=' + domain;  
			    if (secure) cookie += ';secure';  
			    document.cookie = cookie;  
			},
			'delete':function(name, path, domain){  //删除cookie
			    if(get_cookie(name)){  
			        var cookie = name + '=;expires=Fri, 02-Jan-1970 00:00:00 GMT';  
			        if (path) cookie += ';path=' + path;  
			        if (domain) cookie += ';domain=' + domain;  
			        document.cookie = cookie;  
			    }  
			}
		},
		'array': {
			'comparisonAsc':function(propertyName){ //用于给对象升序排序
				return function(object1,object2){
					return object1[propertyName] - object2[propertyName];
				};
			},
			'comparisonDesc':function(propertyName){ //用于给对象降序排序
				return function(object1,object2){
					return object2[propertyName] - object1[propertyName];
				};
			}
		}
};

/**
 * 加密工具
 */
var YYIMRegularUtil = {
	mobile:/^[1][358][0-9]{9}$/, //手机号
	phone:/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/ //手机和座机两种格式	
};


/* Copyright 2006 Erik Arvidsson
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You
 * may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * @fileoverview Wrapper to make working with XmlHttpRequest and the
 * DOM more convenient (cross browser compliance).
 * this code is taken from
 * {@link http://webfx.eae.net/dhtml/xmlextras/xmlextras.html}.
 * @author Erik Arvidsson
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/**
 * XmlHttp factory
 * @private
 */
function XmlHttp() {}

/**
 * creates a cross browser compliant XmlHttpRequest object
 */
XmlHttp.create = function () {
  try {
    if (window.XMLHttpRequest) {
        var req = new XMLHttpRequest();

        // some versions of Moz do not support the readyState property
        // and the onreadystate event so we patch it!
        if (req.readyState === null) {
            req.readyState = 1;
            req.addEventListener("load", function () {
                req.readyState = 4;
                if (typeof req.onreadystatechange == "function")
                    req.onreadystatechange();
            }, false);
        }

        return req;
    }
      if (window.ActiveXObject) {
          return new ActiveXObject(XmlHttp.getPrefix() + ".XmlHttp");
      }
  }
    catch (ex) {}
    // fell through
    throw new Error("Your browser does not support XmlHttp objects");
};

/**
 * used to find the Automation server name
 * @private
 */
XmlHttp.getPrefix = function() {
  if (XmlHttp.prefix) // I know what you did last summer
    return XmlHttp.prefix;

  var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
  var o;
  for (var i = 0; i < prefixes.length; i++) {
    try {
      // try to create the objects
      o = new ActiveXObject(prefixes[i] + ".XmlHttp");
      return XmlHttp.prefix = prefixes[i];
    }
    catch (ex) {}
  }

  throw new Error("Could not find an installed XML parser");
};


/**
 * XmlDocument factory
 * @private
 */
function XmlDocument() {}

XmlDocument.create = function (name,ns) {
  name = name || 'foo';
  ns = ns || '';

  try {
    var doc;
    // DOM2
    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument(ns, name, null);
      // some versions of Moz do not support the readyState property
      // and the onreadystate event so we patch it!
      if (doc.readyState === null) {
          doc.readyState = 1;
          doc.addEventListener("load", function () {
              doc.readyState = 4;
              if (typeof doc.onreadystatechange == "function")
                  doc.onreadystatechange();
          }, false);
      }
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject(XmlDocument.getPrefix() + ".DomDocument");
    }

    if (!doc.documentElement || doc.documentElement.tagName != name ||
        (doc.documentElement.namespaceURI &&
         doc.documentElement.namespaceURI != ns)) {
          try {
            if (ns !== '')
              doc.appendChild(doc.createElement(name)).
                setAttribute('xmlns',ns);
            else
              doc.appendChild(doc.createElement(name));
          } catch (dex) {
            doc = document.implementation.createDocument(ns,name,null);

            if (doc.documentElement === null)
              doc.appendChild(doc.createElement(name));

             // fix buggy opera 8.5x
            if (ns !== '' &&
                doc.documentElement.getAttribute('xmlns') != ns) {
              doc.documentElement.setAttribute('xmlns',ns);
            }
          }
        }

    return doc;
  }
  catch (ex) { }
  throw new Error("Your browser does not support XmlDocument objects");
};

/**
 * used to find the Automation server name
 * @private
 */
XmlDocument.getPrefix = function() {
  if (XmlDocument.prefix)
    return XmlDocument.prefix;

  var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
  var o;
  for (var i = 0; i < prefixes.length; i++) {
    try {
      // try to create the objects
      o = new ActiveXObject(prefixes[i] + ".DomDocument");
      return XmlDocument.prefix = prefixes[i];
    }
    catch (ex) {}
  }

  throw new Error("Could not find an installed XML parser");
};


// Create the loadXML method
if (typeof(Document) != 'undefined' && window.DOMParser) {

  /**
   * XMLDocument did not extend the Document interface in some
   * versions of Mozilla.
   * @private
   */
  Document.prototype.loadXML = function (s) {

    // parse the string to a new doc
    var doc2 = (new DOMParser()).parseFromString(s, "text/xml");

    // remove all initial children
    while (this.hasChildNodes())
      this.removeChild(this.lastChild);

    // insert and import nodes
    for (var i = 0; i < doc2.childNodes.length; i++) {
      this.appendChild(this.importNode(doc2.childNodes[i], true));
    }
  };
 }

// Create xml getter for Mozilla
if (window.XMLSerializer &&
    window.Node && Node.prototype && Node.prototype.__defineGetter__) {

  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  // XMLDocument did not extend the Document interface in some versions
  // of Mozilla. Extend both!
  XMLDocument.prototype.__defineGetter__("xml", function () {
                                           return (new XMLSerializer()).serializeToString(this);
                                         });
  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  Document.prototype.__defineGetter__("xml", function () {
                                        return (new XMLSerializer()).serializeToString(this);
                                      });

  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  Node.prototype.__defineGetter__("xml", function () {
                                    return (new XMLSerializer()).serializeToString(this);
                                  });
 }

/**
 * @fileoverview Magic dependency loading. Taken from script.aculo.us
 * and modified to break it.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaC */

var JSJaC = {
  Version: '1.4',
  bind: function(fn, obj, optArg) {
    return function(arg) {
      return fn.apply(obj, [arg, optArg]);
    };
  }
};

/* Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*exported JSJaCBuilder */

/**
 * This code is taken from 
 * {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} 
 * and has been modified to suit our
 * needs.<br/>
 * The original parts of the code do have the following
 * copyright and license notice:<br/>
 * Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us,
 * http://mir.acu lo.us) <br/>
 * script.aculo.us is freely distributable under the terms of an
 * MIT-style license.<br>
 * For details, see the script.aculo.us web site at
 * {@link http://script.aculo.us/}
 * @namespace
 */
var JSJaCBuilder = {

    /**
     * build a new node within an xml document
     * @param {XMLDocument} doc an xml document to build the new nodes for
     * @param {string} elementName the name of the element to be created
     */
  buildNode: function(doc, elementName) {

    var element, ns = arguments[4];

    // attributes (or text)
    if(arguments[2])
      if(JSJaCBuilder._isStringOrNumber(arguments[2]) ||
         (arguments[2] instanceof Array)) {
        element = this._createElement(doc, elementName, ns);
        JSJaCBuilder._children(doc, element, arguments[2]);
      } else {
        ns = arguments[2]['xmlns'] || ns;
        element = this._createElement(doc, elementName, ns);
        for(var attr in arguments[2]) {
          if (arguments[2].hasOwnProperty(attr) && attr != 'xmlns')
            element.setAttribute(attr, arguments[2][attr]);
        }
      }
    else
      element = this._createElement(doc, elementName, ns);
    // text, or array of children
    if(arguments[3])
      JSJaCBuilder._children(doc, element, arguments[3], ns);

    return element;
  },

  /**
   * @private
   */
  _createElement: function(doc, elementName, ns) {
    try {
      if (ns)
        return doc.createElementNS(ns, elementName);
    } catch (ex) { }

    var el = doc.createElement(elementName);

    if (ns)
      el.setAttribute("xmlns", ns);

    return el;
  },

  /**
   * @private
   */
  _text: function(doc, text) {
    return doc.createTextNode(text);
  },

  /**
   * @private
   */
  _children: function(doc, element, children, ns) {
    if(typeof children=='object') { // array can hold nodes and text
      for (var i in children) {
        if (children.hasOwnProperty(i)) {
          var e = children[i];
          if (typeof e=='object') {
            if (e instanceof Array) {
              var node = JSJaCBuilder.buildNode(doc, e[0], e[1], e[2], ns);
              element.appendChild(node);
            } else {
              element.appendChild(e);
            }
          } else {
            if(JSJaCBuilder._isStringOrNumber(e)) {
              element.appendChild(JSJaCBuilder._text(doc, e));
            }
          }
        }
      }
    } else {
      if(JSJaCBuilder._isStringOrNumber(children)) {
        element.appendChild(JSJaCBuilder._text(doc, children));
      }
    }
  },

  /**
   * @private
   */
  _attributes: function(attributes) {
    var attrs = [];
    for(var attribute in attributes)
      if (attributes.hasOwnProperty(attribute))
        attrs.push(attribute +
          '="' + attributes[attribute].toString().htmlEnc() + '"');
    return attrs.join(" ");
  },

  /**
   * @private
   */
  _isStringOrNumber: function(param) {
    return(typeof param=='string' || typeof param=='number');
  }
};

JSJAC_HAVEKEYS = true;          // whether to use keys
JSJAC_NKEYS    = 16;            // number of keys to generate

JSJAC_INACTIVITY = 300;         // qnd hack to make suspend/resume
                                // work more smoothly with polling

JSJAC_ERR_COUNT = 10;           // number of retries in case of
                                // connection errors

JSJAC_ALLOW_PLAIN = true;       // whether to allow plaintext logins

JSJAC_ALLOW_SCRAM = false;      // allow usage of SCRAM-SHA-1
                                // authentication; please note that it
                                // is quite slow so it is disable by
                                // default

JSJAC_CHECKQUEUEINTERVAL = 100; // msecs to poll send queue
JSJAC_CHECKINQUEUEINTERVAL = 100; // msecs to poll incoming queue
JSJAC_TIMERVAL = 2000;          // default polling interval

JSJAC_RETRYDELAY = 5000;        // msecs to wait before trying next
                                // request after error

JSJAC_REGID_TIMEOUT = 20000;    // time in msec until registered
                                // callbacks for ids timeout

/* Options specific to HTTP Binding (BOSH) */
JSJACHBC_MAX_HOLD = 1;          // default for number of connctions
                                // held by connection manager

JSJACHBC_MAX_WAIT = 300;        // default 'wait' param - how long an
                                // idle connection should be held by
                                // connection manager

JSJACHBC_BOSH_VERSION  = "1.10";
JSJACHBC_USE_BOSH_VER  = true;

JSJACHBC_MAXPAUSE = 120;        // how long a suspend/resume cycle may
                                // take

/*** END CONFIG ***/

/**
 * @fileoverview Contains all things in common for all subtypes of connections
 * supported.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCConnection */

/**
 * Creates a new Jabber/XMPP connection (a connection to a jabber server)
 * 
 * @class Somewhat abstract base class for jabber connections. Contains all of the code in common for all jabber connections
 * @constructor
 * @param {Object} oArg Configurational object for this connection.
 * @param {string} oArg.httpbase The connection endpoint of the HTTP service to talk to.
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 * @param {int} [oArg.timerval] The polling interval.
 * @param {string} [oArg.cookie_prefix] Prefix to cookie names used when suspending.
 */
function JSJaCConnection(oArg) {

	if (oArg && oArg.httpbase)
		/**
		 * @private
		 */
		this._httpbase = oArg.httpbase;

	if (oArg && oArg.oDbg && oArg.oDbg.log) {
		/**
		 * Reference to debugger interface (needs to implement method <code>log</code>)
		 * 
		 * @type JSJaCDebugger
		 */
		this.oDbg = oArg.oDbg;
	} else {
		this.oDbg = {
			log : function() {
			}
		};
	}

	if (oArg && oArg.timerval)
		this.setPollInterval(oArg.timerval);
	else
		this.setPollInterval(JSJAC_TIMERVAL);

	if (oArg && oArg.cookie_prefix)
		/**
		 * @private
		 */
		this._cookie_prefix = oArg.cookie_prefix;
	else
		this._cookie_prefix = "";

	/**
	 * @private
	 */
	this._connected = false;
	/**
	 * @private
	 */
	this._events = [];
	/**
	 * @private
	 */
	this._keys = null;
	/**
	 * @private
	 */
	this._ID = 0;
	
	/**
	 * @Private
	 */
	this._IDPrefix = 'jump' + new Date().format('yyMMdd') + '_';
	/**
	 * @private
	 */
	this._inQ = [];
	/**
	 * @private
	 */
	this._pQueue = [];
	/**
	 * @private
	 */
	this._regIDs = [];
	/**
	 * @private
	 */
	this._req = [];
	/**
	 * @private
	 */
	this._status = 'intialized';
	/**
	 * @private
	 */
	this._errcnt = 0;
	/**
	 * @private
	 */
	this._inactivity = JSJAC_INACTIVITY;
	/**
	 * @private
	 */
	this._sendRawCallbacks = [];
}

/**
 * Connect to a jabber/XMPP server.
 * 
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.password The user's password.
 * @param {string} [oArg.authzid] Authorization identity. Used to act as another user, in most cases not needed and rarely supported by servers. If
 *            present should be a bare JID (user@example.net).
 * @param {boolean} [oArg.allow_plain] Whether to allow plain text logins.
 * @param {boolean} [oArg.allow_scram] Whether to allow SCRAM-SHA-1 authentication. Please note that it is quite slow, do some testing on all required
 *            browsers before enabling.
 * @param {boolean} [oArg.register] Whether to register a new account.
 * @param {string} [oArg.host] The host to connect to which might be different from the domain given above. So some XMPP service might host the domain
 *            'example.com' but might be located at the host 'jabber.example.com'. Normally such situations should be gracefully handled by using DNS
 *            SRV records. But in cases where this isn't available you can set the host manually here.
 * @param {int} [oArg.port] The port of the manually given host from above.
 * @param {string} [oArg.authhost] The host that handles the actualy authorization. There are cases where this is different from the settings above,
 *            e.g. if there's a service that provides anonymous logins at 'anon.example.org'.
 * @param {string} [oArg.authtype] Must be one of 'sasl' (default), 'nonsasl', 'saslanon', or 'anonymous'.
 * @param {string} [oArg.xmllang] The requested language for this login. Typically XMPP server try to respond with error messages and the like in this
 *            language if available.
 */
JSJaCConnection.prototype.connect = function(oArg) {
	this._setStatus('connecting');

	this.domain = oArg.domain || 'localhost';
	this.username = oArg.username;
	this.resource = oArg.resource;
	this.pass = oArg.password || oArg.pass;
	this.authzid = oArg.authzid || '';
	this.register = oArg.register;

	this.authhost = oArg.authhost || oArg.host || oArg.domain;
	this.authtype = oArg.authtype || 'sasl';

	if (oArg.xmllang && oArg.xmllang !== '')
		this._xmllang = oArg.xmllang;
	else
		this._xmllang = 'en';

	if (oArg.allow_plain)
		this._allow_plain = oArg.allow_plain;
	else
		this._allow_plain = JSJAC_ALLOW_PLAIN;

	if (oArg.allow_scram)
		this._allow_scram = oArg.allow_scram;
	else
		this._allow_scram = JSJAC_ALLOW_SCRAM;

	this.host = oArg.host;
	this.port = oArg.port || 5222;

	this.jid = this.username + '@' + this.domain;
	this.fulljid = this.jid + '/' + this.resource;

	this._rid = Math.round(100000.5 + (((900000.49999) - (100000.5)) * Math.random()));

	// setupRequest must be done after rid is created but before first use in reqstr
	var slot = this._getFreeSlot();
	this._req[slot] = this._setupRequest(true);

	var reqstr = this._getInitialRequestString();
	
	this.oDbg.log(reqstr, 4);
	
	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		var r = this._req[slot].r;
		if (r.readyState == 4) {
			this.oDbg.log("async recv: " + r.responseText, 4);
			this._handleInitialResponse(r); // handle response
		}
	}, this);

	if (typeof (this._req[slot].r.onerror) != 'undefined') {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			this.oDbg.log('XmlHttpRequest error', 1);
		}, this);
	}

	this._req[slot].r.send(reqstr);
};

/**
 * Tells whether this connection is connected
 * 
 * @return <code>true</code> if this connections is connected, <code>false</code> otherwise
 * @type boolean
 */
JSJaCConnection.prototype.connected = function() {
	return this._connected;
};

/**
 * Disconnects from jabber server and terminates session (if applicable)
 */
JSJaCConnection.prototype.disconnect = function() {
	this._setStatus('disconnecting');

	if (!this.connected())
		return;
	this._connected = false;

	clearInterval(this._interval);
	clearInterval(this._inQto);

	if (this._timeout)
		clearTimeout(this._timeout); // remove timer

	var slot = this._getFreeSlot();
	// Intentionally synchronous
	this._req[slot] = this._setupRequest(false);

	var request = this._getRequestString(false, true);

	this.oDbg.log("Disconnecting: " + request, 4);
	try {
		this._req[slot].r.send(request);
	} catch (e) {
	}
	this.oDbg.log("disconnected");
	try {
		JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();
	} catch (e) {
	}

	this._handleEvent('ondisconnect');
};

/**
 * Gets current value of polling interval
 * 
 * @return Polling interval in milliseconds
 * @type int
 */
JSJaCConnection.prototype.getPollInterval = function() {
	return this._timerval;
};

/**
 * Registers an event handler (callback) for this connection.
 * 
 * <p>
 * Note: All of the packet handlers for specific packets (like message_in, presence_in and iq_in) fire only if there's no callback associated with the
 * id.<br>
 * 
 * <p>
 * Example:<br/> <code>con.registerHandler('iq', 'query', 'jabber:iq:version', handleIqVersion);</code>
 * 
 * 
 * @param {String} event One of
 * 
 * <ul>
 * <li>onConnect - connection has been established and authenticated</li>
 * <li>onDisconnect - connection has been disconnected</li>
 * <li>onResume - connection has been resumed</li>
 * 
 * <li>onStatusChanged - connection status has changed, current status as being passed argument to handler. See {@link #status}.</li>
 * 
 * <li>onError - an error has occured, error node is supplied as argument, like this:<br>
 * <code>&lt;error code='404' type='cancel'&gt;<br>
 * &lt;item-not-found xmlns='urn:ietf:params:xml:ns:xmpp-stanzas'/&gt;<br>
 * &lt;/error&gt;</code></li>
 * 
 * <li>packet_in - a packet has been received (argument: the packet)</li>
 * 
 * <li>packet_out - a packet is to be sent(argument: the packet)</li>
 * 
 * <li>message_in | message - a message has been received (argument: the packet)</li>
 * 
 * <li>message_out - a message packet is to be sent (argument: the packet)</li>
 * 
 * <li>presence_in | presence - a presence has been received (argument: the packet)</li>
 * 
 * <li>presence_out - a presence packet is to be sent (argument: the packet)</li>
 * 
 * <li>iq_in | iq - an iq has been received (argument: the packet)</li>
 * <li>iq_out - an iq is to be sent (argument: the packet)</li>
 * </ul>
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet [optional]
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given) [optional]
 * 
 * @param {String} type The type of the packet to handle (works only if childName and chidNS are given (both may be set to '*' in order to get
 *            skipped) [optional]
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerHandler = function(event, ns, type, handler) {
	event = event.toLowerCase(); // don't be case-sensitive here
	var eArg = {
		handler : arguments[arguments.length - 1],
		ns : '*',
		type : '*'
	};
	if (arguments.length > 2)
		eArg.ns = arguments[1];
	if (arguments.length > 3)
		eArg.type = arguments[2];
	if (!this._events[event])
		this._events[event] = [ eArg ];
	else
		this._events[event] = this._events[event].concat(eArg);

	// sort events in order how specific they match criterias thus using
	// wildcard patterns puts them back in queue when it comes to
	// bubbling the event
	this._events[event] = this._events[event].sort(function(a, b) {
		var aRank = 0;
		var bRank = 0;

		if (a.type == '*')
			aRank++;
		if (a.ns == '*')
			aRank++;
			aRank++;
		if (b.type == '*')
			bRank++;
		if (b.ns == '*')
			bRank++;

		if (aRank > bRank)
			return 1;
		if (aRank < bRank)
			return -1;
		return 0;
	});
	this.oDbg.log("registered handler for event '" + event + "'", 2);

	return this;
};

JSJaCConnection.prototype.unregisterHandler = function(event, handler) {
	event = event.toLowerCase(); // don't be case-sensitive here

	if (!this._events[event])
		return this;

	var arr = this._events[event], res = [];
	for (var i = 0; i < arr.length; i++)
		if (arr[i].handler != handler)
			res.push(arr[i]);

	if (arr.length != res.length) {
		this._events[event] = res;
		this.oDbg.log("unregistered handler for event '" + event + "'", 2);
	}

	return this;
};

/**
 * Register for iq packets of type 'get'.
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given)
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerIQGet = function(childName, childNS, handler) {
	return this.registerHandler('iq', childName, childNS, 'get', handler);
};

/**
 * Register for iq packets of type 'set'.
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given)
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerIQSet = function(childName, childNS, handler) {
	return this.registerHandler('iq', childName, childNS, 'set', handler);
};

/**
 * Resumes this connection from saved state (cookie)
 * 
 * @return Whether resume was successful
 * @type boolean
 */
JSJaCConnection.prototype.resume = function() {
	try {
		var json = JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').getValue();
		this.oDbg.log('read cookie: ' + json, 2);
		JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();

		return this.resumeFromData(JSJaCJSON.parse(json));
	} catch (e) {
	}
	return false;
};

/**
 * Resumes BOSH connection from data
 * 
 * @param {Object} serialized jsjac state information
 * @return Whether resume was successful
 * @type boolean
 */
JSJaCConnection.prototype.resumeFromData = function(data) {
	try {

		for ( var i in data)
			if (data.hasOwnProperty(i))
				this[i] = data[i];

		// copy keys - not being very generic here :-/
		if (this._keys) {
			this._keys2 = new JSJaCKeys();
			var u = this._keys2._getSuspendVars();
			for (var j = 0; j < u.length; j++)
				this._keys2[u[j]] = this._keys[u[j]];
			this._keys = this._keys2;
		}

		if (this._connected) {
			this._setStatus('resuming');
			this._handleEvent('onresume');

			// don't poll too fast!
			setTimeout(JSJaC.bind(this._resume, this), this.getPollInterval());

			this._interval = setInterval(JSJaC.bind(this._checkQueue, this), JSJAC_CHECKQUEUEINTERVAL);
			this._inQto = setInterval(JSJaC.bind(this._checkInQ, this), JSJAC_CHECKINQUEUEINTERVAL);
		} else {
			this._setStatus('terminated');
		}

		return (this._connected === true);
	} catch (e) {
		if (e.message)
			this.oDbg.log("Resume failed: " + e.message, 1);
		else
			this.oDbg.log("Resume failed: " + e, 1);
		return false;
	}
};

JSJaCConnection.prototype.sendJumpPacket = function(jumpPacket, cb, arg) {
	if (!this.connected())
		return false;

	if (!jumpPacket || !jumpPacket.opcode) {
		this.oDbg.log("no jumpPacket: " + jumpPacket, 1);
		return false;
	}


	if (cb && this._validateCallbackable(jumpPacket)) {
		if(!jumpPacket.content)
			throw new Error('packet content cannot be null when send a Message or IQ packet.');
	
		if (!jumpPacket.content.id)
			jumpPacket.content.id = this._IDPrefix + this._ID++;

		// register callback with id
		this._registerPID(jumpPacket, cb, arg);
	}

	this._pQueue = this._pQueue.concat(jumpPacket);
	//this._handleEvent(jumpPacket.pType() + '_out', jumpPacket);
	this._handleEvent("packet_out", jumpPacket);

	return true;
};

/**
 * Sends a JSJaCPacket
 * 
 * @param {JSJaCPacket} packet The packet to send
 * @param {Function} cb The callback to be called if there's a reply to this packet (identified by id) [optional]
 * @param {Object} arg Arguments passed to the callback (additionally to the packet received) [optional]
 * @return 'true' if sending was successfull, 'false' otherwise
 * @type boolean
 */
JSJaCConnection.prototype.send = function(packet, cb, arg) {
	return;
	if (!packet || !packet.pType) {
		this.oDbg.log("no packet: " + packet, 1);
		return false;
	}

	if (!this.connected())
		return false;

	// if (this._xmllang && !packet.getXMLLang())
	// packet.setXMLLang(this._xmllang);

	// remember id for response if callback present
	if (cb) {
		if (!packet.getID())
			packet.setID('JSJaCID_' + this._ID++); // generate an ID

		// register callback with id
		this._registerPID(packet, cb, arg);
	}

	this._pQueue = this._pQueue.concat(packet.xml());
	this._handleEvent(packet.pType() + '_out', packet);
	this._handleEvent("packet_out", packet);

	return true;
};

/**
 * Sends an IQ packet. Has default handlers for each reply type. Those maybe overriden by passing an appropriate handler.
 * 
 * @param {JSJaCIQPacket} iq - the iq packet to send
 * @param {Object} handlers - object with properties 'error_handler', 'result_handler' and 'default_handler' with appropriate functions
 * @param {Object} arg - argument to handlers
 * @return 'true' if sending was successfull, 'false' otherwise
 * @type boolean
 */
JSJaCConnection.prototype.sendIQ = function(iq, handlers, arg) {
	if (!iq || iq.pType() != 'iq') {
		return false;
	}

	handlers = handlers || {};
	var error_handler = handlers.error_handler || JSJaC.bind(function(aIq) {
		this.oDbg.log(aIq.xml(), 1);
	}, this);

	var result_handler = handlers.result_handler || JSJaC.bind(function(aIq) {
		this.oDbg.log(aIq.xml(), 2);
	}, this);

	var iqHandler = function(aIq, arg) {
		switch (aIq.getType()) {
			case 'error':
				error_handler(aIq);
				break;
			case 'result':
				result_handler(aIq, arg);
				break;
		}
	};
	return this.send(iq, iqHandler, arg);
};

/**
 * Sets polling interval for this connection
 * 
 * @param {int} timerval Milliseconds to set timer to
 * @return effective interval this connection has been set to
 * @type int
 */
JSJaCConnection.prototype.setPollInterval = function(timerval) {
	if (timerval && !isNaN(timerval))
		this._timerval = timerval;
	return this._timerval;
};

/**
 * Returns current status of this connection
 * 
 * @return String to denote current state. One of
 *         <ul>
 *         <li>'initializing' ... well
 *         <li>'connecting' if connect() was called
 *         <li>'resuming' if resume() was called
 *         <li>'processing' if it's about to operate as normal
 *         <li>'onerror_fallback' if there was an error with the request object
 *         <li>'protoerror_fallback' if there was an error at the http binding protocol flow (most likely that's where you interested in)
 *         <li>'internal_server_error' in case of an internal server error
 *         <li>'suspending' if suspend() is being called
 *         <li>'aborted' if abort() was called
 *         <li>'disconnecting' if disconnect() has been called
 *         </ul>
 * @type String
 */
JSJaCConnection.prototype.status = function() {
	return this._status;
};

/**
 * Suspends this connection (saving state for later resume) Saves state to cookie
 * 
 * @return Whether suspend (saving to cookie) was successful
 * @type boolean
 */
JSJaCConnection.prototype.suspend = function() {
	var data = this.suspendToData();

	try {
		var c = new JSJaCCookie(this._cookie_prefix + 'JSJaC_State', JSJaCJSON.toString(data));
		this.oDbg.log("writing cookie: " + c.getValue() + "\n" + "(length:" + c.getValue().length + ")", 2);
		c.write();

		var c2 = JSJaCCookie.get(this._cookie_prefix + 'JSJaC_State');
		if (c.getValue() != c2) {
			this.oDbg.log("Suspend failed writing cookie.\nread: " + c2, 1);
			c.erase();
			return false;
		}
		return true;
	} catch (e) {
		this.oDbg.log("Failed creating cookie '" + this._cookie_prefix + "JSJaC_State': " + e.message, 1);
	}
	return false;
};

/**
 * Suspend connection and return serialized JSJaC connection state
 * 
 * @return JSJaC connection state object
 * @type Object
 */
JSJaCConnection.prototype.suspendToData = function() {

	// remove timers
	clearTimeout(this._timeout);
	clearInterval(this._interval);
	clearInterval(this._inQto);

	this._suspend();

	var u = ('_connected,_keys,_ID,_xmllang,_inQ,_pQueue,_regIDs,_errcnt,_inactivity,domain,username,resource,jid,fulljid,_sid,_httpbase,_timerval,_is_polling')
			.split(',');
	u = u.concat(this._getSuspendVars());
	var s = {};

	for (var i = 0; i < u.length; i++) {
		if (!this[u[i]])
			continue; // hu? skip these!
		var o = {};
		if (this[u[i]]._getSuspendVars) {
			var uo = this[u[i]]._getSuspendVars();
			for (var j = 0; j < uo.length; j++)
				o[uo[j]] = this[u[i]][uo[j]];
		} else
			o = this[u[i]];

		s[u[i]] = o;
	}
	this._connected = false;
	this._setStatus('suspending');
	return s;
};

/**
 * @private
 */
JSJaCConnection.prototype._abort = function() {
	clearTimeout(this._timeout); // remove timer

	clearInterval(this._inQto);
	clearInterval(this._interval);

	this._connected = false;

	this._setStatus('aborted');

	this.oDbg.log("Disconnected.", 1);
	this._handleEvent('ondisconnect');
	this._handleEvent('onerror', JSJaCError('500', 'cancel', 'service-unavailable'));
};

/**
 * @private
 */
JSJaCConnection.prototype._checkInQ = function() {
	for (var i = 0; i < this._inQ.length && i < 10; i++) {
		var item = this._inQ[0],
			body = item.body,
			event = item.event;
		this._inQ = this._inQ.slice(1, this._inQ.length);
		
		// ping or auth
		if(!body) {
			this._handleEvent('packet_in');
			this._handleEvent(event);
			return;
		}
		//var body = JSON.parse(this._uint8ArrayToString(bodyArr));
		if(!this._handlePID(body)) {
			this._handleEvent('packet_in', body);
			this._handleEvent(event, body);
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._checkQueue = function() {
	if (this._pQueue.length > 0)
		this._process();
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doAuth = function() {
	this._sendJumpPacket(this._getAuthPacket(), function(resp) {
		if(resp.event == OPCODE.AUTH.KEY) {
			var body = resp.body;
			//console.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body));
			if(body.code != 200) {
				this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
				return;
			}
			this._handleEvent('packet_in', body);
			this._handleEvent(OPCODE.AUTH.KEY, body);
			
			this._handleEvent('onconnect');
		}
	});
	
	return true;
	
	///////////////// ↓former
	if (this.has_sasl && this.authtype == 'nonsasl')
		this.oDbg.log("Warning: SASL present but not used", 1);

	if (!this._doSASLAuth() && !this._doLegacyAuth()) {
		this.oDbg.log("Auth failed for authtype " + this.authtype, 1);
		this.disconnect();
		return false;
	}
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doInBandReg = function() {
	if (this.authtype == 'saslanon' || this.authtype == 'anonymous')
		return; // bullshit - no need to register if anonymous

	/*************************************************************************************************************************************************
	 * In-Band Registration see JEP-0077
	 */

	var iq = new JSJaCIQ();
	iq.setType('set');
	iq.setID('reg1');
	iq.appendNode("query", {
		xmlns : NS_REGISTER
	}, [ [ "username", this.username ], [ "password", this.pass ] ]);

	this.send(iq, this._doInBandRegDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doInBandRegDone = function(iq) {
	if (iq && iq.getType() == 'error') { // we failed to register
		this.oDbg.log("registration failed for " + this.username, 0);
		this._handleEvent('onerror', iq.getChild('error'));
		return;
	}

	this.oDbg.log(this.username + " registered succesfully", 0);

	this._doAuth();
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuth = function() {
	if (this.authtype != 'nonsasl' && this.authtype != 'anonymous')
		return false;

	/*************************************************************************************************************************************************
	 * Non-SASL Authentication as described in JEP-0078
	 */
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'get', 'auth1');
	iq.appendNode('query', {
		xmlns : NS_AUTH
	}, [ [ 'username', this.username ] ]);

	this.send(iq, this._doLegacyAuth2);
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuth2 = function(resIq) {
	if (!resIq || resIq.getType() != 'result') {
		if (resIq && resIq.getType() == 'error')
			this._handleEvent('onerror', resIq.getChild('error'));
		this.disconnect();
		return;
	}

	var use_digest = (resIq.getChild('digest') !== null);

	/*************************************************************************************************************************************************
	 * Send authentication
	 */
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'auth2');

	var query = iq.appendNode('query', {
		xmlns : NS_AUTH
	}, [ [ 'username', this.username ], [ 'resource', this.resource ] ]);

	if (use_digest) { // digest login
		query.appendChild(iq.buildNode('digest', {
			xmlns : NS_AUTH
		}, hex_sha1(this.streamid + this.pass)));
	} else if (this._allow_plain) { // use plaintext auth
		query.appendChild(iq.buildNode('password', {
			xmlns : NS_AUTH
		}, this.pass));
	} else {
		this.oDbg.log("no valid login mechanism found", 1);
		this.disconnect();
		return;
	}

	this.send(iq, this._doLegacyAuthDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuthDone = function(iq) {
	if (iq.getType() != 'result') { // auth' failed
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		this.disconnect();
	} else
		this._handleEvent('onconnect');
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuth = function() {
	if (this.authtype == 'nonsasl' || this.authtype == 'anonymous')
		return false;

	if ((typeof this.username == 'undefined' || this.username == null || this.username == "") && this.authtype == 'saslanon') {
		if (this.mechs['ANONYMOUS']) {
			this.oDbg.log("SASL using mechanism 'ANONYMOUS'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='ANONYMOUS'/>", this._doSASLAuthDone);
		}
		this.oDbg.log("SASL ANONYMOUS requested but not supported", 1);
	} else {
		if (this._allow_scram && this.mechs['SCRAM-SHA-1']) {
			this.oDbg.log("SASL using mechanism 'SCRAM-SHA-1'", 2);

			this._clientFirstMessageBare = 'n=' + this.username.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',r=' + JSJaCUtils.cnonce(16);
			var gs2Header;
			if (this.authzid) {
				gs2Header = 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',';
			} else {
				gs2Header = 'n,,';
			}
			var clientFirstMessage = gs2Header + this._clientFirstMessageBare;

			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='SCRAM-SHA-1'>" + b64encode(clientFirstMessage)
					+ "</auth>", this._doSASLAuthScramSha1S1);
		}/* else if (this.mechs['DIGEST-MD5']) {
			this.oDbg.log("SASL using mechanism 'DIGEST-MD5'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>", this._doSASLAuthDigestMd5S1);
		} */else if (this._allow_plain && this.mechs['PLAIN']) {
			this.oDbg.log("SASL using mechanism 'PLAIN'", 2);
			var authStr = this.authzid + String.fromCharCode(0) + this.username + String.fromCharCode(0) + this.pass;
			this.oDbg.log("authenticating with '" + authStr + "'", 2);
			authStr = b64encode(authStr);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + authStr + "</auth>", this._doSASLAuthDone);
		}
		/*} else if (this._allow_plain && this.mechs['PLAIN']) {
			this.oDbg.log("SASL using mechanism 'PLAIN'", 2);
			var authStr = this.authzid + String.fromCharCode(0) + this.username + String.fromCharCode(0) + this.pass;
			this.oDbg.log("authenticating with '" + authStr + "'", 2);
			authStr = b64encode(authStr);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + authStr + "</auth>", this._doSASLAuthDone);
		}
		else if (this.mechs['DIGEST-MD5']) {
			this.oDbg.log("SASL using mechanism 'DIGEST-MD5'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>", this._doSASLAuthDigestMd5S1);
		}*/
		this.oDbg.log("No SASL mechanism applied", 1);
		this.authtype = 'nonsasl'; // fallback
	}
	return false;
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthScramSha1S1 = function(el) {
	if (el.nodeName != 'challenge') {
		this.oDbg.log('challenge missing', 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var serverFirstMessage = b64decode(el.firstChild.nodeValue);
		this.oDbg.log('got challenge: ' + serverFirstMessage, 2);

		var data = {};
		var fields = serverFirstMessage.split(',');
		for ( var field in fields) {
			var val = fields[field].substring(2);
			data[fields[field].substring(0, 1)] = val;
		}

		var password = str2rstr_utf8(this.pass);
		var u = b64decode_bin(data['s']) + "\x00\x00\x00\x01";
		var h, i = parseInt(data['i'], 10);
		for (var j = 0; j < i; j++) {
			u = rstr_hmac_sha1(password, u);
			h = JSJaCUtils.xor(h, u);
		}

		var gs2Header;
		if (this.authzid) {
			gs2Header = 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',';
		} else {
			gs2Header = 'n,,';
		}
		var clientFinalMessageWithoutProof = 'c=' + b64encode(gs2Header) + ',r=' + data['r'];

		this._saltedPassword = h;
		var clientKey = rstr_hmac_sha1(this._saltedPassword, 'Client Key');
		var storedKey = rstr_sha1(clientKey);
		this._authMessage = this._clientFirstMessageBare + ',' + serverFirstMessage + ',' + clientFinalMessageWithoutProof;
		var clientSignature = rstr_hmac_sha1(storedKey, str2rstr_utf8(this._authMessage));
		var proof = JSJaCUtils.xor(clientKey, clientSignature);

		var clientFinalMessage = clientFinalMessageWithoutProof + ',p=' + rstr2b64(proof);

		this.oDbg.log('response: ' + clientFinalMessage, 2);
		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(clientFinalMessage) + "</response>",
				this._doSASLAuthScramSha1S2);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthScramSha1S2 = function(el) {
	if (el.nodeName != 'success') {
		this.oDbg.log('auth failed', 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var serverFinalMessage = b64decode(el.firstChild.nodeValue);
		this.oDbg.log('got success: ' + serverFinalMessage, 2);

		var data = {};
		var fields = serverFinalMessage.split(',');
		for ( var field in fields) {
			var val = fields[field].substring(2);
			data[fields[field].substring(0, 1)] = val;
		}

		var serverKey = rstr_hmac_sha1(this._saltedPassword, 'Server Key');
		var serverSignature = rstr_hmac_sha1(serverKey, str2rstr_utf8(this._authMessage));
		var verifier = b64decode_bin(data['v']);

		if (serverSignature !== verifier) {
			this.oDbg.log('server auth failed', 1);
			this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
			this.disconnect();
		} else {
			this._reInitStream(JSJaC.bind(this._doStreamBind, this));
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDigestMd5S1 = function(el) {
	if (el.nodeName != "challenge") {
		this.oDbg.log("challenge missing", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var challenge = b64decode(el.firstChild.nodeValue), index;
		this.oDbg.log("got challenge: " + challenge, 2);

		index = challenge.indexOf("nonce=\"");
		if (index !== -1) {
			this._nonce = challenge.substring(index + 7);
			this._nonce = this._nonce.substring(0, this._nonce.indexOf("\""));
			this.oDbg.log("nonce: " + this._nonce, 2);
		} else {
			this.oDbg.log("no valid nonce found, aborting", 1);
			this.disconnect();
			return;
		}

		index = challenge.indexOf("realm=\"");
		if (index !== -1) {
			this._realm = challenge.substring(index + 7);
			this._realm = this._realm.substring(0, this._realm.indexOf("\""));
		}
		this._realm = this._realm || this.domain;
		this.oDbg.log("realm: " + this._realm, 2);

		this._digest_uri = "xmpp/" + this.domain;
		this._cnonce = JSJaCUtils.cnonce(14);
		this._nc = '00000001';

		var X = this.username + ':' + this._realm + ':' + this.pass;
		var Y = rstr_md5(str2rstr_utf8(X));

		var A1 = Y + ':' + this._nonce + ':' + this._cnonce;
		if (this.authzid) {
			A1 = A1 + ':' + this.authzid;
		}
		var HA1 = rstr2hex(rstr_md5(A1));

		var A2 = 'AUTHENTICATE:' + this._digest_uri;
		var HA2 = hex_md5(A2);

		var response = hex_md5(HA1 + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + HA2);

		var rPlain = 'username="' + this.username + '",realm="' + this._realm + '",nonce="' + this._nonce + '",cnonce="' + this._cnonce + '",nc='
				+ this._nc + ',qop=auth,digest-uri="' + this._digest_uri + '",response=' + response + ',charset=utf-8';

		if (this.authzid) {
			rPlain = 'authzid="' + this.authzid + '",' + rPlain;
		}

		this.oDbg.log("response: " + rPlain, 2);

		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(rPlain) + "</response>", this._doSASLAuthDigestMd5S2);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDigestMd5S2 = function(el) {
	if (el.nodeName == 'failure') {
		if (el.xml)
			this.oDbg.log("auth error: " + el.xml, 1);
		else
			this.oDbg.log("auth error", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
		return;
	}

	var response = b64decode(el.firstChild.nodeValue);
	this.oDbg.log("response: " + response, 2);

	var rspauth = response.substring(response.indexOf("rspauth=") + 8);
	this.oDbg.log("rspauth: " + rspauth, 2);

	var X = this.username + ':' + this._realm + ':' + this.pass;
	var Y = rstr_md5(str2rstr_utf8(X));

	var A1 = Y + ':' + this._nonce + ':' + this._cnonce;
	if (this.authzid) {
		A1 = A1 + ':' + this.authzid;
	}
	var HA1 = rstr2hex(rstr_md5(A1));

	var A2 = ':' + this._digest_uri;
	var HA2 = hex_md5(A2);

	var rsptest = hex_md5(HA1 + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + HA2);
	this.oDbg.log("rsptest: " + rsptest, 2);

	if (rsptest != rspauth) {
		this.oDbg.log("SASL Digest-MD5: server repsonse with wrong rspauth", 1);
		this.disconnect();
		return;
	}

	if (el.nodeName == 'success') {
		this._reInitStream(JSJaC.bind(this._doStreamBind, this));
	} else { // some extra turn
		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'/>", this._doSASLAuthDone);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDone = function(el) {
	if (el.nodeName != 'success') {
		this.oDbg.log("auth failed", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		this._reInitStream(JSJaC.bind(this._doStreamBind, this));
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doStreamBind = function() {
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'bind_1');
	iq.appendNode("bind", {
		xmlns : NS_BIND
	}, [ [ "resource", this.resource ] ]);
	this.oDbg.log(iq.xml());
	this.send(iq, this._doXMPPSess);
};

/**
 * @private
 */
JSJaCConnection.prototype._doXMPPSess = function(iq) {
	if (iq.getType() != 'result' || iq.getType() == 'error') { // failed
		this.disconnect();
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		return;
	}

	this.fulljid = iq.getChildVal("jid");
	this.jid = this.fulljid.substring(0, this.fulljid.lastIndexOf('/'));

	iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'sess_1');
	iq.appendNode("session", {
		xmlns : NS_SESSION
	}, []);
	this.oDbg.log(iq.xml());
	this.send(iq, this._doXMPPSessDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doXMPPSessDone = function(iq) {
	if (iq.getType() != 'result' || iq.getType() == 'error') { // failed
		this.disconnect();
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		return;
	} else
		this._handleEvent('onconnect');
};

/**
 * @private
 */
JSJaCConnection.prototype._handleEvent = function(event, body) {
	event = event.toLowerCase(); // don't be case-sensitive here
	this.oDbg.log("incoming event '" + event + "'", 3);
	if (!this._events[event])
		return;
	this.oDbg.log("handling event '" + event + "'", 2);
	for (var i = 0; i < this._events[event].length; i++) {
		var aEvent = this._events[event][i];
		if (typeof aEvent.handler == 'function') {
			if (body) {
				// check ns
				if(aEvent.ns != '*' && body.ns != aEvent.ns)
					continue;
				
				// check type
				if (aEvent.type != '*' && body.type != aEvent.type)
					continue;
				this.oDbg.log(aEvent.ns + "/" + aEvent.type + " => match for handler " + aEvent.handler, 3);
				if (aEvent.handler(body)) {
					// handled!
					break;
				}
			} else if (aEvent.handler()) {
				// handled!
				break;
			}
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._handlePID = function(body) {
	if (!body.id)
		return false;

	//var jid = body.from || this.jid;
	var jid = this.jid;

	//if (body.from == this.domain)
	//	jid = this.jid;

	var id = body.id;
	if (this._regIDs[jid] && this._regIDs[jid][id]) {
		this.oDbg.log("handling id " + id, 3);
		var reg = this._regIDs[jid][id];
		if (reg.cb.call(this, body, reg.arg) === false) {
			// don't unregister
			return false;
		} else {
			delete this._regIDs[jid][id];
			return true;
		}
	} else {
		this.oDbg.log("not handling id '" + id + "' from jid " + jid, 1);
		return false;
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._handleResponse = function(req) {
	var resp = this._parseResponse(req);
	if (!resp)
		return;

	//for (var i = 0; i < resp.childNodes.length; i++) {
		if (this._sendRawCallbacks.length) {
			var cb = this._sendRawCallbacks[0];
			this._sendRawCallbacks = this._sendRawCallbacks.slice(1, this._sendRawCallbacks.length);
			cb.fn.call(this, resp, cb.arg);
			//continue;
		}
		this._inQ = this._inQ.concat(resp);
	//}
};

/**
 * @private
 */
JSJaCConnection.prototype._parseStreamFeatures = function(doc) {
	if (!doc) {
		this.oDbg.log("nothing to parse ... aborting", 1);
		return false;
	}

	var errorTag, i;
	if (doc.getElementsByTagNameNS) {
		errorTag = doc.getElementsByTagNameNS(NS_STREAM, "error").item(0);
	} else {
		var errors = doc.getElementsByTagName("error");
		for (i = 0; i < errors.length; i++)
			if (errors.item(i).namespaceURI == NS_STREAM || errors.item(i).getAttribute('xmlns') == NS_STREAM) {
				errorTag = errors.item(i);
				break;
			}
	}

	if (errorTag) {
		this._setStatus("internal_server_error");
		clearTimeout(this._timeout); // remove timer
		clearInterval(this._interval);
		clearInterval(this._inQto);
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate'));
		this._connected = false;
		this.oDbg.log("Disconnected.", 1);
		this._handleEvent('ondisconnect');
		return false;
	}

	this.mechs = {};
	var lMec1 = doc.getElementsByTagName("mechanisms");
	if (!lMec1.length)
		return false;
	this.has_sasl = false;
	for (i = 0; i < lMec1.length; i++)
		if (lMec1.item(i).getAttribute("xmlns") == NS_SASL) {
			this.has_sasl = true;
			var lMec2 = lMec1.item(i).getElementsByTagName("mechanism");
			for (var j = 0; j < lMec2.length; j++)
				this.mechs[lMec2.item(j).firstChild.nodeValue] = true;
			break;
		}
	if (this.has_sasl)
		this.oDbg.log("SASL detected", 2);
	else {
		this.oDbg.log("No support for SASL detected", 2);
		return true;
	}

	/*
	 * [TODO] check if in-band registration available check for session and bind features
	 */

	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._process = function(timerval) {
	if (!this.connected()) {
		this.oDbg.log("Connection lost ...", 1);
		if (this._interval)
			clearInterval(this._interval);
		return;
	}

	this.setPollInterval(timerval);

	if (this._timeout)
		clearTimeout(this._timeout);

	var slot = this._getFreeSlot();

	if (slot < 0)
		return;

	if (typeof (this._req[slot]) != 'undefined' && typeof (this._req[slot].r) != 'undefined' && this._req[slot].r.readyState != 4) {
		this.oDbg.log("Slot " + slot + " is not ready");
		return;
	}

	if (!this.isPolling() && this._pQueue.length === 0 && this._req[(slot + 1) % 2] && this._req[(slot + 1) % 2].r.readyState != 4) {
		this.oDbg.log("all slots busy, standby ...", 2);
		return;
	}

	if (!this.isPolling())
		this.oDbg.log("Found working slot at " + slot, 2);
	var requestPacket = this._getRequestPacket();
	if(requestPacket instanceof JumpPacket)
		this._req[slot] = this._setupJumpRequest(true);
	else
		this._req[slot] = this._setupRequest(true);

	/* setup onload handler for async send */
	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		if (!this.connected())
			return;
		if (this._req[slot].r.readyState == 4) {
			this.oDbg.log("async recv: " + this._req[slot].r.responseText, 4);
			this._handleResponse(this._req[slot]);
			// schedule next tick
			this._setStatus('processing');
			if (this._pQueue.length) {
				this._timeout = setTimeout(JSJaC.bind(this._process, this), 100);
			} else {
				this.oDbg.log("scheduling next poll in " + this.getPollInterval() + " msec", 4);
				this._timeout = setTimeout(JSJaC.bind(this._process, this), this.getPollInterval());
			}
		}
	}, this);

	try {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			if (!this.connected())
				return;
			this._errcnt++;
			this.oDbg.log('XmlHttpRequest error (' + this._errcnt + ')', 1);
			if (this._errcnt > JSJAC_ERR_COUNT) {
				// abort
				this._abort();
				return;
			}

			this._setStatus('onerror_fallback');

			// schedule next tick
			setTimeout(JSJaC.bind(this._repeat, this), JSJAC_RETRYDELAY);
			return;
		}, this);
	} catch (e) {
		// well ... no onerror property available, maybe we
		// can catch the error somewhere else ...
	}

	

	if (typeof (this._rid) != 'undefined') // remember request id if any
		this._req[slot].rid = this._rid;
	if(requestPacket instanceof JumpPacket)
		this._buildAndSend(requestPacket, this._req[slot].r);
	else 
		this._req[slot].r.send(requestPacket && requestPacket.xml ?  requestPacket.xml : this._getRequestString());
	//this.oDbg.log("sending: " + reqstr, 4);
	//this._req[slot].r.send(reqstr);
};

/**
 * @private
 * @param {JSJaCPacket} packet The packet to be sent.
 * @param {function} cb The callback to be called when response is received.
 * @param {any} arg Optional arguments to be passed to 'cb' when executing it.
 * @return Whether registering an ID was successful
 * @type boolean
 */
JSJaCConnection.prototype._registerPID = function(packet, cb, arg) {
	this.oDbg.log("registering id for packet " + JSON.stringify(packet.content), 3);
	var id = packet.content.id;
	if (!id) {
		this.oDbg.log("id missing", 1);
		return false;
	}

	if (typeof cb != 'function') {
		this.oDbg.log("callback is not a function", 1);
		return false;
	}

	// var jid = packet.content.to || this.jid;
	var jid = this.jid;

	// if (packet.content.to == this.domain)
	//	jid = this.jid;

	if (!this._regIDs[jid]) {
		this._regIDs[jid] = {};
	}

	if (this._regIDs[jid][id] != null) {
		this.oDbg.log("id already registered: " + id, 1);
		return false;
	}
	this._regIDs[jid][id] = {
		cb : cb,
		arg : arg,
		ts : JSJaCUtils.now()
	};
	this.oDbg.log("registered id " + id, 3);
	this._cleanupRegisteredPIDs();
	return true;
};

JSJaCConnection.prototype._cleanupRegisteredPIDs = function() {
	var now = Date.now();
	for ( var jid in this._regIDs) {
		if (this._regIDs.hasOwnProperty(jid)) {
			for ( var id in this._regIDs[jid]) {
				if (this._regIDs[jid].hasOwnProperty(id)) {
					if (this._regIDs[jid][id].ts + JSJAC_REGID_TIMEOUT < now) {
						this.oDbg.log("deleting registered id '" + id + "' due to timeout", 1);
						delete this._regIDs[jid][id];
					}
				}
			}
		}
	}
};

/**
 * Partial function binding sendEmpty to callback
 * 
 * @private
 */
JSJaCConnection.prototype._prepSendEmpty = function(cb, ctx) {
	return function() {
		ctx._sendEmpty(JSJaC.bind(cb, ctx));
	};
};

/**
 * send empty request waiting for stream id to be able to proceed with authentication
 * 
 * @private
 */
JSJaCConnection.prototype._sendEmpty = function(cb) {
	var slot = this._getFreeSlot();
	this._req[slot] = this._setupRequest(true);

	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		if (this._req[slot].r.readyState == 4) {
			this.oDbg.log("async recv: " + this._req[slot].r.responseText, 4);
			cb(this._req[slot].r); // handle response
		}
	}, this);

	if (typeof (this._req[slot].r.onerror) != 'undefined') {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			this.oDbg.log('XmlHttpRequest error', 1);
		}, this);
	}

	var reqstr = this._getRequestString();
	this.oDbg.log("sending: " + reqstr, 4);
	this._req[slot].r.send(reqstr);
};

/**
 * @private
 * 
 * @param jumpPacket
 * @param cb
 * @param arg
 */
JSJaCConnection.prototype._sendJumpPacket = function(jumpPacket, cb, arg) {
	if (cb)
		this._sendRawCallbacks.push({
			fn : cb,
			arg : arg
		});
	
	this._pQueue.push(jumpPacket);
	this._process();
	
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._sendRaw = function(xml, cb, arg) {
	if (cb)
		this._sendRawCallbacks.push({
			fn : cb,
			arg : arg
		});

	this._pQueue.push(xml);
	this._process();

	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._setStatus = function(status) {
	if (!status || status === '')
		return;
	if (status != this._status) { // status changed!
		this._status = status;
		this._handleEvent('onstatuschanged', status);
		this._handleEvent('status_changed', status);
	}
};

JSJaCConnection.prototype._buildAndSend = function(jumpPacket, r) {
	var bodyArr = null;
	var hasNoContent = jumpPacket.content == null || typeof jumpPacket.content == 'undefined';
	var jsonStr = JSON.stringify(jumpPacket.content);
	bodyArr = this._stringToBytes(jsonStr);
	var headerArr = new Uint8Array(PACKET_HEADER_SIZE);
	headerArr.set(this._numToBytes(jumpPacket.sFrame, PACKET_STRUCT.CONSOLE_FRAME.SIZE), 	PACKET_STRUCT.CONSOLE_FRAME.START);
	headerArr.set(this._numToBytes(jumpPacket.opcode, PACKET_STRUCT.OPCODE.SIZE), 		PACKET_STRUCT.OPCODE.START);
	if(hasNoContent) {
		headerArr.set(this._numToBytes(0,PACKET_STRUCT.PACKET_LEN.SIZE), 	PACKET_STRUCT.PACKET_LEN.START);
	}
	else {
		headerArr.set(this._numToBytes(bodyArr.length,PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
	}
	headerArr.set(this._numToBytes(jumpPacket.version,PACKET_STRUCT.VERSION.SIZE), 		PACKET_STRUCT.VERSION.START);
	headerArr.set(this._numToBytes(jumpPacket.seqId, 	PACKET_STRUCT.SEQ_ID.SIZE), 		PACKET_STRUCT.SEQ_ID.START);
	
	var sendArr;
	if(hasNoContent) {
		sendArr = headerArr;
	}
	else {
		sendArr = this._concatUint8Array(headerArr, new Uint8Array(bodyArr));
	}
	var sendA = sendArr.subarray(0, sendArr.byteLength),
		str = arr2b64(sendA);
	r.send(str);
};

/**
 * 指定包是否可以执行回调
 * @param jumpPacket
 */
JSJaCConnection.prototype._validateCallbackable = function(jumpPacket) {
	return this._isIQPacket(jumpPacket.opcode) || this._isMessagePacket(jumpPacket.opcode) || this._isPresencePacket(jumpPacket.opcode);
};

JSJaCConnection.prototype._isMessagePacket = function(opcode) {
	return opcode >= OPCODE.MESSAGE_RANGE.START && opcode < OPCODE.MESSAGE_RANGE.END;
};

JSJaCConnection.prototype._isIQPacket = function(opcode) {
	return opcode >= OPCODE.IQ_RANGE.START && opcode < OPCODE.IQ_RANGE.END;
};

JSJaCConnection.prototype._isPresencePacket = function(opcode) {
	return opcode >= OPCODE.PRESENCE_RANGE.START && opcode < OPCODE.PRESENCE_RANGE.END;
};

/**
 * 合并
 * @param array1
 * @param array2
 * @returns {Uint8Array}
 */
JSJaCConnection.prototype._concatUint8Array = function(array1, array2) {
    var result = new Uint8Array(array1.length + array2.length);
    result.set(array1, 0);
    result.set(array2, array1.length);
    return result;
};

/**
 * num转为长度为size的字节数组
 * @param num
 * @param size
 * @returns {Uint8Array}
 */
JSJaCConnection.prototype._numToBytes = function(num, size) {
    var bytes = new Uint8Array(size);
    var i = size;
    do {
        bytes[--i] = num & (0xff);
        num = num >> 8;
    } while (i);

    return bytes;
};

/**
 * Uint8Array类型的数组转为String
 * @param array
 * @returns
 */
JSJaCConnection.prototype._uint8ArrayToString = function(array) {
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length;
	i = 0;
	while (i < len) {
		c = array[i++];
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out += String.fromCharCode(c);
			break;
		case 12:
		case 13:
			// 110x xxxx 10xx xxxx
			char2 = array[i++];
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out += String.fromCharCode(((c & 0x0F) << 12)
					| ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break;
		}
	}

	return out;
};

/**
 * 转为int
 * 
 * @param x
 * @returns {Number}
 */
JSJaCConnection.prototype._bytesToInteger = function(x) {
	var val = 0;
	for (var i = 0; i < x.length; ++i) {
		val += x[i];
		if (i < x.length - 1) {
			val = val << 8;
		}
	}
	return val;
};

/**
 * 转string为byte[], 主要解决中文乱码问题
 * @param str
 * @returns {Array}
 */
JSJaCConnection.prototype._stringToBytes = function(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
};

JSJaCConnection.prototype._getAuthPacket = function() {
	return new JumpPacket({
		usr : this.username,
		atk : this.pass,
		br : this.resource
	}, OPCODE.AUTH.SEND);
};
/**
 * @fileOverview Contains Debugger interface for Firebug and Safari
 */

/*exported JSJaCConsoleLogger */
/*global console */

/**
 * A logger that logs using the 'console' object.
 * @constructor
 * @class Implementation of the Debugger interface for 
 * {@link http://www.getfirebug.com/ | Firebug} and Safari.
 * Creates a new debug logger to be passed to jsjac's connection
 * constructor. Of course you can use it for debugging in your code
 * too.
 * @extends {JSJaCDebugger}
 * @author Stefan Strigler steve@zeank.in-berlin.de
 * @param {int} level The maximum level for debugging messages to be
 * displayed. Thus you can tweak the verbosity of the logger. A value
 * of 0 means very low traffic whilst a value of 4 makes logging very
 * verbose about what's going on.
 */
function JSJaCConsoleLogger(level) {
  /**
   * @private
   */
  this.level = level || 4;

  /**
   * Empty function for API compatibility
   */
  this.start = function() {};
  /**
   * Logs a message to firebug's/safari's console
   * @param {String} msg The message to be logged.
   * @param {int} level The message's verbosity level. Importance is
   * from 0 (very important) to 4 (not so important). A value of 1
   * denotes an error in the usual protocol flow.
   */
  this.log = function(msg, level) {
    level = level || 0;
    if (level > this.level)
      return;
    if (typeof(console) == 'undefined')
      return;
    try {
      switch (level) {
      case 0:
        console.warn(msg);
        break;
      case 1:
        console.error(msg);
        break;
      case 2:
        console.info(msg);
        break;
      case 4:
        console.debug(msg);
        break;
      default:
        console.log(msg);
        break;
      }
    } catch(e1) { try { console.log(msg); } catch(e2) {} }
  };

  /**
   * Sets verbosity level.
   * @param {int} level The maximum level for debugging messages to be
   * displayed. Thus you can tweak the verbosity of the logger. A
   * value of 0 means very low traffic whilst a value of 4 makes
   * logging very verbose about what's going on.
   * @return This debug logger
   * @type ConsoleLogger
   */
  this.setLevel = function(level) { this.level = level; return this; };
  /**
   * Gets verbosity level.
   * @return {int} The level
   */
  this.getLevel = function() { return this.level; };
}

/*jshint unused: false */
var NS_ORGANIZATION = "http://jabber.org/protocol/org"
var NS_DISCO_ITEMS =  "http://jabber.org/protocol/disco#items";
var NS_DISCO_INFO =   "http://jabber.org/protocol/disco#info";
var NS_VCARD =        "vcard-temp";
var NS_VCARD_UPDATE = "vcard-temp:x:update";
var NS_AUTH =         "jabber:iq:auth";
var NS_AUTH_ERROR =   "jabber:iq:auth:error";
var NS_REGISTER =     "jabber:iq:register";
var NS_SEARCH =       "jabber:iq:search";
var NS_ROSTER =       "jabber:iq:roster";
var NS_PUBACCOUNT =   "jabber:iq:pubaccount";
var NS_PRIVACY =      "jabber:iq:privacy";
var NS_PRIVATE =      "jabber:iq:private";
var NS_VERSION =      "jabber:iq:version";
var NS_TIME =         "jabber:iq:time";
var NS_TIME_NEW =     "urn:xmpp:time";
var NS_LAST =         "jabber:iq:last";
var NS_XDATA =        "jabber:x:data";
var NS_IQDATA =       "jabber:iq:data";
var NS_DELAY =        "jabber:x:delay";
var NS_DELAY_NEW =    "urn:xmpp:delay";
var NS_RECEIPTS =	  "urn:xmpp:receipts"; 		
var NS_EXPIRE =       "jabber:x:expire";
var NS_EVENT =        "jabber:x:event";
var NS_XCONFERENCE =  "jabber:x:conference";
var NS_PING =         "urn:xmpp:ping";
var NS_BOOKSMARKS =   "storage:bookmarks";
var NS_FORWARD_0 =    "urn:xmpp:forward:0";
var NS_CARBONS_2 =    "urn:xmpp:carbons:2";
var NS_CHAT_STATES =  "http://jabber.org/protocol/chatstates";
var NS_STATS =        "http://jabber.org/protocol/stats";
var NS_MUC =          "http://jabber.org/protocol/muc";
var NS_MUC_USER =     "http://jabber.org/protocol/muc#user";
var NS_MUC_ADMIN =    "http://jabber.org/protocol/muc#admin";
var NS_MUC_OWNER =    "http://jabber.org/protocol/muc#owner";
var NS_PUBSUB =       "http://jabber.org/protocol/pubsub";
var NS_PUBSUB_EVENT = "http://jabber.org/protocol/pubsub#event";
var NS_PUBSUB_OWNER = "http://jabber.org/protocol/pubsub#owner";
var NS_PUBSUB_ERRORS ="http://jabber.org/protocol/pubsub#errors";
var NS_PUBSUB_NMI =   "http://jabber.org/protocol/pubsub#node-meta-info";
var NS_COMMANDS =     "http://jabber.org/protocol/commands";
var NS_CAPS =         "http://jabber.org/protocol/caps";
var NS_STREAM =       "http://etherx.jabber.org/streams";
var NS_CLIENT =       "jabber:client";

var NS_BOSH =         "http://jabber.org/protocol/httpbind";
var NS_XBOSH =        "urn:xmpp:xbosh";

var NS_STANZAS =      "urn:ietf:params:xml:ns:xmpp-stanzas";
var NS_STREAMS =      "urn:ietf:params:xml:ns:xmpp-streams";

var NS_TLS =          "urn:ietf:params:xml:ns:xmpp-tls";
var NS_SASL =         "urn:ietf:params:xml:ns:xmpp-sasl";
var NS_SESSION =      "urn:ietf:params:xml:ns:xmpp-session";
var NS_BIND =         "urn:ietf:params:xml:ns:xmpp-bind";

var NS_FEATURE_IQAUTH = "http://jabber.org/features/iq-auth";
var NS_FEATURE_IQREGISTER = "http://jabber.org/features/iq-register";
var NS_FEATURE_COMPRESS = "http://jabber.org/features/compress";

var NS_COMPRESS =     "http://jabber.org/protocol/compress";

function STANZA_ERROR(code, type, cond) {
  if (window == this)
    return new STANZA_ERROR(code, type, cond);

  this.code = code;
  this.type = type;
  this.cond = cond;
}

var ERR_BAD_REQUEST =
        STANZA_ERROR("400", "modify", "bad-request");
var ERR_CONFLICT =
        STANZA_ERROR("409", "cancel", "conflict");
var ERR_FEATURE_NOT_IMPLEMENTED =
        STANZA_ERROR("501", "cancel", "feature-not-implemented");
var ERR_FORBIDDEN =
        STANZA_ERROR("403", "auth",   "forbidden");
var ERR_GONE =
        STANZA_ERROR("302", "modify", "gone");
var ERR_INTERNAL_SERVER_ERROR =
        STANZA_ERROR("500", "wait",   "internal-server-error");
var ERR_ITEM_NOT_FOUND =
        STANZA_ERROR("404", "cancel", "item-not-found");
var ERR_JID_MALFORMED =
        STANZA_ERROR("400", "modify", "jid-malformed");
var ERR_NOT_ACCEPTABLE =
        STANZA_ERROR("406", "modify", "not-acceptable");
var ERR_NOT_ALLOWED =
        STANZA_ERROR("405", "cancel", "not-allowed");
var ERR_NOT_AUTHORIZED =
        STANZA_ERROR("401", "auth",   "not-authorized");
var ERR_PAYMENT_REQUIRED =
        STANZA_ERROR("402", "auth",   "payment-required");
var ERR_RECIPIENT_UNAVAILABLE =
        STANZA_ERROR("404", "wait",   "recipient-unavailable");
var ERR_REDIRECT =
        STANZA_ERROR("302", "modify", "redirect");
var ERR_REGISTRATION_REQUIRED =
        STANZA_ERROR("407", "auth",   "registration-required");
var ERR_REMOTE_SERVER_NOT_FOUND =
        STANZA_ERROR("404", "cancel", "remote-server-not-found");
var ERR_REMOTE_SERVER_TIMEOUT =
        STANZA_ERROR("504", "wait",   "remote-server-timeout");
var ERR_RESOURCE_CONSTRAINT =
        STANZA_ERROR("500", "wait",   "resource-constraint");
var ERR_SERVICE_UNAVAILABLE =
        STANZA_ERROR("503", "cancel", "service-unavailable");
var ERR_SUBSCRIPTION_REQUIRED =
        STANZA_ERROR("407", "auth",   "subscription-required");
var ERR_UNEXPECTED_REQUEST =
        STANZA_ERROR("400", "wait",   "unexpected-request");

/**
 * @fileoverview OO interface to handle cookies.
 * Taken from {@link http://www.quirksmode.org/js/cookies.html}.
 * Regarding licensing of this code the author states:
 *
 * "You may copy, tweak, rewrite, sell or lease any code example on
 * this site, with one single exception."
 *
 * @author 2003-2006 Peter-Paul Koch
 * @author Stefan Strigler
 */

/*exported JSJaCCookieException, JSJaCCookie */

/**
 * Some exception denoted to dealing with cookies
 * @constructor
 * @param {String} msg The message to pass to the exception
 */
function JSJaCCookieException(msg) {
  this.message = msg;
  this.name = "CookieException";
}

/**
 * Creates a new Cookie
 * @class Class representing browser cookies for storing small amounts of data
 * @constructor
 * @param {String} name   The name of the value to store
 * @param {String} value  The value to store
 * @param {int}    secs   Number of seconds until cookie expires (may be empty)
 * @param {String} domain The domain for the cookie
 * @param {String} path   The path of cookie
 */
function JSJaCCookie(name,value,secs,domain,path)
{
  if (window == this)
    return new JSJaCCookie(name, value, secs, domain, path);

  /**
   * This cookie's name
   * @type String
   */
  this.name = name;
  /**
   * This cookie's value
   * @type String
   */
  this.value = value;
  /**
   * Time in seconds when cookie expires (thus being delete by
   * browser). A value of -1 denotes a session cookie which means that
   * stored data gets lost when browser is being closed.
   * @type int
   */
  this.secs = secs;

  /**
   * The cookie's domain
   * @type string
   */
  this.domain = domain;

  /**
   * The cookie's path
   * @type string
   */
  this.path = path;

  /**
   * Stores this cookie
   */
  this.write = function() {
    var expires;
    if (this.secs) {
      var date = new Date();
      date.setTime(date.getTime()+(this.secs*1000));
      expires = "; expires="+date.toGMTString();
    } else
      expires = "";
    var domain = this.domain?"; domain="+this.domain:"";
    var path = this.path?"; path="+this.path:"; path=/";
    document.cookie = this.getName()+"="+JSJaCCookie._escape(this.getValue())+
      expires+
      domain+
      path;
  };

  /**
   * Deletes this cookie
   */
  this.erase = function() {
    var c = new JSJaCCookie(this.getName(),"",-1);
    c.write();
  };

  /**
   * Gets the name of this cookie
   * @return The name
   * @type String
   */
  this.getName = function() {
    return this.name;
  };

  /**
   * Sets the name of this cookie
   * @param {String} name The name for this cookie
   * @return This cookie
   * @type Cookie
   */
  this.setName = function(name) {
    this.name = name;
    return this;
  };

  /**
   * Gets the value of this cookie
   * @return The value
   * @type String
   */
  this.getValue = function() {
    return this.value;
  };

  /**
   * Sets the value of this cookie
   * @param {String} value The value for this cookie
   * @return This cookie
   * @type Cookie
   */
  this.setValue = function(value) {
    this.value = value;
    return this;
  };

  /**
   * Sets the domain of this cookie
   * @param {String} domain The value for the domain of the cookie
   * @return This cookie
   * @type Cookie
   */
  this.setDomain = function(domain) {
    this.domain = domain;
    return this;
  };

  /**
   * Sets the path of this cookie
   * @param {String} path The value of the path of the cookie
   * @return This cookie
   * @type Cookie
   */
  this.setPath = function(path) {
    this.path = path;
    return this;
  };
}

/**
 * Reads the value for given <code>name</code> from cookies and return new
 * <code>Cookie</code> object
 * @param {String} name The name of the cookie to read
 * @return A cookie object of the given name
 * @type Cookie
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.read = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0)
      return new JSJaCCookie(
        name,
        JSJaCCookie._unescape(c.substring(nameEQ.length,c.length)));
  }
  throw new JSJaCCookieException("Cookie not found");
};

/**
 * Reads the value for given <code>name</code> from cookies and returns
 * its valued new
 * @param {String} name The name of the cookie to read
 * @return The value of the cookie read
 * @type String
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.get = function(name) {
  return JSJaCCookie.read(name).getValue();
};

/**
 * Deletes cookie with given <code>name</code>
 * @param {String} name The name of the cookie to delete
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.remove = function(name) {
  JSJaCCookie.read(name).erase();
};

/**
 * @private
 */
JSJaCCookie._escape = function(str) {
  return str.replace(/;/g, "%3AB");
};

/**
 * @private
 */
JSJaCCookie._unescape = function(str) {
  return str.replace(/%3AB/g, ";");
};

/*exported JSJaCDebugger */
/*jshint unused: false */

/**
 * Interface debuggers (loggers) have to implement in order to be used by JSJaC for debugging.
 * @constructor
 */
function JSJaCDebugger() {}

/**
 * Log a message.
 * @param {string} message The message to be logged.
 * @param {int} [level] The loglevel of the message to be logged. 
 */
JSJaCDebugger.prototype.log = function(message, level) {};
/*exported JSJaCError */

/**
 * an error packet for internal use
 * @private
 * @constructor
 */
function JSJaCError(code,type,condition) {
  var xmldoc = XmlDocument.create("error","jsjac");

  xmldoc.documentElement.setAttribute('code',code);
  xmldoc.documentElement.setAttribute('type',type);
  if (condition)
    xmldoc.documentElement.appendChild(xmldoc.createElement(condition)).
      setAttribute('xmlns', NS_STANZAS);
  return xmldoc.documentElement;
}

/**
 * @fileoverview All stuff related to HTTP Binding
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCHttpBindingConnection */

/**
 * Instantiates a BOSH session connection.
 * @class Implementation of {@link http://xmpp.org/extensions/xep-0206.html | XMPP Over BOSH}
 * formerly known as HTTP Binding.
 * @constructor
 * @extends {JSJaCConnection}
 * @param {Object} oArg Configurational object for this connection.
 * @param {string} oArg.httpbase The connection endpoint of the HTTP service to talk to.
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 * @param {int} [oArg.timerval] The polling interval.
 * @param {string} [oArg.cookie_prefix] Prefix to cookie names used when suspending.
 * @param {int} [oArg.wait] The 'wait' attribute of BOSH connections.
 */
function JSJaCHttpBindingConnection(oArg) {
  /**
   * @ignore
   */
  this.base = JSJaCConnection;
  this.base(oArg);

  // member vars
  /**
   * @private
   */
  this._hold = JSJACHBC_MAX_HOLD;
  /**
   * @private
   */
  this._inactivity = 0;
  /**
   * @private
   */
  this._last_requests = {}; // 'hash' storing hold+1 last requests
  /**
   * @private
   */
  this._last_rid = 0;                 // I know what you did last summer
  /**
   * @private
   */
  this._min_polling = 0;
  /**
   * @private
   */
  this._pause = 0;
  /**
   * @private
   */
  this._wait = oArg.wait || JSJACHBC_MAX_WAIT;
  
  (function() {
	  try {
	    var a = new Uint8Array(1);
	    return; //no need
	  } catch(e) { }

	  function subarray(start, end) {
	    return this.slice(start, end);
	  }

	  function set_(array, offset) {
	    if (arguments.length < 2) offset = 0;
	    for (var i = 0, n = array.length; i < n; ++i, ++offset)
	      this[offset] = array[i] & 0xFF;
	  }

	  // we need typed arrays
	  function TypedArray(arg1) {
	    var result;
	    if (typeof arg1 === "number") {
	       result = new Array(arg1);
	       for (var i = 0; i < arg1; ++i)
	         result[i] = 0;
	    } else
	       result = arg1.slice(0);
	    result.subarray = subarray;
	    result.buffer = result;
	    result.byteLength = result.length;
	    result.set = set_;
	    if (typeof arg1 === "object" && arg1.buffer)
	      result.buffer = arg1.buffer;

	    return result;
	  }

	  window.Uint8Array = TypedArray;
	  window.Uint32Array = TypedArray;
	  window.Int32Array = TypedArray;
	})();
}
JSJaCHttpBindingConnection.prototype = new JSJaCConnection();

/**
 * Inherit an instantiated HTTP Binding session
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.jid The full jid of the entity this session is connected with. Either provide this or 'domain', 'username' and 'resource'.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.sid The BOSH session id.
 * @param {int} oArg.rid The BOSH request id.
 * @param {int} oArg.polling The BOSH polling attribute.
 * @param {int} oArg.inactivity The BOSH inactivity attribute.
 * @param {int} oArg.requests The BOSH requests attribute.
 * @param {int} [oArg.wait] The BOSH wait attribute.
 */
JSJaCHttpBindingConnection.prototype.inherit = function(oArg) {
  if (oArg.jid) {
    var oJid = new JSJaCJID(oArg.jid);
    this.domain = oJid.getDomain();
    this.username = oJid.getNode();
    this.resource = oJid.getResource();
  } else {
    this.domain = oArg.domain || 'localhost';
    this.username = oArg.username;
    this.resource = oArg.resource;
  }
  this._sid = oArg.sid;
  this._rid = oArg.rid;
  this._min_polling = oArg.polling;
  this._inactivity = oArg.inactivity;
  this._setHold(oArg.requests-1);
  this.setPollInterval(this._timerval);

  if (oArg.wait)
    this._wait = oArg.wait;

  this._connected = true;

  this._handleEvent('onconnect');

  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);
  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);
  this._timeout = setTimeout(JSJaC.bind(this._process, this),
                             this.getPollInterval());
};

/**
 * Sets poll interval
 * @param {int} timerval the interval in seconds
 */
JSJaCHttpBindingConnection.prototype.setPollInterval = function(timerval) {
  if (timerval && !isNaN(timerval)) {
    if (!this.isPolling())
      this._timerval = 100;
    else if (this._min_polling && timerval < this._min_polling*1000)
      this._timerval = this._min_polling*1000;
    else if (this._inactivity && timerval > this._inactivity*1000)
      this._timerval = this._inactivity*1000;
    else
      this._timerval = timerval;
  }
  return this._timerval;
};

/**
 * whether this session is in polling mode
 * @type boolean
 */
JSJaCHttpBindingConnection.prototype.isPolling = function() { return (this._hold === 0); };

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getFreeSlot = function() {
  for (var i=0; i<this._hold+1; i++)
    if (typeof(this._req[i]) == 'undefined' || typeof(this._req[i].r) == 'undefined' || this._req[i].r.readyState == 4)
      return i;
  return -1; // nothing found
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getHold = function() { return this._hold; };

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getRequestPacket = function(raw, last) {
	var jumpPacket;
	if (this._rid < this._last_rid && typeof(this._last_requests[this._rid]) != 'undefined') // repeat!
		jumpPacket = this._last_requests[this._rid];
	else { // grab from queue
	    if (this._pQueue.length) {
	    	jumpPacket = this._pQueue[0];
	        this._pQueue = this._pQueue.slice(1,this._pQueue.length);
		}
	    this._last_requests[this._rid] = {};
	    this._last_requests[this._rid] = jumpPacket;
	    this._last_rid = this._rid;

	    for (var i in this._last_requests)
	      if (this._last_requests.hasOwnProperty(i) &&
	          i < this._rid-this._hold)
	        delete(this._last_requests[i]); // truncate
	}
	
	return jumpPacket;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getRequestString = function(raw, last) {
  raw = raw || '';
  var reqstr = '';

  // check if we're repeating a request

  if (this._rid <= this._last_rid && typeof(this._last_requests[this._rid]) != 'undefined') // repeat!
    reqstr = this._last_requests[this._rid].xml;
  else { // grab from queue
    var xml = '';
    while (this._pQueue.length) {
      var curNode = this._pQueue[0];
      xml += curNode;
      this._pQueue = this._pQueue.slice(1,this._pQueue.length);
    }

    reqstr = "<body rid='"+this._rid+"' sid='"+this._sid+"' xmlns='http://jabber.org/protocol/httpbind'";
    if (JSJAC_HAVEKEYS) {
      reqstr += " key='"+this._keys.getKey()+"'";
      if (this._keys.lastKey()) {
        this._keys = new JSJaCKeys(hex_sha1,this.oDbg);
        reqstr += " newkey='"+this._keys.getKey()+"'";
      }
    }
    if (last)
      reqstr += " type='terminate'";
    else if (this._reinit) {
      if (JSJACHBC_USE_BOSH_VER)
        reqstr += " xml:lang='"+this._xmllang+"' xmpp:restart='true' xmlns:xmpp='urn:xmpp:xbosh' to='"+this.domain+"'";
      this._reinit = false;
    }

    if (xml !== '' || raw !== '') {
      reqstr += ">" + raw + xml + "</body>";
    } else {
      reqstr += "/>";
    }

    this._last_requests[this._rid] = {};
    this._last_requests[this._rid].xml = reqstr;
    this._last_rid = this._rid;

    for (var i in this._last_requests)
      if (this._last_requests.hasOwnProperty(i) &&
          i < this._rid-this._hold)
        delete(this._last_requests[i]); // truncate
  }

  return reqstr;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getInitialRequestString = function() {
  var reqstr = "<body content='text/xml; charset=utf-8' hold='"+this._hold+"' xmlns='http://jabber.org/protocol/httpbind' to='"+this.authhost+"' wait='"+this._wait+"' rid='"+this._rid+"'";
  if (this.host && this.port)
    reqstr += " route='xmpp:"+this.host+":"+this.port+"'";
  if (JSJAC_HAVEKEYS) {
    this._keys = new JSJaCKeys(hex_sha1,this.oDbg); // generate first set of keys
    var key = this._keys.getKey();
    reqstr += " newkey='"+key+"'";
  }
  reqstr += " xml:lang='"+this._xmllang + "'";

  if (JSJACHBC_USE_BOSH_VER) {
    reqstr += " ver='" + JSJACHBC_BOSH_VERSION + "'";
    reqstr += " xmlns:xmpp='urn:xmpp:xbosh'";
    if (this.authtype == 'sasl' || this.authtype == 'saslanon')
      reqstr += " xmpp:version='1.0'";
  }
  reqstr += "/>";
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getStreamID = function(req) {

  this.oDbg.log(req.responseText,4);

  if (!req.responseXML || !req.responseXML.documentElement) {
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }
  var body = req.responseXML.documentElement;

  // any session error?
  if(body.getAttribute('type') == 'terminate') {
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }

  // extract stream id used for non-SASL authentication
  if (body.getAttribute('authid')) {
    this.streamid = body.getAttribute('authid');
    this.oDbg.log("got streamid: "+this.streamid,2);
  }

  if (!this._parseStreamFeatures(body)) {
      this._sendEmpty(JSJaC.bind(this._getStreamID, this));
      return;
  }

  this._timeout = setTimeout(JSJaC.bind(this._process, this),
                             this.getPollInterval());

  if (this.register)
    this._doInBandReg();
  else
    this._doAuth();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getSuspendVars = function() {
  return ('host,port,_rid,_last_rid,_wait,_min_polling,_inactivity,_hold,_last_requests,_pause').split(',');
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._handleInitialResponse = function(req) {
  try {
    // This will throw an error on Mozilla when the connection was refused
    this.oDbg.log(req.getAllResponseHeaders(),4);
    this.oDbg.log(req.responseText,4);
  } catch(ex) {
    this.oDbg.log("No response",4);
  }

  if (req.status != 200 || !req.responseXML) {
    this.oDbg.log("initial response broken (status: "+req.status+")",1);
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }
  var body = req.responseXML.documentElement;

  if (!body || body.tagName != 'body' || body.namespaceURI != NS_BOSH) {
    this.oDbg.log("no body element or incorrect body in initial response",1);
    this._handleEvent("onerror",JSJaCError("500","wait","internal-service-error"));
    return;
  }

  // Check for errors from the server
  if (body.getAttribute("type") == "terminate") {
    this.oDbg.log("invalid response:\n" + req.responseText,1);
    clearTimeout(this._timeout); // remove timer
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }

  // get session ID
  this._sid = body.getAttribute('sid');
  this.oDbg.log("got sid: "+this._sid,2);

  // get attributes from response body
  if (body.getAttribute('polling'))
    this._min_polling = body.getAttribute('polling');

  if (body.getAttribute('inactivity'))
    this._inactivity = body.getAttribute('inactivity');

  if (body.getAttribute('requests'))
    this._setHold(body.getAttribute('requests')-1);
  this.oDbg.log("set hold to " + this._getHold(),2);

  if (body.getAttribute('ver'))
    this._bosh_version = body.getAttribute('ver');

  if (body.getAttribute('maxpause'))
    this._pause = Number.min(body.getAttribute('maxpause'), JSJACHBC_MAXPAUSE);

  // must be done after response attributes have been collected
  this.setPollInterval(this._timerval);

  /* start sending from queue for not polling connections */
  this._connected = true;

  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);
  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);

  /* wait for initial stream response to extract streamid needed
   * for digest auth
   */
  this._getStreamID(req);
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._parseResponse = function(req) {
    if (!this.connected() || !req)
        return null;

    var r = req.r; // the XmlHttpRequest

    try {
        if (r.status == 404 || r.status == 403) {
            // connection manager killed session
            this._abort();
            return null;
        }

        if (r.status != 200 || (!r.responseText && r.responseText != '')) {
            this._errcnt++;
            var errmsg = "invalid response ("+r.status+"):\n" + r.getAllResponseHeaders()+"\n"+r.responseText;
            if (!r.responseXML)
                errmsg += "\nResponse failed to parse!";
            this.oDbg.log(errmsg,1);
            if (this._errcnt > JSJAC_ERR_COUNT) {
                // abort
                this._abort();
                return null;
            }

            if (this.connected()) {
                this.oDbg.log("repeating ("+this._errcnt+")",1);
                this._setStatus('proto_error_fallback');

                // schedule next tick
                setTimeout(JSJaC.bind(this._repeat, this),
                           this.getPollInterval());
            }

            return null;
        }
    } catch (e) {
        this.oDbg.log("XMLHttpRequest error: status not available", 1);
        this._errcnt++;
        if (this._errcnt > JSJAC_ERR_COUNT) {
            // abort
            this._abort();
        } else {
            if (this.connected()) {
                this.oDbg.log("repeating ("+this._errcnt+")",1);
                this._setStatus('proto_error_fallback');
                // schedule next tick
                setTimeout(JSJaC.bind(this._repeat, this),
                           this.getPollInterval());
            }
        }
        return null;
    }
	var resp = r.responseText[0] == '<'? r.responseText : b64decode(r.responseText), header = [], i = 0, size = resp.length;
	for(; i < PACKET_HEADER_SIZE && PACKET_HEADER_SIZE <= size; i++) {
		header[i] = resp.charCodeAt(i);
	}
	var headerArr = new Uint8Array(header),
		opcodeArr = headerArr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END),
		event = OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr)),
		bodyStr = resp.slice(PACKET_HEADER_SIZE);
	
	//wsConn._parseUint8Array(opcodeArr, bodyArr);
    
    /*
	var body = r.responseXML.documentElement;
    if (!body || body.tagName != 'body' || body.namespaceURI != NS_BOSH) {
        this.oDbg.log("invalid response:\n" + r.responseText,1);

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);

        this._connected = false;
        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');

        this._setStatus('internal_server_error');
        this._handleEvent('onerror',
                          JSJaCError('500','wait','internal-server-error'));

        return null;
    }
	*/
    if (typeof(req.rid) != 'undefined' && this._last_requests[req.rid]) {
        if (this._last_requests[req.rid].handled) {
            this.oDbg.log("already handled "+req.rid,2);
            return null;
        } else
            this._last_requests[req.rid].handled = true;
    }
    /*
    // Check for errors from the server
    if (body.getAttribute("type") == "terminate") {
        // read condition
        var condition = body.getAttribute('condition');

        this.oDbg.log("session terminated:\n" + r.responseText,1);

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);

        try {
            JSJaCCookie.read(this._cookie_prefix+'JSJaC_State').erase();
        } catch (e) {}

        this._connected = false;

        if (condition == "remote-stream-error") {
            if (body.getElementsByTagName("conflict").length > 0)
                this._setStatus("session-terminate-conflict");
            else
                this._setStatus('terminated');
        } else {
            this._setStatus('terminated');
        }
        if (condition === null)
            condition = 'session-terminate';
        this._handleEvent('onerror',JSJaCError('503','cancel',condition));

        this.oDbg.log("Aborting remaining connections",4);

        for (var i=0; i<this._hold+1; i++) {
            try {
                if (this._req[i] && this._req[i] != req)
                    this._req[i].r.abort();
            } catch(e) { this.oDbg.log(e, 1); }
        }

        this.oDbg.log("parseResponse done with terminating", 3);

        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');

        return null;
    }
	*/
    // no error
    this._errcnt = 0;
    return event? {
	    	event : event,
	    	body : bodyStr? JSON.parse(bodyStr) : null
	    } : null;
	    	
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._reInitStream = function(cb) {
    // tell http binding to reinit stream with/before next request
    this._reinit = true;

    this._sendEmpty(this._prepReInitStreamWait(cb));
};


JSJaCHttpBindingConnection.prototype._prepReInitStreamWait = function(cb) {
    return JSJaC.bind(function(req) {
        this._reInitStreamWait(req, cb);
    }, this);
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._reInitStreamWait = function(req, cb) {
    this.oDbg.log("checking for stream features");
    var doc = req.responseXML.documentElement, features, bind;
    this.oDbg.log(doc);
    if (doc.getElementsByTagNameNS) {
        this.oDbg.log("checking with namespace");

        features = doc.getElementsByTagNameNS(NS_STREAM, 'features').item(0);
        if (features) {
            bind = features.getElementsByTagNameNS(NS_BIND, 'bind').item(0);
        }
    } else {
        var featuresNL = doc.getElementsByTagName('stream:features'), i, l;
        for (i=0, l=featuresNL.length; i<l; i++) {
            if (featuresNL.item(i).namespaceURI == NS_STREAM ||
                featuresNL.item(i).getAttribute('xmlns') == NS_STREAM) {
                features = featuresNL.item(i);
                break;
            }
        }
        if (features) {
            bind = features.getElementsByTagName('bind');
            for (i=0, l=bind.length; i<l; i++) {
                if (bind.item(i).namespaceURI == NS_BIND ||
                    bind.item(i).getAttribute('xmlns') == NS_BIND) {
                    bind = bind.item(i);
                    break;
                }
            }
        }
    }
    this.oDbg.log(features);
    this.oDbg.log(bind);

    if (features) {
        if (bind) {
            cb();
        } else {
            this.oDbg.log("no bind feature - giving up",1);
            this._handleEvent('onerror',JSJaCError('503','cancel',
                                                   "service-unavailable"));
            this._connected = false;
            this.oDbg.log("Disconnected.",1);
            this._handleEvent('ondisconnect');
        }
    } else {
        // wait
        this._sendEmpty(this._prepReInitStreamWait(cb));
    }
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._repeat = function() {
  if (this._rid >= this._last_rid)
    this._rid = this._last_rid-1;

  this._process();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._resume = function() {
    // make sure to repeat last request as we can be sure that it had failed
    // (only if we're not using the 'pause' attribute)
    if (this._pause === 0)
        this._repeat();
    else
        this._process();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setHold = function(hold)  {
  if (!hold || isNaN(hold) || hold < 0)
    hold = 0;
  else if (hold > JSJACHBC_MAX_HOLD)
    hold = JSJACHBC_MAX_HOLD;
  this._hold = hold;
  return this._hold;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setupJumpRequest = function(async) {
	var req = {};
	var r = XmlHttp.create();
	this._rid++;
	try {
		r.open("POST", this._httpbase + '?rid=' + this._rid + '&sid='
				+ this._sid + '&useBase64=1', async);
		r.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
	} catch (e) {
		this.oDbg.log(e, 1);
	}
	req.r = r;
	req.rid = this._rid;
	return req;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setupRequest = function(async) {
  var req = {};
  var r = XmlHttp.create();
  this._rid++;
  try {
    r.open("POST",this._httpbase,async);
    r.setRequestHeader('Content-Type','text/xml; charset=utf-8');
  } catch(e) { this.oDbg.log(e,1); }
  req.r = r;
  req.rid = this._rid;
  return req;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._suspend = function() {
  if (this._pause === 0)
    return; // got nothing to do

  var slot = this._getFreeSlot();
  // Intentionally synchronous
  this._req[slot] = this._setupRequest(false);

  var reqstr = "<body pause='"+this._pause+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+this._sid+"' rid='"+this._rid+"'";
  if (JSJAC_HAVEKEYS) {
    reqstr += " key='"+this._keys.getKey()+"'";
    if (this._keys.lastKey()) {
      this._keys = new JSJaCKeys(hex_sha1,this.oDbg);
      reqstr += " newkey='"+this._keys.getKey()+"'";
    }

  }
  reqstr += ">";

  while (this._pQueue.length) {
    var curNode = this._pQueue[0];
    reqstr += curNode;
    this._pQueue = this._pQueue.slice(1,this._pQueue.length);
  }

  //reqstr += "<presence type='unavailable' xmlns='jabber:client'/>";
  reqstr += "</body>";

  this.oDbg.log("Disconnecting: " + reqstr,4);
  this._req[slot].r.send(reqstr);
};


/**
 * @fileoverview All stuff related to HTTP Polling
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCHttpPollingConnection */

/**
 * Instantiates an HTTP Polling session
 * @class Implementation of {@link
 * http://www.xmpp.org/extensions/xep-0025.html HTTP Polling}
 * @extends JSJaCConnection
 * @constructor
 */
function JSJaCHttpPollingConnection(oArg) {
  /**
   * @ignore
   */
  this.base = JSJaCConnection;
  this.base(oArg);

  // give hint to JSJaCPacket that we're using HTTP Polling ...
  JSJACPACKET_USE_XMLNS = false;
}
JSJaCHttpPollingConnection.prototype = new JSJaCConnection();

/**
 * Tells whether this implementation of JSJaCConnection is polling
 * Useful if it needs to be decided
 * whether it makes sense to allow for adjusting or adjust the
 * polling interval {@link JSJaCConnection#setPollInterval}
 * @return <code>true</code> if this is a polling connection,
 * <code>false</code> otherwise.
 * @type boolean
 */
JSJaCHttpPollingConnection.prototype.isPolling = function() { return true; };

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getFreeSlot = function() {
  if (typeof(this._req[0]) == 'undefined' ||
      typeof(this._req[0].r) == 'undefined' ||
      this._req[0].r.readyState == 4)
    return 0;
  else
    return -1;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getInitialRequestString = function() {
  var reqstr = "0";
  if (JSJAC_HAVEKEYS) {
    this._keys = new JSJaCKeys(b64_sha1,this.oDbg); // generate first set of keys
    var key = this._keys.getKey();
    reqstr += ";"+key;
  }
  var streamto = this.domain;
  if (this.authhost)
    streamto = this.authhost;

  reqstr += ",<stream:stream to='"+streamto+"' xmlns='jabber:client' xmlns:stream='http://etherx.jabber.org/streams'";
  if (this.authtype == 'sasl' || this.authtype == 'saslanon')
    reqstr += " version='1.0'";
  reqstr += ">";
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getRequestString = function(raw, last) {
  var reqstr = this._sid;
  if (JSJAC_HAVEKEYS) {
    reqstr += ";"+this._keys.getKey();
    if (this._keys.lastKey()) {
      this._keys = new JSJaCKeys(b64_sha1,this.oDbg);
      reqstr += ';'+this._keys.getKey();
    }
  }
  reqstr += ',';
  if (raw)
    reqstr += raw;
  while (this._pQueue.length) {
    reqstr += this._pQueue[0];
    this._pQueue = this._pQueue.slice(1,this._pQueue.length);
  }
  if (last)
    reqstr += '</stream:stream>';
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getStreamID = function() {
  if (this._req[0].r.responseText === '') {
    this.oDbg.log("waiting for stream id",2);
    this._timeout = setTimeout(JSJaC.bind(this._sendEmpty, this),1000);
    return;
  }

  this.oDbg.log(this._req[0].r.responseText,4);

  // extract stream id used for non-SASL authentication
  if (this._req[0].r.responseText.match(/id=[\'\"]([^\'\"]+)[\'\"]/))
    this.streamid = RegExp.$1;
  this.oDbg.log("got streamid: "+this.streamid,2);

  var doc;

  try {
    var response = this._req[0].r.responseText;
    if (!response.match(/<\/stream:stream>\s*$/))
      response += '</stream:stream>';

    doc = XmlDocument.create("doc");
    doc.loadXML(response);
    if (!this._parseStreamFeatures(doc)) {
      this.authtype = 'nonsasl';
      return;
    }
  } catch(e) {
    this.oDbg.log("loadXML: "+e.toString(),1);
  }

  this._connected = true;

  if (this.register)
    this._doInBandReg();
  else
    this._doAuth();

  this._process(this._timerval); // start polling
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getSuspendVars = function() {
  return [];
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._handleInitialResponse = function() {
  // extract session ID
  this.oDbg.log(this._req[0].r.getAllResponseHeaders(),4);
  var aPList = this._req[0].r.getResponseHeader('Set-Cookie');
  aPList = aPList.split(";");
  for (var i=0;i<aPList.length;i++) {
    var aArg = aPList[i].split("=");
    if (aArg[0] == 'ID')
      this._sid = aArg[1];
  }
  this.oDbg.log("got sid: "+this._sid,2);

  /* start sending from queue for not polling connections */
  this._connected = true;

  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);
  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);

  /* wait for initial stream response to extract streamid needed
   * for digest auth
   */
  this._getStreamID();
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._parseResponse = function(r) {
  var req = r.r;
  if (!this.connected())
    return null;

  /* handle error */
  // proxy error (!)
  if (req.status != 200) {
    this.oDbg.log("invalid response ("+req.status+"):" + req.responseText+"\n"+req.getAllResponseHeaders(),1);

    this._setStatus('internal_server_error');

    clearTimeout(this._timeout); // remove timer
    clearInterval(this._interval);
    clearInterval(this._inQto);
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return null;
  }

  this.oDbg.log(req.getAllResponseHeaders(),4);
  var sid, aPList = req.getResponseHeader('Set-Cookie');

  if (aPList === null)
    sid = "-1:0"; // Generate internal server error
  else {
    aPList = aPList.split(";");
    for (var i=0;i<aPList.length;i++) {
      var aArg = aPList[i].split("=");
      if (aArg[0] == 'ID')
        sid = aArg[1];
    }
  }

  // http polling component error
  if (typeof(sid) != 'undefined' && sid.indexOf(':0') != -1) {
    switch (sid.substring(0,sid.indexOf(':0'))) {
    case '0':
      this.oDbg.log("invalid response:" + req.responseText,1);
      break;
    case '-1':
      this.oDbg.log("Internal Server Error",1);
      break;
    case '-2':
      this.oDbg.log("Bad Request",1);
      break;
    case '-3':
      this.oDbg.log("Key Sequence Error",1);
      break;
    }

    this._setStatus('internal_server_error');

    clearTimeout(this._timeout); // remove timer
    clearInterval(this._interval);
    clearInterval(this._inQto);
    this._handleEvent('onerror',JSJaCError('500','wait','internal-server-error'));
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    return null;
  }

  if (!req.responseText)
    return null;

  try {
    var response = req.responseText.replace(/<\?xml.+\?>/,"");
    if (response.match(/<stream:stream/))
        response += "</stream:stream>";
    var doc = JSJaCHttpPollingConnection._parseTree("<body>"+response+"</body>");

    if (!doc || doc.tagName == 'parsererror') {
      this.oDbg.log("parsererror",1);

      doc = JSJaCHttpPollingConnection._parseTree("<stream:stream xmlns:stream='http://etherx.jabber.org/streams'>"+req.responseText);
      if (doc && doc.tagName != 'parsererror') {
        this.oDbg.log("stream closed",1);

        if (doc.getElementsByTagName('conflict').length > 0)
          this._setStatus("session-terminate-conflict");

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);
        this._handleEvent('onerror',JSJaCError('503','cancel','session-terminate'));
        this._connected = false;
        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');
      } else
        this.oDbg.log("parsererror:"+doc,1);

      return doc;
    }

    return doc;
  } catch (e) {
    this.oDbg.log("parse error:"+e.message,1);
  }
  return null;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._reInitStream = function(cb) {
  var streamto = this.authhost ? this.authhost : this.domain;
  this._sendRaw("<stream:stream xmlns:stream='http://etherx.jabber.org/streams' xmlns='jabber:client' to='" + streamto + "' version='1.0'>", cb);
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._repeat = function() {
    this._resume();
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._resume = function() {
  this._process(this._timerval);
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._setupRequest = function(async) {
  var r = XmlHttp.create();
  try {
    r.open("POST",this._httpbase,async);
    if (r.overrideMimeType)
      r.overrideMimeType('text/plain; charset=utf-8');
    r.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  } catch(e) { this.oDbg.log(e,1); }

  var req = {};
  req.r = r;
  return req;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._suspend = function() {};

/*** [static] ***/

/**
 * @private
 */
JSJaCHttpPollingConnection._parseTree = function(s) {
  try {
    var r = XmlDocument.create("body","foo");
    if (typeof(r.loadXML) != 'undefined') {
      r.loadXML(s);
      return r.documentElement;
    } else if (window.DOMParser)
      return (new DOMParser()).parseFromString(s, "text/xml").documentElement;
  } catch (e) { }
  return null;
};

/**
 * @fileoverview This file contains all things that make life easier when
 * dealing with JIDs
 * @author Stefan Strigler
 */

/*exported JSJaCJIDInvalidException, JSJaCJID */

/**
 * Creates a new Exception of type JSJaCJIDInvalidException
 * @class Exception to indicate invalid values for a jid
 * @constructor
 * @param {String} message The message associated with this Exception
 */
function JSJaCJIDInvalidException(message) {
    /**
     * The exceptions associated message
     * @type String
     */
    this.message = message;
    /**
     * The name of the exception
     * @type String
     */
    this.name = "JSJaCJIDInvalidException";
}

/**
 * list of forbidden chars for nodenames
 * @private
 */
var JSJACJID_FORBIDDEN = ['"',' ','&','\'','/',':','<','>','@'];

/**
 * Creates a new JSJaCJID object
 * @class JSJaCJID models xmpp jid objects
 * @constructor
 * @param {Object} jid jid may be either of type String or a JID represented
 * by JSON with fields 'node', 'domain' and 'resource'
 * @throws JSJaCJIDInvalidException Thrown if jid is not valid
 * @return a new JSJaCJID object
 */
function JSJaCJID(jid) {
    /**
     *@private
     */
    this._node = '';
    /**
     *@private
     */
    this._domain = '';
    /**
     *@private
     */
    this._resource = '';

    if (typeof(jid) == 'string') {
        if (jid.indexOf('@') != -1) {
            this.setNode(jid.substring(0,jid.indexOf('@')));
            jid = jid.substring(jid.indexOf('@')+1);
        }
        if (jid.indexOf('/') != -1) {
            this.setResource(jid.substring(jid.indexOf('/')+1));
            jid = jid.substring(0,jid.indexOf('/'));
        }
        this.setDomain(jid);
    } else {
        this.setNode(jid.node);
        this.setDomain(jid.domain);
        this.setResource(jid.resource);
    }
}

/**
 * Gets the bare jid (i.e. the JID without resource)
 * @return A string representing the bare jid
 * @type String
 */
JSJaCJID.prototype.getBareJID = function() {
    return this.getNode()+'@'+this.getDomain();
};

/**
 * Gets the node part of the jid
 * @return A string representing the node name
 * @type String
 */
JSJaCJID.prototype.getNode = function() { return this._node; };

/**
 * Gets the domain part of the jid
 * @return A string representing the domain name
 * @type String
 */
JSJaCJID.prototype.getDomain = function() { return this._domain; };

/**
 * Gets the resource part of the jid
 * @return A string representing the resource
 * @type String
 */
JSJaCJID.prototype.getResource = function() { return this._resource; };


/**
 * Sets the node part of the jid
 * @param {String} node Name of the node
 * @throws JSJaCJIDInvalidException Thrown if node name contains invalid chars
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setNode = function(node) {
    JSJaCJID._checkNodeName(node);
    this._node = node || '';
    return this;
};

/**
 * Sets the domain part of the jid
 * @param {String} domain Name of the domain
 * @throws JSJaCJIDInvalidException Thrown if domain name contains invalid
 * chars or is empty
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setDomain = function(domain) {
    if (!domain || domain === '')
        throw new JSJaCJIDInvalidException("domain name missing");
    // chars forbidden for a node are not allowed in domain names
    // anyway, so let's check
    JSJaCJID._checkNodeName(domain);
    this._domain = domain;
    return this;
};

/**
 * Sets the resource part of the jid
 * @param {String} resource Name of the resource
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setResource = function(resource) {
    this._resource = resource || '';
    return this;
};

/**
 * The string representation of the full jid
 * @return A string representing the jid
 * @type String
 */
JSJaCJID.prototype.toString = function() {
    var jid = '';
    if (this.getNode() && this.getNode() !== '')
        jid = this.getNode() + '@';
    jid += this.getDomain(); // we always have a domain
    if (this.getResource() && this.getResource() !== "")
        jid += '/' + this.getResource();
    return jid;
};

/**
 * Removes the resource part of the jid
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.removeResource = function() {
    return this.setResource();
};

/**
 * creates a copy of this JSJaCJID object
 * @return A copy of this
 * @type JSJaCJID
 */
JSJaCJID.prototype.clone = function() {
    return new JSJaCJID(this.toString());
};

/**
 * Compares two jids if they belong to the same entity (i.e. w/o resource)
 * @param {String} jid a jid as string or JSJaCJID object
 * @return 'true' if jid is same entity as this
 * @type Boolean
 */
JSJaCJID.prototype.isEntity = function(jid) {
    if (typeof jid == 'string')
        jid = (new JSJaCJID(jid));
    else
        jid = jid.clone();
    jid.removeResource();
    return (this.clone().removeResource().toString() === jid.toString());
};

/**
 * Check if node name is valid
 * @private
 * @param {String} node A name for a node
 * @throws JSJaCJIDInvalidException Thrown if name for node is not allowed
 */
JSJaCJID._checkNodeName = function(nodeprep) {
    if (!nodeprep || nodeprep === '')
        return;
    for (var i=0; i< JSJACJID_FORBIDDEN.length; i++) {
        if (nodeprep.indexOf(JSJACJID_FORBIDDEN[i]) != -1) {
            throw new JSJaCJIDInvalidException("forbidden char in nodename: "+JSJACJID_FORBIDDEN[i]);
        }
    }
};

/* Copyright (c) 2005-2007 Sam Stephenson
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*exported JSJaCJSON */

/*
  json.js
  taken from prototype.js, made static
*/
function JSJaCJSON() {}
JSJaCJSON.toString = function (obj) {
  var m = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
  },
  s = {
    array: function (x) {
      var a = ['['], b, f, i, l = x.length, v;
      for (i = 0; i < l; i += 1) {
        v = x[i];
        f = s[typeof v];
        if (f) {
          try {
            v = f(v);
            if (typeof v == 'string') {
              if (b) {
                a[a.length] = ',';
              }
              a[a.length] = v;
              b = true;
            }
          } catch(e) {
          }
        }
      }
      a[a.length] = ']';
      return a.join('');
    },
    'boolean': function (x) {
      return String(x);
    },
    'null': function () {
      return "null";
    },
    number: function (x) {
      return isFinite(x) ? String(x) : 'null';
    },
    object: function (x) {
      if (x) {
        if (x instanceof Array) {
          return s.array(x);
        }
        var a = [], b, f, i, v;
        a.push('{');
        for (i in x) {
          if (x.hasOwnProperty(i)) {
            v = x[i];
            f = s[typeof v];
            if (f) {
              try {
                v = f(v);
                if (typeof v == 'string') {
                  if (b) {
                    a[a.length] = ',';
                  }
                  a.push(s.string(i), ':', v);
                  b = true;
                }
              } catch(e) {
              }
            }
          }
        }

        a[a.length] = '}';
        return a.join('');
      }
      return 'null';
    },
    string: function (x) {
      if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
          var c = m[b];
          if (c) {
            return c;
          }
          c = b.charCodeAt();
          return '\\u00' +
          Math.floor(c / 16).toString(16) +
          (c % 16).toString(16);
        });
  }
  return '"' + x + '"';
}
  };

switch (typeof(obj)) {
 case 'object':
   return s.object(obj);
 case 'array':
   return s.array(obj);
 }
};

JSJaCJSON.parse = function (str) {
  /*jshint evil: true */
  try {
    return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                                                       str.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + str + ')');
    } catch (e) {
        return false;
    }
};

/*exported JSJaCKeys */

/**
 * Creates a new set of hash keys
 * @class Reflects a set of sha1/md5 hash keys for securing sessions
 * @constructor
 * @param {Function} func The hash function to be used for creating the keys
 * @param {Debugger} oDbg Reference to debugger implementation [optional]
 */
function JSJaCKeys(func,oDbg) {
  var seed = Math.random();

  /**
   * @private
   */
  this._k = [];
  this._k[0] = seed.toString();
  if (oDbg)
    /**
     * Reference to Debugger
     * @type Debugger
     */
    this.oDbg = oDbg;
  else {
    this.oDbg = {};
    this.oDbg.log = function() {};
  }

  if (func) {
    for (var i=1; i<JSJAC_NKEYS; i++) {
      this._k[i] = func(this._k[i-1]);
      oDbg.log(i+": "+this._k[i],4);
    }
  }

  /**
   * @private
   */
  this._indexAt = JSJAC_NKEYS-1;
  /**
   * Gets next key from stack
   * @return New hash key
   * @type String
   */
  this.getKey = function() {
    return this._k[this._indexAt--];
  };
  /**
   * Indicates whether there's only one key left
   * @return <code>true</code> if there's only one key left, false otherwise
   * @type boolean
   */
  this.lastKey = function() { return (this._indexAt === 0); };
  /**
   * Returns number of overall/initial stack size
   * @return Number of keys created
   * @type int
   */
  this.size = function() { return this._k.length; };

  /**
   * @private
   */
  this._getSuspendVars = function() {
    return ('_k,_indexAt').split(',');
  };
}

/**
 * @fileoverview Contains all Jabber/XMPP packet related classes.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCPacket, JSJaCPresence, JSJaCIQ, JSJaCMessage */

var JSJACPACKET_USE_XMLNS = true;

/**
 * Creates a new packet with given root tag name (for internal use)
 * @class Somewhat abstract base class for all kinds of specialised packets
 * @param {String} name The root tag name of the packet
 * (i.e. one of 'message', 'iq' or 'presence')
 */
function JSJaCPacket(name) {
  /**
   * @private
   */
  this.name = name;

  if (typeof(JSJACPACKET_USE_XMLNS) != 'undefined' && JSJACPACKET_USE_XMLNS)
    /**
     * @private
     */
    this.doc = XmlDocument.create(name, NS_CLIENT);
  else
    /**
     * @private
     */
    this.doc = XmlDocument.create(name,'');
}

/**
 * Gets the type (name of root element) of this packet, i.e. one of
 * 'presence', 'message' or 'iq'
 * @return {string} The top level tag name.
 */
JSJaCPacket.prototype.pType = function() { return this.name; };

/**
 * Gets the associated Document for this packet.
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#i-Document | Document}
 * @returns {Document}
 */
JSJaCPacket.prototype.getDoc = function() {
  return this.doc;
};
/**
 * Gets the root node of this packet
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 * @return {Node}
 */
JSJaCPacket.prototype.getNode = function() {
  if (this.getDoc() && this.getDoc().documentElement)
    return this.getDoc().documentElement;
  else
    return null;
};

/**
 * Sets the 'to' attribute of the root node of this packet
 * @param {String} [to] A string representing a jid sending this packet to. If omitted the property will be deleted thus sending to service rather than dedicated recipient.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setTo = function(to) {
  if (!to)
    this.getNode().removeAttribute('to');
  else if (typeof(to) == 'string')
    this.getNode().setAttribute('to',to);
  else
    this.getNode().setAttribute('to',to.toString());
  return this;
};
/**
 * Sets the 'from' attribute of the root node of this
 * packet. Usually this is not needed as the server will take care
 * of this automatically.
 * @param {string} [from] A string representing the jid of the sender of this packet.
 * @deprecated
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setFrom = function(from) {
  if (!from)
    this.getNode().removeAttribute('from');
  else if (typeof(from) == 'string')
    this.getNode().setAttribute('from',from);
  else
    this.getNode().setAttribute('from',from.toString());
  return this;
};

/**
 * Sets 'id' attribute of the root node of this packet.
 * @param {string} id The id of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setID = function(id) {
  if (!id)
    this.getNode().removeAttribute('id');
  else
    this.getNode().setAttribute('id',id);
  return this;
};
/**
 * Sets the 'type' attribute of the root node of this packet.
 * @param {string} type The type of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setType = function(type) {
  if (!type)
    this.getNode().removeAttribute('type');
  else
    this.getNode().setAttribute('type',type);
  return this;
};
/**
 * Sets 'xml:lang' for this packet
 * @param {string} xmllang The xml:lang of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setXMLLang = function(xmllang) {
  if (!xmllang)
    this.getNode().removeAttribute('xml:lang');
  else
    this.getNode().setAttribute('xml:lang',xmllang);
  return this;
};

/**
 * Gets the 'to' attribute of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getTo = function() {
  return this.getNode().getAttribute('to');
};
/**
 * Gets the 'from' attribute of this packet.
 * @return {string}
 */
JSJaCPacket.prototype.getFrom = function() {
  return this.getNode().getAttribute('from');
};
/**
 * Gets the 'to' attribute of this packet as a JSJaCJID object
 * @return {JSJaCJID}
 */
JSJaCPacket.prototype.getToJID = function() {
  return new JSJaCJID(this.getTo());
};
/**
 * Gets the 'from' attribute of this packet as a JSJaCJID object
 * @return {JSJaCJID}
 */
JSJaCPacket.prototype.getFromJID = function() {
  return new JSJaCJID(this.getFrom());
};
/**
 * Gets the 'id' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getID = function() {
  return this.getNode().getAttribute('id');
};
/**
 * Gets the 'type' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getType = function() {
  return this.getNode().getAttribute('type');
};
/**
 * Gets the 'xml:lang' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getXMLLang = function() {
  return this.getNode().getAttribute('xml:lang');
};
/**
 * Gets the 'xmlns' (xml namespace) of the root node of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getXMLNS = function() {
  return this.getNode().namespaceURI || this.getNode().getAttribute('xmlns');
};

/**
 * Gets a child element of this packet. If no params given returns first child.
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 * @param {string} name Tagname of child to retrieve. Use '*' to match any tag. [optional]
 * @param {string} ns   Namespace of child. Use '*' to match any ns.[optional]
 * @return {Node} The child node, null if none found
 */
JSJaCPacket.prototype.getChild = function(name, ns) {
  if (!this.getNode()) {
    return null;
  }

  name = name || '*';
  ns = ns || '*';

  if (this.getNode().getElementsByTagNameNS) {
    return this.getNode().getElementsByTagNameNS(ns, name).item(0);
  }

  // fallback
  var nodes = this.getNode().getElementsByTagName(name);
  if (ns != '*') {
    for (var i=0; i<nodes.length; i++) {
      if (nodes.item(i).namespaceURI == ns || nodes.item(i).getAttribute('xmlns') == ns) {
        return nodes.item(i);
      }
    }
  } else {
    return nodes.item(0);
  }
  return null; // nothing found
};

/**
 * Gets the node value of a child element of this packet.
 * @param {string} name Tagname of child to retrieve.
 * @param {string} ns   Namespace of child
 * @return {string} The value of the child node, empty string if none found
 */
JSJaCPacket.prototype.getChildVal = function(name, ns) {
  var node = this.getChild(name, ns);
  var ret = '';
  if (node && node.hasChildNodes()) {
    // concatenate all values from childNodes
    for (var i=0; i<node.childNodes.length; i++)
      if (node.childNodes.item(i).nodeValue)
        ret += node.childNodes.item(i).nodeValue;
  }
  return ret;
};

/**
 * Returns a copy of this node
 * @return {JSJaCPacket} a copy of this node
 */
JSJaCPacket.prototype.clone = function() {
  return JSJaCPacket.wrapNode(this.getNode());
};

/**
 * Checks if packet is of type 'error'
 * @return {boolean} 'true' if this packet is of type 'error', 'false' otherwise
 */
JSJaCPacket.prototype.isError = function() {
  return (this.getType() == 'error');
};

/**
 * Returns an error condition reply according to {@link http://xmpp.org/extensions/xep-0086.html | XEP-0086}. Creates a clone of the calling packet with senders and recipient exchanged and error stanza appended.
 * @param {STANZA_ERROR} stanza_error an error stanza containing error cody, type and condition of the error to be indicated
 * @return {JSJaCPacket} an error reply packet
 */
JSJaCPacket.prototype.errorReply = function(stanza_error) {
  var rPacket = this.clone();
  rPacket.setTo(this.getFrom());
  rPacket.setFrom();
  rPacket.setType('error');

  rPacket.appendNode('error',
                     {code: stanza_error.code, type: stanza_error.type},
                     [[stanza_error.cond, {xmlns: NS_STANZAS}]]);

  return rPacket;
};

/**
 * Returns a string representation of the raw xml content of this packet.
 * @return {string} deserialized xml packet
 */
JSJaCPacket.prototype.xml = typeof XMLSerializer != 'undefined' ?
function() {
  var r = (new XMLSerializer()).serializeToString(this.getNode());
  if (typeof(r) == 'undefined')
    r = (new XMLSerializer()).serializeToString(this.doc); // oldschool
  return r;
} :
function() {// IE
  return this.getDoc().xml;
};


// PRIVATE METHODS DOWN HERE

/**
 * Gets an attribute of the root element
 * @private
 */
JSJaCPacket.prototype._getAttribute = function(attr) {
  return this.getNode().getAttribute(attr);
};


if (!document.ELEMENT_NODE) {
  document.ELEMENT_NODE = 1;
  document.ATTRIBUTE_NODE = 2;
  document.TEXT_NODE = 3;
  document.CDATA_SECTION_NODE = 4;
  document.ENTITY_REFERENCE_NODE = 5;
  document.ENTITY_NODE = 6;
  document.PROCESSING_INSTRUCTION_NODE = 7;
  document.COMMENT_NODE = 8;
  document.DOCUMENT_NODE = 9;
  document.DOCUMENT_TYPE_NODE = 10;
  document.DOCUMENT_FRAGMENT_NODE = 11;
  document.NOTATION_NODE = 12;
}

/**
 * import node into this packets document
 * @private
 */
JSJaCPacket.prototype._importNode = function(node, allChildren) {
  switch (node.nodeType) {
  case document.ELEMENT_NODE:

  var newNode;
  if (this.getDoc().createElementNS) {
    newNode = this.getDoc().createElementNS(node.namespaceURI, node.nodeName);
  } else {
    newNode = this.getDoc().createElement(node.nodeName);
  }

  var i, il;
  /* does the node have any attributes to add? */
  if (node.attributes && node.attributes.length > 0)
    for (i = 0, il = node.attributes.length;i < il; i++) {
      var attr = node.attributes.item(i);
      if (attr.nodeName == 'xmlns' &&
          (newNode.getAttribute('xmlns') !== null || newNode.namespaceURI)) {
          // skip setting an xmlns attribute as it has been set
          // before already by createElementNS

          // namespaceURI is '' for IE<9
          continue;
      }
      if (newNode.setAttributeNS && attr.namespaceURI) {
        newNode.setAttributeNS(attr.namespaceURI,
                               attr.name,
                               attr.value);
      } else {
        newNode.setAttribute(attr.name,
                             attr.value);
      }
    }
  /* are we going after children too, and does the node have any? */
  if (allChildren && node.childNodes && node.childNodes.length > 0) {
    for (i = 0, il = node.childNodes.length; i < il; i++) {
      newNode.appendChild(this._importNode(node.childNodes.item(i), allChildren));
    }
  }
  return newNode;
  case document.TEXT_NODE:
  case document.CDATA_SECTION_NODE:
  case document.COMMENT_NODE:
  return this.getDoc().createTextNode(node.nodeValue);
  }
};

/**
 * Set node value of a child node
 * @private
 */
JSJaCPacket.prototype._setChildNode = function(nodeName, nodeValue) {
  var aNode = this.getChild(nodeName);
  var tNode = this.getDoc().createTextNode(nodeValue);
  if (aNode)
    try {
      aNode.replaceChild(tNode,aNode.firstChild);
    } catch (e) { }
  else {
    try {
      aNode = this.getDoc().createElementNS(this.getNode().namespaceURI,
                                            nodeName);
    } catch (ex) {
      aNode = this.getDoc().createElement(nodeName);
    }
    this.getNode().appendChild(aNode);
    aNode.appendChild(tNode);
  }
  return aNode;
};

/**
 * Builds a node using {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} notation.
 * This code is taken from {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} and has been modified to suit our needs.<br/>
 * The original parts of the code do have the following copyright
 * and license notice:<br/>
 * Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us,
 * http://mir.acu lo.us) <br/>
 * script.aculo.us is freely distributable under the terms of an
 * MIT-style licen se.  // For details, see the script.aculo.us web
 * site: http://script.aculo.us/<br>
 * @author Thomas Fuchs
 * @author Stefan Strigler
 * @return {Node} The newly created node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCPacket.prototype.buildNode = function(elementName) {
  return JSJaCBuilder.buildNode(this.getDoc(),
                                elementName,
                                arguments[1],
                                arguments[2],
                                arguments[3]);
};

/**
 * Appends node created by buildNode to this packets parent node.
 * @param {Node} element The node to append or
 * @param {string} element A name plus an object hash with attributes (optional) plus an array of childnodes (optional)
 * @see #buildNode
 * @return {JSJaCPacket} This packet
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCPacket.prototype.appendNode = function(element) {
  if (typeof element=='object') { // seems to be a prebuilt node
    this.getNode().appendChild(element);
  } else { // build node
    this.getNode().appendChild(this.buildNode(element,
                                                     arguments[1],
                                                     arguments[2],
                                                     this.getNode().namespaceURI));
  }
  return this;
};


/**
 * A jabber/XMPP presence packet
 * @class Models the XMPP notion of a 'presence' packet
 * @extends JSJaCPacket
 */
function JSJaCPresence() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('presence');
}
JSJaCPresence.prototype = new JSJaCPacket();

/**
 * Sets the status message for current status. Usually this is set
 * to some human readable string indicating what the user is
 * doing/feel like currently.
 * @param {string} status A status message
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setStatus = function(status) {
  this._setChildNode("status", status);
  return this;
};
/**
 * Sets the online status for this presence packet.
 * @param {string} show An XMPP complient status indicator. Must
 * be one of 'chat', 'away', 'xa', 'dnd'
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setShow = function(show) {
  if (show == 'chat' || show == 'away' || show == 'xa' || show == 'dnd' || show == 'unavailable')
    this._setChildNode("show",show);
  return this;
};
/**
 * Sets the priority of the resource bind to with this connection
 * @param {int} prio The priority to set this resource to
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setPriority = function(prio) {
  this._setChildNode("priority", prio);
  return this;
};
/**
 * Some combined method that allowes for setting show, status and
 * priority at once
 * @param {string} show A status message
 * @param {string} status A status indicator as defined by XMPP
 * @param {int} prio A priority for this resource
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setPresence = function(show,status,prio) {
  if (show)
    this.setShow(show);
  if (status)
    this.setStatus(status);
  if (prio)
    this.setPriority(prio);
  return this;
};

/**
 * Gets the status message of this presence
 * @return The (human readable) status message
 * @type String
 */
JSJaCPresence.prototype.getStatus = function() {
  return this.getChildVal('status');
};
/**
 * Gets the status of this presence.
 * Either one of 'chat', 'away', 'xa' or 'dnd' or null.
 * @return The status indicator as defined by XMPP
 * @type String
 */
JSJaCPresence.prototype.getShow = function() {
  return this.getChildVal('show');
};
/**
 * Gets the priority of this status message
 * @return A resource priority
 * @type int
 */
JSJaCPresence.prototype.getPriority = function() {
  return this.getChildVal('priority');
};


/**
 * A jabber/XMPP iq packet
 * @class Models the XMPP notion of an 'iq' packet
 * @extends JSJaCPacket
 */
function JSJaCIQ() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('iq');
}
JSJaCIQ.prototype = new JSJaCPacket();

/**
 * Some combined method to set 'to', 'type' and 'id' at once
 * @param {string} to the recepients JID
 * @param {string} type A XMPP compliant iq type (one of 'set', 'get', 'result' and 'error'
 * @param {string} id A packet ID
 * @return {JSJaCIQ} this
 */
JSJaCIQ.prototype.setIQ = function(to,type,id) {
  if (to)
    this.setTo(to);
  if (type)
    this.setType(type);
  if (id)
    this.setID(id);
  return this;
};
/**
 * Creates a 'query' child node with given XMLNS
 * @param {string} xmlns The namespace for the 'query' node
 * @return {Node} The query node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCIQ.prototype.setQuery = function(xmlns) {
  var query;
  try {
    query = this.getDoc().createElementNS(xmlns,'query');
  } catch (e) {
    query = this.getDoc().createElement('query');
    query.setAttribute('xmlns',xmlns);
  }
  this.getNode().appendChild(query);
  return query;
};

/**
 * Gets the 'query' node of this packet
 * @return {Node} The query node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCIQ.prototype.getQuery = function() {
  return this.getNode().getElementsByTagName('query').item(0);
};
/**
 * Gets the XMLNS of the query node contained within this packet
 * @return {string} The namespace of the query node
 */
JSJaCIQ.prototype.getQueryXMLNS = function() {
  if (this.getQuery()) {
    return this.getQuery().namespaceURI || this.getQuery().getAttribute('xmlns');
  } else {
    return null;
  }
};

/**
 * Creates an IQ reply with type set to 'result'. If given appends payload to first child if IQ. Payload maybe XML as string or a DOM element (or an array of such elements as well).
 * @param {Element} [payload] An optional payload to be appended.
 * @return {JSJaCIQ} An IQ reply packet
 */
JSJaCIQ.prototype.reply = function(payload) {
  var rIQ = this.clone();
  rIQ.setTo(this.getFrom());
  rIQ.setFrom();
  rIQ.setType('result');
  if (payload) {
    if (typeof payload == 'string')
      rIQ.getChild().appendChild(rIQ.getDoc().loadXML(payload));
    else if (payload.constructor == Array) {
      var node = rIQ.getChild();
      for (var i=0; i<payload.length; i++)
        if(typeof payload[i] == 'string')
          node.appendChild(rIQ.getDoc().loadXML(payload[i]));
        else if (typeof payload[i] == 'object')
          node.appendChild(payload[i]);
    }
    else if (typeof payload == 'object')
      rIQ.getChild().appendChild(payload);
  }
  return rIQ;
};

/**
 * A jabber/XMPP message packet
 * @class Models the XMPP notion of an 'message' packet
 * @extends JSJaCPacket
 */
function JSJaCMessage() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('message');
}
JSJaCMessage.prototype = new JSJaCPacket();

/**
 * Sets the body of the message
 * @param {string} body Your message to be sent along
 * @return {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setBody = function(body) {
  this._setChildNode("body",body);
  return this;
};
/**
 * Sets the subject of the message
 * @param {string} subject Your subject to be sent along
 * @return {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setSubject = function(subject) {
  this._setChildNode("subject",subject);
  return this;
};
/**
 * Sets the 'tread' attribute for this message. This is used to identify
 * threads in chat conversations
 * @param {string} thread Usually a somewhat random hash.
 * @returns {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setThread = function(thread) {
  this._setChildNode("thread", thread);
  return this;
};
/**
 * Gets the 'thread' identifier for this message
 * @return {string} A thread identifier
 */
JSJaCMessage.prototype.getThread = function() {
  return this.getChildVal('thread');
};
/**
 * Gets the body of this message
 * @return {string} The body of this message
 */
JSJaCMessage.prototype.getBody = function() {
  return this.getChildVal('body');
};
/**
 * Gets the subject of this message
 * @return {string} The subject of this message
 */
JSJaCMessage.prototype.getSubject = function() {
  return this.getChildVal('subject');
};


/**
 * Tries to transform a w3c DOM node to JSJaC's internal representation
 * (JSJaCPacket type, one of JSJaCPresence, JSJaCMessage, JSJaCIQ)
 * @param: {Node
 * http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247}
 * node The node to be transformed
 * @return A JSJaCPacket representing the given node. If node's root
 * elemenent is not one of 'message', 'presence' or 'iq',
 * <code>null</code> is being returned.
 * @type JSJaCPacket
 */
JSJaCPacket.wrapNode = function(node) {
  var oPacket = null;

  switch (node.nodeName.toLowerCase()) {
  case 'presence':
      oPacket = new JSJaCPresence();
      break;
  case 'message':
      oPacket = new JSJaCMessage();
      break;
  case 'iq':
      oPacket = new JSJaCIQ();
      break;
  }

  if (oPacket) {
    oPacket.getDoc().replaceChild(oPacket._importNode(node, true),
                                  oPacket.getNode());
    if(oPacket.getDoc().xml == null && node != null && node.xml != null)
    	oPacket.getDoc().xml = node.xml;
  }

  return oPacket;
};

/*exported JSJaCUtils */

/**
 * Various utilities put together so that they don't pollute global
 * name space.
 * @namespace
 */
var JSJaCUtils = {
  /**
   * XOR two strings of equal length.
   * @param {string} s1 first string to XOR.
   * @param {string} s2 second string to XOR.
   * @return {string} s1 ^ s2.
   */
  xor: function(s1, s2) {
    /*jshint bitwise: false */
    if(!s1) {
      return s2;
    }
    if(!s2) {
      return s1;
    }

    var result = '';
    for(var i = 0; i < s1.length; i++) {
      result += String.fromCharCode(s1.charCodeAt(i) ^ s2.charCodeAt(i));
    }
    return result;
  },

  /**
   * Create nonce value of given size.
   * @param {int} size size of the nonce that should be generated.
   * @return {string} generated nonce.
   */
  cnonce: function(size) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var cnonce = '';
    for (var i = 0; i < size; i++) {
      cnonce += tab.charAt(Math.round(Math.random(new Date().getTime()) * (tab.length - 1)));
    }
    return cnonce;
  },

  /**
   * Current timestamp.
   * @return Seconds since 1.1.1970.
   * @type int
   */
  now: function() {
    if (Date.now && typeof Date.now == 'function') {
      return Date.now();
    } else {
      return new Date().getTime();
    }
  }

};

/**
 * @author Janusz Dziemidowicz rraptorr@nails.eu.org
 * @fileoverview All stuff related to WebSocket
 * <pre>
 * The WebSocket protocol is a bit of a mess. Various, incompatible,
 * protocol drafts were implemented in browsers. Fortunately, recently
 * a finished protocol was released in RFC6455. Further description
 * assumes RFC6455 WebSocket protocol version.
 *
 * WebSocket browser support. Current (November 2012) browser status:
 * - Chrome 16+ - works properly and supports RFC6455
 * - Firefox 16+ - works properly and support RFC6455 (ealier versions
 *   have problems with proxies)
 * - Opera 12.10 - supports RFC6455, but does not work at all if a
 *   proxy is configured (earlier versions do not support RFC6455)
 * - Internet Explorer 10+ - works properly and supports RFC6455
 *
 * Due to the above status, this code is currently recommended on
 * Chrome 16+, Firefox 16+ and Internet Explorer 10+. Using it on
 * other browsers is discouraged.
 *
 * Please also note that some users are only able to connect to ports
 * 80 and 443. Port 80 is sometimes intercepted by transparent HTTP
 * proxies, which mostly does not support WebSocket, so port 443 is
 * the best choice currently (it does not have to be
 * encrypted). WebSocket also usually does not work well with reverse
 * proxies, be sure to make extensive tests if you use one.
 *
 * There is no standard for XMPP over WebSocket. However, there is a
 * draft (http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00) and
 * this implementation follows it.
 *
 * Tested servers:
 *
 * - node-xmpp-bosh (https://github.com/dhruvbird/node-xmpp-bosh) -
 *   supports RFC6455 and works with no problems since 0.6.1, it also
 *   transparently uses STARTTLS if necessary
 * - wxg (https://github.com/Gordin/wxg) - supports RFC6455 and works
 *   with no problems, but cannot connect to servers requiring
 *   STARTTLS (original wxg at https://github.com/hocken/wxg has some
 *   issues, that were fixed by Gordin).
 * - ejabberd-websockets
 *   (https://github.com/superfeedr/ejabberd-websockets) - does not
 *   support RFC6455 hence it does not work, adapting it to support
 *   RFC6455 should be quite easy for anyone knowing Erlang (some work
 *   in progress can be found on github)
 * - Openfire (http://www.igniterealtime.org/projects/openfire/) -
 *   unofficial plugin is available, but it lacks support
 *   for RFC6455 hence it does not work
 * - Apache Vysper (http://mina.apache.org/vysper/) - does
 *   not support RFC6455 hence does not work
 * - Tigase (http://www.tigase.org/) - works fine since 5.2.0.
 * - MongooseIM (https://github.com/esl/ejabberd) - a fork of ejabberd
 *   with support for XMPP over Websockets.
 * </pre>
 */

/*exported JSJaCWebSocketConnection */

/**
 * Instantiates a WebSocket session.
 * @class Implementation of {@link http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00 | An XMPP Sub-protocol for WebSocket}.
 * @extends JSJaCConnection
 * @constructor
 * @param {Object} oArg connection properties.
 * @param {string} oArg.httpbase WebSocket connection endpoint (i.e. ws://localhost:5280)
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 */
function JSJaCWebSocketConnection(oArg) {
  this.base = JSJaCConnection;
  this.base(oArg);

  this._ws = null;

  this.registerHandler('onerror', JSJaC.bind(this._cleanupWebSocket, this));
}

JSJaCWebSocketConnection.prototype = new JSJaCConnection();

JSJaCWebSocketConnection.prototype._cleanupWebSocket = function() {
  if (this._ws !== null) {
    this._ws.onclose = null;
    this._ws.onerror = null;
    this._ws.onopen = null;
    this._ws.onmessage = null;

    this._ws.close();
    this._ws = null;
  }
};

/**
 * Connect to a jabber/XMPP server.
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.password The user's password.
 * @param {string} [oArg.authzid] Authorization identity. Used to act as another user, in most cases not needed and rarely supported by servers. If present should be a bare JID (user@example.net).
 * @param {boolean} [oArg.allow_plain] Whether to allow plain text logins.
 * @param {boolean} [oArg.allow_scram] Whether to allow SCRAM-SHA-1 authentication. Please note that it is quite slow, do some testing on all required browsers before enabling.
 * @param {boolean} [oArg.register] Whether to register a new account.
 * @param {string} [oArg.authhost] The host that handles the actualy authorization. There are cases where this is different from the settings above, e.g. if there's a service that provides anonymous logins at 'anon.example.org'.
 * @param {string} [oArg.authtype] Must be one of 'sasl' (default), 'nonsasl', 'saslanon', or 'anonymous'.
 * @param {string} [oArg.xmllang] The requested language for this login. Typically XMPP server try to respond with error messages and the like in this language if available.
 */
JSJaCWebSocketConnection.prototype.connect = function(oArg) {
  this._setStatus('connecting');

  this.domain = oArg.domain || 'localhost';
  this.username = oArg.username;
  this.resource = oArg.resource;
  this.pass = oArg.password || oArg.pass;
  this.authzid = oArg.authzid || '';
  this.register = oArg.register;

  this.authhost = oArg.authhost || this.domain;
  this.authtype = oArg.authtype || 'sasl';

  this.jid = this.username + '@' + this.domain;
  this.fulljid = this.jid + '/' + this.resource;

  if (oArg.allow_plain) {
    this._allow_plain = oArg.allow_plain;
  } else {
    this._allow_plain = JSJAC_ALLOW_PLAIN;
  }

  if (oArg.allow_scram) {
    this._allow_scram = oArg.allow_scram;
  } else {
    this._allow_scram = JSJAC_ALLOW_SCRAM;
  }

  if (oArg.xmllang && oArg.xmllang !== '') {
    this._xmllang = oArg.xmllang;
  } else {
    this._xmllang = 'en';
  }

  if (typeof WebSocket === 'undefined') {
    this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
    return;
  }

  this._ws = new WebSocket(this._httpbase, 'xmpp');
  this._ws.onclose = JSJaC.bind(this._onclose, this);
  this._ws.onerror = JSJaC.bind(this._onerror, this);
  this._ws.onopen = JSJaC.bind(this._onopen, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onopen = function() {
	var authPacket = new JumpPacket({
		usr : this.username,
		atk : this.pass,
		br : this.resource
	}, OPCODE.AUTH.SEND);
	this._buildAndSend(authPacket);
	this._ws.onmessage = JSJaC.bind(this._onAuthMessage, this);
};

/**
 * 认证返回的包
 */
JSJaCWebSocketConnection.prototype._onAuthMessage = function(event) {
	var wsConn = this;
	if (event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if (evt.target.readyState == FileReader.DONE) {
				var arr = new Uint8Array(evt.target.result);
				// TODO if error
				
				// else
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				// AUTH packet
				if(wsConn._bytesToInteger(opcodeArr) == OPCODE.AUTH.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					console.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body));
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
					wsConn._handleEvent('packet_in', body);
					wsConn._handleEvent(OPCODE.AUTH.KEY, body);
					
					wsConn._connected = true;
					wsConn._handleEvent('onconnect');
					wsConn._ws.onmessage = JSJaC.bind(wsConn._onJumpMessage, wsConn);
				}
				else if(wsConn._bytesToInteger(opcodeArr) == OPCODE.STREAM_ERROR.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					console.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body));
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
				}
			}
			
		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * 发送JUMP类型的报文
 * @param jumpPacket
 */
JSJaCWebSocketConnection.prototype.sendJumpPacket = function(jumpPacket, cb, arg){
	
	if (!this.connected()) {
		return false;
	}
	
	if(!jumpPacket || !jumpPacket.opcode) {
		return false;
		throw new Error('packet and its opcode cannot be null when send a packet.');
	}
	
	// 只有Message或IQ才可以回调
	if (cb && this._validateCallbackable(jumpPacket)) {
		if(!jumpPacket.content)
			throw new Error('packet content cannot be null when send a Message or IQ packet.');
		
		if (!jumpPacket.content.id) {
			// gen id
			jumpPacket.content.id = this._IDPrefix + this._ID++;
		}

		// 根据id注册回调
		this._registerPID(jumpPacket, cb, arg);
	}

	if(jumpPacket instanceof JumpPacket)
		console.log('【send】\t ' + OPCODE_MAP.SEND.get(jumpPacket.opcode) + "\n\t" + JSON.stringify(jumpPacket));

	try {
		// may be print logs
		// this._handleEvent(jumpPacket.opcode + '_out', jumpPacket);
		this._handleEvent('packet_out', jumpPacket);
	} catch (e) {
		this.oDbg.log(e.toString(), 1);
		return false;
	}
	
	this._buildAndSend(jumpPacket);
	return true;
};

JSJaCWebSocketConnection.prototype._buildAndSend = function(jumpPacket) {
	var bodyArr = null;
	var hasNoContent = jumpPacket.content == null || typeof jumpPacket.content == 'undefined';
	var blob = new Blob([JSON.stringify(jumpPacket.content)], {
		type : 'text/json'
	});
	var reader = new FileReader();
	var wsConn = this;
	reader.onload = function(event) {
		if (event.target.readyState == FileReader.DONE) {
			// bodyArr = this._stringToBytes(JSON.stringify(jumpPacket.content));
			bodyArr = this.result;
			var headerArr = new Uint8Array(PACKET_HEADER_SIZE);
			headerArr.set(wsConn._numToBytes(jumpPacket.sFrame, PACKET_STRUCT.CONSOLE_FRAME.SIZE), 	PACKET_STRUCT.CONSOLE_FRAME.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.opcode, PACKET_STRUCT.OPCODE.SIZE), 		PACKET_STRUCT.OPCODE.START);
			if(hasNoContent) {
				headerArr.set(wsConn._numToBytes(0,PACKET_STRUCT.PACKET_LEN.SIZE), 	PACKET_STRUCT.PACKET_LEN.START);
			}
			else {
				headerArr.set(wsConn._numToBytes(bodyArr.byteLength,PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
			}
			headerArr.set(wsConn._numToBytes(jumpPacket.version,PACKET_STRUCT.VERSION.SIZE), 		PACKET_STRUCT.VERSION.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.seqId, 	PACKET_STRUCT.SEQ_ID.SIZE), 		PACKET_STRUCT.SEQ_ID.START);
			
			var sendArr;
			if(hasNoContent) {
				sendArr = headerArr;
			}
			else {
				sendArr = wsConn._concatUint8Array(headerArr, new Uint8Array(bodyArr));
			}
			wsConn._ws.send(sendArr);
		}
	};
	reader.readAsArrayBuffer(blob);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleOpenStream = function(event) {
  var open, stream;

  this.oDbg.log(event.data, 4);

  open = event.data;
  // skip XML prolog if any
  open = open.substr(open.indexOf('<stream:stream'));
  if (open.substr(-2) !== '/>' && open.substr(-16) !== '</stream:stream>') {
    // some servers send closed opening tag, some not
    open += '</stream:stream>';
  }
  stream = this._parseXml(open);
  if(!stream) {
    this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
    return;
  }

  // extract stream id used for non-SASL authentication
  this.streamid = stream.getAttribute('id');

  this.oDbg.log('got streamid: ' + this.streamid, 2);
  this._ws.onmessage = JSJaC.bind(this._handleInitialResponse, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleInitialResponse = function(event) {
  var doc = this._parseXml(event.data);
  if (!this._parseStreamFeatures(doc)) {
    this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
    return;
  }

  this._connected = true;

  if (this.register) {
    this._doInBandReg();
  } else {
    this._doAuth();
  }
};

/**
 * Disconnect from XMPP service
 *
 * When called upon leaving a page needs to use 'onbeforeunload' event
 * as Websocket would be closed already otherwise prior to this call.
 */
JSJaCWebSocketConnection.prototype.disconnect = function() {
  this._setStatus('disconnecting');

  if (!this.connected()) {
    return;
  }
  this._connected = false;

  this.oDbg.log('Disconnecting', 4);
//  this._sendRaw('</stream:stream>', JSJaC.bind(this._cleanupWebSocket, this));
//	var packet = new JumpPacket(null, OPCODE.STREAMEND.SEND);
//	this.sendJumpPacket({packet:packet});
  
  this._cleanupWebSocket();

  this.oDbg.log('Disconnected', 2);
  this._handleEvent('ondisconnect');
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onclose = function() {
  this.oDbg.log('websocket closed', 2);
  if (this._status !== 'disconnecting') {
    this._connected = false;
    //this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
  }
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onerror = function() {
  this.oDbg.log('websocket error', 1);
  this._connected = false;
  this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
};

JSJaCWebSocketConnection.prototype._onJumpMessage = function(event) {
	var wsConn = this;
	if (event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if (evt.target.readyState == FileReader.DONE) {
				// TODO if error ?
				// else
				var arr = new Uint8Array(evt.target.result);
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				wsConn._parseUint8Array(opcodeArr, bodyArr);
			}
			
		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onmessage = function(event) {
	var wsConn = this;
	var stanza, node, packet;

	stanza = event.data;

	// test start
	/*if (event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if (evt.target.readyState == FileReader.DONE) {
				var arr = new Uint8Array(evt.target.result);
				// TODO if error

				// else
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				console.info(wsConn._uint8ArrayToString(bodyArr));
			}

		}
		reader.readAsArrayBuffer(blob);
	}*/
	// test end

	this._setStatus('processing');
	if (!stanza || stanza === '') {
		return;
	}

	// WebSocket works only on modern browsers, so it is safe to assume
	// that namespaceURI and getElementsByTagNameNS are available.
	node = this._parseXml(stanza);
	if (node.namespaceURI === NS_STREAM && node.localName === 'error') {
		if (node.getElementsByTagNameNS(NS_STREAMS, 'conflict').length > 0) {
			this._setStatus('session-terminate-conflict');
		}
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('503', 'cancel',
				'remote-stream-error'));
		return;
	}

	packet = JSJaCPacket.wrapNode(node);
	if (!packet) {
		return;
	}

	this.oDbg.log('async recv: ' + event.data, 4);
	this._handleEvent('packet_in', packet);

	if (packet.pType && !this._handlePID(packet)) {
		this._handleEvent(packet.pType() + '_in', packet);
		this._handleEvent(packet.pType(), packet);
	}
};

/**
 * Parse single XML stanza. As proposed in XMPP Sub-protocol for WebSocket
 * draft, it assumes that every stanza is sent in a separate WebSocket frame,
 * which greatly simplifies parsing.
 * 
 * @private
 */
JSJaCWebSocketConnection.prototype._parseXml = function(s) {
  var doc;

  this.oDbg.log('Parsing: ' + s, 4);
  try {
    doc = XmlDocument.create('stream', NS_STREAM);
    if(s.trim() == '</stream:stream>') {
      // Consider session as closed
      this.oDbg.log("session terminated", 1);

      clearTimeout(this._timeout); // remove timer
      clearInterval(this._interval);
      clearInterval(this._inQto);

      try {
          JSJaCCookie.read(this._cookie_prefix+'JSJaC_State').erase();
      } catch (e) {}

      this._connected = false;
      this._handleEvent('onerror',JSJaCError('503','cancel','session-terminate'));

      this.oDbg.log("Disconnected.",1);
      this._handleEvent('ondisconnect');

      return null;
    } else if(s.indexOf('<stream:stream') === -1) {
      // Wrap every stanza into stream element, so that XML namespaces work properly.
      doc.loadXML("<stream:stream xmlns:stream='" + NS_STREAM + "' xmlns='jabber:client'>" + s + "</stream:stream>");
      if(typeof doc.documentElement.firstChild.xml == 'undefined')
    	  doc.documentElement.firstChild.xml = s;
      return doc.documentElement.firstChild;
    } else {
      doc.loadXML(s);
      return doc.documentElement;
    }
  } catch (e) {
    this.oDbg.log('Error: ' + e);
    this._connected = false;
    this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-service-error'));
  }

  return null;
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._getInitialRequestString = function() {
  var streamto, reqstr;

  streamto = this.domain;
  if (this.authhost) {
    streamto = this.authhost;
  }

  reqstr = '<stream:stream to="' + streamto + '" xmlns="jabber:client" xmlns:stream="' + NS_STREAM + '"';
  if (this.authtype === 'sasl' || this.authtype === 'saslanon') {
    reqstr += ' version="1.0"';
  }
  reqstr += '>';
  return reqstr;
};

JSJaCWebSocketConnection.prototype.send = function(packet, cb, arg) {
  this._ws.onmessage = JSJaC.bind(this._onmessage, this);
  if (!packet || !packet.pType) {
    this.oDbg.log('no packet: ' + packet, 1);
    return false;
  }

  if (!this.connected()) {
    return false;
  }

  // remember id for response if callback present
  if (cb) {
    if (!packet.getID()) {
      packet.setID('JSJaCID_' + this._ID++); // generate an ID
    }

    // register callback with id
    this._registerPID(packet, cb, arg);
  }

  try {
    this._handleEvent(packet.pType() + '_out', packet);
    this._handleEvent('packet_out', packet);
    this._ws.send(packet.xml());
  } catch (e) {
    this.oDbg.log(e.toString(), 1);
    return false;
  }

  return true;
};

/**
 * Resuming connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.resume = function() {
  return false; // not supported for websockets
};

/**
 * Suspending connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.suspend = function() {
  return false; // not supported for websockets
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S1 = function(event) {
  var el = this._parseXml(event.data);
  return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S2 = function(event) {
  var el = this._parseXml(event.data);
  return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S1 = function(event) {
  var el = this._parseXml(event.data);
  return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S2 = function(event) {
  var el = this._parseXml(event.data);
  return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDone = function(event) {
  var el = this._parseXml(event.data);
  return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDone, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._reInitStream = function(cb) {
  var reqstr, streamto = this.domain;
  if (this.authhost) {
    streamto = this.authhost;
  }

  reqstr = '<stream:stream xmlns:stream="' + NS_STREAM + '" xmlns="jabber:client" to="' + streamto + '" version="1.0">';
  this._sendRaw(reqstr, cb);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._sendRaw = function(xml, cb, arg) {
  if (!this._ws) {
    // Socket might have been closed already because of an 'onerror'
    // event. In this case we'd try to send a closing stream element
    // 'ondisconnect' which won't work.
    return false;
  }
  if (cb) {
    this._ws.onmessage = JSJaC.bind(cb, this, arg);
  }
  this._ws.send(xml);
  return true;
};

/**
 * 解析Uint8Array为Jump Packet
 * 
 * @param opcodeArr
 * @param bodyArr
 */
JSJaCWebSocketConnection.prototype._parseUint8Array = function(opcodeArr, bodyArr) {
	this._setStatus('processing');
	if (!bodyArr) {
		return;
	}
	
	var event = OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr));
	console.log('【recv】\t'+ OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr)) +'\n\t' + this._uint8ArrayToString(bodyArr));
	
	// ping or auth
	if(bodyArr.byteLength == 0) {
		this._handleEvent('packet_in');
		this._handleEvent(event);
		return;
	}
	try{
		var body = JSON.parse(this._uint8ArrayToString(bodyArr));
		if(!this._handlePID(body)) {
			this._handleEvent('packet_in', body);
			this._handleEvent(event, body);
		}
	}catch(e){
	}
};


/* Copyright (c) 1998 - 2007, Paul Johnston & Contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following
 * disclaimer. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following
 * disclaimer in the documentation and/or other materials provided
 * with the distribution.
 *
 * Neither the name of the author nor the names of its contributors
 * may be used to endorse or promote products derived from this
 * software without specific prior written permission.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/**
 * @fileoverview Collection of MD5 and SHA1 hashing and encoding
 * methods.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */


/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
  { return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
  { return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
  { return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s)
{
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a array to a base-64 string
 */
function arr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input[i] << 16)
                | (i + 1 < len ? input[i+1] << 8 : 0)
                | (i + 2 < len ? input[i+2]      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}


/* #############################################################################
   UTF-8 Decoder and Encoder
   base64 Encoder and Decoder
   written by Tobias Kieslich, justdreams
   Contact: tobias@justdreams.de				http://www.justdreams.de/
   ############################################################################# */

// returns an array of byterepresenting dezimal numbers which represent the
// plaintext in an UTF-8 encoded version. Expects a string.
// This function includes an exception management for those nasty browsers like
// NN401, which returns negative decimal numbers for chars>128. I hate it!!
// This handling is unfortunately limited to the user's charset. Anyway, it works
// in most of the cases! Special signs with an unicode>256 return numbers, which
// can not be converted to the actual unicode and so not to the valid utf-8
// representation. Anyway, this function does always return values which can not
// misinterpretd by RC4 or base64 en- or decoding, because every value is >0 and
// <255!!
// Arrays are faster and easier to handle in b64 encoding or encrypting....
function utf8t2d(t)
{
  t = t.replace(/\r\n/g,"\n");
  var d=new Array; var test=String.fromCharCode(237);
  if (test.charCodeAt(0) < 0)
    for(var n=0; n<t.length; n++)
      {
        var c=t.charCodeAt(n);
        if (c>0)
          d[d.length]= c;
        else {
          d[d.length]= (((256+c)>>6)|192);
          d[d.length]= (((256+c)&63)|128);}
      }
  else
    for(var n=0; n<t.length; n++)
      {
        var c=t.charCodeAt(n);
        // all the signs of asci => 1byte
        if (c<128)
          d[d.length]= c;
        // all the signs between 127 and 2047 => 2byte
        else if((c>127) && (c<2048)) {
          d[d.length]= ((c>>6)|192);
          d[d.length]= ((c&63)|128);}
        // all the signs between 2048 and 66536 => 3byte
        else {
          d[d.length]= ((c>>12)|224);
          d[d.length]= (((c>>6)&63)|128);
          d[d.length]= ((c&63)|128);}
      }
  return d;
}

// returns plaintext from an array of bytesrepresenting dezimal numbers, which
// represent an UTF-8 encoded text; browser which does not understand unicode
// like NN401 will show "?"-signs instead
// expects an array of byterepresenting decimals; returns a string
function utf8d2t(d)
{
  var r=new Array; var i=0;
  while(i<d.length)
    {
      if (d[i]<128) {
        r[r.length]= String.fromCharCode(d[i]); i++;}
      else if((d[i]>191) && (d[i]<224)) {
        r[r.length]= String.fromCharCode(((d[i]&31)<<6) | (d[i+1]&63)); i+=2;}
      else {
        r[r.length]= String.fromCharCode(((d[i]&15)<<12) | ((d[i+1]&63)<<6) | (d[i+2]&63)); i+=3;}
    }
  return r.join("");
}

// included in <body onload="b64arrays"> it creates two arrays which makes base64
// en- and decoding faster
// this speed is noticeable especially when coding larger texts (>5k or so)
function b64arrays() {
  var b64s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  b64 = new Array();f64 =new Array();
  for (var i=0; i<b64s.length ;i++) {
    b64[i] = b64s.charAt(i);
    f64[b64s.charAt(i)] = i;
  }
}

// creates a base64 encoded text out of an array of byerepresenting dezimals
// it is really base64 :) this makes serversided handling easier
// expects an array; returns a string
function b64d2t(d) {
  var r=new Array; var i=0; var dl=d.length;
  // this is for the padding
  if ((dl%3) == 1) {
    d[d.length] = 0; d[d.length] = 0;}
  if ((dl%3) == 2)
    d[d.length] = 0;
  // from here conversion
  while (i<d.length)
    {
      r[r.length] = b64[d[i]>>2];
      r[r.length] = b64[((d[i]&3)<<4) | (d[i+1]>>4)];
      r[r.length] = b64[((d[i+1]&15)<<2) | (d[i+2]>>6)];
      r[r.length] = b64[d[i+2]&63];
      i+=3;
    }
  // this is again for the padding
  if ((dl%3) == 1)
    r[r.length-1] = r[r.length-2] = "=";
  if ((dl%3) == 2)
    r[r.length-1] = "=";
  // we join the array to return a textstring
  var t=r.join("");
  return t;
}

// returns array of byterepresenting numbers created of an base64 encoded text
// it is still the slowest function in this modul; I hope I can make it faster
// expects string; returns an array
function b64t2d(t) {
  var d=new Array; var i=0;
  // here we fix this CRLF sequenz created by MS-OS; arrrgh!!!
  t=t.replace(/\n|\r/g,""); t=t.replace(/=/g,"");
  while (i<t.length)
    {
      d[d.length] = (f64[t.charAt(i)]<<2) | (f64[t.charAt(i+1)]>>4);
      d[d.length] = (((f64[t.charAt(i+1)]&15)<<4) | (f64[t.charAt(i+2)]>>2));
      d[d.length] = (((f64[t.charAt(i+2)]&3)<<6) | (f64[t.charAt(i+3)]));
      i+=4;
    }
  if (t.length%4 == 2)
    d = d.slice(0, d.length-2);
  if (t.length%4 == 3)
    d = d.slice(0, d.length-1);
  return d;
}

if (typeof(atob) == 'undefined' || typeof(btoa) == 'undefined')
  b64arrays();

if (typeof(atob) == 'undefined') {
  b64decode = function(s) {
    return utf8d2t(b64t2d(s));
  };
  b64decode_bin = function(s) {
    var dec = b64t2d(s);
    var ret = '';
    for(var i = 0; i < dec.length; i++) {
      ret += String.fromCharCode(dec[i]);
    }
    return ret;
  };
} else {
  b64decode = function(s) {
    return decodeURIComponent(escape(atob(s)));
  };
  b64decode_bin = atob;
}

if (typeof(btoa) == 'undefined') {
  b64encode = function(s) {
    return b64d2t(utf8t2d(s));
  };
} else {
  b64encode = function(s) {
    return btoa(unescape(encodeURIComponent(s)));
  };
}

/* JSJaC - The JavaScript Jabber Client Library
 * Copyright (C) 2004-20014 Stefan Strigler et al.
 *
 * JSJaC is licensed under the terms of the Mozilla Public License
 * version 1.1 or, at your option, under the terms of the GNU General
 * Public License version 2 or subsequent, or the terms of the GNU Lesser
 * General Public License version 2.1 or subsequent. 
 *
 * Please visit https://github.com/sstrigler/JSJaC/ for details about JSJaC.
 */

function createXHR() {
	var xhr;
	if (typeof ActiveXObject != 'undefined') {
		var aVersions = [ "Microsoft.XMLHTTP", "Msxml2.XMLHttp.6.0",
		                  "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0",
		                  "Msxml2.XMLHttp.3.0" ];
		for (var i = 0; i < aVersions.length; i++) {
			try {
				xhr = new ActiveXObject(aVersions[i]);
			} catch (e) {
			}
		}
	} else if (typeof XMLHttpRequest != 'undefined') {
		xhr = new XMLHttpRequest();
	}
	return xhr;
}

if (window.XDomainRequest) {
    window.ieXDRToXHR = function(window) {
        "use strict";
        var XHR = window.XMLHttpRequest;

        window.XMLHttpRequest = function() {
            this.onreadystatechange = Object;

            this.xhr = null;
            this.xdr = null;

            this.readyState = 0;
            this.status = '';
            this.statusText = null;
            this.responseText = null;

            this.getResponseHeader = null;
            this.getAllResponseHeaders = null;

            this.setRequestHeader = null;

            this.abort = null;
            this.send = null;
            this.isxdr = false;

            // static binding
            var self = this;

            self.xdrLoadedBinded = function() {
                self.xdrLoaded();
            };
            self.xdrErrorBinded = function() {
                self.xdrError();
            };
            self.xdrProgressBinded = function() {
                self.xdrProgress();
            };
            self.xhrReadyStateChangedBinded = function() {
                self.xhrReadyStateChanged();
            };
        };

        XMLHttpRequest.prototype.open = function(method, url, asynch, user, pwd) {
            //improve CORS deteciton (chat.example.net exemple.net), remove hardcoded http-bind
            var parser = document.createElement('a');
            parser.href = url;
            if (parser.hostname!=document.domain) {
                if (this.xdr === null){
                    this.xdr = new window.XDomainRequest();
                }

                this.isxdr = true;
                this.setXDRActive();
                this.xdr.open(method, url);
            } else {
                if (this.xhr === null){
                    this.xhr = new XHR();
                }

                this.isxdr = false;
                this.setXHRActive();
                this.xhr.open(method, url, asynch, user, pwd);
            }
        };

        XMLHttpRequest.prototype.xdrGetResponseHeader = function(name) {
            if (name === 'Content-Type' && this.xdr.contentType > ''){
                return this.xdr.contentType;
            }

            return '';
        };
        
        XMLHttpRequest.prototype.xdrGetAllResponseHeaders = function() {
            return (this.xdr.contentType > '') ? 'Content-Type: ' + this.xdr.contentType : '';
        };
        
        XMLHttpRequest.prototype.xdrSetRequestHeader = function(name, value) {
            //throw new Error('Request headers not supported');
        };
        
        XMLHttpRequest.prototype.xdrLoaded = function() {
            if (this.onreadystatechange !== null) {
                this.readyState = 4;
                this.status = 200;
                this.statusText = 'OK';
                this.responseText = this.xdr.responseText;
                if (window.ActiveXObject){
                    var doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async='false';
                    doc.loadXML(this.responseText);
                    this.responseXML = doc;
                }
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.xdrError = function() {
            if (this.onreadystatechange !== null) {
                this.readyState = 4;
                this.status = 0;
                this.statusText = '';
                // ???
                this.responseText = '';
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.xdrProgress = function() {
            if (this.onreadystatechange !== null && this.status !== 3) {
                this.readyState = 3;
                this.status = 3;
                this.statusText = '';
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.finalXDRRequest = function() {
            var xdr = this.xdr;
            delete xdr.onload;
            delete xdr.onerror;
            delete xdr.onprogress;
        };
        
        XMLHttpRequest.prototype.sendXDR = function(data) {
            var xdr = this.xdr;

            xdr.onload = this.xdrLoadedBinded;
            xdr.onerror = this.xdr.ontimeout = this.xdrErrorBinded;
            xdr.onprogress = this.xdrProgressBinded;
            this.responseText = null;

            this.xdr.send(data);
        };
        
        XMLHttpRequest.prototype.abortXDR = function() {
            this.finalXDRRequest();
            this.xdr.abort();
        };
        
        XMLHttpRequest.prototype.setXDRActive = function() {
            this.send = this.sendXDR;
            this.abort = this.abortXDR;
            this.getResponseHeader = this.xdrGetResponseHeader;
            this.getAllResponseHeaders = this.xdrGetAllResponseHeaders;
            this.setRequestHeader = this.xdrSetRequestHeader;
        };

        XMLHttpRequest.prototype.xhrGetResponseHeader = function(name) {
            return this.xhr.getResponseHeader(name);
        };
        
        XMLHttpRequest.prototype.xhrGetAllResponseHeaders = function() {
            return this.xhr.getAllResponseHeaders();
        };
        
        XMLHttpRequest.prototype.xhrSetRequestHeader = function(name, value) {
            return this.xhr.setRequestHeader(name, value);
        };
        
        XMLHttpRequest.prototype.xhrReadyStateChanged = function() {
            if (this.onreadystatechange !== null && this.readyState !== this.xhr.readyState) {
                var xhr = this.xhr;

                this.readyState = xhr.readyState;
                if (this.readyState === 4) {
                    this.status = xhr.status;
                    this.statusText = xhr.statusText;
                    this.responseText = xhr.responseText;
                    this.responseXML = xhr.responseXML;
                }

                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.finalXHRRequest = function() {
            delete this.xhr.onreadystatechange;
        };
        XMLHttpRequest.prototype.abortXHR = function() {
            this.finalXHRRequest();
            this.xhr.abort();
        };
        XMLHttpRequest.prototype.sendXHR = function(data) {
            this.xhr.onreadystatechange = this.xhrReadyStateChangedBinded;

            this.xhr.send(data);
        };
        XMLHttpRequest.prototype.setXHRActive = function() {
            this.send = this.sendXHR;
            this.abort = this.abortXHR;
            this.getResponseHeader = this.xhrGetResponseHeader;
            this.getAllResponseHeaders = this.xhrGetAllResponseHeaders;
            this.setRequestHeader = this.xhrSetRequestHeader;
        };

        window.ieXDRToXHR = undefined;
    };
    var isWebsocketSupport = (function() {
		var isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1 ; //判断是否Safari 
		if(isSafari)
			return false;
		window.WebSocket =window.WebSocket || window.MozWebSocket;
		if (window.WebSocket) {
			return true;
		}
		return false;
	})();
    if(!isWebsocketSupport)
    	window.ieXDRToXHR(window);
}

/**
 * @fileoverview Collection of functions to make live easier
 * @author Stefan Strigler
 */

/**
 * Convert special chars to HTML entities
 * @addon
 * @return The string with chars encoded for HTML
 * @type String
 */
String.prototype.htmlEnc = function() {
  if(!this)
    return this;

  var str = this.replace(/&/g,"&amp;");
  str = str.replace(/</g,"&lt;");
  str = str.replace(/>/g,"&gt;");
  str = str.replace(/\"/g,"&quot;");
  str = str.replace(/\n/g,"<br />");
  return str;
};

/**
 * Convert HTML entities to special chars
 * @addon
 * @return The normal string
 * @type String
 */
String.prototype.revertHtmlEnc = function() {
  if(!this)
    return this;

  var str = this.replace(/&amp;/gi,'&');
  str = str.replace(/&lt;/gi,'<');
  str = str.replace(/&gt;/gi,'>');
  str = str.replace(/&quot;/gi,'\"');
  str = str.replace(/<br( )?(\/)?>/gi,'\n');
  return str;
};

/**
 * Converts from jabber timestamps to JavaScript Date objects
 * @addon
 * @param {String} ts A string representing a jabber datetime timestamp as
 * defined by {@link http://www.xmpp.org/extensions/xep-0082.html XEP-0082}
 * @return A javascript Date object corresponding to the jabber DateTime given
 * @type Date
 */
Date.jab2date = function(ts) {
  var date = new Date(Date.UTC(ts.substr(0,4),ts.substr(5,2)-1,ts.substr(8,2),ts.substr(11,2),ts.substr(14,2),ts.substr(17,2)));
  if (ts.substr(ts.length-6,1) != 'Z') { // there's an offset
    var offset = new Date();
    offset.setTime(0);
    offset.setUTCHours(ts.substr(ts.length-5,2));
    offset.setUTCMinutes(ts.substr(ts.length-2,2));
    if (ts.substr(ts.length-6,1) == '+')
      date.setTime(date.getTime() - offset.getTime());
    else if (ts.substr(ts.length-6,1) == '-')
      date.setTime(date.getTime() + offset.getTime());
  }
  return date;
};

/**
 * Takes a timestamp in the form of 2004-08-13T12:07:04+02:00 as argument
 * and converts it to some sort of humane readable format
 * @addon
 */
Date.hrTime = function(ts) {
  return Date.jab2date(ts).toLocaleString();
};

/**
 * somewhat opposit to {@link #hrTime}
 * expects a javascript Date object as parameter and returns a jabber
 * date string conforming to
 * {@link http://www.xmpp.org/extensions/xep-0082.html XEP-0082}
 * @see #hrTime
 * @return The corresponding jabber DateTime string
 * @type String
 */
Date.prototype.jabberDate = function() {
  var padZero = function(i) {
    if (i < 10) return "0" + i;
    return i;
  };

  var jDate = this.getUTCFullYear() + "-";
  jDate += padZero(this.getUTCMonth()+1) + "-";
  jDate += padZero(this.getUTCDate()) + "T";
  jDate += padZero(this.getUTCHours()) + ":";
  jDate += padZero(this.getUTCMinutes()) + ":";
  jDate += padZero(this.getUTCSeconds()) + "Z";

  return jDate;
};

/**
 * Determines the maximum of two given numbers
 * @addon
 * @param {Number} A a number
 * @param {Number} B another number
 * @return the maximum of A and B
 * @type Number
 */
Number.max = function(A, B) {
  return (A > B)? A : B;
};

Number.min = function(A, B) {
  return (A < B)? A : B;
};

var browserSys = {};	
var browserUa = navigator.userAgent.toLowerCase();
var b;
(b = browserUa.match(/msie ([\d.]+)/)) ? browserSys.ie = b[1] :
(b = browserUa.match(/firefox\/([\d.]+)/)) ? browserSys.firefox = b[1] :
(b = browserUa.match(/chrome\/([\d.]+)/)) ? browserSys.chrome = b[1] :
(b = browserUa.match(/version\/([\d.]+).*safari/)) ? browserSys.safari = b[1] : 0;

var isFormDataSupport = !!window.FormData && Object.prototype.toString.call(FormData) === '[object Function]';
//var isFormDataSupport = false;

if(isFormDataSupport === true) {
	jQuery.fn._Huploadify = snsimUploadUseXHR;
} else {
	jQuery.fn._Huploadify = function(){};
}
/**
 * 发送消息时, 若内容为file类型，则使用此类进行封装到message.body.content
 */
var SNSFile = function(name,path, size){
	this.path = path;
	this.name = name;
	this.size = size;
	this.type = getFileSuffix(name);
	//this.isImage = isImage;
	
	//获取文件后缀名
	function getFileSuffix(filename){
		if(filename){
			var index = filename.lastIndexOf(".");
			if(index!=-1){
				var suffix =  filename.substring(index+1).toLowerCase();
				return suffix;
			}
			return "unknown";
		}
	}
	
};

SNSFile.prototype.renderSize = function(){
	return SNSFile.renderSize(this.size);
};

SNSFile.roundFun = function(numberRound, roundDigit) {
	if (numberRound >= 0) {
		var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
		return tempNumber;
	} else {
		numberRound1 = -numberRound;
		var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
		return -tempNumber;
	}
};
/* 附件大小格式人性化显示处理 */
SNSFile.renderSize = function(value) {
	if (null == value || value == '') {
		return "";
	}
	var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
	var index = 0;

	var srcsize = parseFloat(value);
	var size = SNSFile.roundFun(srcsize / Math.pow(1024, (index = Math.floor(Math.log(srcsize) / Math.log(1024)))), 0);
	return size + unitArr[index];
};

var FileUpload = function(inputId){
	this.inputId = inputId;
	this.fileObj;
};

/**
 * 获取FileUpload实例，并更新配置
 * @param inputId input file的id
 * @param opts 配置
 * @returns
 */
FileUpload.getInstance = function(inputId,opts){
	if(!FileUpload.list)
		FileUpload.list = new SNSBaseList();
	var fileUpload = FileUpload.list.get(inputId);
	// 防止多次执行Huploadify
	//if(fileUpload)
	//	return fileUpload;
	if(!fileUpload){
		fileUpload = new FileUpload(inputId);
		FileUpload.list.add(inputId, fileUpload);
	}
	if(opts){
		jQuery('#' + inputId)._Huploadify(opts);
	}
	return fileUpload;
};

/**
 * jQuery.fn.Huploadify中使用
 * @param inputId
 * @returns
 */
FileUpload.getInstanceByInputId = function(inputId){
	return FileUpload.list.get(inputId);
};

FileUpload.prototype.sendFile = function(target){
	this.fileObj.funSendFile(target);
};

//将文件的单位由bytes转换为KB或MB，若第二个参数指定为true，则永远转换为KB
FileUpload.formatFileSize = function(size,byKB){
	if (size> 1024 * 1024&&!byKB){
		size = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	}
	else{
		size = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
	}
	return size;
};

//根据文件序号获取文件
FileUpload.getFile = function(index,files){
	for(var i=0;i<files.length;i++){	   
	  if(files[i].index == index){
		  return files[i];
		}
	}
	return false;
};
if (isFormDataSupport === false) {
	var SNSIMUploadUseFlash = function() {
		this.swfUploadList = new SNSBaseList();
	};

	SNSIMUploadUseFlash.getInstance = function() {
		if (!SNSIMUploadUseFlash._instance) {
			SNSIMUploadUseFlash._instance = new SNSIMUploadUseFlash();
		}
		return SNSIMUploadUseFlash._instance;
	};

	/**
	 * option{ button_placeholder_id: placeHolderId, style: placeHolderStyle}
	 */
	SNSIMUploadUseFlash.prototype.addUploader = function(option) {
		if (this.swfUploadList.get(option.button_placeholder_id))
			return;
		var swfUpload = new SWFUpload(
				{
					upload_url : "", // 处理文件上传的url
					flash_url : option.flash_url, // flash路径
					
					// 按钮设置
					button_placeholder_id : option.button_placeholder_id,
					button_image_url : option.button_image_url,
		            button_width : option.button_width,
		            button_height : option.button_height,
		            button_text : option.button_text,
		            button_text_style : option.button_text_style,
		            button_text_left_padding : option.button_text_left_padding,
		            button_text_top_padding : option.button_text_top_padding,
		            button_disabled: option.button_disabled,
		            button_cursor : option.button_cursor,
		            button_window_mode: option.button_window_mode,
					
					// 上传文件限制设置
					file_size_limit : "30000", // 30MB
					file_types : option.contentType == "image" || option.contentType == "avatar"? "*.jpg;*.gif;*.jpeg;*.png;*.bmp" : "*.*",
					file_types_description : "Image Files",
					file_queue_limit : "1",
					chat_info : {},
					content_type : option.contentType == "avatar"? 'avatar': (option.contentType == "image"? 8 : 4),
					// 在文件选取窗口将要弹出时触发
					file_dialog_start_handler : function() {
					},
					// 当一个文件被添加到上传队列时会触发此事件，提供的唯一参数为包含该文件信息的file object对象
					file_queued_handler : function(file) {
						var chatInfo = (option.getChatInfo && option.getChatInfo()) || {},
							url = YYIMChat.getServletPath().FILE_UPLOAD_SERVLET,
							fromUser, 
							toUser, 
							token;
						var toId = chatInfo.to || YYIMChat.getUserNode();
						if (YYIMChat.isAnonymous()) {
							fromUser = YYIMChat.getUserFullJID();
							token = "anonymous";
						} else {
							fromUser = YYIMChat.getUserNode();
							token = YYIMChat.getToken();
						}

						if (chatInfo.resource && chatInfo.resource.toLowerCase() == "anonymous") {
							toUser = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getID(toId), "ANONYMOUS");
						} else {
							toUser = YYIMChat.getJIDUtil().getNode(toId);
						}
						url = url + "?fileName=" + encodeURI(file.name, "utf-8") + "&uploadedSize=0&fileSize=" + file.size
								+ "&fromUser=" + fromUser + "&toUser=" + toUser + "&token=" + token + "&muc=1";
						if (option.contentType === 'avatar') {
							url += "&isAvatar=true";
						}
						this.settings.chat_info = {
							to: YYIMChat.getJIDUtil().getNode(toId),
							type: chatInfo.type? chatInfo.type : 'chat',
							resource: chatInfo.resource
						};
						this.setUploadURL(url);
					},
					/**
					 * 当文件添加到上传队列失败时触发此事件，失败的原因可能是文件大小超过了你允许的数值、文件是空的或者文件队列已经满员了等。
					 * 该事件提供了三个参数。第一个参数是当前出现问题的文件对象，第二个参数是具体的错误代码，可以参照SWFUpload.QUEUE_ERROR中定义的常量
					 */
					file_queue_error_handler : function() {
						option.error && option.error(arguments);
					},
					/**
					 * 当文件选取完毕且选取的文件经过处理后（指添加到上传队列），会立即触发该事件。可以在该事件中调用this.startUpload()方法来实现文件的自动上传
					 * 参数number of files selected指本次在文件选取框里选取的文件数量 参数number of
					 * files queued指本次被添加到上传队列的文件数量 参数total number of files in
					 * the queued指当前上传队列里共有多少个文件（包括了本次添加进去的文件）
					 */
					file_dialog_complete_handler : function() {
						this.startUpload();
					},
					/**
					 * 当文件即将上传时会触发该事件,该事件给了你在文件上传前的最后一次机会来验证文件信息、增加要随之上传的附加信息或做其他工作。可以通过返回false来取消本次文件的上传
					 * 参数file object为当前要上传的文件的信息对象
					 */
					upload_start_handler : function() {
					},
					/**
					 * 该事件会在文件的上传过程中反复触发，可以利用该事件来实现上传进度条 参数file object为文件信息对象
					 * 参数bytes complete为当前已上传的字节数 参数total bytes为文件总的字节数
					 */
					upload_progress_handler : function() {
					},
					/**
					 * 文件上传被中断或是文件没有成功上传时会触发该事件。停止、取消文件上传或是在uploadStart事件中返回false都会引发这个事件，但是如果某个文件被取消了但仍然还在队列中则不会触发该事件
					 * 参数file object为文件信息对象 参数error
					 * code为错误代码，具体的可参照SWFUpload.UPLOAD_ERROR中定义的常量
					 */
					upload_error_handler : function() {
						option.error && option.error(arguments);
					},
					/**
					 * 当一个文件上传成功后会触发该事件 参数file object为文件信息对象 参数server
					 * data为服务器端输出的数据
					 */
					upload_success_handler : function(file, resp) {
						var settings = this.settings;
						if (JSON.parse(resp).code == "200") {
							var attachId = JSON.parse(resp).result.attachId;
							if(option.contentType === 'avatar'){
								option.success&&option.success(attachId);
							}
							else {
								var arg = {
										id : Math.uuid(),
										body : {
											content : new SNSFile(file.name, attachId, file.size),
											contentType : settings.content_type,
											dateline : new Date().getTime()
										},
										to : settings.chat_info.to,
										type : settings.chat_info.type,
										success : function(msg) {
											var _msg = Object.clone(msg);
											_msg.to = YYIMChat.getJIDUtil().getID(msg.to);
//											_msg.body.content.path = YYIMChat.getFileUrl(_msg.body.content.path);
											option.success && option.success(_msg);
										}
								};
								if (settings.chat_info.resource) {
									arg.resource = settings.chat_info.resource;
								}
								YYIMChat.sendMessage(arg);
							}
						}

					},
					/**
					 * 当一次文件上传的流程完成时（不管是成功的还是不成功的）会触发该事件，该事件表明本次上传已经完成，上传队列里的下一个文件可以开始上传了。该事件发生后队列中下一个文件的上传将会开始
					 */
					upload_complete_handler : function() {
					}
				});
		this.swfUploadList.add(option.button_placeholder_id, swfUpload);
	};
}
var isDelete=false;
var filesIndex = "" ;
var deletefilesIndex = "" ;

/**支持图标显示的文件类型**/
var FILE_TYPES = ["rar","zip","pdf","txt","html"];
var IMAGE_TYPES = ["png", "gif","jpg","jpeg","bmp"];

var UPLOAD_AVATAR = "snsim_upload_avatar";

function snsimUploadUseXHR(opts){
	var itemTemp = '<div id="${fileID}" class="uploadify-queue-item"><div class="upload_file_icon"><img src="${fileTypeIcon}" /></div><div class="uploadify-progress"><div id="udn_uploadify_progress_bar" class="uploadify-progress-bar"></div></div><span class="up_filename">${fileName}</span><span class="uploadbtn" style="display:none;">上传</span><button id="btnstop" style="display:none;" >stop</button><button id="${continueUpload}" style="display:none;">续传</button><span class="delfilebtn" ></span></div>';
	var defaults = {
		fileTypeExts:'*',//允许上传的文件类型，指定类型格式：'jpg;doc'，所有：'*'
		uploader:'',//文件提交的地址
		auto:true,//是否开启自动上传
		method:'post',//发送请求的方式，get或post
		formData:{},//发送给服务端的参数，格式：{key1:value1,key2:value2}
		fileObjName:'file',//在后端接受文件的参数名称，如PHP中的$_FILES['file']
		fileSizeLimit:2048,//允许上传的文件大小，单位KB
		showUploadedPercent:true,//是否实时显示上传的百分比，如20%
		showUploadedSize:true,//是否实时显示已上传的文件大小，如1M/2M
		buttonText:'',//上传按钮上的文字
		removeTimeout: 100,//上传完成后进度条的消失时间
		itemTemplate:itemTemp,//上传队列显示的模板
		breakPoints:true,//是否开启断点续传
		fileSplitSize:1024*1024*10,//断点续传的文件块大小，单位Byte，默认1M
		getUploadedSize:null,//类型：function，自定义获取已上传文件的大小函数，用于开启断点续传模式，可传入一个参数file，即当前上传的文件对象，需返回number类型
		saveUploadedSize:null,//类型：function，自定义保存已上传文件的大小函数，用于开启断点续传模式，可传入两个参数：file：当前上传的文件对象，value：已上传文件的大小，单位Byte
		saveInfoLocal:true,//用于开启断点续传模式，是否使用localStorage存储已上传文件大小
		onUploadStart:null,//上传开始时的动作
		onUploadSuccess:null,//上传成功的动作
		onUploadComplete:null,//上传完成的动作
		onUploadError:null, //上传失败的动作
		onInit:null,//初始化时的动作
		onCancel:null,//删除掉某个文件后的回调函数，可传入参数file
		onSelect:null,//选择文件后执行的动作，可传入参数files，文件列表
		uploadIdPrefix:"file_upload_",
		inputId:null,// 文件输入框的id
		to: null,// 文件发送对象
		type: 4,// 发送文件的类型：file | image | avatar
		chatType: 'chat',
		showProcess: false,
		processId: null,
		resource:null
	}
	var option = jQuery.extend(defaults,opts);	
	
	//发送文件块函数
	var sendBlob = function(url,xhr,file,formdata,originalFileSize, userJid){
		var jid = userJid;
		// 不是设备
		// if(!SNSApplication.getInstance().getUser().deviceList.get(jid)){
		// jid = new JSJaCJID(userJid).getBareJID();
		// }
		var isUploadSize=parseInt(SNSStorage.getLocalVal(file.name)) || 0;
		var fromUser, toUser, token;
		if(YYIMChat.isAnonymous()){
			fromUser = YYIMChat.getUserFullJID();
			token = "anonymous";
		}else{
			fromUser = YYIMChat.getUserNode();
			token = YYIMChat.getToken();
		}
		
		if(option.resource && option.resource.toLowerCase() == "anonymous"){
			toUser = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getID(jid),"ANONYMOUS");
		}else{
			if(option.chatType == 'groupchat')
				toUser = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(jid));
			else
				toUser = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(jid));
		}
		url = url+"?fileName=" + encodeURI(file.name,"utf-8") + "&uploadedSize=" + isUploadSize + "&fileSize=" + originalFileSize 
		+ "&fromUser=" + fromUser + "&toUser=" + toUser + "&token=" + token + "&muc=1";
		//console.info(url);
		if(option.type == UPLOAD_AVATAR){
			url += "&isAvatar=true";
		}
		
		var url = YYIMChat.getServletPath().REST_RESOURCE_SERVLET + YYIMChat.getTenancy().ETP_KEY + '/' + YYIMChat.getTenancy().APP_KEY + '/upload?token=' + YYIMChat.getToken();
		var params = {
				name: encodeURI(file.name, "utf-8"),
				mediaType: option.type === 8? 1 : 2,
				creator: YYIMChat.getUserNode(),
				receiver: YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(jid)),
				size: originalFileSize,
				original: 1
		};
		
		if(option.chatType == 'groupchat'){
			params.receiver = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(jid));
		}
		
		url += '&' + jQuery.param(params);
		
		YYIMChat.log("file upload url", 2, url);
		xhr.open(option.method, url, true);
//	 	xhr.withCredentials = true;
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		var fd = new FormData();
		fd.append(option.fileObjName,file);
		if(formdata){
		  	for(key in formdata){
		  		fd.append(key,formdata[key]);
		  	}
		}
		xhr.send(fd);
	}

	this.each(function(){
		var _this = jQuery(this);
		//先添加上file按钮和上传列表
		var instanceNumber = jQuery('.uploadify').length+1;
		var uploadFileListStr = '<span id="'+option.uploadIdPrefix +instanceNumber+'-queue" class="uploadify-queue"></span>';
		var udnObj = jQuery("#" + option.processId);
		// 防止append uploadFileListStr 多次
		if(jQuery('#' + option.uploadIdPrefix +instanceNumber+'-queue').length <= 0 && option.showProcess){
			udnObj.append(uploadFileListStr);
//			jQuery("#" + option.processId).perfectScrollbar({suppressScrollX:true});
		}
		
		//创建文件对象
	 	FileUpload.getInstanceByInputId(option.inputId).fileObj = {
		  uploadAllowed: true,
		  fileInput: _this,				//html file控件
		  uploadFileList : udnObj.find('#'+option.uploadIdPrefix +instanceNumber+'-queue'),
		  url: option.uploader,						//ajax地址
		  fileFilter: [],					//过滤后的文件数组
		  uploadOver:false, //一次上传是否真正结束，用于断点续传的情况
		  filter: function(files) {		//选择文件组的过滤方法
			  var arr = [];
			  var typeArray = option.fileTypeExts.split(";");
			  for(var i=0,len=files.length;i<len;i++){
				  	var thisFile = files[i];
			  		if(parseInt(FileUpload.formatFileSize(thisFile.size,true))>option.fileSizeLimit){
			  			alert('文件'+thisFile.name+'大小超出限制！');
			  			continue;
			  		}
					if(option.fileTypeExts == "*" || jQuery.inArray(thisFile.name.split('.').pop().toLowerCase(),typeArray)>=0){
						arr.push(thisFile);
					}else{
						alert('文件'+thisFile.name+'类型不允许！');
					}  	
				}	
			  return arr;  	
		  },
		  //文件选择后
		  funSelect: function(files){
				for(var i=0,len=files.length;i<len;i++){
					var file = files[i];
					filesIndex += ","+file.index;
					
					// file type
					var type = "unknown";
					if(file.name){
						type = file.name.substr(file.name.lastIndexOf(".") + 1);
					}
					//处理模板中使用的变量
					var $html = jQuery(option.itemTemplate.replace(/\${fileID}/g,'fileupload_'+instanceNumber+'_'+file.index).replace(/\${fileTypeIcon}/g, "res/skin/default/icons/filetype/" + type + ".png").replace(/\${fileName}/g,file.name).replace(/\${fileSize}/g,FileUpload.formatFileSize(file.size)).replace(/\${instanceID}/g,_this.attr('id')).replace(/\${continueUpload}/g,"continueUpload_"+instanceNumber+"_"+file.index));
					//如果是自动上传，去掉上传按钮
					if(option.auto){
						$html.find('.uploadbtn').remove();
					}

					//如果开启断点续传，先初始化原来上传的文件大小
					var initWidth = 0,initFileSize = '0KB',initUppercent = '0%';
					if(option.breakPoints){
						var uploadedSize = this.funGetUploadedSize(file);	
					  	//先设置进度条为原来已上传的文件大小
					  	initWidth = (uploadedSize / file.size * 100) + '%';
					  	initFileSize = FileUpload.formatFileSize(uploadedSize);
					  	initUppercent = (uploadedSize / file.size * 100).toFixed(2) + '%';
					  	$html.find('.uploadify-progress-bar').css('width',initWidth);
					}

					this.uploadFileList.append($html);
					
					//判断是否显示已上传文件大小
					if(option.showUploadedSize){
						var num = '<span class="progressnum"><span id="isUploadingFileSize_'+instanceNumber+'_'+file.index+'" class="uploadedsize">'+initFileSize+'</span>/<span class="totalsize">${fileSize}</span></span>'.replace(/\${fileSize}/g,FileUpload.formatFileSize(file.size));
						$html.find('.uploadify-progress').after(num);
					}
					
					//判断是否显示上传百分比	
					if(option.showUploadedPercent){
						var percentText = '<span class="up_percent" style="display:none">'+initUppercent+'</span>';
						$html.find('.uploadify-progress').after(percentText);
						
					}

					option.onSelect&&option.onSelect(files);

					//判断是否是自动上传
					if(option.auto){
						this.funUploadFile(file);
					}
					else{
						//如果配置非自动上传，绑定上传事件
					 	$html.find('.uploadbtn').click(function(file){
					 			return function(){FileUpload.getInstanceByInputId(option.inputId).fileObj.funUploadFile(file);}
					 		}(file));
					}
					//为删除文件按钮绑定删除文件事件
			 		$html.find('.delfilebtn').click(function(file){
					 			return function(){
					 				FileUpload.getInstanceByInputId(option.inputId).fileObj.funDeleteFile(file);
					 			}
					 		}(file));
			 		
			 		$html.find('#btnstop').click(function(file){
			 			return function(){
			 				deletefilesIndex +=","+file.index;
			 			}
			 		}(file));
			 		
			 		$html.find('#continueUpload_'+instanceNumber+"_"+file.index).click(function(file){
			 			var fileIndex = file.index;
			 			return function(){
			 				if(deletefilesIndex.length > 0 && deletefilesIndex.indexOf(","+fileIndex) > -1){
			 					var arrIndex = deletefilesIndex.split(",");
			 					var strIndex="";
			 					for(var j=0;j<arrIndex.length;j++){
			 						if(arrIndex[j] != fileIndex && arrIndex[j] != ""){
			 							strIndex +=","+arrIndex[j];
			 						}
			 					}
			 					deletefilesIndex = strIndex;
			 				}
			 				var file = FileUpload.getFile(fileIndex,FileUpload.getInstanceByInputId(option.inputId).fileObj.fileFilter);
							file && FileUpload.getInstanceByInputId(option.inputId).fileObj.funUploadFile(file);
			 			}
			 		}(file));
			 		
			 	}

			 
			},				
		  onProgress: function(file, loaded, total) {
				var eleProgress = udnObj.find('#fileupload_'+instanceNumber+'_'+file.index+' .uploadify-progress');
				var thisLoaded = loaded;
				//根据上一次触发progress时上传的大小，得到本次的增量
				var lastLoaded = eleProgress.attr('lastLoaded') || 0;
				if(loaded < lastLoaded)
					lastLoaded =0;
				
				loaded -= parseInt(lastLoaded);
				
				var pprecentTemp = (loaded / total);
				pprecentTemp = pprecentTemp.toFixed(4);
				var percentProgress = pprecentTemp > 1 ? 1:pprecentTemp;
				
				option.onUploadProgress && option.onUploadProgress({
					percent:percentProgress,
					loaded:loaded,
					total:total
				});
				
//				var progressBar = eleProgress.children('.uploadify-progress-bar');
//				var oldWidth = parseFloat(progressBar.get(0).style.width || 0);
//				var percent = ((loaded / total) * 100 + oldWidth).toFixed(2);
//				var percentText = percent > 100 ? '99.99%' : percent+'%';//校正四舍五入的计算误差
//				if(option.showUploadedSize){
//					eleProgress.nextAll('.progressnum .uploadedsize').text(FileUpload.formatFileSize(loaded));
//					eleProgress.nextAll('.progressnum .totalsize').text(FileUpload.formatFileSize(total));
//				}
//				if(option.showUploadedPercent){
//					eleProgress.nextAll('.up_percent').text(percentText);
//					var uploadSize = FileUpload.formatFileSize((percent*total)/100);
//					if((percent*total)/100 > total)
//						uploadSize = FileUpload.formatFileSize(total);
//					document.getElementById("isUploadingFileSize_"+instanceNumber+"_"+file.index).innerHTML=uploadSize;
//				}
//				progressBar.css('width',percentText);
//
//				//记录本次触发progress时已上传的大小，用来计算下次需增加的数量
//				if(thisLoaded<option.fileSplitSize){
//					eleProgress.attr('lastLoaded',thisLoaded);
//				}
//				else{
//					eleProgress.removeAttr('lastLoaded');	
//				}

	  	},		//文件上传进度
	  	
		  /* 开发参数和内置方法分界线 */

		  //获取当前进度条的宽度，返回字符串如90%
		  funGetProgressWidth: function(index){
//		  	var eleProgressBar = udnObj.find('#fileupload_'+instanceNumber+'_'+index+' .uploadify-progress-bar');
//		  	return eleProgressBar.get(0).style.width || '';
		  },

		  //获取已上传的文件片大小，当开启断点续传模式
		  funGetUploadedSize: function(file){
		  	if(option.getUploadedSize){
		  		return option.getUploadedSize(file);
		  	}
		  	else{
		  		if(option.saveInfoLocal){
		  			return parseInt(SNSStorage.getLocalVal(file.name)) || 0;	
		  		}
		  	}
		  },

		  funSaveUploadedSize: function(file,value,deleteStorage){
		  	if(option.saveUploadedSize){
		  		option.saveUploadedSize(file,value);
		  	}
		  	else{
		  		if(option.saveInfoLocal && !deleteStorage){
		  			SNSStorage.setLocal(file.name, value);
		  		}
		  	}
		  },
		  
		  //获取选择文件，file控件
		  funSendFile: function(target) {
			  // 获取文件列表对象
			  var files = target.files;
			  //继续添加文件
			  files = this.filter(files);
			  for(var i=0,len=files.length;i<len;i++){
			  	this.fileFilter.push(files[i]);	
			  }
			  this.funDealFiles(files);
			  return this;
		  },
		  
		  //选中文件的处理与回调
		  funDealFiles: function(files) {
			  var fileCount = udnObj.find('.uploadify-queue .uploadify-queue-item').length;//队列中已经有的文件个数
			  for(var i=0,len=files.length;i<len;i++){
				  files[i].index = ++fileCount;
				  files[i].id = 'fileupload_'+instanceNumber+'_'+files[i].index;
				  }
			  //执行选择回调
			  this.funSelect(files);
			  
			  return this;
		  },
		  
		  //删除对应的文件
		  funDeleteFile: function(file) {
			  if(option.breakPoints){
				  deletefilesIndex += ","+ file.index;
			  }
						  
			  udnObj.find('#fileupload_'+instanceNumber+'_'+file.index).fadeOut();
			  FileUpload.getInstanceByInputId(option.inputId).fileObj.fileInput.val('');
			  option.onCancel&&option.onCancel(file);	
			  
			  var url = YYIMChat.getServletPath().FILE_DELETE_SERVLET;
			  var datas={"fileName":file.name,"toUser":option.to,"fromUser": YYIMChat.getUserNode(),"token":YYIMChat.getToken(), "muc":1};
			  
			  $.ajax({  
			        url : url,  
			        async : false, // 注意此处需要同步，因为返回完数据后，下面才能让结果的第一条selected  
			        type : "POST",  
			        data:datas,
			        dataType : "text",  
			        success : function(content) {
			        	if(content == "success"){
							//删除localstorage
							 SNSStorage.removeLocal(file.name);
							 isDelete=true;
						  }
			        },error:function(){
			        	//删除localstorage
						 SNSStorage.removeLocal(file.name);
						 isDelete=true;
			        }  
			    });
			  return this;
		  },
		  
		  //文件上传
		  funUploadFile: function(file) {
			  var xhr = false;
			  var originalFile = file;//保存原始为切割的文件
			  var thisfile = udnObj.find('#fileupload_'+instanceNumber+'_'+file.index);
			  var regulateView = function(){
			  	if(FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver){
			  		thisfile.find('.uploadify-progress-bar').css('width','100%');
						option.showUploadedSize&&thisfile.find('.uploadedsize').text(thisfile.find('.totalsize').text());
						option.showUploadedPercent&&thisfile.find('.up_percent').text('100%');	
			  	}
			  } //校正进度条和上传比例的误差

			  try{
				 xhr=new XMLHttpRequest();//尝试创建 XMLHttpRequest 对象，除 IE 外的浏览器都支持这个方法。
			  }catch(e){	  
				xhr=ActiveXobject("Msxml12.XMLHTTP");//使用较新版本的 IE 创建 IE 兼容的对象（Msxml2.XMLHTTP）。
			  }
			  if(xhr == "undefined"){
				  alert("浏览器版本不支持，请更新版本");
				  return;
			  }
			  //判断文件大小，小于30M时 或者 为图片时，不走断点续传
			  if(originalFile.size <= 30 *1024*1024 || originalFile.type.indexOf("image/") > -1 ){
				  option.breakPoints =false;
			  }else{
				  option.breakPoints = true;
			  }
			  if(option.breakPoints){
			  	var fileName = file.name,fileId = file.id,fileIndex = file.index, fileSize = file.size; //先保存原来的文件名称
			  	var uploadedSize = parseInt(this.funGetUploadedSize(originalFile));	
			  	//对文件进行切割，并保留原来的信息		
			  	//判断浏览器版本
			  	
			  	if (browserSys.firefox) {
					  var arr = browserSys.firefox.split(".");
					  if( arr[0] > 6 && arr[0] < 15){
						  file = originalFile.mozSlice(uploadedSize,uploadedSize + option.fileSplitSize);
					  }else{
						  file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
					  }
				}else if (browserSys.chrome) {
					  var arr = browserSys.chrome.split(".");
					  if(arr[0] > 10 && arr[0] < 21){
						  file = originalFile.webkitSlice(uploadedSize,uploadedSize + option.fileSplitSize);
					  }else{
						  file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
					  }
				}else{
					 file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
				}
			  	
			  	file.name = fileName;file.id = fileId;file.index = fileIndex;
			  }
			  		
			  if (xhr.upload && uploadedSize !== false) {
				  // 上传中
				  xhr.upload.addEventListener("progress", function(e) {
					  FileUpload.getInstanceByInputId(option.inputId).fileObj.onProgress(file, e.loaded, originalFile.size);
				  }, false);
			  }	
			  var userJid = option.to;
			  originalFile.userJid=userJid;
			  
			  // 文件上传成功或是失败
			  xhr.onreadystatechange = function(e) {
				  if (xhr.readyState == 4) {
					  FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver = true;
					  if (xhr.status == 200) {
						  var returnData = JSON.parse(xhr.responseText) ;
						  if(returnData.status == "success"){
							  //在指定的间隔时间后删掉进度条
							  setTimeout(function(){
								  udnObj.find('#fileupload_'+instanceNumber+'_'+originalFile.index).fadeOut();
							  },100);
							  SNSStorage.removeLocal(file.name);
						  }
						  var findex = originalFile.index;
						  //将文件块数据更新到本地记录
						  if(true){
							  if(option.breakPoints){
								  //更新已上传文件大小，保存到本地
								  uploadedSize += option.fileSplitSize;
								  if(returnData.status == "success" || isDelete){
									  FileUpload.getInstanceByInputId(option.inputId).fileObj.funSaveUploadedSize(originalFile,uploadedSize,true);	
									  isDelete = false;
								  }else {
									  FileUpload.getInstanceByInputId(option.inputId).fileObj.funSaveUploadedSize(originalFile,uploadedSize,false);
								  }
								  
								  //再次清空一下storage
								  if(deletefilesIndex.indexOf(findex) > -1){
									  SNSStorage.removeLocal(originalFile.name);
								  }
								  
								  //继续上传其他片段
								  if(uploadedSize< fileSize ){
									  FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver = false;
									  //if(FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadAllowed){
									  if(filesIndex.indexOf(","+findex) > -1 && deletefilesIndex.indexOf(findex) == -1){
										  if (browserSys.firefox) {
											  var arr = browserSys.firefox.split(".");
											  if( arr[0] > 6 && arr[0] < 15){
												  file = originalFile.mozSlice(uploadedSize,uploadedSize + option.fileSplitSize);
											  }else{
												  file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
											  }
										  }else if (browserSys.chrome) {
											  var arr = browserSys.chrome.split(".");
											  if(arr[0] > 10 && arr[0] < 21){
												  file = originalFile.webkitSlice(uploadedSize,uploadedSize + option.fileSplitSize);
											  }else{
												  file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
											  }
										  }else{
											  file = originalFile.slice(uploadedSize,uploadedSize + option.fileSplitSize);
										  }
										  //file = originalFile.webkitSlice(uploadedSize,uploadedSize + option.fileSplitSize);
										  file.name = fileName;file.id = fileId;file.index = fileIndex;file.size = fileSize;
										  sendBlob(FileUpload.getInstanceByInputId(option.inputId).fileObj.url,xhr,file,option.formData,originalFile.size,userJid);	
									  }
								  }
								  else{
									  regulateView();
								  }
							  }
							  else{
								  regulateView();
							  }
							  
						  }
						  
						  if(FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver){
							  if(option.type == UPLOAD_AVATAR){
								  option.onUploadSuccess&&option.onUploadSuccess(returnData);
							  } else {
								  // 成功后发送文件并执行回调函数，一般回调函数用于界面的渲染
								  // var type = "chat";
								  // if(new JSJaCJID(returnData.toUser).getDomain() != YYIMChat.getServerName()){
								  //	 type = "groupchat";
								  // }
								  // TODO if pubAccount	
//								  var rspContent = returnData.result;
								  var arg = {
										  id: Math.uuid(),
										  body: {
											  content: new SNSFile(file.name, returnData.attachId, file.size),
											  contentType: option.type,
											  dateline: new Date().getTime()
										  },
										  to: option.to,
										  type: option.chatType,
										  success: function(msg){
											  var _msg = Object.clone(msg);
											  _msg.to = YYIMChat.getJIDUtil().getID(msg.to);
//											  _msg.body.content.path = YYIMChat.getFileUrl(_msg.body.content.path);
											  option.onUploadSuccess&&option.onUploadSuccess(_msg);
										  }
								  };
								  if(option.resource){
									  arg.resource = option.resource;
								  }
								  YYIMChat.sendMessage(arg);
							  }
							  //在指定的间隔时间后删掉进度条
							  setTimeout(function(){
								  udnObj.find('#fileupload_'+instanceNumber+'_'+originalFile.index).fadeOut();
							  },option.removeTimeout);	
						  }
						  
					  } else {
						  FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver&&option.onUploadError&&option.onUploadError(originalFile, xhr.responseText);		
						  setTimeout(function(){
							  udnObj.find('#fileupload_'+instanceNumber+'_'+originalFile.index).fadeOut();
						  },100);
						  SNSStorage.removeLocal(file.name);
					  }
					  
					  if (FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadOver) {
						  option.onUploadComplete&&option.onUploadComplete(originalFile,xhr.responseText);
						  //清除文件选择框中的已有值
						  FileUpload.getInstanceByInputId(option.inputId).fileObj.fileInput.val('');	
					  };
					  
				  }
			  };
			  
			  option.onUploadStart&&option.onUploadStart();	
			  
			  FileUpload.getInstanceByInputId(option.inputId).fileObj.uploadAllowed = true;//重置允许上传为true
			  sendBlob(this.url,xhr,file,option.formData,originalFile.size, userJid);
		  }
	 	};
	 	option.onInit&&option.onInit();
	}); 
};
/**
 * SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com
 *
 * mmSWFUpload 1.0: Flash upload dialog - http://profandesign.se/swfupload/,  http://www.vinterwebb.se/
 *
 * SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilz�n and Mammon Media and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


/* ******************* */
/* Constructor & Init  */
/* ******************* */
if(isFormDataSupport === false) {
	var SWFUpload;
	
	if (SWFUpload == undefined) {
		SWFUpload = function (settings) {
			this.initSWFUpload(settings);
		};
	}
	
	SWFUpload.prototype.initSWFUpload = function (settings) {
		try {
			this.customSettings = {};	// A container where developers can place their own settings associated with this instance.
			this.settings = settings;
			this.eventQueue = [];
			this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
			this.movieElement = null;
	
	
			// Setup global control tracking
			SWFUpload.instances[this.movieName] = this;
	
			// Load the settings.  Load the Flash movie.
			this.initSettings();
			this.loadFlash();
			this.displayDebugInfo();
		} catch (ex) {
			delete SWFUpload.instances[this.movieName];
			throw ex;
		}
	};
	
	/* *************** */
	/* Static Members  */
	/* *************** */
	SWFUpload.instances = {};
	SWFUpload.movieCount = 0;
	SWFUpload.version = "2.2.0 2009-03-25";
	SWFUpload.QUEUE_ERROR = {
		QUEUE_LIMIT_EXCEEDED	  		: -100,
		FILE_EXCEEDS_SIZE_LIMIT  		: -110,
		ZERO_BYTE_FILE			  		: -120,
		INVALID_FILETYPE		  		: -130
	};
	SWFUpload.UPLOAD_ERROR = {
		HTTP_ERROR				  		: -200,
		MISSING_UPLOAD_URL	      		: -210,
		IO_ERROR				  		: -220,
		SECURITY_ERROR			  		: -230,
		UPLOAD_LIMIT_EXCEEDED	  		: -240,
		UPLOAD_FAILED			  		: -250,
		SPECIFIED_FILE_ID_NOT_FOUND		: -260,
		FILE_VALIDATION_FAILED	  		: -270,
		FILE_CANCELLED			  		: -280,
		UPLOAD_STOPPED					: -290
	};
	SWFUpload.FILE_STATUS = {
		QUEUED		 : -1,
		IN_PROGRESS	 : -2,
		ERROR		 : -3,
		COMPLETE	 : -4,
		CANCELLED	 : -5
	};
	SWFUpload.BUTTON_ACTION = {
		SELECT_FILE  : -100,
		SELECT_FILES : -110,
		START_UPLOAD : -120
	};
	SWFUpload.CURSOR = {
		ARROW : -1,
		HAND : -2
	};
	SWFUpload.WINDOW_MODE = {
		WINDOW : "window",
		TRANSPARENT : "transparent",
		OPAQUE : "opaque"
	};
	
	// Private: takes a URL, determines if it is relative and converts to an absolute URL
	// using the current site. Only processes the URL if it can, otherwise returns the URL untouched
	SWFUpload.completeURL = function(url) {
		if (typeof(url) !== "string" || url.match(/^https?:\/\//i) || url.match(/^\//)) {
			return url;
		}
		
		var currentURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
		
		var indexSlash = window.location.pathname.lastIndexOf("/");
		if (indexSlash <= 0) {
			path = "/";
		} else {
			path = window.location.pathname.substr(0, indexSlash) + "/";
		}
		
		return /*currentURL +*/ path + url;
		
	};
	
	
	/* ******************** */
	/* Instance Members  */
	/* ******************** */
	
	// Private: initSettings ensures that all the
	// settings are set, getting a default value if one was not assigned.
	SWFUpload.prototype.initSettings = function () {
		this.ensureDefault = function (settingName, defaultValue) {
			this.settings[settingName] = (this.settings[settingName] == undefined) ? defaultValue : this.settings[settingName];
		};
		
		// Upload backend settings
		this.ensureDefault("upload_url", "");
		this.ensureDefault("preserve_relative_urls", false);
		this.ensureDefault("file_post_name", "Filedata");
		this.ensureDefault("post_params", {});
		this.ensureDefault("use_query_string", false);
		this.ensureDefault("requeue_on_error", false);
		this.ensureDefault("http_success", []);
		this.ensureDefault("assume_success_timeout", 0);
		
		// File Settings
		this.ensureDefault("file_types", "*.*");
		this.ensureDefault("file_types_description", "All Files");
		this.ensureDefault("file_size_limit", 0);	// Default zero means "unlimited"
		this.ensureDefault("file_upload_limit", 0);
		this.ensureDefault("file_queue_limit", 0);
	
		// Flash Settings
		this.ensureDefault("flash_url", "swfupload.swf");
		this.ensureDefault("prevent_swf_caching", true);
		
		// Button Settings
		this.ensureDefault("button_image_url", "");
		this.ensureDefault("button_width", 1);
		this.ensureDefault("button_height", 1);
		this.ensureDefault("button_text", "");
		this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
		this.ensureDefault("button_text_top_padding", 0);
		this.ensureDefault("button_text_left_padding", 0);
		this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
		this.ensureDefault("button_disabled", false);
		this.ensureDefault("button_placeholder_id", "");
		this.ensureDefault("button_placeholder", null);
		this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
		this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.OPAQUE);
		
		// Debug Settings
		this.ensureDefault("debug", false);
		this.settings.debug_enabled = this.settings.debug;	// Here to maintain v2 API
		
		// Event Handlers
		this.settings.return_upload_start_handler = this.returnUploadStart;
		this.ensureDefault("swfupload_loaded_handler", null);
		this.ensureDefault("file_dialog_start_handler", null);
		this.ensureDefault("file_queued_handler", null);
		this.ensureDefault("file_queue_error_handler", null);
		this.ensureDefault("file_dialog_complete_handler", null);
		
		this.ensureDefault("upload_start_handler", null);
		this.ensureDefault("upload_progress_handler", null);
		this.ensureDefault("upload_error_handler", null);
		this.ensureDefault("upload_success_handler", null);
		this.ensureDefault("upload_complete_handler", null);
		
		this.ensureDefault("debug_handler", this.debugMessage);
	
		this.ensureDefault("custom_settings", {});
	
		// Other settings
		this.customSettings = this.settings.custom_settings;
		
		// Update the flash url if needed
		if (!!this.settings.prevent_swf_caching) {
			this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
		}
		
		if (!this.settings.preserve_relative_urls) {
			//this.settings.flash_url = SWFUpload.completeURL(this.settings.flash_url);	// Don't need to do this one since flash doesn't look at it
			this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
			this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url);
		}
		
		delete this.ensureDefault;
	};
	
	// Private: loadFlash replaces the button_placeholder element with the flash movie.
	SWFUpload.prototype.loadFlash = function () {
		var targetElement, tempParent;
	
		// Make sure an element with the ID we are going to use doesn't already exist
		if (document.getElementById(this.movieName) !== null) {
			throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
		}
	
		// Get the element where we will be placing the flash movie
		targetElement = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
	
		if (targetElement == undefined) {
			throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
		}
	
		// Append the container and load the flash
		tempParent = document.createElement("div");
		tempParent.innerHTML = this.getFlashHTML();	// Using innerHTML is non-standard but the only sensible way to dynamically add Flash in IE (and maybe other browsers)
		targetElement.parentNode.replaceChild(tempParent.firstChild, targetElement);
	
		// Fix IE Flash/Form bug
		if (window[this.movieName] == undefined) {
			window[this.movieName] = this.getMovieElement();
		}
		
	};
	
	// Private: getFlashHTML generates the object tag needed to embed the flash in to the document
//	SWFUpload.prototype.getFlashHTML = function () {
//	// Flash Satay object syntax: http://www.alistapart.com/articles/flashsatay
//	return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">',
//				'<param name="wmode" value="', this.settings.button_window_mode, '" />',
//				'<param name="movie" value="', this.settings.flash_url, '" />',
//				'<param name="quality" value="high" />',
//				'<param name="menu" value="false" />',
//				'<param name="allowScriptAccess" value="always" />',
//				'<param name="flashvars" value="' + this.getFlashVars() + '" />',
//				'</object>'].join("");
//};

SWFUpload.prototype.getFlashHTML = function () {
    // Flash Satay object syntax: http://www.alistapart.com/articles/flashsatay
    var classid = "";
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();

    if (window.ActiveXObject)
        Sys.ie = ua.match(/msie ([\d.]+)/)[1];
    if (Sys.ie && Sys.ie.substring(0, 1) == "9") {
        classid = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    }
        return ['<object id="', this.movieName, '" classid="',classid,'"  type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">',
                '<param name="wmode" value="', this.settings.button_window_mode, '" />',
                '<param name="movie" value="', this.settings.flash_url, '" />',
                '<param name="quality" value="high" />',
                '<param name="menu" value="false" />',
                '<param name="allowScriptAccess" value="always" />',
                '<param name="flashvars" value="' + this.getFlashVars() + '" />',
                '</object>'].join("");
}; 
	
	// Private: getFlashVars builds the parameter string that will be passed
	// to flash in the flashvars param.
	SWFUpload.prototype.getFlashVars = function () {
		// Build a string from the post param object
		var paramString = this.buildParamString();
		var httpSuccessString = this.settings.http_success.join(",");
		
		// Build the parameter string
		return ["movieName=", encodeURIComponent(this.movieName),
				"&amp;uploadURL=", encodeURIComponent(this.settings.upload_url),
				"&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string),
				"&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error),
				"&amp;httpSuccess=", encodeURIComponent(httpSuccessString),
				"&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout),
				"&amp;params=", encodeURIComponent(paramString),
				"&amp;filePostName=", encodeURIComponent(this.settings.file_post_name),
				"&amp;fileTypes=", encodeURIComponent(this.settings.file_types),
				"&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description),
				"&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit),
				"&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit),
				"&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit),
				"&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled),
				"&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url),
				"&amp;buttonWidth=", encodeURIComponent(this.settings.button_width),
				"&amp;buttonHeight=", encodeURIComponent(this.settings.button_height),
				"&amp;buttonText=", encodeURIComponent(this.settings.button_text),
				"&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding),
				"&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding),
				"&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style),
				"&amp;buttonAction=", encodeURIComponent(this.settings.button_action),
				"&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled),
				"&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)
			].join("");
	};
	
	// Public: getMovieElement retrieves the DOM reference to the Flash element added by SWFUpload
	// The element is cached after the first lookup
	SWFUpload.prototype.getMovieElement = function () {
		if (this.movieElement == undefined) {
			this.movieElement = document.getElementById(this.movieName);
		}
	
		if (this.movieElement === null) {
			throw "Could not find Flash element";
		}
		
		return this.movieElement;
	};
	
	// Private: buildParamString takes the name/value pairs in the post_params setting object
	// and joins them up in to a string formatted "name=value&amp;name=value"
	SWFUpload.prototype.buildParamString = function () {
		var postParams = this.settings.post_params; 
		var paramStringPairs = [];
	
		if (typeof(postParams) === "object") {
			for (var name in postParams) {
				if (postParams.hasOwnProperty(name)) {
					paramStringPairs.push(encodeURIComponent(name.toString()) + "=" + encodeURIComponent(postParams[name].toString()));
				}
			}
		}
	
		return paramStringPairs.join("&amp;");
	};
	
	// Public: Used to remove a SWFUpload instance from the page. This method strives to remove
	// all references to the SWF, and other objects so memory is properly freed.
	// Returns true if everything was destroyed. Returns a false if a failure occurs leaving SWFUpload in an inconsistant state.
	// Credits: Major improvements provided by steffen
	SWFUpload.prototype.destroy = function () {
		try {
			// Make sure Flash is done before we try to remove it
			this.cancelUpload(null, false);
			
	
			// Remove the SWFUpload DOM nodes
			var movieElement = null;
			movieElement = this.getMovieElement();
			
			if (movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
				// Loop through all the movie's properties and remove all function references (DOM/JS IE 6/7 memory leak workaround)
				for (var i in movieElement) {
					try {
						if (typeof(movieElement[i]) === "function") {
							movieElement[i] = null;
						}
					} catch (ex1) {}
				}
	
				// Remove the Movie Element from the page
				try {
					movieElement.parentNode.removeChild(movieElement);
				} catch (ex) {}
			}
			
			// Remove IE form fix reference
			window[this.movieName] = null;
	
			// Destroy other references
			SWFUpload.instances[this.movieName] = null;
			delete SWFUpload.instances[this.movieName];
	
			this.movieElement = null;
			this.settings = null;
			this.customSettings = null;
			this.eventQueue = null;
			this.movieName = null;
			
			
			return true;
		} catch (ex2) {
			return false;
		}
	};
	
	
	// Public: displayDebugInfo prints out settings and configuration
	// information about this SWFUpload instance.
	// This function (and any references to it) can be deleted when placing
	// SWFUpload in production.
	SWFUpload.prototype.displayDebugInfo = function () {
		this.debug(
			[
				"---SWFUpload Instance Info---\n",
				"Version: ", SWFUpload.version, "\n",
				"Movie Name: ", this.movieName, "\n",
				"Settings:\n",
				"\t", "upload_url:               ", this.settings.upload_url, "\n",
				"\t", "flash_url:                ", this.settings.flash_url, "\n",
				"\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n",
				"\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n",
				"\t", "http_success:             ", this.settings.http_success.join(", "), "\n",
				"\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n",
				"\t", "file_post_name:           ", this.settings.file_post_name, "\n",
				"\t", "post_params:              ", this.settings.post_params.toString(), "\n",
				"\t", "file_types:               ", this.settings.file_types, "\n",
				"\t", "file_types_description:   ", this.settings.file_types_description, "\n",
				"\t", "file_size_limit:          ", this.settings.file_size_limit, "\n",
				"\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n",
				"\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n",
				"\t", "debug:                    ", this.settings.debug.toString(), "\n",
	
				"\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n",
	
				"\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n",
				"\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n",
				"\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n",
				"\t", "button_width:             ", this.settings.button_width.toString(), "\n",
				"\t", "button_height:            ", this.settings.button_height.toString(), "\n",
				"\t", "button_text:              ", this.settings.button_text.toString(), "\n",
				"\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n",
				"\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n",
				"\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n",
				"\t", "button_action:            ", this.settings.button_action.toString(), "\n",
				"\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n",
	
				"\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n",
				"Event Handlers:\n",
				"\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n",
				"\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n",
				"\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n",
				"\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n",
				"\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n",
				"\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n",
				"\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n",
				"\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n",
				"\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n",
				"\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n"
			].join("")
		);
	};
	
	/* Note: addSetting and getSetting are no longer used by SWFUpload but are included
		the maintain v2 API compatibility
	*/
	// Public: (Deprecated) addSetting adds a setting value. If the value given is undefined or null then the default_value is used.
	SWFUpload.prototype.addSetting = function (name, value, default_value) {
	    if (value == undefined) {
	        return (this.settings[name] = default_value);
	    } else {
	        return (this.settings[name] = value);
		}
	};
	
	// Public: (Deprecated) getSetting gets a setting. Returns an empty string if the setting was not found.
	SWFUpload.prototype.getSetting = function (name) {
	    if (this.settings[name] != undefined) {
	        return this.settings[name];
		}
	
	    return "";
	};
	
	
	
	// Private: callFlash handles function calls made to the Flash element.
	// Calls are made with a setTimeout for some functions to work around
	// bugs in the ExternalInterface library.
	SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
		argumentArray = argumentArray || [];
		
		var movieElement = this.getMovieElement();
		var returnValue, returnString;
	
		// Flash's method if calling ExternalInterface methods (code adapted from MooTools).
		try {
			returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + '</invoke>');
			returnValue = eval(returnString);
		} catch (ex) {
			throw "Call to " + functionName + " failed";
		}
		
		// Unescape file post param values
		if (returnValue != undefined && typeof returnValue.post === "object") {
			returnValue = this.unescapeFilePostParams(returnValue);
		}
	
		return returnValue;
	};
	
	/* *****************************
		-- Flash control methods --
		Your UI should use these
		to operate SWFUpload
	   ***************************** */
	
	// WARNING: this function does not work in Flash Player 10
	// Public: selectFile causes a File Selection Dialog window to appear.  This
	// dialog only allows 1 file to be selected.
	SWFUpload.prototype.selectFile = function () {
		this.callFlash("SelectFile");
	};
	
	// WARNING: this function does not work in Flash Player 10
	// Public: selectFiles causes a File Selection Dialog window to appear/ This
	// dialog allows the user to select any number of files
	// Flash Bug Warning: Flash limits the number of selectable files based on the combined length of the file names.
	// If the selection name length is too long the dialog will fail in an unpredictable manner.  There is no work-around
	// for this bug.
	SWFUpload.prototype.selectFiles = function () {
		this.callFlash("SelectFiles");
	};
	
	
	// Public: startUpload starts uploading the first file in the queue unless
	// the optional parameter 'fileID' specifies the ID 
	SWFUpload.prototype.startUpload = function (fileID) {
		this.callFlash("StartUpload", [fileID]);
	};
	
	// Public: cancelUpload cancels any queued file.  The fileID parameter may be the file ID or index.
	// If you do not specify a fileID the current uploading file or first file in the queue is cancelled.
	// If you do not want the uploadError event to trigger you can specify false for the triggerErrorEvent parameter.
	SWFUpload.prototype.cancelUpload = function (fileID, triggerErrorEvent) {
		if (triggerErrorEvent !== false) {
			triggerErrorEvent = true;
		}
		this.callFlash("CancelUpload", [fileID, triggerErrorEvent]);
	};
	
	// Public: stopUpload stops the current upload and requeues the file at the beginning of the queue.
	// If nothing is currently uploading then nothing happens.
	SWFUpload.prototype.stopUpload = function () {
		this.callFlash("StopUpload");
	};
	
	/* ************************
	 * Settings methods
	 *   These methods change the SWFUpload settings.
	 *   SWFUpload settings should not be changed directly on the settings object
	 *   since many of the settings need to be passed to Flash in order to take
	 *   effect.
	 * *********************** */
	
	// Public: getStats gets the file statistics object.
	SWFUpload.prototype.getStats = function () {
		return this.callFlash("GetStats");
	};
	
	// Public: setStats changes the SWFUpload statistics.  You shouldn't need to 
	// change the statistics but you can.  Changing the statistics does not
	// affect SWFUpload accept for the successful_uploads count which is used
	// by the upload_limit setting to determine how many files the user may upload.
	SWFUpload.prototype.setStats = function (statsObject) {
		this.callFlash("SetStats", [statsObject]);
	};
	
	// Public: getFile retrieves a File object by ID or Index.  If the file is
	// not found then 'null' is returned.
	SWFUpload.prototype.getFile = function (fileID) {
		if (typeof(fileID) === "number") {
			return this.callFlash("GetFileByIndex", [fileID]);
		} else {
			return this.callFlash("GetFile", [fileID]);
		}
	};
	
	// Public: addFileParam sets a name/value pair that will be posted with the
	// file specified by the Files ID.  If the name already exists then the
	// exiting value will be overwritten.
	SWFUpload.prototype.addFileParam = function (fileID, name, value) {
		return this.callFlash("AddFileParam", [fileID, name, value]);
	};
	
	// Public: removeFileParam removes a previously set (by addFileParam) name/value
	// pair from the specified file.
	SWFUpload.prototype.removeFileParam = function (fileID, name) {
		this.callFlash("RemoveFileParam", [fileID, name]);
	};
	
	// Public: setUploadUrl changes the upload_url setting.
	SWFUpload.prototype.setUploadURL = function (url) {
		this.settings.upload_url = url.toString();
		this.callFlash("SetUploadURL", [url]);
	};
	
	// Public: setPostParams changes the post_params setting
	SWFUpload.prototype.setPostParams = function (paramsObject) {
		this.settings.post_params = paramsObject;
		this.callFlash("SetPostParams", [paramsObject]);
	};
	
	// Public: addPostParam adds post name/value pair.  Each name can have only one value.
	SWFUpload.prototype.addPostParam = function (name, value) {
		this.settings.post_params[name] = value;
		this.callFlash("SetPostParams", [this.settings.post_params]);
	};
	
	// Public: removePostParam deletes post name/value pair.
	SWFUpload.prototype.removePostParam = function (name) {
		delete this.settings.post_params[name];
		this.callFlash("SetPostParams", [this.settings.post_params]);
	};
	
	// Public: setFileTypes changes the file_types setting and the file_types_description setting
	SWFUpload.prototype.setFileTypes = function (types, description) {
		this.settings.file_types = types;
		this.settings.file_types_description = description;
		this.callFlash("SetFileTypes", [types, description]);
	};
	
	// Public: setFileSizeLimit changes the file_size_limit setting
	SWFUpload.prototype.setFileSizeLimit = function (fileSizeLimit) {
		this.settings.file_size_limit = fileSizeLimit;
		this.callFlash("SetFileSizeLimit", [fileSizeLimit]);
	};
	
	// Public: setFileUploadLimit changes the file_upload_limit setting
	SWFUpload.prototype.setFileUploadLimit = function (fileUploadLimit) {
		this.settings.file_upload_limit = fileUploadLimit;
		this.callFlash("SetFileUploadLimit", [fileUploadLimit]);
	};
	
	// Public: setFileQueueLimit changes the file_queue_limit setting
	SWFUpload.prototype.setFileQueueLimit = function (fileQueueLimit) {
		this.settings.file_queue_limit = fileQueueLimit;
		this.callFlash("SetFileQueueLimit", [fileQueueLimit]);
	};
	
	// Public: setFilePostName changes the file_post_name setting
	SWFUpload.prototype.setFilePostName = function (filePostName) {
		this.settings.file_post_name = filePostName;
		this.callFlash("SetFilePostName", [filePostName]);
	};
	
	// Public: setUseQueryString changes the use_query_string setting
	SWFUpload.prototype.setUseQueryString = function (useQueryString) {
		this.settings.use_query_string = useQueryString;
		this.callFlash("SetUseQueryString", [useQueryString]);
	};
	
	// Public: setRequeueOnError changes the requeue_on_error setting
	SWFUpload.prototype.setRequeueOnError = function (requeueOnError) {
		this.settings.requeue_on_error = requeueOnError;
		this.callFlash("SetRequeueOnError", [requeueOnError]);
	};
	
	// Public: setHTTPSuccess changes the http_success setting
	SWFUpload.prototype.setHTTPSuccess = function (http_status_codes) {
		if (typeof http_status_codes === "string") {
			http_status_codes = http_status_codes.replace(" ", "").split(",");
		}
		
		this.settings.http_success = http_status_codes;
		this.callFlash("SetHTTPSuccess", [http_status_codes]);
	};
	
	// Public: setHTTPSuccess changes the http_success setting
	SWFUpload.prototype.setAssumeSuccessTimeout = function (timeout_seconds) {
		this.settings.assume_success_timeout = timeout_seconds;
		this.callFlash("SetAssumeSuccessTimeout", [timeout_seconds]);
	};
	
	// Public: setDebugEnabled changes the debug_enabled setting
	SWFUpload.prototype.setDebugEnabled = function (debugEnabled) {
		this.settings.debug_enabled = debugEnabled;
		this.callFlash("SetDebugEnabled", [debugEnabled]);
	};
	
	// Public: setButtonImageURL loads a button image sprite
	SWFUpload.prototype.setButtonImageURL = function (buttonImageURL) {
		if (buttonImageURL == undefined) {
			buttonImageURL = "";
		}
		
		this.settings.button_image_url = buttonImageURL;
		this.callFlash("SetButtonImageURL", [buttonImageURL]);
	};
	
	// Public: setButtonDimensions resizes the Flash Movie and button
	SWFUpload.prototype.setButtonDimensions = function (width, height) {
		this.settings.button_width = width;
		this.settings.button_height = height;
		
		var movie = this.getMovieElement();
		if (movie != undefined) {
			movie.style.width = width + "px";
			movie.style.height = height + "px";
		}
		
		this.callFlash("SetButtonDimensions", [width, height]);
	};
	// Public: setButtonText Changes the text overlaid on the button
	SWFUpload.prototype.setButtonText = function (html) {
		this.settings.button_text = html;
		this.callFlash("SetButtonText", [html]);
	};
	// Public: setButtonTextPadding changes the top and left padding of the text overlay
	SWFUpload.prototype.setButtonTextPadding = function (left, top) {
		this.settings.button_text_top_padding = top;
		this.settings.button_text_left_padding = left;
		this.callFlash("SetButtonTextPadding", [left, top]);
	};
	
	// Public: setButtonTextStyle changes the CSS used to style the HTML/Text overlaid on the button
	SWFUpload.prototype.setButtonTextStyle = function (css) {
		this.settings.button_text_style = css;
		this.callFlash("SetButtonTextStyle", [css]);
	};
	// Public: setButtonDisabled disables/enables the button
	SWFUpload.prototype.setButtonDisabled = function (isDisabled) {
		this.settings.button_disabled = isDisabled;
		this.callFlash("SetButtonDisabled", [isDisabled]);
	};
	// Public: setButtonAction sets the action that occurs when the button is clicked
	SWFUpload.prototype.setButtonAction = function (buttonAction) {
		this.settings.button_action = buttonAction;
		this.callFlash("SetButtonAction", [buttonAction]);
	};
	
	// Public: setButtonCursor changes the mouse cursor displayed when hovering over the button
	SWFUpload.prototype.setButtonCursor = function (cursor) {
		this.settings.button_cursor = cursor;
		this.callFlash("SetButtonCursor", [cursor]);
	};
	
	/* *******************************
		Flash Event Interfaces
		These functions are used by Flash to trigger the various
		events.
		
		All these functions a Private.
		
		Because the ExternalInterface library is buggy the event calls
		are added to a queue and the queue then executed by a setTimeout.
		This ensures that events are executed in a determinate order and that
		the ExternalInterface bugs are avoided.
	******************************* */
	
	SWFUpload.prototype.queueEvent = function (handlerName, argumentArray) {
		// Warning: Don't call this.debug inside here or you'll create an infinite loop
		
		if (argumentArray == undefined) {
			argumentArray = [];
		} else if (!(argumentArray instanceof Array)) {
			argumentArray = [argumentArray];
		}
		
		var self = this;
		if (typeof this.settings[handlerName] === "function") {
			// Queue the event
			this.eventQueue.push(function () {
				this.settings[handlerName].apply(this, argumentArray);
			});
			
			// Execute the next queued event
			setTimeout(function () {
				self.executeNextEvent();
			}, 0);
			
		} else if (this.settings[handlerName] !== null) {
			throw "Event handler " + handlerName + " is unknown or is not a function";
		}
	};
	
	// Private: Causes the next event in the queue to be executed.  Since events are queued using a setTimeout
	// we must queue them in order to garentee that they are executed in order.
	SWFUpload.prototype.executeNextEvent = function () {
		// Warning: Don't call this.debug inside here or you'll create an infinite loop
	
		var  f = this.eventQueue ? this.eventQueue.shift() : null;
		if (typeof(f) === "function") {
			f.apply(this);
		}
	};
	
	// Private: unescapeFileParams is part of a workaround for a flash bug where objects passed through ExternalInterface cannot have
	// properties that contain characters that are not valid for JavaScript identifiers. To work around this
	// the Flash Component escapes the parameter names and we must unescape again before passing them along.
	SWFUpload.prototype.unescapeFilePostParams = function (file) {
		var reg = /[$]([0-9a-f]{4})/i;
		var unescapedPost = {};
		var uk;
	
		if (file != undefined) {
			for (var k in file.post) {
				if (file.post.hasOwnProperty(k)) {
					uk = k;
					var match;
					while ((match = reg.exec(uk)) !== null) {
						uk = uk.replace(match[0], String.fromCharCode(parseInt("0x" + match[1], 16)));
					}
					unescapedPost[uk] = file.post[k];
				}
			}
	
			file.post = unescapedPost;
		}
	
		return file;
	};
	
	// Private: Called by Flash to see if JS can call in to Flash (test if External Interface is working)
	SWFUpload.prototype.testExternalInterface = function () {
		try {
			return this.callFlash("TestExternalInterface");
		} catch (ex) {
			return false;
		}
	};
	
	// Private: This event is called by Flash when it has finished loading. Don't modify this.
	// Use the swfupload_loaded_handler event setting to execute custom code when SWFUpload has loaded.
	SWFUpload.prototype.flashReady = function () {
		// Check that the movie element is loaded correctly with its ExternalInterface methods defined
		var movieElement = this.getMovieElement();
	
		if (!movieElement) {
			this.debug("Flash called back ready but the flash movie can't be found.");
			return;
		}
	
		this.cleanUp(movieElement);
		
		this.queueEvent("swfupload_loaded_handler");
	};
	
	// Private: removes Flash added fuctions to the DOM node to prevent memory leaks in IE.
	// This function is called by Flash each time the ExternalInterface functions are created.
	SWFUpload.prototype.cleanUp = function (movieElement) {
		// Pro-actively unhook all the Flash functions
		try {
			if (this.movieElement && typeof(movieElement.CallFunction) === "unknown") { // We only want to do this in IE
				this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
				for (var key in movieElement) {
					try {
						if (typeof(movieElement[key]) === "function"  && key[0] >= 'A' && key[0] <= 'Z') {
							movieElement[key] = null;
						}
					} catch (ex) {
					}
				}
			}
		} catch (ex1) {
		
		}
	
		// Fix Flashes own cleanup code so if the SWFMovie was removed from the page
		// it doesn't display errors.
		window["__flash__removeCallback"] = function (instance, name) {
			try {
				if (instance) {
					instance[name] = null;
				}
			} catch (flashEx) {
			
			}
		};
	
	};
	
	
	/* This is a chance to do something before the browse window opens */
	SWFUpload.prototype.fileDialogStart = function () {
		this.queueEvent("file_dialog_start_handler");
	};
	
	
	/* Called when a file is successfully added to the queue. */
	SWFUpload.prototype.fileQueued = function (file) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("file_queued_handler", file);
	};
	
	
	/* Handle errors that occur when an attempt to queue a file fails. */
	SWFUpload.prototype.fileQueueError = function (file, errorCode, message) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("file_queue_error_handler", [file, errorCode, message]);
	};
	
	/* Called after the file dialog has closed and the selected files have been queued.
		You could call startUpload here if you want the queued files to begin uploading immediately. */
	SWFUpload.prototype.fileDialogComplete = function (numFilesSelected, numFilesQueued, numFilesInQueue) {
		this.queueEvent("file_dialog_complete_handler", [numFilesSelected, numFilesQueued, numFilesInQueue]);
	};
	
	SWFUpload.prototype.uploadStart = function (file) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("return_upload_start_handler", file);
	};
	
	SWFUpload.prototype.returnUploadStart = function (file) {
		var returnValue;
		if (typeof this.settings.upload_start_handler === "function") {
			file = this.unescapeFilePostParams(file);
			returnValue = this.settings.upload_start_handler.call(this, file);
		} else if (this.settings.upload_start_handler != undefined) {
			throw "upload_start_handler must be a function";
		}
	
		// Convert undefined to true so if nothing is returned from the upload_start_handler it is
		// interpretted as 'true'.
		if (returnValue === undefined) {
			returnValue = true;
		}
		
		returnValue = !!returnValue;
		
		this.callFlash("ReturnUploadStart", [returnValue]);
	};
	
	
	
	SWFUpload.prototype.uploadProgress = function (file, bytesComplete, bytesTotal) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("upload_progress_handler", [file, bytesComplete, bytesTotal]);
	};
	
	SWFUpload.prototype.uploadError = function (file, errorCode, message) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("upload_error_handler", [file, errorCode, message]);
	};
	
	SWFUpload.prototype.uploadSuccess = function (file, serverData, responseReceived) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("upload_success_handler", [file, serverData, responseReceived]);
	};
	
	SWFUpload.prototype.uploadComplete = function (file) {
		file = this.unescapeFilePostParams(file);
		this.queueEvent("upload_complete_handler", file);
	};
	
	/* Called by SWFUpload JavaScript and Flash functions when debug is enabled. By default it writes messages to the
	   internal debug console.  You can override this event and have messages written where you want. */
	SWFUpload.prototype.debug = function (message) {
		this.queueEvent("debug_handler", message);
	};
	
	
	/* **********************************
		Debug Console
		The debug console is a self contained, in page location
		for debug message to be sent.  The Debug Console adds
		itself to the body if necessary.
	
		The console is automatically scrolled as messages appear.
		
		If you are using your own debug handler or when you deploy to production and
		have debug disabled you can remove these functions to reduce the file size
		and complexity.
	********************************** */
	   
	// Private: debugMessage is the default debug_handler.  If you want to print debug messages
	// call the debug() function.  When overriding the function your own function should
	// check to see if the debug setting is true before outputting debug information.
	SWFUpload.prototype.debugMessage = function (message) {
		if (this.settings.debug) {
			var exceptionMessage, exceptionValues = [];
	
			// Check for an exception object and print it nicely
			if (typeof message === "object" && typeof message.name === "string" && typeof message.message === "string") {
				for (var key in message) {
					if (message.hasOwnProperty(key)) {
						exceptionValues.push(key + ": " + message[key]);
					}
				}
				exceptionMessage = exceptionValues.join("\n") || "";
				exceptionValues = exceptionMessage.split("\n");
				exceptionMessage = "EXCEPTION: " + exceptionValues.join("\nEXCEPTION: ");
				SWFUpload.Console.writeLine(exceptionMessage);
			} else {
				SWFUpload.Console.writeLine(message);
			}
		}
	};
	
	SWFUpload.Console = {};
	SWFUpload.Console.writeLine = function (message) {
		var console, documentForm;
	
		try {
			console = document.getElementById("SWFUpload_Console");
	
			if (!console) {
				documentForm = document.createElement("form");
				document.getElementsByTagName("body")[0].appendChild(documentForm);
	
				console = document.createElement("textarea");
				console.id = "SWFUpload_Console";
				console.style.fontFamily = "monospace";
				console.setAttribute("wrap", "off");
				console.wrap = "off";
				console.style.overflow = "auto";
				console.style.width = "700px";
				console.style.height = "350px";
				console.style.margin = "5px";
				documentForm.appendChild(console);
			}
	
			console.value += message + "\n";
	
			console.scrollTop = console.scrollHeight - console.clientHeight;
		} catch (ex) {
			alert("Exception: " + ex.name + " Message: " + ex.message);
		}
	};
}
/**
 * 包头大小
 */
var PACKET_HEADER_SIZE = 13;

/**
 * 由opcode得到包的key
 */
var OPCODE_MAP = {
	RECV : new SNSBaseList(),
	SEND : new SNSBaseList()
};

/**
 * [start, end)
 */
function _Range(start, end) {
	this.START = start;
	this.END = end;
	this.SIZE = end - start;
}

/**
 * 操作码, 每新增一个同时会向OPCODE_MAP中更新
 */
function _Opcode(key, send, recv) {
	this.KEY = key;
	this.SEND = send;
	this.RECV = !!recv? recv : send;
	OPCODE_MAP.SEND.add(this.SEND, this.KEY);
	OPCODE_MAP.RECV.add(this.RECV, this.KEY);
}

/**
 * 操作码
 */
var OPCODE = {
	/**
	 * 认证
	 * @type {_Opcode}
	 */
	AUTH : new _Opcode('auth', 0x0001),
	/**
	 * @type {_Opcode}
	 */
	PING : new _Opcode('ping', 0x0002),
	
	/**
	 * 断开连接 Stream end rongqb 20151208
	 */
	STREAMEND : new _Opcode('streamend', 0x0004),
	
	/**
	 * 发送&接收消息回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 发送&接收好友消息
	 * @type {_Opcode}
	 */
	USER_MESSAGE : new _Opcode('userMessage', 0x1010),

	/**
	 * 发送&接收群组消息
	 * @type {_Opcode}
	 */
	CHATGROUP_MESSAGE : new _Opcode('chatGroupMessage', 0x1030),
	
	/**
	 * 发送&接收公共号消息
	 * @type {_Opcode}
	 */
	PUBACCOUNT_MESSAGE : new _Opcode('pubaccountMessage', 0x1050),
	
	/**
	 * 各端同步消息 rongqb 20151123
	 * @type {_Opcode}
	 */
	SYNC_MESSAGE : new _Opcode('syncMessage', 0x1070),
	
	/**
	 * 发送&接收回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 接收新消息通知
	 * @type {_Opcode}
	 */
	NOTIFY_MESSAGE : new _Opcode('notifyMessage', 0x1003),
	
	/**
	 * 邀请用户加入群组
	 * @type {_Opcode}
	 */
	INVITE_USERS : new _Opcode('inviteUsers', 0x1301),
	
	/**
	 * 请求&返回VCard
	 * @type {_Opcode}
	 */
	VCARD : new _Opcode('vcard', 0x2011),
	
	/**
	 * 请求&返回所有好友的VCard
	 * @type {_Opcode}
	 */
	VCARDS : new _Opcode("vcards", 0x2011, 0x2012),
	
	/**
	 * IQ请求的结果报文
	 * @type {_Opcode}
	 */
	IQ_RESULT : new _Opcode('iqResult', 0x2021),
	
	/**
	 * 搜索用户&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_USER : new _Opcode('queryUser', 0x2110, 0x2111),
	
	/**
	 * 搜索群组&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_CHATGROUP : new _Opcode('queryChatGroup', 0x2130, 0x2131),

	/**
	 * 搜索公共号&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_PUBACCOUNT : new _Opcode('queryPubaccount', 0x2150, 0x2151),
	
	/**
	 * 请求&返回好友列表
	 * @type {_Opcode}
	 */
	ROSTER_LIST : new _Opcode('rosterList', 0x2220, 0x2221),
	
	/**
	 * 请求&返回群组列表
	 * @type {_Opcode}
	 */
	CHATGROUP_LIST : new _Opcode('chatGroupList', 0x2230, 0x2231),
	
	/**
	 * 请求&返回群成员列表
	 * @type {_Opcode}
	 */
	CHATGROUP_MEMBER_LIST : new _Opcode('chatGroupMemberList', 0x2240, 0x2241),
	
	/**
	 * 请求&返回公共号列表
	 * @type {_Opcode}
	 */
	PUBACCOUNT_LIST : new _Opcode('pubaccountList', 0x2250, 0x2251),
	
	/**
	 * 请求&返回群组信息
	 * @type {_Opcode}
	 */
	CHATGROUP_INFO : new _Opcode('chatGroupInfo', 0x2330, 0x2331),
	
	CHATGROUP_SHARED_FILES : new _Opcode('chatGroupSharedFiles', 0x2332, 0x2333),
	
	/**
	 * 更新好友&更新结果
	 * @type {_Opcode}
	 */
	UPDATE_ROSTER : new _Opcode('updateRoster', 0x2520),
	
	/**
	 * 修改群组配置&修改结果
	 * @type {_Opcode}
	 */
	CONFIG_CHATGROUP : new _Opcode('chatGroupConfig', 0x2530, 0x2531),
	
	/**
	 * 创建群组&创建结果 rongqb 20151117
	 */
	CREATE_GROUP : new _Opcode('createGroup', 0x2532 ,0x2334),
	
	/**
	 * 房间成员邀请人入群&邀请结果 rongqb 20151118
	 */
	INVITE_GROUP_MEMBER : new _Opcode('inviteGroupMember', 0x2533 ,0x2334),
	
	/**
	 * 群成员更改配置信息&返回结果 rongqb 20151119
	 */
	MODIFY_GROUP_INFO : new _Opcode('modifyGroupInfo', 0x2534 ,0x2334),
	
	/**
	 * 群主踢人&返回结果 rongqb 20151119
	 */
	KICK_GROUP_MEMBER : new _Opcode('kickGroupMember', 0x2535 ,0x2334),
	
	/**
	 * 群主解散群 rongqb 20160106
	 */
	DISMISS_GROUP : new _Opcode('dismissgtoup', 0x2538, 0x2335),
	
	/**
	 * 群主转让 rongqb 20160106
	 */
	TRANSFER_GROUP : new _Opcode('transferGroup', 0x2539, 0x2243),
	
	/**
	 * 群成员退出群&返回结果 rongqb 20151119
	 */
	EXIT_GROUP : new _Opcode('exitGroup', 0x2536 ,0x2335),

	/**
	 * 群主更新 rongqb 20160106
	 */
	ON_GROUP_TRANSFER :  new _Opcode('groupOwnerTransfer',0x2243),
	
	/**
	 * 群信息更新 rongqb 20151119
	 */
	ON_GROUP_UPDATE :  new _Opcode('groupUpdate',0x2334),
	
	/**
	 * 被群踢出&群组解散 rongqb 20151119
	 */
	KICKED_GROUP : new _Opcode('kickedByGroup', 0x2335),
	
	/**
	 * 收藏群组 rongqb 20151201
	 */
	COLLECT_GROUP : new _Opcode('collectGroup', 0x2537),
	
	/**
	 * 全量同步好友列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_ROSTER : new _Opcode('fullSyncRoster', 0x2720),
	
	/**
	 * 增量同步好友列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_ROSTER : new _Opcode('deltaSyncRoster', 0x2722),
	
	/**
	 * 全量同步群组列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_CHATGROUP : new _Opcode('fullSyncChatGroup', 0x2730),
	
	/**
	 * 增量同步群组列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_CHATGROUP : new _Opcode('deltaSyncChatGroup', 0x2732),
	
	/**
	 * [二合一]出席信息&订阅
	 * @type {_Opcode}
	 */
	PRESENCE : new _Opcode("presence", 0x3001),
	
	/**
	 * 加入群组&退出群租&创建群组第一步
	 * @type {_Opcode}
	 */
	CHATGROUP : new _Opcode("chatGroup", 0x3301, 0x3302),
	
	/**
	 * 群主删除群成员
	 * @type {_Opcode}
	 */
	DEL_GROUPMEMBER : new _Opcode('delGroupMember', 0x2640),
	
	/**
	 * 创建/结束/重命名白板 & 结果
	 * @type {_Opcode}
	 */
	OPERATE_WHITEBOARD : new _Opcode('operateWhiteBoard', 0x2801),
	
	/**
	 *  监听白板
	 * @type {_Opcode}
	 */
	LISTEN_WHITEBOARD : new _Opcode('listenWhiteBoard', 0x2801,	0x2802),
	
	/**
	 *  更新白板 & 结果
	 * @type {_Opcode}
	 */
	UPDATE_WHITEBOARD : new _Opcode('updateWhiteBoard', 0x2805),
	
	/**
	 * packet error
	 * @type {_Opcode}
	 */
	PACKET_ERROR : new _Opcode('packetError', 0x4000),

	/**
	 * stream error
	 * @type {_Opcode}
	 */
	STREAM_ERROR : new _Opcode('streamError', 0x4100),
	
	/**
	 * 消息包的范围
	 * @type {_Range}
	 */
	MESSAGE_RANGE : new _Range(0x1000, 0x2000),
	
	/**
	 * IQ包的范围
	 * @type {_Range}
	 */
	IQ_RANGE : new _Range(0x2000, 0x3000),
	
	/**
	 * Presence包的范围
	 * @type {_Range}
	 */
	PRESENCE_RANGE : new _Range(0x3000, 0x4000)
};

/**
 * 包结构: 每个片段所在位置
 */
var PACKET_STRUCT = {
	/**
	 * 控制帧
	 */
	CONSOLE_FRAME : new _Range(0, 1),
	
	/**
	 * 操作码 {@see OPCODE}
	 */
	OPCODE : new _Range(1, 3),
	
	/**
	 * 包的长度
	 */
	PACKET_LEN : new _Range(3, 7),
	
	/**
	 * 版本
	 */
	VERSION : new _Range(7, 9),
	
	/**
	 * 序列号
	 */
	SEQ_ID : new _Range(9, 13)
};

function shallowClone(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType){
    var prototype = shallowClone(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function JumpPacket(content, opcode) {
	this.sFrame = 0; // 控制帧
	this.version = 0x0100;
	this.seqId = 0;
	this.packetLen = 0;
	this.content = content;
	this.opcode = opcode;
}
var YYIMChat = (function(){
/**
 * jid相关的工具类，包含处理jid的相关静态方法
 * 
 * @Class YYIMJIDUtil
 */
var YYIMJIDUtil = {};

/**
 * 返回bareJid
 * 如果是设备（node同user的node），则返回全jid
 * 
 * @deprecated since version 2.0, use YYIMJIDUtil.buildUserJID or YYIMJIDUtil.buildChatGroupJID instead
 * 
 * @param {string | JSJaCJID|SNSRoster} 被处理的jid
 * @throws JSJaCJIDInvalidException Thrown if jid is not valid
 */
YYIMJIDUtil.getBareJID = function(jid) {
	var userBareJid = YYIMManager.getInstance().getUserBareJID();
	var tmpJid;
	if (jid) {
		if (jid instanceof JSJaCJID) {
			if(jid.getBareJID() == userBareJid)
				return jid.toString();
			return jid.getBareJID();
		} else if (typeof jid == "string") {
			tmpJid = new JSJaCJID(jid);
			if(tmpJid.getBareJID() == userBareJid)
				return tmpJid.toString();
			return tmpJid.getBareJID();
		} else if (jid.jid && jid.jid instanceof JSJaCJID) {
			tmpJid = jid.jid;
			if(tmpJid.getBareJID() == userBareJid)
				return tmpJid.toString();
			return tmpJid.getBareJID();
		}
	}
	throw new JSJaCJIDInvalidException("invalid jid: " + jid);
};

/**
 * 根据id或node或jid获取id
 */
YYIMJIDUtil.getID = function(jid) {
	var appkey, tmp, index;
	return YYIMCommonUtil.isStringAndNotEmpty(jid)? 
			(appkey = YYIMManager.getInstance().getAppkey(), index = jid.indexOf('@'), index != -1 ? 
				(tmp = jid.substring(0, index), tmp.indexOf(appkey) > 0 ?
						tmp.replace(appkey,'') 
						: tmp )/*全的jid*/ 
				: (jid.indexOf(appkey) > 0 ? 
						jid.replace(appkey,'') 
						: jid)/*node或id*/) 
			: null;
};

/**
 * 根据id或node或jid获取node
 */
YYIMJIDUtil.getNode = function(jid) {
	if(YYIMCommonUtil.isStringAndNotEmpty(jid)){
		var appkey = YYIMManager.getInstance().getAppkey();
		var node = jid;

		if(node.indexOf('\@') > -1){
			if(node.indexOf('\@') === 0){
				throw "\""+jid+"\" Can't start with  \"@\"!";
			}else{
				node = node.substring(0, node.indexOf('\@'));
			}
		}
		
		if(node.indexOf('\.') > -1){
			if(node.indexOf('\.') === 0){
				throw "\""+jid+"\" Can't start with \".\"!";
			}else{
				node = node.substring(0, node.indexOf('\.'));
			}
		}
		return node ? node + appkey: node;
	}else{
		throw "\""+jid+"\" Can't be Number Or Empty!";
	}
};

/**
 * 根据jid获取resource
 */
YYIMJIDUtil.getResource = function(jid) {
	return YYIMCommonUtil.isStringAndNotEmpty(jid) ?
			(jid.indexOf('/') != -1?
					jid.substring(jid.indexOf('/') + 1) 
					: null) 
			: null;
};

/**
 * 根据用户的id/node/jid和resource获取新的jid
 * 
 * @param idOrJid id, node, jid (e.g. yuenoqun, yuenoqun.app.etp@server)
 * @param resource e.g. pc
 * 
 * @returns yuenoqun.app.etp@server/pc or yuenoqun.app.etp@server when resource is null
 */
YYIMJIDUtil.buildUserJID = function(idOrJid, resource) {
	return YYIMCommonUtil.isStringAndNotEmpty(idOrJid)? 
			(idOrJid.indexOf('@') != -1? 
					idOrJid 
					: idOrJid + '@' + YY_IM_DOMAIN + (
							resource? 
									'/' + resource 
									: '')) 
			: null;
};

/**
 * 根据jid返回域
 */
YYIMJIDUtil.getDomain = function(jid) {
	return YYIMCommonUtil.isStringAndNotEmpty(jid) ? 
			(jid.indexOf('@') != -1? 
					jid.substring(jid.indexOf('@') + 1) 
					: null)
			: null;
};

/**
 * 根据群组的id/node/jid获取新的jid
 * 
 * @param idOrJid id, node, jid (e.g. huashan, huashan.app.etp, huashan.app.etp@conference.server)
 * 
 * @returns huashan.app.etp@conference.server
 */
YYIMJIDUtil.buildChatGroupJID = function(idOrJid) {
	return YYIMCommonUtil.isStringAndNotEmpty(idOrJid)? 
			(idOrJid.indexOf('@') != -1? 
					idOrJid 
					: idOrJid + '@' + YYIMConfiguration.DOMAIN.CHATROOM) 
			: null;
};

/**
 * 根据公共号的id/node/jid获取新的jid
 * 
 * @param idOrJid id, node, jid (e.g. huashan, huashan.app.etp, huashan.app.etp@pubaccount.server)
 * 
 * @returns huashan.app.etp@pubaccount.server
 */
YYIMJIDUtil.buildPubAccountJID = function(idOrJid) {
	return YYIMCommonUtil.isStringAndNotEmpty(idOrJid)? 
			(idOrJid.indexOf('@') != -1? 
					idOrJid 
					: idOrJid + '@' + YYIMConfiguration.DOMAIN.PUBACCOUNT) 
			: null;
};
function YYIMConsoleLogger(level) {

	this.level= !level?(level==0?0:3):level;

	this.start = function() {
	};
	/**
	 * 
	 * @param {String}     groupname  将被打印出来的组名
	 * 
	 * @param {int} level : 0--error; 1--warn, 2--info, 3 --log, 4--debug	若设置系统过滤level = 3, 则只显示级别为1，2的日志
	 * 
	 * @param {Object} obj：不定参数，被调试的对象的当前状态, 采用clone方式保存当前对象状态
	 */
	this.log = function(groupname, level, obj1,obj2) {
		
		if (!YYIMConfiguration.LOG.ENABLE) {
			return;
		}
		
		level= !level?(level==0?0:3):level;
		
		if (level > this.level)
			return;
		if (typeof (console) == 'undefined'||typeof (console.group) == 'undefined')
			return;
		try {
			console.group(groupname);
			switch (level) {
				case 0:
					console.error(groupname);
					console.trace();
					break;
				case 1:
					console.warn(groupname);
					console.trace();
					break;
				case 2:
					console.info(groupname);
					break;
				case 4:
					console.debug(groupname);
					break;
				default:
					console.log(groupname);
					break;
			}
			var argLength = arguments.length;
			if(argLength>2){
				for(var i=2; i<argLength; i++){
					var obj = arguments[i];
					if(obj){
						if(obj instanceof JSJaCPacket){
							console.info(obj.doc.xml);
						}else{
							console.debug(obj);
						}
					}
				}
			}
			console.groupEnd();
		} catch (e1) {
			try {
				console.error(e1);
			} catch (e2) {
			}
		}
	};

	this.logParam = function(level){
		level = level || 3;
		var caller = this.logParam.caller;
		this.log("arguments:", level, caller.arguments);
	};
	
	this.setLevel = function(level) {
		this.level = level;
		return this;
	};

	this.getLevel = function() {
		return this.level;
	};
}

var YY_IM_DOMAIN = "im.yyuap.com";
var YY_IM_ADDRESS = "172.30.2.8";
var YY_IM_WSPORT = 5222; //5222
var YY_IM_HTTPBIND_PORT = 7070; //7070
var YY_IM_SERVLET_ADDRESS = "http://172.30.2.8/";

jQuery.support.cors = true; //ie浏览器跨域支持

var YYIMConfiguration = {
		
		RESOURCE:"web-v2.5",
		
		IS_ANONYMOUS:true,
		
		MULTI_TENANCY:{
			ENABLE:true,
			ETP_KEY:"etp",
			APP_KEY:"app",
			SEPARATOR:"."
		},
		
		RECEIPTSPACKET_AUTO : true, //是否自动发送接收回执报文
		
		SENDINTERVAL : 30, //两次发送报文的时间间隔 rongqb 20151124
		
		RECENTCONTACTSDAY : 7, //默认拉取最近7 天联系人列表      （需要做模式区分）
		 
		RECENTCONTACTSNUM : 20,  //默认拉取最近100个联系人的列表 （需要做模式区分）
		
		RECENTCONTACTSMODE: {
			NUMBER : 'number',
			DAYS : 'days'
		},
		
		MULTIPARTYCALL : {
			ADDRESS: 'http://dudu.yonyoutelecom.cn/httpIntf/createConference.do', //多端通话接口地址 20160104
			RESTADDRESS: 'https://im.yyuap.com/sysadmin/rest/user/voip/make', //多端通话rest接口地址 20160107
			ACCOUNT: '', //账号
			KEY: '',     //密码
			PHONESMAXLENGTH: 200, //最大被叫字符数
			PARTYMAXLENGTH: 12    //最大被叫人数
		},
		
		SUPPORT:{
			isWebSocketSupport : (function() {
				var isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1 ; //判断是否Safari 
				if(isSafari)
					return false;
				window.WebSocket =window.WebSocket || window.MozWebSocket;
				if (window.WebSocket) {
					return true;
				}
				return false;
			})(),
			isLocalConnectionSupport:(function(){
				if(window.localStorage){
					return true;
				}
				return false;
			})()
		},
		
		CONNECTION:{
			TIMERVAL : 2000,
			WAIT:300,
			SECURE: false,
			ALLOW_PLAIN : true,
			ENABLE_WEBSOCKET:true,
			ENABLE_LOCAL_CONNECTION:true,
			USE_HTTPS: false,
			SERVER_NAME:YY_IM_DOMAIN,
			HTTP_BASE:YY_IM_ADDRESS,
			HTTP_BIND_PORT:YY_IM_HTTPBIND_PORT,
			WS_PORT:YY_IM_WSPORT
		},
		
		PING:{
			/**
			 * 两个ping之间的间隔毫秒数
			 * @Type {Number}
			 */
			INTERVAL:30*1000,
			
			/**
			 * 收到一个ping之后，指定的时间段(ms)内不再发送ping包
			 * @Type {Number}
			 */
			DURATION:30*1000,
			
			/**
			 * 当指定的毫秒数内服务器没有回复报文，则认为已断开连接
			 *  @Type {Number}
			 */
			TIMEOUT:30*1000
		},
		
		SERVLET:{
			FILE_UPLOAD_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/fileUpload",
			FILE_DOWNLOAD_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/download",
			FILE_DELETE_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/cancel",
			AVATAR_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/avatar",
			REST_RESOURCE_SERVLET:YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/resource/',
			REST_HISTORY_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/history/",
			REST_VERSION_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/version/",
			REST_USER_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/user/",
			REST_UPLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + "im_upload/rest/resource/",
			REST_DOWNLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + "im_download/rest/resource/",
			REST_TRANSFORM_SERVLET: YY_IM_SERVLET_ADDRESS + "im_download/rest/transform/resource/"
		},
		
		DOMAIN : {
			CHATROOM : 'conference.' + YY_IM_DOMAIN,
			SEARCH : 'search.' + YY_IM_DOMAIN,
			PUBACCOUNT : 'pubaccount.' + YY_IM_DOMAIN
		},
		
		MESSAGE:{
			SEND_TIMEOUT:30*1000,
			MAX_CHARACHER:1000,
			
			/**
			 * 发送消息是否要求回执
			 */
			REQUEST_RECEIPTS : true
		},
		
		LOG:{
			ENABLE:true,
			FILTER_LEVEL:3
		},
		
		BROWSER : (function(){
			var userAgent = navigator.userAgent.toLowerCase(); 
			// Figure out what browser is being used 
			return {
			version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
			safari: /webkit/.test( userAgent ), 
			opera: /opera/.test( userAgent ), 
			msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
			mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
			}; 
		})()
		
};

YYIMConfiguration.getHttpBindUrl = function(){
	var prefix = this.CONNECTION.USE_HTTPS?"https://":"http://";
	return prefix + this.CONNECTION.HTTP_BASE+":"+this.CONNECTION.HTTP_BIND_PORT+"/http-bind/";
};

YYIMConfiguration.getWebSocketUrl = function(){
	var prefix = this.CONNECTION.USE_HTTPS?"wss://":"ws://";
	return prefix + this.CONNECTION.HTTP_BASE+":"+this.CONNECTION.WS_PORT;
};

YYIMConfiguration.useWebSocket = function(){
	return this.SUPPORT.isWebSocketSupport && this.CONNECTION.ENABLE_WEBSOCKET;
};

YYIMConfiguration.useLocalConnection = function(){
	return this.SUPPORT.isLocalConnectionSupport && this.CONNECTION.ENABLE_LOCAL_CONNECTION;
};

YYIMConfiguration.getConnectionArgObj = function(){
	var oArg = {
			domain : this.CONNECTION.SERVER_NAME,
			resource :  this.RESOURCE,
			allow_plain :  this.CONNECTION.ALLOW_PLAIN,
			secure :  this.CONNECTION.SECURE,
			register :false
	};
	if(this.IS_ANONYMOUS){
		oArg.authtype = "saslanon";
	}
	
	return oArg;
};

var CONNECTION_TYPE = {
	PRIMARY : 1,
	LOCAL : 2,
	SLAVE : 2,
	NONE : 4,
	ACTIVE : 8
};

var STATUS = {
	CHAT : "chat", //该实体或资源活跃并想聊天
	AWAY : "away", //该实体或资源临时离开
	XA : "xa", //该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开)
	DND : "dnd", //该实体或资源忙(dnd = "Do Not Disturb"，免打扰)
	UNAVAILABLE : "unavailable" // 隐身(自定义,RFC6121未定义)
};

var TYPE = {
	SET : "set",
	RESULT : "result",
	GET : "get",
	SUBMIT : "submit",
	UNAVAILABLE : "unavailable"
};

var PRESENCE_TYPE = {
	SUBSCRIBE : "subscribe",
	UNSUBSCRIBE : "unsubscribe",
	SUBSCRIBED : "subscribed",
	UNSUBSCRIBED : "unsubscribed",
	PROBE : "probe",
	UNAVAILABLE : "unavailable"
};

// 房间配置表单
var CHATROOM_CONFIG_FROM = {
	CONFIG: "http://jabber.org/protocol/muc#roomconfig",
	NAME: "muc#roomconfig_roomname",
	DESC: "muc#roomconfig_roomdesc",
	PHOTO: "muc#roomconfig_photo",
	PERSIST: "muc#roomconfig_persistentroom",
	OWNERS: "muc#roomconfig_roomowners",
	ETP: "muc#roomconfig_etp",
	APP: "muc#roomconfig_app"
};

var COLLECT_TYPE = {
	ADD:'add',
	REMOVE:'remove'
};

var CHAT_TYPE = {
	CHAT: "chat",
	GROUP_CHAT: "groupchat",
	DEVICE: "device",
	PUB_ACCOUNT: "pubaccount"
};

var CHATROOM_MEMBER_UPDATE = {
	JOIN: "join",
	QUIT: "quit"
};

//消息内容类型
var MESSAGE_CONTENT_TYPE = {
	MIXED : 'mixed',
	SIMPLE : 'simple',
	TEXT : 2,
	FILE : 4,
	IMAGE : 8,
	SYSTEM : 16,
	PUBLIC : 32,
	AUDO : 64,
	LOCATION : 128,
	SHARE : 256,
	WHITEBOARD : 1024
};

//白板操作
var WHITE_OPERATION = {
	CREATE:'create',
	LISTEN:'listen',
	END:'end',
	RENAME:'rename',
	UPDATE:'update',
	DELETE:'delete'
};

var MESSAGE_TYPE = new Object();
MESSAGE_TYPE.CHAT = "chat";
MESSAGE_TYPE.ERROR = "error";
MESSAGE_TYPE.GROUPCHAT = "groupchat";
MESSAGE_TYPE.HEADLINE = "headline";
MESSAGE_TYPE.NORMAL = "normal";
MESSAGE_TYPE.INVITE = "invite";
MESSAGE_TYPE.SUBSCRIBE = "subscribe";

var SYNC = {
	ROOM : 'roomsync@roomsync.im.yyuap.com',
	ROSTER : 'rostersync@rostersync.im.yyuap.com',
	NS_ROOM : 'http://jabber.org/protocol/muc#sync',
	NS_ROSTER : 'http://jabber.org/protocol/roster#sync'
};
var YYIMIQ = (function(){
	// VCard相关的IQ包
	var vcardIQ = (function() {
		
		/**
		 * 请求自己或好友的VCard
		 * @param arg
		 * 	{
		 * 		jid : 为空则请求自己的VCard,
		 * 		success : function,
		 * 		error : function,
		 * 		complete : function
		 *  }
		 */
		function getVCard(arg) {
			var iqBody = {
				type : TYPE.GET
			};
			
			YYIMCommonUtil.isStringAndNotEmpty(arg.jid)? iqBody.to = arg.jid : null;
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.VCARD.SEND), function(vcardResult, _arg) {
				_arg.complete && _arg.complete();
				var vcard = vcardResult.vcard || {};
				vcard.userId = YYIMJIDUtil.getID(vcard.username);
				if(!!vcardResult.enableFields){
					vcard.enableFields = vcardResult.enableFields;
				}
				_arg.success && _arg.success(vcard);
			}, arg);
		}
		
		/**
		 * 请求自己所有好友的VCard
		 * 
		 * @param arg
		 * {
		 * 		success : function,
		 * 		error : function,
		 * 		complete : function
		 * }
		 */
		function getVCards(arg) {
			var iqBody = {
				type : 'roster'
			};
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.VCARDS.SEND), function(vcardsResult, _arg) {
				var results = vcardsResult.vcards || [];
					vcards = [],
					i = results.length;
				while(i--) {
					var vcard = results[i];
					vcard.userId = YYIMJIDUtil.getID(vcard.username);
					vcards.push(vcard);
				}
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(vcards);
			}, arg);
			
		}
		
		/**
		 * 修改当前用户的VCard
		 * @param arg {
		 * 		vcard : {
		 * 			nickname,
		 * 			photo,
		 * 			email,
		 * 			mobile,
		 * 			telephone
		 * 		},
		 * 		success : function,
		 * 		error : fcuntion
		 * }
		 */
		function setVCard(arg) {
			YYIMConnection.getInstance().send(new JumpPacket({
				type : TYPE.SET,
				vcard : arg.vcard
			}, OPCODE.VCARD.SEND), function(vcardResult, _arg) {
				_arg.complete && _arg.complete();
				_arg.success && _arg.success();
			}, arg);
		}
		
		/**
		 * 获取用户在线状态 rongqb 20151119
		 * arg {
		 * username: ['zhangsan','lisi'],
		 * success:function,
		 * error:function,
		 * complete:function,
		 * }
		 * resource:2.1
		 */
		function getRostersPresence(arg){
			jQuery.ajax({
				url: YYIMConfiguration.SERVLET.REST_USER_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/presence/detail?token='+ YYIMManager.getInstance().getToken() + '&username=' + arg.username,
				type:'get',
				dataType:'json',
				cache:false,
				success:function(data){
					arg.success && arg.success(data);
				},
				error:function(){
					arg.error && arg.error(); 
				},
				complete:function(){
					arg.complete && arg.complete(); 
				}
			});
		}
		
		/**
		 * 获取最近联系人列表 rongqb 20160526
		 * arg {
		 * mode: String, // 'days' 按照最近*天查询联系人(默认)， 'number' 按照最近联系人个数查询，
		 * contactsDays: number,//查询最近*天的联系人  默认是 7 （mode == 'days'）
		 * contactsCount: number,//查询最近联系人的数量 默认是 20 （mode == 'number'）
		 * success:function, 
		 * error:function,
		 * complete:function,
		 * }
		 */
		function getRecentContacts(arg){
			var data = {
				token: YYIMManager.getInstance().getToken(),
				username: YYIMManager.getInstance().getUserID()
			};
			var url = YYIMConfiguration.SERVLET.REST_USER_SERVLET + 'recentcontact/' + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY; 
			arg = arg || {};
			arg.mode = arg.mode || YYIMConfiguration.RECENTCONTACTSMODE.DAYS;
			
			if(arg.mode === YYIMConfiguration.RECENTCONTACTSMODE.NUMBER){
				url += '/recent/contacts'; 
				data.contactsCount = typeof arg.contactsCount == 'number'? arg.contactsCount : YYIMConfiguration.RECENTCONTACTSNUM;
			}else{
				url += '/recentContacts'; 
				var endDate = new Date().getTime();
				data.startDate = endDate - (typeof arg.contactsDays == 'number'? arg.contactsDays : YYIMConfiguration.RECENTCONTACTSDAY) * (24*60*60*1000);
				data.endDate = endDate;
			}
			
			jQuery.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				data: data,
				cache: false,
				success: function(data){
					var temp = [];
					for(var x in data){
						if(data[x].username){
							temp.push({
								id: YYIMJIDUtil.getID(data[x].username),
								dateline: data[x].lastContactDate
							});
						}
					}
					temp = temp.sort(YYIMUtil['array']['comparisonAsc']('dateline'));
					arg.success && arg.success(temp);
				},
				error:function(){
					arg.error && arg.error(); 
				},
				complete:function(){
					arg.complete && arg.complete(); 
				}
			});
		}
		
		return {
			getVCard : getVCard,
			setVCard : setVCard,
			getVCards : getVCards,
			getRostersPresence : getRostersPresence,
			getRecentContacts : getRecentContacts
		};
	})();
	
	// 好友相关的IQ包
	var rosterIQ = (function() {
		/**
		 * 请求好友列表
		 * @param arg {success: function, error: function, complete:function}
		 */
		function getRosterItems(arg) {
			var jumpPacket = new JumpPacket({}, OPCODE.ROSTER_LIST.SEND);

			YYIMConnection.getInstance().send(jumpPacket, function(rosterListPacket, _arg) {
				if(!_arg)
					return;
				
				_arg.complete && _arg.complete();
				
				var items = rosterListPacket.items || [];
//				if((items && items.length || 0) === 0)
//					return;
				var rosters = [], i = items.length || 0, friquest = {};
				while(i--) {
					var item = items[i],
						jid = item.jid,
						roster = {
							id: YYIMJIDUtil.getID(jid),
							resource: YYIMJIDUtil.getResource(jid),
							ask: item.ask,
							recv: item.recv,
							name: item.name,
							photo: item.photo,
							subscription: item.subscription,
							group: item.groups
						};
					if(YYIMJIDUtil.getDomain(jid) !== YYIMConfiguration.DOMAIN.PUBACCOUNT){
						rosters.push(roster);
						
						if(!friquest[roster.id] && roster.subscription === 'none'){
							if(roster.recv === 1){ //收到好友请求
								friquest[roster.id] = roster;
							}else if(roster.ask === 1){//发送好友请求
								//... 闲置
							}
						}
					}
				}
				
				/**
				 * 处理好友请求 20151204
				 */
				for(var x in friquest){
					YYIMManager.getInstance().onSubscribe({
						from: friquest[x].id,
						type: PRESENCE_TYPE.SUBSCRIBE
					});
				}
				
				_arg.success && _arg.success(JSON.stringify(rosters));
			}, arg);
		}
		
		/**
		 * 删除好友, 需要合法的jid
		 * @param arg {jid: string, success: function, error: function,complete: function}
		 */
		function deleteRosterItem(arg) {
			var iqBody = {
				type : TYPE.SET,
				ns : NS_ROSTER,
				item : {
					jid : arg.jid,
					subscription : 'remove'
				}
			};
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function(deleteResult, _arg) {
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(YYIMJIDUtil.getID(_arg.jid));
			}, arg);
		}
		
		/**
		 * 更新好友
		 * @param arg {
		 * 		roster : {
		 * 			jid : 好友jid,
		 * 			name : 好友昵称,
		 * 			groups : ["group1","group2"] // 好友所在分组
		 * 		},
		 * 		success : function,
		 * 		error : function
		 * }
		 */
		function updateRosterItem(arg) {
			var roster = arg.roster,
				iqBody = {
					item : {
						jid :roster.jid, 
						name : roster.name,
						groups : []
					}
				},
				groups = roster.groups,
				i = groups? groups.length : 0;
			while(i-- && YYIMCommonUtil.isStringAndNotEmpty(groups[i]))
				iqBody.item.groups = iqBody.item.groups.concat(groups[i]);
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function(updateResult, _arg) {
				_arg.complete && _arg.complete();
				
				if(updateResult.code === 400){
					_arg.error && _arg.error(updateResult);
				}else{
					updateResult.to =  YYIMJIDUtil.getID(updateResult.to);
					_arg.success && _arg.success(updateResult);
				}
			}, arg);
		}
		
		/**
		 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
		 * @param arg {keyword, start, size, success: function, error: function,complete: function}
		 */
		function queryRosterItem(arg) {
			var iqBody = {
				start : YYIMCommonUtil.isNumber(arg.start)? arg.start : 0,
				size : 	YYIMCommonUtil.isNumber(arg.size)? arg.size : 20,
				fields : ["Username","Name"],
				search : arg.keyword
			};
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.QUERY_USER.SEND), function(queryResult, _arg) {
				var items = queryResult.items || [], 
					result = [], 
					i = items.length; 
				while(i--) {
					var item = items[i],
						jid = item.jid;
					if(jid === YYIMManager.getInstance().getUserBareJID())
						continue;
					result.push({
						id : YYIMJIDUtil.getID(jid),
						name : YYIMCommonUtil.isStringAndNotEmpty(item.name)? item.name : YYIMJIDUtil.getID(jid),
						photo : item.photo,
						email : item.email
					});
				}
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					start : queryResult.start,
					total : queryResult.total,
					items : result
				});
			}, arg);
			
		}
		
		return {
			getRosterItems : getRosterItems,
			deleteRosterItem : deleteRosterItem,
			queryRosterItem : queryRosterItem,
			updateRosterItem : updateRosterItem
		};
	})();
	
	// 群组相关的IQ包
	var chatGroupIQ = (function() {
		function getChatGroups(arg) {
			jQuery.ajax({
				url: YYIMConfiguration.SERVLET.REST_USER_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/rooms?token='+ YYIMManager.getInstance().getToken() + '&username=' +  YYIMManager.getInstance().getUserID(),
				type:'get',
				dataType:'json',
				cache:false,
				success:function(chatGroupListPacket){
					var items = chatGroupListPacket.items || [];
//					if((items && items.length || 0) === 0)
//						return;
					var chatGroups = [], i = items.length || 0;
					while(i--) {
						var item = items[i];
						item.from = item.jid;
						var chatGroup = handleChatGroup(item);
						if(chatGroup){
							chatGroups.push(chatGroup);
						}
					}
					arg.success && arg.success(JSON.stringify(chatGroups));
				},
				error:function(){
					arg.error && arg.error(); 
				},
				complete:function(){
					arg.complete && arg.complete(); 
				}
			});
		}
		/**
		 * 查找群
		 * @param arg {keyword, start, size, success: function, error: function,complete: function}
		 */
		function queryChatGroup(arg) {
			var iqBody = {
				start : YYIMCommonUtil.isNumber(arg.start)? arg.start : 0,
				size : 	YYIMCommonUtil.isNumber(arg.size)? arg.size : 20,
				search : arg.keyword
			};
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.QUERY_CHATGROUP.SEND), function(queryResult, _arg) {
				var items = queryResult.items || [], 
					result = [], 
					i = items.length;
				while(i--) {
					var item = items[i],
						jid = item.jid;
					result.push({
						id : YYIMJIDUtil.getID(jid),
						name : YYIMCommonUtil.isStringAndNotEmpty(item.name)? item.name : YYIMJIDUtil.getID(jid)
					});
				}
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					start : queryResult.start,
					total : queryResult.total,
					items : result
				});
			}, arg);
		}
		
		/**
		 * 群组表单配置, 需要合法的jid
		 * @param arg {name, desc[optional], jid, photo[optional],success: function, error: function, complete:function}
		 */
		function configChatGroup(arg) {
			var iqBody = {
				to : arg.jid,
				roomname : arg.name,
				roomdesc : arg.desc,
				persistent : 1,
				owners : [YYIMManager.getInstance().getUserBareJID()],
				etp : YYIMConfiguration.MULTI_TENANCY.ETP_KEY,
				app : YYIMConfiguration.MULTI_TENANCY.APP_KEY
			};
			if(YYIMCommonUtil.isStringAndNotEmpty(arg.photo)) {
				iqBody.photo = arg.photo;
			}
			

			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.CONFIG_CHATGROUP.SEND), function(configResult, _arg) {
				_arg.complete && _arg.complete();
				_arg.success && _arg.success();
			}, arg);

		}
		
		/**
		 * 获取群组信息
		 * @param arg {jid : 群组的jid, success : function, error : function}
		 */
		function getChatGroupInfo (arg) {
			var iqBody = {
				to : arg.jid,
				type : TYPE.GET,
				ns : NS_DISCO_INFO
			};
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.CHATGROUP_INFO.SEND), function(infoResult, _arg) {
				_arg.complete && _arg.complete();
				var name = infoResult.roomname? infoResult.roomname : YYIMJIDUtil.getID(_arg.jid),
					desc = infoResult.description;
				
				_arg.success && _arg.success({
					name : name,
					desc : desc
				});
			}, arg);
		}
		
		/**
		 * 创建群组 rongqb 20151117
		 *  @param arg {id: string,members:[],name:string, success: function,complete: function}
		 *  resource:2.1 
		 */
		function createChatGroup(arg){
			var iqBody = {
					 id: arg.id,
					 naturalLanguageName:arg.name,   
			         from : YYIMManager.getInstance().getUserBareJID(),
			         invitees: arg.members
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.CREATE_GROUP.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(handleChatGroup(result));
			},arg);
		}
		
		/**
		 *  群主转让群组 rongqb 20160104
		 *  @param arg {id: string,to:群组,newOwner:string,success:function,error:function,complete:function}
		 *  resource:2.3 
		 */
		function transferChatGroup(arg){
			var iqBody = {
					 id: arg.id,
					 to:arg.to,
			         from : YYIMManager.getInstance().getUserBareJID(),
			         newOwner: arg.newOwner
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.TRANSFER_GROUP.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(transferChatGroupOwner(result));
			},arg);
		}
		
		/**
		 *  群主解散群组 rongqb 20160106
		 *  @param arg {id: string,to:群组}
		 *  resource:2.3 
		 */
		function dismissChatGroup(arg){
			var iqBody = {
					 id: arg.id,
					 to: arg.to,
			         from : YYIMManager.getInstance().getUserBareJID()
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.DISMISS_GROUP.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					id : result.id,
					from : YYIMJIDUtil.getID(result.from),
					to : YYIMJIDUtil.getID(result.to)
				});
			},arg);
		}
		
		/**
		 * 房间成员邀请人入群 rongqb 20151118
		 *  @param arg {id: string,to:群组,members:[],name:string, success: function,complete: function}
		 *  resource:2.1 
		 */
		function inviteGroupMember(arg){
			var iqBody = {
					 id: arg.id,
					 to:arg.to,   
			         from : YYIMManager.getInstance().getUserBareJID(),
			         invitees: arg.members
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.INVITE_GROUP_MEMBER.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(handleChatGroup(result));
			},arg);
		}

		/**
		 * 群成员更改配置信息 rongqb 20151119
		 *  @param arg {id: string,to:群组,name:string, success: function,complete: function}
		 *  resource:2.1 
		 */
		function modifyChatGroupInfo(arg){
			var iqBody = {
					 id: arg.id,
					 naturalLanguageName:arg.name,   
			         from : YYIMManager.getInstance().getUserBareJID(),
			         to: arg.to
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.MODIFY_GROUP_INFO.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(handleChatGroup(result));
			},arg);
		}
		
		/**
		 *  群主踢人 rongqb 20151119
		 *  @param arg {id: string,to:群组,member:string, success: function,complete: function}
		 *  resource:2.1 
		 */
		function kickGroupMember(arg){
			var iqBody = {
					 id: arg.id,
					 member:arg.member,   
			         from : YYIMManager.getInstance().getUserBareJID(),
			         to: arg.to
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.KICK_GROUP_MEMBER.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success(handleChatGroup(result));
			},arg);
		}
		
		/**
		 * 群成员退出群 rongqb 20151119
		 *  @param arg {id: string,to:群组,success: function,complete: function}
		 *  resource:2.1 
		 */
		function exitChatGroup(arg){
			var iqBody = {
					 id: arg.id,
			         from : YYIMManager.getInstance().getUserBareJID(),
			         to: arg.to
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.EXIT_GROUP.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					from:YYIMJIDUtil.getID(result.from),
					id:result.id,
					to:YYIMJIDUtil.getID(result.to)
				});
			},arg);
		}
		
		/**
		 * 群组信息返回处理函数
		 */
		function handleChatGroup(result){
			if(!result){
				return;
			}
			
			var j = result.members.length;
			var members = [];
			while(j--){
				var member = result.members[j];
				member.id = YYIMJIDUtil.getID(member.jid);
				members.push(member);
			}
			var chatGroup = {
				id:  YYIMJIDUtil.getID(result.from),
				name: result.naturalLanguageName || result.name,
				photo: result.photo,
				numberOfMembers: result.numberOfMembers,
				superLarge: result.superLarge,
				collected: result.collected,
				type :result.type,
				creationdate: result.creationdate,
				creater:  YYIMJIDUtil.getID(result.operator),
				members: members,
				owners : result.owners
			};		
			return chatGroup;
		}
		
		/**
		 * 群组转让返回处理函数 rongqb 20160106
		 */
		function transferChatGroupOwner(result){
			if(!result){
				return;
			}
			
			var j = result.memberItems.length;
			var members = [];
			while(j--){
				var member = result.memberItems[j];
				member.id = YYIMJIDUtil.getID(member.jid);
				members.push(member);
			}
			var chatGroup = {
				id:  YYIMJIDUtil.getID(result.from),
				members: members
			};		
			return chatGroup;
		}
		
		/**
		 *  收藏群组(收藏/取消收藏) rongqb 20151201
		 *  @param arg {id: string,to:群组,type:'add/remove', success: function,complete: function}
		 *  resource:2.1 
		 */
		function collectChatGroup(arg){
			var iqBody = {
					 id: arg.id,
			         from : YYIMManager.getInstance().getUserBareJID(),
			         to: arg.to,
			         type:arg.type
			      };
			
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.COLLECT_GROUP.SEND),function(result,_arg){
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					from:YYIMJIDUtil.getID(_arg.to),
					id:result.id,
					to:YYIMManager.getInstance().getUserID(),
					type:_arg.type,
					code:result.code,
					message:result.message
				});
			},arg);
		}
		
		/**
		 * 获取群组共享文件 rongqb 20160323 
		 * arg {
		 *  id:String,
		 *  start:number,
		 *  size:number
		 * }
		 */
		function getGroupSharedFiles(arg){
			var param = {
				token: YYIMManager.getInstance().getToken(),
				username: YYIMManager.getInstance().getUserID(),
				mucId: arg.id,
				start: parseInt(arg.start || 0),
				size: parseInt(arg.size || 20)
			};
			
			var url = YYIMConfiguration.SERVLET.REST_USER_SERVLET + 'sharefiles/' + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/muc';
			url += '?' + jQuery.param(param);
			
			jQuery.ajax({
				url: url,
				type: 'get',
				dataType: 'json',
				cache: false,
				success:function(data){
					var items = data.list;
					var shareFiles = [], i = items.length;
					while(i--) {
						var item = items[i];
						item.creator = YYIMJIDUtil.getID(item.creator);
						shareFiles.push(item);
					}
					arg.success && arg.success(shareFiles);
				},
				error:function(){
					arg.error && arg.error(); 
				},
				complete:function(){
					arg.complete && arg.complete(); 
				}
			});
		}
		
	
		return {
			queryChatGroup : queryChatGroup,
			configChatGroup : configChatGroup,
			getChatGroups : getChatGroups,
			getChatGroupInfo : getChatGroupInfo,
			createChatGroup : createChatGroup,
			inviteGroupMember : inviteGroupMember,
			modifyChatGroupInfo : modifyChatGroupInfo,
			kickGroupMember : kickGroupMember,
			exitChatGroup : exitChatGroup,
			handleChatGroup : handleChatGroup,
			transferChatGroupOwner : transferChatGroupOwner,
			collectChatGroup : collectChatGroup,
			transferChatGroup : transferChatGroup,
			dismissChatGroup : dismissChatGroup,
			getGroupSharedFiles : getGroupSharedFiles
		};
	})();
	
	// 群成员相关的IQ包
	var chatGroupMemberIQ = (function(){
		/**
		 * 获取指定群的群成员[chatroom]
		 * @param arg {jid: string, success: function, error: function,complete: function}
		 */
		function getGroupMembers(arg) {
			YYIMConnection.getInstance().send(new JumpPacket({
				type : TYPE.GET,
				ns : NS_DISCO_ITEMS,
				to : arg.jid
			}, OPCODE.CHATGROUP_MEMBER_LIST.SEND), function(memberListResult, _arg) {
				if(!_arg)
					return;
				
				_arg.complete && _arg.complete();
				
				// if error
				// _arg.error && _arg.error("获取群成员列表失败");
				// return;
				// else
				var items = memberListResult.items;
				if((items && items.length || 0) === 0)
					return;
				var members = [], i = -1, size = items.length;
				while(++i < size) {
					var item = items[i],
						jid = item.jid;
					members.push({
						id: YYIMJIDUtil.getID(jid),
						name: item.name,
						photo: item.photo,
						affiliation : item.affiliation
					});
				}
				
				_arg.success && _arg.success(JSON.stringify(members));
			}, arg);
			
		}
		
		return {
			getGroupMembers : getGroupMembers
		};
	})();
	
	// 公共号相关的IQ包
	var pubaccountIQ = (function() {
		/**
		 * 查询自己所关注的公共号
		 * @param arg {success: function, error: function, complete:function}
		 */
		function getPubAccountItems(arg) {
			var jumpPacket = new JumpPacket({
				type : TYPE.GET,
				ns : NS_PUBACCOUNT,
				to : YYIMConfiguration.DOMAIN.PUBACCOUNT
			}, OPCODE.PUBACCOUNT_LIST.SEND);

			YYIMConnection.getInstance().send(jumpPacket, function(pubaccountListResult, _arg){
				if(!_arg)
					return;
				
				_arg.complete && _arg.complete();
				
				// if error
				// _arg.error && _arg.error('获取公共号列表失败');
				// return
				// else
				
				var items = pubaccountListResult.items || [];
//				if((items && items.length || 0) === 0)
//					return;
				var pubaccounts = [], i = items.length || 0;
				while(i--) {
					var item = items[i];
					var jid = item.jid;
					var pubaccount = {
						id: YYIMJIDUtil.getID(jid),
						name: YYIMCommonUtil.isStringAndNotEmpty(item.name)? item.name : YYIMJIDUtil.getID(jid),
						type: item.type
					};
					pubaccounts.push(pubaccount);
				}
				
				_arg.success && _arg.success(JSON.stringify(pubaccounts));
			}, arg);
		}
		
		/**
		 * 查找公共号
		 * @param arg {keyword, start, size, success: function, error: function,complete: function}
		 */
		function queryPubaccount(arg) {
			var iqBody = {
				start : YYIMCommonUtil.isNumber(arg.start)? arg.start : 0,
				size : 	YYIMCommonUtil.isNumber(arg.size)? arg.size : 20,
				fields : ["Accountname","Name"],
				search : arg.keyword
			};
			YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.QUERY_PUBACCOUNT.SEND), function(queryResult, _arg) {
				var items = queryResult.items || [], 
					result = [], 
					i = items.length;
				while(i--) {
					var item = items[i],
						jid = item.jid;
					result.push({
						id: YYIMJIDUtil.getID(jid),
						name: YYIMCommonUtil.isStringAndNotEmpty(item.name)? item.name : YYIMJIDUtil.getID(jid),
						type: item.type
					});
				}
				_arg.complete && _arg.complete();
				_arg.success && _arg.success({
					start : queryResult.start,
					total : queryResult.total,
					items : result
				});
			}, arg);
			
		}
		
		return {
			getPubAccountItems : getPubAccountItems,
			queryPubaccount : queryPubaccount
		};
	})();
	
	var syncIQ = (function () {
		
		/**
		 * 全量同步好友列表到IMServer
		 * 
		 * @param addList [{jid1, name2}, {jid2, name2} ,...]
		 */
		function fullSyncRoster(addList) {
			YYIMConnection.getInstance().send(new JumpPacket({
				submits : addList
			}, OPCODE.FULL_SYNC_ROSTER.SEND));
		}
		
		/**
		 * 增量同步好友列表到IMServer
		 * 
		 * @param removeList [jid1, jid2]
		 * @param addList [{jid3, name3}, {jid4, name4}, ...]
		 */
		function deltaSyncRoster(removeList, addList) {
			var iqBody ={};
			if(removeList.length > 0)
				iqBody.removes = removeList;
			if(addList.length > 0)
				iqBody.sets = addList;
			
			if(removeList.length > 0 || addList.length > 0) {
				YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.DELTA_SYNC_ROSTER.SEND));
			}
		}
		
		/**
		 * 全量同步群列表到IMServer
		 * 
		 * @param addList [{id1, name2}, {id2, name2} ,...]
		 */
		function fullSyncChatGroup(addList) {
			YYIMConnection.getInstance().send(new JumpPacket({
				submits : addList
			}, OPCODE.FULL_SYNC_CHATGROUP.SEND));
		}
		
		/**
		 * 增量同步群列表到IMServer
		 * 
		 * @param removeList [id1, id2]
		 * @param addList [{id3, name3}, {id4, name4}, ...]
		 */
		function deltaSyncChatGroup(removeList, addList) {
			var iqBody ={};
			if(removeList.length > 0)
				iqBody.removes = removeList;
			if(addList.length > 0)
				iqBody.sets = addList;
			
			if(removeList.length > 0 || addList.length > 0) {
				YYIMConnection.getInstance().send(new JumpPacket(iqBody, OPCODE.DELTA_SYNC_CHATGROUP.SEND));
			}
		}
		
		return {
			fullSyncRoster : fullSyncRoster,
			deltaSyncRoster : deltaSyncRoster,
			fullSyncChatGroup : fullSyncChatGroup,
			deltaSyncChatGroup : deltaSyncChatGroup
		};
	})();
	/**
	 * 监控iq包
	 */
	function monitor() {
		var _conn = YYIMConnection.getInstance();
		
		// 好友删除, 修改, 增加
		_conn.registerHandler(OPCODE.UPDATE_ROSTER.KEY, function(packet) {
			var item = packet.item, id = YYIMJIDUtil.getID(packet.item.jid);
			// 好友添加成功或好友信息更新
			if(item.subscription === 'both') {
				_logger.log('update or add: ' + JSON.stringify(item));
				YYIMManager.getInstance().onRosterUpdateded({
					id : id,
					name : item.name,
					groups : item.groups
				});
			}
			// 好友删除成功或被对方删除
			else if(item.subscription === 'none') {
				_logger.log('delete: ' + JSON.stringify(item));
				YYIMManager.getInstance().onRosterDeleted(id);
			}
			// 删除成功后会受到关系为none的包, remove无需再操作
			else if(item.subscription === 'remove') {
				// do nothing
			}
			
		});
		
		/**
		 * 群信息更新 rongqb 20151119
		 * resource:2.1
		 */
		_conn.registerHandler(OPCODE.ON_GROUP_UPDATE.KEY, function(packet) {
			var chatgroup = chatGroupIQ.handleChatGroup(packet);
			if(chatgroup){
				YYIMManager.getInstance().onGroupUpdate(chatgroup);			
			}
		});
		
		/**
		 * 群组转让 rongqb 20160106
		 * resource:2.3
		 */
		_conn.registerHandler(OPCODE.ON_GROUP_TRANSFER.KEY, function(packet) {
			var chatgroup = chatGroupIQ.transferChatGroupOwner(packet);
			if(chatgroup){
				YYIMManager.getInstance().onTransferGroupOwner(chatgroup);			
			}
		});
		
		/**
		 * 被群组踢了 rongqb 20151119
		 * resource:2.1
		 */
		_conn.registerHandler(OPCODE.KICKED_GROUP.KEY, function(packet) {
			var result = {
				id : packet.id,
				from : YYIMJIDUtil.getID(packet.from),
				to : YYIMJIDUtil.getID(packet.to)
			};
			if(result){
				YYIMManager.getInstance().onKickedOutGroup(result);			
			}
		});
		
		
		/**
		 * 监控新建公众号 rongqb 20151208
		 */
		_conn.registerHandler(OPCODE.PUBACCOUNT_LIST.KEY, function(packet){
			var items = packet.items;
			if((items && items.length || 0) === 0)
				return;
			var pubaccounts = [], i = items.length;
			while(i--) {
				var item = items[i];
				var jid = item.jid;
				var pubaccount = {
					id: YYIMJIDUtil.getID(jid),
					name: YYIMCommonUtil.isStringAndNotEmpty(item.name)? item.name : YYIMJIDUtil.getID(jid),
					type: item.type
				};
				pubaccounts.push(pubaccount);
			}
			YYIMManager.getInstance().onPubaccountUpdate(pubaccounts);		
		});
	}
	
	return {
		monitor : monitor,
		
		// VCard
		getVCard : vcardIQ.getVCard,
		setVCard : vcardIQ.setVCard,
		getVCards : vcardIQ.getVCards,
		getRostersPresence : vcardIQ.getRostersPresence,
		getRecentContacts : vcardIQ.getRecentContacts,
		
		// roster
		getRosterItems : rosterIQ.getRosterItems,
		deleteRosterItem : rosterIQ.deleteRosterItem,
		queryRosterItem : rosterIQ.queryRosterItem,
		updateRosterItem : rosterIQ.updateRosterItem,
		
		// chatGroup
		queryChatGroup : chatGroupIQ.queryChatGroup,
		configChatGroup : chatGroupIQ.configChatGroup,
		getChatGroups : chatGroupIQ.getChatGroups,
		getChatGroupInfo : chatGroupIQ.getChatGroupInfo,
		createChatGroup : chatGroupIQ.createChatGroup,
		inviteGroupMember : chatGroupIQ.inviteGroupMember,
		modifyChatGroupInfo : chatGroupIQ.modifyChatGroupInfo,
		kickGroupMember : chatGroupIQ.kickGroupMember,
		exitChatGroup : chatGroupIQ.exitChatGroup,
		collectChatGroup: chatGroupIQ.collectChatGroup,
		transferChatGroup : chatGroupIQ.transferChatGroup,
		dismissChatGroup : chatGroupIQ.dismissChatGroup,
		getGroupSharedFiles : chatGroupIQ.getGroupSharedFiles,
		
		
		// chatGroupMember
		getGroupMembers : chatGroupMemberIQ.getGroupMembers,
		
		// pubaccount
		getPubAccountItems : pubaccountIQ.getPubAccountItems,
		queryPubaccount : pubaccountIQ.queryPubaccount,
		
		// sync
		fullSyncRoster : syncIQ.fullSyncRoster,
		deltaSyncRoster : syncIQ.deltaSyncRoster,
		fullSyncChatGroup : syncIQ.fullSyncChatGroup,
		deltaSyncChatGroup : syncIQ.deltaSyncChatGroup
	};
})();
var YYIMMessage = (function(){
	var receivedMsgIds = new SNSBaseList();
	/**
	 * 监控message包
	 */
	function monitor() {
		var _conn = YYIMConnection.getInstance();
		
		_conn.registerHandler(OPCODE.USER_MESSAGE.KEY, function(packet) {
			parseMessage(packet, packet.type);
		});
		_conn.registerHandler(OPCODE.CHATGROUP_MESSAGE.KEY, function(packet) {
			parseMessage(packet, packet.type);
		});
		_conn.registerHandler(OPCODE.PUBACCOUNT_MESSAGE.KEY, function(packet) {
			parseMessage(packet, packet.type);
		});
		/**
		 * 监听发送消息的已读回执 rongqb 20151120
		 * resource:2.1
		 */
		_conn.registerHandler(OPCODE.RECEIPTS.KEY, function(receipts) {
			receipts.from = YYIMJIDUtil.getID(receipts.from);
			receipts.to = YYIMJIDUtil.getID(receipts.to);
			YYIMManager.getInstance().onReceipts(receipts);
		});
		
		/**
		 * 各端同步消息  rongqb 20151123
		 * resource:2.1
		 */
		_conn.registerHandler(OPCODE.SYNC_MESSAGE.KEY, function(packet) {
			parseMessage(packet, packet.type);
		});
		
	};
	
	// 长连接接收到的消息
	function parseMessage(packet, chatType) {
		
		// 是否重复消息包
		if(receivedMsgIds.get(packet.id) === true){
			return;
		}
		receivedMsgIds.add(packet.id, true);
		
		// TODO to zhangxin0@server/android web端也会收到
		if(packet.from === YYIMManager.getInstance().getUserFullJID()){
			return;
		}
		
		var packetContent;
		try{
			// 除最简单文本消息，例如图片消息、文件、分享类消息，需要解析
			packetContent = JSON.parse(packet.content);
		}catch(e){
			packetContent = packet.content;
		}
		
		var body = {
				content: packetContent.content,
				contentType: packet.contentType,
				dateline: packet.dateline,
				atuser: packetContent.atuser,
				extend: packetContent.extend 	//扩展
			},
			from = (chatType != CHAT_TYPE.GROUP_CHAT) ? YYIMJIDUtil.getID(packet.from):{
				room: YYIMJIDUtil.getID(packet.from), 
				roster: YYIMJIDUtil.getID(YYIMJIDUtil.getResource(packet.from))
			},
			arg = {
				id: packet.id,
				type: chatType,
				from: from,
				data: body
			};
			
			if(chatType == CHAT_TYPE.CHAT) {
				arg.resource = YYIMJIDUtil.getResource(packet.from);
				arg.to = YYIMJIDUtil.getID(packet.receiver || packet.to);
			}else{
				arg.to = YYIMManager.getInstance().getUserID();
			}
		
		/**
		 * 发送接收回执
		 */
		if(packet.receipts === true){
			var receipt = {
				to:packet.from,
				id:packet.id	
			};
			if(YYIMConfiguration.RECEIPTSPACKET_AUTO === true){
				sendReceiptsPacket(receipt);
				sendReadedReceiptsPacket(receipt);
			}else{
				body.receipt = receipt;
			}
		}
		
		/**
		 * 处理消息报文
		 */
		if(body.contentType){
			switch(body.contentType){
				case  MESSAGE_CONTENT_TYPE.TEXT: //text message
						if(packetContent.style) {
							arg.data.style = packetContent.style;
						}
						try{
							YYIMManager.getInstance().onTextMessage(arg);
						}catch(e){
							YYIMChat.log("textMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.IMAGE: // image message
						if(arg.data && arg.data.content && arg.data.content.path){
							arg.data.content.attachId = arg.data.content.path;
							arg.data.content.path = YYIMChat.getFileUrl(arg.data.content.path); //压缩图
						}
						try{
							YYIMManager.getInstance().onPictureMessage(arg);
						}catch(e){
							YYIMChat.log("imageMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.FILE: // file message
						if(arg.data && arg.data.content && arg.data.content.path){
							arg.data.content.attachId = arg.data.content.path;
							arg.data.content.path = YYIMChat.getFileUrl(arg.data.content.path);
						}
						try{
							YYIMManager.getInstance().onFileMessage(arg);
						}catch(e){
							YYIMChat.log("fileMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.SHARE:  // 分享消息
						try{
							YYIMManager.getInstance().onShareMessage(arg);
						}catch(e){
							YYIMChat.log("shareMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.SYSTEM: //公众号，单图文消息
						arg.data.content = packetContent;		
						if(arg.data && arg.data.content && arg.data.content.path){
							arg.data.content.attachId = arg.data.content.path;
							arg.data.content.path = YYIMChat.getFileUrl(arg.data.content.path); //压缩图
						}
						try{
							YYIMManager.getInstance().onSystemMessage(arg);
						}catch(e){
							YYIMChat.log("systemMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.PUBLIC: //公众号，多图文消息
						if(!packetContent.content && packetContent.length){
							arg.data.content = packetContent;					
						}
						try{
							YYIMManager.getInstance().onPublicMessage(arg);
						}catch(e){
							YYIMChat.log("publicMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.AUDO: //音频消息
						if(arg.data && arg.data.content && arg.data.content.path){
							arg.data.content.attachId = arg.data.content.path;
							arg.data.content.path = YYIMChat.getFileUrl(arg.data.content.path);
						}
						try{
							YYIMManager.getInstance().onAudoMessage(arg);
						}catch(e){
							YYIMChat.log("AudoMessHandleError:",0,arg);
						}
						break;
				case MESSAGE_CONTENT_TYPE.LOCATION: //地理位置分享消息
						if(arg.data && arg.data.content && arg.data.content.path){
							arg.data.content.attachId = arg.data.content.path;
							arg.data.content.path = YYIMChat.getFileUrl(arg.data.content.path);
						}
						try{
							YYIMManager.getInstance().onLocationMessage(arg);
						}catch(e){
							YYIMChat.log("LocationMessHandleError:",0,arg);
						}
						break;	
				case MESSAGE_CONTENT_TYPE.WHITEBOARD: //白板消息
					try{
						YYIMManager.getInstance().onWhiteBoardMessage(arg);
					}catch(e){
						YYIMChat.log("WhiteBoardMessHandleError:",0,arg);
					}
					break;		
				default:
					    YYIMChat.log("unhandlePacketError:",0,arg);break;	
			}
		}
		
	}
	
	/**
	 * 发送回执
	 *  @param arg {
	 *  	to:,	//回执的对象
	 * 		id: 	//报文id
	 * }
	 */
	function sendReceiptsPacket(arg){
		var receiptsPacket = new JumpPacket({
			to: YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.to),YYIMManager.getInstance().getUserResource()),
			dateline: new Date().getTime(),
			id: arg.id
		}, OPCODE.RECEIPTS.SEND);
		YYIMConnection.getInstance().send(receiptsPacket);
	}
	
	/**
	 * 发送已读回执
	 *  @param arg {
	 *  	to:,	//回执的对象
	 * 		id: 	//报文id
	 * }
	 */
	function sendReadedReceiptsPacket(arg){
		var receiptsPacket = new JumpPacket({
			to: YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.to),YYIMManager.getInstance().getUserResource()),
			dateline: new Date().getTime(),
			id: arg.id,
			state:2
		}, OPCODE.RECEIPTS.SEND);
		YYIMConnection.getInstance().send(receiptsPacket);
	}
	
	/**
	 * 发送消息
	 * @param arg {id, to: jid, type: "groupchat"|"chat"|"pubaccount",body:object, success:function, error:function}
	 */
	 function sendMessage(arg) {
		var to,
			body = arg.body || {},
			msgBody = {
    			id 			: arg.id,
    			type 		: arg.type || CHAT_TYPE.CHAT,
    			contentType	: body.contentType || MESSAGE_CONTENT_TYPE.TEXT,
    			dateline	: body.dateline,
    			content 	: {
    				atuser  : body.atuser,
    				extend  : body.extend,
    				content : body.content
    			}
			},
			opcode = OPCODE.USER_MESSAGE.SEND;
			
		if(arg.type == CHAT_TYPE.GROUP_CHAT){
			to = YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
			opcode = OPCODE.CHATGROUP_MESSAGE.SEND;
			
		}else if(arg.type == CHAT_TYPE.PUB_ACCOUNT){
			to = YYIMJIDUtil.buildPubAccountJID(YYIMJIDUtil.getNode(arg.to));
			opcode = OPCODE.PUBACCOUNT_MESSAGE.SEND;
		}else{
			msgBody.receipts = '1';
			if(arg.resource){
				if(arg.resource.toLowerCase() == 'anonymous') {
					to = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getID(arg.to), arg.resource.toUpperCase());
				}
				// 给自己的其他端发
				else if(arg.to == YYIMChat.getUserID()) {
					to = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.to), arg.resource);
				}else{
					to = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.to));
				}
			}else{
				to = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.to));
			}
		}
		
		msgBody.to = to;
		
		// 样式添加到扩展属性，可能会有其他扩展属性，因此扩展属性为k-v格式
		if(arg.style) {
			msgBody.content.style = arg.style;
		}
		
		YYIMConnection.getInstance().send(new JumpPacket(msgBody, opcode), function(receipts) {
			
			if(receipts.code == 40302){
				arg.error && arg.error();
				return;
			}
			
			var result = {
					id: arg.id,
					type: arg.type,
					data: {
						content: body.content,
						contentType: body.contentType,
						dateline: receipts.dateline,
						extend: arg.extend 	//扩
					}
				};
				
				if(result.type === CHAT_TYPE.GROUP_CHAT){
					result.to = YYIMChat.getUserID();
					result.from = {
						room: YYIMJIDUtil.getID(arg.to),
						roster: YYIMChat.getUserID()
					};
				}else{
					result.to = YYIMJIDUtil.getID(arg.to);
					result.from = YYIMChat.getUserID();
				}
				
				result.body = result.data;
				
				if(result.data.content.path){
					result.data.content.attachId = result.data.content.path;
					result.data.content.path = YYIMChat.getFileUrl(result.data.content.path);
				}
				
				if(arg.style){
					result.data.style = arg.style;
				}
				
				arg.success && arg.success(result);
		});
	}
	
	/**
	 * 邀请加群
	 * @param roomJid
	 * @param jids {Array<String>}
	 */
	function addGroupMember(roomJid, jids) {
		YYIMConnection.getInstance().send(new JumpPacket({
			to : roomJid,
			invites : jids
		}, OPCODE.INVITE_USERS.SEND));
	}
	
	/**
	 * 获取历史记录 
	 * @param arg {id: 对方ID, resource: 对方资源 为anonymous时表示匿名用户, chatType: 'chat/groupchat/pubaccount',contentType:'单聊时指定' start: number, num: number, success: function, error: function}
	 */
	function getHistoryMessage(arg) {
		var requestUrl = YYIMConfiguration.SERVLET.REST_HISTORY_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/'+ YYIMChat.getUserID() +"?token="+ YYIMManager.getInstance().getToken() + "&start=" + arg.start + "&size=" + arg.num + "&peer=";
		if(arg.chatType == CHAT_TYPE.PUB_ACCOUNT){
			requestUrl = YYIMConfiguration.SERVLET.REST_HISTORY_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/pubaccount/'+ arg.id +"?token="+ YYIMManager.getInstance().getToken() + "&start=" + arg.start + "&size=" + arg.num;
			if(arg.contentType){
				requestUrl += "&contentType=" + arg.contentType;
			}
		}else if(arg.chatType == CHAT_TYPE.GROUP_CHAT){
			requestUrl = YYIMConfiguration.SERVLET.REST_HISTORY_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/historymuc/'+ arg.id +"?token="+ YYIMManager.getInstance().getToken() + "&start=" + arg.start + "&size=" + arg.num;
		}else if(arg.chatType == CHAT_TYPE.CHAT){
			if(arg.resource && arg.resource == "anonymous") {
				requestUrl += arg.id;
			} else {
				requestUrl += YYIMJIDUtil.getNode(arg.id);
			}
			if(arg.contentType){
				var typelist = MESSAGE_CONTENT_TYPE;
				for(var x in typelist){
					if(arg.contentType == typelist[x]){
						requestUrl += "&contentType=" + arg.contentType;
						break;	
					}
				}
			}
		}
		
		YYIMManager.getInstance().log("历史记录：request URL",	2,requestUrl);
		jQuery.ajax({
			url: requestUrl,
			dataType: "json",
			cache:false,
			success: function(data) {
				_historyMessageProcessor(data, arg);
			},
			error:function(xhr){  
				arg.error && arg.error();				
				YYIMManager.getInstance().log("getHistoryMessage_error:", 0, xhr.statusText);
			},
			complete:function(){
				arg.complete && arg.complete();	
			}
		});
	};
	
	/**
	 * 客户端首次登陆获取版本号
	 */
	function getVersion(arg){
		var requestUrl = YYIMConfiguration.SERVLET.REST_VERSION_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/' + arg.id + '/version?resource=' + YYIMConfiguration.RESOURCE + '&token=' + YYIMManager.getInstance().getToken();
		jQuery.ajax({
			url: requestUrl,
			dataType: "json",
			cache:false,
			success: function(data) {
				arg.version = data;
				getOfflineMessage(arg);
			},
			error:function(xhr){  
				YYIMManager.getInstance().log("getVersion_error:", 0, xhr.statusText);
			}
		});
	}
	
	/**
	 * 通知服务器离线消息已经处理  rongqb 20150806
	 * @param data ajax 返回的数据
	 * @param arg {oldversion: 标记版本号的起始值, version: 标记版本号的结束值}
	 */
	function _offlineMessagehandleAfter(data, arg){
		if(YYIMConfiguration.RECEIPTSPACKET_AUTO){
			var requestUrl = YYIMConfiguration.SERVLET.REST_VERSION_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/' + arg.id + '/ack?oldversion=' + arg.version + '&version=' + data.version + '&resource=' + YYIMConfiguration.RESOURCE + '&token=' + YYIMManager.getInstance().getToken();
			jQuery.ajax({
				url: requestUrl,
				dataType: "json",
				type:'put',
				cache:false,
				statusCode:{
					200: function() {
						YYIMManager.getInstance().log("getVersion_sucess:", 3, data.version);
					}
				}
			});
		}
	}
	
	/**
	 * 获取离线消息  rongqb 20150806
	 * @param arg {version: 客户端当前的版本号, 客户端首次安装可以设置为-1，服务端自动判断版本号, start: 消息列表的分页参数，起始值，默认0, size: 消息列表的分页参数，分页参数，默认100}
	 */
	function getOfflineMessage(arg){
		if(!arg.start) arg.start = 0;
		if(!arg.size) arg.size = 100;
		if(!arg.version) arg.version = -1;
		jQuery.ajax({
			url: YYIMConfiguration.SERVLET.REST_VERSION_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/' + arg.id + '?version='+ arg.version +'&start=' + arg.start + '&size=' + arg.size + '&resource=' + YYIMConfiguration.RESOURCE + '&token=' + YYIMManager.getInstance().getToken(),
			dataType: "json",
			cache:false,
			success: function(data) {
				arg.complete && arg.complete();
				_offlineMessageProcessor(data, arg); //解析离线消息
			},
			error:function(xhr){  
				YYIMManager.getInstance().log("getOfflineMessage_error:", 0, xhr.statusText);
				arg.error && arg.error();
			}
		});
	}
	
	/**
	 * 解析离线消息  rongqb 20150806
	 * @param data ajax 返回的数据
	 * {
		    "packets": [{
		        "body": "{报文的body, json字符串}",
		        "opcode": "EDA="//报文的OpCode进行base64编码后的字符串
		    }],
		    "version": 1 //获取当前消息后，客户端需要更新到的版本号
		    "count" : 10,
		    "start" : 0,
		    "size" : 100	
		}
	 * @param arg {id: 当前登录人ID, etpId: , appId: ,version: 客户端当前的版本号, 客户端首次安装可以设置为-1，服务端自动判断版本号, start: 消息列表的分页参数，起始值，默认0, size: 消息列表的分页参数，分页参数，默认100, resource: 客户端的资源标识字段}}
	 */
	var packets = [];
	function _offlineMessageProcessor(data, arg){
		
		if(data.packets && data.packets.length){
			for(var x in data.packets){
				try{
					var packetitem = data.packets[x];
					var opcodeArr = b64decode(packetitem.opcode);
					var opcode = '0x';
					for(var n=0;n<opcodeArr.length;n++){
						var code = opcodeArr[n].charCodeAt().toString(16);
						opcode += (code.length==1)? '0'+code:code; 
					}
					/**
					 * 转opcode格式
					 *  opcode= /...  
					 */
					var packet = JSON.parse(packetitem.body);
					packet.opcode = opcode;
					packets.unshift(packet);
				}catch(e){}
			}
			packets.sort(YYIMUtil['array']['comparisonAsc']("dateline")); //按照dateline 升序排列离线数组
			
			if(data.packets.length >= data.size){
				arg.start += arg.size;
				getOfflineMessage(arg);
			}else{
				handleOfflinePackets(data, arg);
			}
			
		}else if(!data.packets || !data.packets.length){
			handleOfflinePackets(data, arg);
		}
	};
	
	/**
	 * 处理离线消息缓存
	 */
	function handleOfflinePackets(data, arg){
		if(packets.length){
			for(var y in packets){
				if(!!packets[y].id){
					switch(packets[y].opcode){
						case '0x'+OPCODE.PRESENCE.SEND.toString(16):  //opcode == 0x3001,客户端改变自己的在线状态，或者服务器通知用户联系人的状态改变的报文
							YYIMManager.getInstance().onSubscribe({
								from: YYIMJIDUtil.getID(packets[y].from),
								type: packets[y].type
							});
							break;
						case '0x'+OPCODE.USER_MESSAGE.SEND.toString(16):;
						case '0x'+OPCODE.CHATGROUP_MESSAGE.SEND.toString(16):; //opcode == 0x1010/0x1030,用户/群组
						case '0x'+OPCODE.PUBACCOUNT_MESSAGE.SEND.toString(16): //opcode == 0x1050,公众号消息
							parseMessage(packets[y],packets[y].type);
							break;
						default:
							YYIMManager.getInstance().log('unHandle_Packet:',3,packets[y]);break;
					}
				}
			}
			arg.version = data.version - packets.length;
			packets = [];
			_offlineMessagehandleAfter(data, arg); //处理完离线消息通知服务器端
		}
		arg.success && arg.success();
	}
	
	/**
	 * 解析历史消息
	 * 
	 * @param data ajax返回的数据
	 * @param arg {id: 对方ID, resource: 对方资源 为anonymous时表示匿名用户, chatType: 'chat' | 'groupchat', start: number, num: number, success: function, error: function}
	 */
	function _historyMessageProcessor(data, arg){
		YYIMChat.log("历史记录：data", 2, data);
		var hisMsgArr = [];
		for(var i = 0; !!data.result && (i < data.result.length); i++){
			var hisMsgItem = {
				fromId : YYIMJIDUtil.getID(data.result[i].sender || data.result[i].pubaccount),
				toId : YYIMJIDUtil.getID(data.result[i].receiver || YYIMManager.getInstance().getUserID()),
				msgId : data.result[i].packetId || data.result[i].messageID,
				contentType:data.result[i].contentType,
				dateline:data.result[i].dateline || data.result[i].ts,
				packetId:data.result[i].packetId || data.result[i].messageID,
				type: arg.chatType
			};
			
			if(arg.chatType && arg.chatType == CHAT_TYPE.GROUP_CHAT){
				hisMsgItem.messageID = data.result[i].packetId || data.result[i].messageID;
				hisMsgItem.fromId = YYIMJIDUtil.getID(data.result[i].mucId);
				hisMsgItem.fromRoster = YYIMJIDUtil.getID(data.result[i].sender);
				hisMsgItem.from = {
						room: YYIMJIDUtil.getID(data.result[i].mucId),
						roster:YYIMJIDUtil.getID(data.result[i].sender)
				};
			}
			
			if(data.result[i].content){
				hisMsgItem.body = parseContent(data.result[i].content);
				hisMsgItem.body.contentType = data.result[i].contentType;
				hisMsgItem.body.dateline = data.result[i].dateline || data.result[i].ts;
				
				if(hisMsgItem.body.content && hisMsgItem.body.contentType && (hisMsgItem.body.contentType == MESSAGE_CONTENT_TYPE.IMAGE || hisMsgItem.body.contentType == MESSAGE_CONTENT_TYPE.FILE)){
					hisMsgItem.body.content.attachId = hisMsgItem.body.content.path;
					hisMsgItem.body.content.path = hisMsgItem.body.content.path ? YYIMChat.getFileUrl(hisMsgItem.body.content.path) : null;
				}
				hisMsgArr.push(hisMsgItem);
			}
		}
		
		if(YYIMCommonUtil.isFunction(arg.success)){
			arg.success({
				count: Number(data.count),
				result: hisMsgArr
			});
		}
		return;
		/**
		 * 从消息条目中获取messageID
		 */
		function parseId(item){
			if(!item.stanza)
				return item.messageID;
			var id = jQuery(item.stanza).attr('id');
			return id? id : Math.uuid();
		}
		
		/**
		 * 从历史消息中取出发送者的resource(用于群聊时获取成员的id)
		 */
		function parseResource(item){
			if(!item.stanza)
				return null;
			var _from = jQuery(item.stanza).attr('from');
			return _from? YYIMJIDUtil.getResource(_from) : null;
		}
		
		function parseContent(content) {
			if (content) {
				var body = JSON.parse(content);
				try{
					if(isNaN(Number(body.content))){ //非数字字符串继续转换 rongqb 20151014
						body.content = JSON.parse(body.content);
						if(body.content.style) {
							body.style = body.content.style;
							delete body.content.style;
						}
						if (body.content.content) {
							body.content = body.content.content;
						}
					}
				} catch (e) {
					
				}
				return body;
			}else {
				return null;
			}
		}
	};
	
	return {
		monitor : monitor,
		sendMessage : sendMessage,
		addGroupMember : addGroupMember,
		getHistoryMessage : getHistoryMessage,
		getOfflineMessage : getOfflineMessage,
		sendReceiptsPacket: sendReceiptsPacket,
		sendReadedReceiptsPacket:sendReadedReceiptsPacket
	};
})();
var YYIMPresence = (function(){
	/**
	 * 监控presence包
	 */
	function monitor() {
		var _conn = YYIMConnection.getInstance();
		
		// 可能会收到订阅或上线包
		_conn.registerHandler(OPCODE.PRESENCE.KEY, function(packet) {
			// 订阅， 此处不做处理
			if(packet.type && packet.type != TYPE.UNAVAILABLE) {
				YYIMManager.getInstance().onSubscribe({
					from: YYIMJIDUtil.getID(packet.from),
					type: packet.type
				});
				return;
			}
			// 上线包
			var ps = {
				from: YYIMJIDUtil.getID(packet.from),
				resource: YYIMJIDUtil.getResource(packet.from),
				type: packet.type,
				show: packet.show,
				status: packet.status
			};
			YYIMRosterManager.getInstance().addToOnline(ps.from);
			if(packet.type && packet.type == TYPE.UNAVAILABLE){
				ps.show = STATUS.UNAVAILABLE;
				ps.status = STATUS.UNAVAILABLE;
				YYIMRosterManager.getInstance().removeFromOnline(ps.from);
			}
			
			if (!YYIMCommonUtil.isStringAndNotEmpty(ps.status)) {
				ps.show = STATUS.CHAT;
				ps.status = STATUS.CHAT;
			};
			YYIMManager.getInstance().onPresence(ps);
			//console.info(ps);
		});
		
		// 群组相关的包, 群成员加入、退出
		_conn.registerHandler(OPCODE.CHATGROUP.KEY, function(packet) {
			// 退出
			if(packet.type == PRESENCE_TYPE.UNAVAILABLE){
				YYIMManager.getInstance().onRoomMemerPresence({
					room: YYIMJIDUtil.getID(packet.from),
					member: {
						id: YYIMJIDUtil.getID(packet.jid)
					},
					type: CHATROOM_MEMBER_UPDATE.QUIT
				});
			}
			// 加入
			else{
				YYIMManager.getInstance().onRoomMemerPresence({
					room: YYIMJIDUtil.getID(packet.from),
					member: {
						id: YYIMJIDUtil.getID(packet.jid),
						nick: packet.name ? packet.name : YYIMJIDUtil.getID(packet.jid),
						affiliation: packet.affiliation,
						role: packet.role
					},
					type: CHATROOM_MEMBER_UPDATE.JOIN
				});
			}
		});
	};
	
	/**
	 * 设置上线状态
	 * @param arg{show, status, priority}
	 */
	function setPresence(arg) {
		var presenceBody = {};
		if(YYIMCommonUtil.isStringAndNotEmpty(arg.show)) 	presenceBody.show = arg.show;
		if(YYIMCommonUtil.isStringAndNotEmpty(arg.status)) 	presenceBody.status = arg.status;
		if(YYIMCommonUtil.isStringAndNotEmpty(arg.priority)) presenceBody.priority = arg.priority;
		if(YYIMCommonUtil.isStringAndNotEmpty(arg.type))		presenceBody.type = arg.type;
		
		YYIMConnection.getInstance().send(new JumpPacket(presenceBody, OPCODE.PRESENCE.SEND));
	}

	/**
	 * 添加好友
	 * @param jid
	 */
	function addRosterItem(jid) {
		YYIMConnection.getInstance().send(new JumpPacket({
			type : PRESENCE_TYPE.SUBSCRIBE,
			to : jid
		}, OPCODE.PRESENCE.SEND));
	}
	
	/**
	 * 同意联系人的订阅请求
	 * @param jid
	 */
	function approveSubscribe(jid) {
		YYIMConnection.getInstance().send(new JumpPacket({
			type : PRESENCE_TYPE.SUBSCRIBED,
			to : jid
		}, OPCODE.PRESENCE.SEND));
	}
	/**
	 * 拒绝联系人的订阅请求
	 * @param jid
	 */
	function rejectSubscribe(jid) {
		YYIMConnection.getInstance().send(new JumpPacket({
			type : PRESENCE_TYPE.UNSUBSCRIBED,
			to : jid
		}, OPCODE.PRESENCE.SEND));
	}
	
	/**
	 * 关注公共号，只能根据返回的subscribed来判断是否关注成功，返回的iq set both需忽略
	 * @param arg{jid , success, error}
	 */
	function addPubAccount(arg) {
		YYIMConnection.getInstance().send(new JumpPacket({
			type : PRESENCE_TYPE.SUBSCRIBE,
			to : arg.jid
		}, OPCODE.PRESENCE.SEND), function(addResult, _arg){
			_arg.complete && _arg.complete();
			addResult.from = YYIMJIDUtil.getID(addResult.from);
			addResult.to = YYIMJIDUtil.getID(addResult.to);
			_arg.success && _arg.success(addResult);
		}, arg);
	}
	
	/**
	 * 消息关注公共号 rongqb 20151207
	 * @param arg{to , success, error}
	 */
	function removePubAccount(arg) {
		YYIMConnection.getInstance().send(new JumpPacket({
			id : arg.id,
			type : PRESENCE_TYPE.UNSUBSCRIBE,
			to : arg.to
		}, OPCODE.PRESENCE.SEND), function(addResult, _arg){
			_arg.complete && _arg.complete();
			addResult.from = YYIMJIDUtil.getID(addResult.from);
			addResult.to = YYIMJIDUtil.getID(addResult.to) || YYIMManager.getInstance().getUserID();
			_arg.success && _arg.success(addResult);
		}, arg);
	}
	
	/**
	 * 加入群组, 需要合法的jid
	 * @param arg {jid: roomJid, success:function, error:function}
	 * @returns
	 */
	function joinChatGroup(arg) {
		var presenceBody = {
			to : arg.jid + "/" + YYIMManager.getInstance().getUserNode()
		};
		
		YYIMConnection.getInstance().send(new JumpPacket(presenceBody, OPCODE.CHATGROUP.SEND), function(joinResult, _arg) {
			arg.complete && arg.complete();
			
			arg.success && arg.success({
				id : YYIMJIDUtil.getID(joinResult.from),
				affiliation : joinResult.affiliation,
				role : joinResult.role
			});
			
		}, arg);
	}
	
	/**
	 * 群主删除群成员
	 */
	function delGroupMember(roomJid, delid, callbackFn) {
		var id = parseInt(100000 + Math.random()*100000);
		//var to = roomJid + "/" + YYIMManager.getInstance().getUserNode();
		var to = roomJid;
		if(delid.indexOf("@")>0){
			delid = delid.split("@")[0];
		}
		YYIMConnection.getInstance().send(new JumpPacket({
			id: id,
			to : to,
			member : delid,
			role : 'none'
		}, OPCODE.DEL_GROUPMEMBER.SEND), function(data) {
			callbackFn && callbackFn(data);
		});
	}
	
	/**
	 * 退出群
	 * @param jid
	 */
	function quitChatGroup(jid) {
		YYIMConnection.getInstance().send(new JumpPacket({
			type : PRESENCE_TYPE.UNAVAILABLE,
			to : jid + '/' + YYIMManager.getInstance().getUserNode()
		}, OPCODE.CHATGROUP.SEND), function() {
			// 发的包和回来的包id不同，不能在回调中使用
			// 退出后返回unavailable包，但是销毁群后先回来unavailable再回来result
		});
	}

	
	return {
		monitor : monitor,
		addRosterItem : addRosterItem,
		approveSubscribe : approveSubscribe,
		rejectSubscribe : rejectSubscribe,
		setPresence : setPresence,
		addPubAccount : addPubAccount,
		removePubAccount : removePubAccount,
		joinChatGroup : joinChatGroup,
		delGroupMember : delGroupMember,
		quitChatGroup : quitChatGroup
	};
})();
var YYIMWhiteBoard = (function(){
	
	function monitor(){
		var _conn = YYIMConnection.getInstance();
		
		/**
		 * 白板更新 rongqb 20160318 
		 */
		_conn.registerHandler(OPCODE.UPDATE_WHITEBOARD.KEY, function(packet) {
			packet.from = YYIMJIDUtil.getID(packet.from);
			YYIMManager.getInstance().onWhiteBoardUpdated(packet);
		});
	}
	
	/** 
	 * 创建/结束/重命名 白板 rongqb 20160318
	 */
	function operateWhiteBoard(arg){
		YYIMConnection.getInstance().send(new JumpPacket({
		    id: arg.id,// packet id
		    wid: arg.wid,
		    name: arg.name,
		    origin: YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.origin)),
		    operation: arg.operation //could be "create" "end" "rename"
		}, OPCODE.OPERATE_WHITEBOARD.SEND), function(result, _arg) {
			_arg.complete && _arg.complete();
			if(result.from){
				result.from =  YYIMJIDUtil.getID(result.from);
			}
			if(result.to){
				result.to =  YYIMJIDUtil.getID(result.to);
			}
			_arg.success && _arg.success(result);
		}, arg);
	}
	
	/**
	 * 监听白板 rongqb 20160318
	 */
	function listenWhiteBoard(arg){
		YYIMConnection.getInstance().send(new JumpPacket({
		    id: arg.id,// packet id
		    wid: arg.wid, //create时不传
		    operation: arg.operation //could be "create" "end" "rename"
		}, OPCODE.LISTEN_WHITEBOARD.SEND), function(result, _arg) {
			_arg.complete && _arg.complete();
			if(result.from){
				result.from =  YYIMJIDUtil.getID(result.from);
			}
			if(result.to){
				result.to =  YYIMJIDUtil.getID(result.to);
			}
			_arg.success && _arg.success(result);
		}, arg);
	}
	
	/**
	 * 更新白板 rongqb 20160318
	 */
	function updateWhiteBoard(arg){
		var whiteBoardBody = {
			    id: arg.id, // packet id
			    from: arg.from, //operator
			    wid: arg.wid, // whiteboard id
			    nodeId: arg.nodeId, // edited svg node id
			    nodeContent: arg.nodeContent, // edited svg node content
			    nodeText: arg.nodeText, // edited svg node text
			    operation: arg.operation //could be update delete,update default
			};
		
		YYIMConnection.getInstance().send(new JumpPacket(whiteBoardBody, OPCODE.UPDATE_WHITEBOARD.SEND), function(result, _arg) {
			_arg.complete && _arg.complete();
			if(result.from){
				result.from =  YYIMJIDUtil.getID(result.from);
			}
			_arg.success && _arg.success(result);
		}, arg);
	}
	
	return {
		monitor: monitor,
		operateWhiteBoard: operateWhiteBoard,
		listenWhiteBoard: listenWhiteBoard,
		updateWhiteBoard: updateWhiteBoard
	};
})();
function YYIMConnectDaemon(){
	/**
	 * 最后接收的报文的时间
	 * @Type {Number}
	 */
	this.lastPongTime;

	/**
	 * 循环发送ping包的interval
	 * @Type {Number}
	 */
	this.pingInterval;

	/**
	 * 判断发送ping包是否超时的timeout
	 * @Type {Number}
	 */
	this.pingTimeout;

};

/**
 * 向服务器轮询发送ping包， 判断自己是否掉线
 */
YYIMConnectDaemon.prototype.startPing = function() {
	if (YYIMConnection.getInstance().connected()) {
		this.pingInterval = setInterval(this.ping.bind(this), YYIMConfiguration.PING.INTERVAL);
	}
};

/**
 * 清除发送ping包的定时器
 */
YYIMConnectDaemon.prototype.stopPing = function() {
	clearTimeout(this.pingTimeout);
	clearInterval(this.pingInterval);
};

/**
 * 向服务器发送ping包，如果服务器在指定时间SNSConnectService.pingTimeout内未返回，则进行重连
 */
YYIMConnectDaemon.prototype.ping = function() {
	var curTime = new Date().getTime();
	// 指定时间段内已经接受到了服务器的包 则不再发送ping包判断
	if (curTime - this.lastPongTime < YYIMConfiguration.PING.DURATION) {
		return;
	}
	
	var pingPacket = new JumpPacket(null, OPCODE.PING.SEND);
	try {
		YYIMConnection.getInstance().send(pingPacket);
		
		this.pingTimeout = setTimeout(this.timeoutHandler.bind(this), YYIMConfiguration.PING.TIMEOUT);

	} catch (e) {
		_logger.log("SNSConnectService.ping", 0, e);
		this.stopPing();
		YYIMManager.getInstance().onConnectError({
			errorCode : 408,
			message : '连接失败'
		});
		return;
	}
	
};

/**
 * 更新最后收到的ping包的时间
 * @param packet
 */
YYIMConnectDaemon.prototype.pong = function() {
	this.lastPongTime = new Date().getTime();
	clearTimeout(this.pingTimeout);
};


YYIMConnectDaemon.prototype.timeoutHandler = function() {
	this.stopPing();
	YYIMManager.getInstance().onConnectError({
		errorCode : 408,
		message : '连接失败'
	});
};
function YYIMConnectEventHandler() {
	this._inited = false;
};

YYIMConnectEventHandler.prototype._init = function() {
	
	_logger.log("YYIMConnectEventHandler.prototype.registerHandler", 3);
	
	if(this._inited){
		return;
	}
	
	var conn = YYIMConnection.getInstance();

	conn.registerHandler('onConnect', this.onConnected);
	//conn.registerHandler('onError', this.onConnectError);
	conn.registerHandler('onDisconnect', this.onDisConnect);
	conn.registerHandler("onStatusChanged", this.connectStatusChangeHandler);

	conn.registerHandler(OPCODE.STREAM_ERROR.KEY, this.onStreamError);
	conn.registerHandler(OPCODE.PACKET_ERROR.KEY, this.onPacketError);
	
	// 注册packet_in监听器， 以记录最后报文的到达时间
	//conn.registerHandler("packet_in", conn.getDaemon().pong);
	
	this._inited = true;
};

/**
 * 连接成功
 */
YYIMConnectEventHandler.prototype.onConnected = function(){
	YYIMManager.getInstance().onOpened();
	YYIMConnection.getInstance().getDaemon().startPing();
};

/**
 * 连接失败时, 触发全局事件CONNECT_FAILED， 附加参数：[errorCode, message]
 * @param e 错误信息
 */
YYIMConnectEventHandler.prototype.onConnectError = function(e) {
	_logger.log("YYIMConnectEventHandler.prototype.onConnectError ", 0, e);
	errorCode = e.getAttribute("code");

	YYIMConnection.getInstance().getDaemon().stopPing();
	
	if(errorCode == 401 || errorCode/10 == 401){
		YYIMManager.getInstance().onAuthError({
			errorCode : 401,
			message : '用户名或密码错误'
		});
	}else {
		YYIMManager.getInstance().onConnectError({
			errorCode : errorCode,
			message : '连接失败'
		});
	}
};

YYIMConnectEventHandler.prototype.onStreamError = function(packet) {
	_logger.log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
	YYIMConnection.getInstance().getDaemon().stopPing();
	
	if(packet.code == 401 || packet.code/10 == 401){
		YYIMManager.getInstance().onAuthError({
			errorCode : 401,
			message : '用户名或密码错误'
		});
	}else {
		YYIMManager.getInstance().onConnectError({
			errorCode : packet.code,
			message : packet.message
		});
	}
	
};

YYIMConnectEventHandler.prototype.onPacketError = function(packet) {
	_logger.log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
};

/**
 * 连接关闭
 */
YYIMConnectEventHandler.prototype.onDisConnect = function(){
	YYIMManager.getInstance().onClosed();
	
	YYIMConnection.getInstance().getDaemon().stopPing();
};

/**
 * 连接状态改变时将调用此事件, 触发ON_CONNECT_STATUS_CHANGE全局事件，参数status, 可能的值为：
 * <ul>
 * <li>'initializing' ... well
 * <li>'connecting' if connect() was called
 * <li>'resuming' if resume() was called
 * <li>'processing' if it's about to operate as normal
 * <li>'onerror_fallback' if there was an error with the request object
 * <li>'protoerror_fallback' if there was an error at the http binding protocol flow (most likely that's where you interested in)
 * <li>'internal_server_error' in case of an internal server error
 * <li>'suspending' if suspend() is being called
 * <li>'aborted' if abort() was called
 * <li>'disconnecting' if disconnect() has been called
 * </ul>
 */
YYIMConnectEventHandler.prototype.connectStatusChangeHandler = function(status) {
	_logger.log("connectStatusChangeHandler", 3, status);
	YYIMManager.getInstance().onStatusChanged(status);
};
function YYIMConnection() {
	this.daemon = new YYIMConnectDaemon();
	this.eventHandler = new YYIMConnectEventHandler();
	this.connection = this.getConnection();
	this.connectArg;
	this.waitingList = [];
	this.sending = false;
	this.lastSendTime = 0;
};

YYIMConnection.getInstance = function() {
	if (!YYIMConnection._instance) {
		YYIMConnection._instance = new YYIMConnection();
		YYIMConnection._instance._init();
	}
	return YYIMConnection._instance;
};

YYIMConnection.prototype.getDaemon = function() {
	return this.daemon;
};

YYIMConnection.prototype._init = function(){
	
	YYIMPresence.monitor();
	YYIMMessage.monitor();
	YYIMIQ.monitor();
	YYIMWhiteBoard.monitor();
	

	this.eventHandler._init();

	this.registerHandler(OPCODE.AUTH.KEY, function(userBindPacket){
		// change to use opcode judge
		var jid = new JSJaCJID(userBindPacket.jid), id = YYIMJIDUtil.getID(userBindPacket.jid);
		
		YYIMManager.getInstance()._user = {
			jid: jid,
			name: id
		};
		YYIMManager.getInstance().onUserBind(id, jid.getResource());
	});
	
	this.registerHandler(OPCODE.PING.KEY, this.getDaemon().pong.bind(this.getDaemon()));
};

/**
 * 注册连接的报文处理器
 * @param {string} @See OPCODE.EVENT.KEY,
 * @param {String} ns childName对应的子节点命名空间 [optional]
 * @param {String} type 子节点类型，不限制设置为“*", [optional]
 * @param {Function} handler 处理函数
 */
YYIMConnection.prototype.registerHandler = function(event, ns, type, handler) {
//	if(this.event != 'ping')
//		return;
	if (this.connection) {
		this.connection.registerHandler.apply(this.connection, arguments);
		return;
	}
	throw "connection is undefined!";
};

/**
 * 若已经和服务器建立连接 返回true, 否则返回false
 * @return {boolean}
 */
YYIMConnection.prototype.connected = function() {
	if (this.connection && this.connection.connected()) {
		return true;
	}
	return false;
}

/**
 * 根据浏览器支持的不同情况, 返回最合适的连接方式, 如果连接以存在则直接返回
 * @returns {JSJaCConnection}
 */
YYIMConnection.prototype.getConnection = function() {

	if (!this.connection) {
		if (YYIMConfiguration.useWebSocket()) {
			this.connection = new JSJaCWebSocketConnection({
				httpbase : YYIMConfiguration.getWebSocketUrl()
			});
		} else {
			this.connection = new JSJaCHttpBindingConnection({
				httpbase : YYIMConfiguration.getHttpBindUrl(),
				timerval : YYIMConfiguration.CONNECTION.TIMERVAL,
				wait : YYIMConfiguration.CONNECTION.WAIT
			});
		}
	}

	return this.connection;
};

/**
 * 请求连接服务器
 */
YYIMConnection.prototype.connect = function(name, pass,isReconnect) {
	if (!this.connectArg && !name) {
		//throw "need user info to connect server!";
	}

	if (!this.connectArg) {
		this.connectArg = YYIMConfiguration.getConnectionArgObj();
	}

	if (name) {
		this.connectArg.username = name;
		this.connectArg.password = pass;
	}
	
	YYIMManager.getInstance()._user = {
		jid: new JSJaCJID(this.connectArg.username + '@' + YY_IM_DOMAIN + '/' + this.connectArg.resource),
		name: this.connectArg.username
	};
	
	this.connection.connect(this.connectArg);
};

/**
 * 请求断开服务器
 */
YYIMConnection.prototype.disconnect = function() {
	this.daemon.stopPing();
	if (this.connection) {
		this.connection.disconnect();
	}
};

/**
 * 发送报文到服务器
 */
YYIMConnection.prototype.send = function(packet, callback, data, callbackContext) {
	var tempPacket = {
		packet:packet,
		callback:callback,
		data:data,
		callbackContext:callbackContext
	};
	this.waitingList.push(tempPacket);
	if(!this.sending){
		this.sendInterval();	
	}
};

/**
 * 递归延时发送预发送报文队列
 */
YYIMConnection.prototype.sendInterval = function(){
	var that = this;
	if(this.waitingList.length){
		this.sending = true;
		var sendPacket = this.waitingList[0];
		var timespan = new Date().getTime() - this.lastSendTime;
		if(timespan >= YYIMConfiguration.SENDINTERVAL){
			this.sendJumpPacket(sendPacket);
			this.waitingList.shift();
			this.lastSendTime = new Date().getTime();
			this.sendInterval();
		}else{
			setTimeout(function(){
				that.sendJumpPacket(sendPacket);
				that.waitingList.shift();
				that.lastSendTime = new Date().getTime();
				that.sendInterval();
			},YYIMConfiguration.SENDINTERVAL - timespan);
		}
	}else{
		this.sending = false;
	}
};

/**
 * 发送报文到服务器
 */
YYIMConnection.prototype.sendJumpPacket = function(arg) {
	if(arg.callbackContext){
		return this.connection.sendJumpPacket(arg.packet, arg.callback.bind(arg.callbackContext), arg.data);
	}
	return this.connection.sendJumpPacket(arg.packet, arg.callback, arg.data);
};
/**
 * XHR异步请求
 * 有自动轮讯
 */
function MyXHR(obj) {
	this.url = obj.url;
	this.data = obj.data;
	this.sCallback = obj.successCallback;
	this.eCallback = obj.errorCallback;
	this.xhr = (function() {
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	})();
	this.timeout = 10*1000;
	this.timeoutIndex;
	this.loop = false;
}

MyXHR.prototype.get = function() {
	var _xhr = this.xhr;
	_xhr.open('GET', this.url, true);
	MyXHR.prototype._listenFn.call(this);
	_xhr.send();
}

MyXHR.prototype.post = function() {
	var _xhr = this.xhr;
	_xhr.open('POST', this.url, true);
	MyXHR.prototype._listenFn.call(this);
	_xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
	_xhr.send(this.data);
}

MyXHR.prototype.isLoop = function(flag) {
	this.loop = flag;
}

/*
 * 停止轮询
 */
MyXHR.prototype.stopLoop = function() {
	clearTimeout(_self.timeoutIndex);
}

/*
 * 回调监听
 */
MyXHR.prototype._listenFn = function() {
	var _self = this;
	var _xhr = this.xhr;
	this.timeoutIndex = setTimeout(function() {
		if (_self.loop) {
			MyXHR.prototype.get.call(_self);
		}
		_self.eCallback(_xhr.responseText);
	}, _self.timeout);
	_xhr.onreadystatechange = function() {
		if(_xhr.readyState == 4){
			clearTimeout(_self.timeoutIndex);
			if (_xhr.status == 200) {
				_self.sCallback(_xhr.responseText);
			}else {
				_self.eCallback(_xhr.responseText);
			}
		}
	}
}


var funExtensions = (function(){
	
	/**
	 * 多方通话 rongqb 20160104
	 * @param arg {
	 * 	caller: ,//主叫号码
	 *  phones：,//被叫号码
	 *  accountMmanaged:true, //账号托管
	 *  account：,//通话账号 accountMmanaged:true时 不传
	 *  key：,//通话秘钥  accountMmanaged:true时 不传
	 *  success:function,
	 *  error:function
	 * }
	 */
	function multiPartyCall(arg){
		
		if(arg.accountMmanaged === true){
			/**
			 * 账号托管模式
			 */
			var data = {
					etpId: YYIMConfiguration.MULTI_TENANCY.ETP_KEY,
					appId: YYIMConfiguration.MULTI_TENANCY.APP_KEY,
					caller: arg.caller, //主叫号码
					phones: arg.phones, //被叫号码
					username: YYIMManager.getInstance().getUserNode() //发起会议的id
			};
			
			jQuery.ajax({
				url: YYIMConfiguration.MULTIPARTYCALL.RESTADDRESS + '?token=' + YYIMManager.getInstance().getToken(),
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'json',
				cache: false,
				processData:false,
				contentType: "application/json", //必须有
				headers:{
//					"Content-Type":"application/json"
				},
				success: function(data){
					arg.success && arg.success(data);
				},
				error: function(xhr){
					arg.error && arg.error();
				}
			});
			
		}else{
			/**
			 * 直接调用 嘟嘟接口 需要上传 账户和密码
			 */
			var timestamp = new Date().getTime();
			var data = {
					caller: arg.caller, //主叫号码
					phones: arg.phones, //被叫号码
					account_identify: arg.account, //账号id
					userId: YYIMManager.getInstance().getUserBareJID(), //发起会议的id
					timestamp: timestamp,
					sign: hex_sha1(arg.account + arg.key + timestamp)
			};
			
			jQuery.ajax({
				url: YYIMConfiguration.MULTIPARTYCALL.ADDRESS,
				type: 'get',
				data: data,
				dataType: 'jsonp',
				cache: false,
				jsonp:'callback',
				success: function(data){
					arg.success && arg.success(data);
				},
				error: function(xhr){
					arg.error && arg.error();
				}
			});
		}
	}
	
	return {
		multiPartyCall:multiPartyCall
	};
})();
var YYIMChatGroupManager = function(){
	this._provider;
};

YYIMChatGroupManager.getInstance = function(){
	if(!YYIMChatGroupManager._instance){
		YYIMChatGroupManager._instance = new YYIMChatGroupManager();
	}
	return YYIMChatGroupManager._instance;
};

/**
 * 现在主要初始化provider
 * @param arg {provider: YYIMChatGroupProvider}
 */
YYIMChatGroupManager.prototype.init = function(arg) {
	if(arg && arg.provider)
		this._provider = arg.provider;
	else
		this._provider = new YYIMChatGroupProvider();
};

YYIMChatGroupManager.prototype.getProvider = function() {
	if(!this._provider)
		this._provider = new YYIMChatGroupProvider();
	return this._provider;
};

/**
 * 获取群组列表
 * @param arg
 */
YYIMChatGroupManager.prototype.getChatGroups = function(arg) {
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().getChatGroups))
		this.getProvider().getChatGroups(arg);
};

/**
 * 创建一个群组, 先去IM Server创建后再去Provider　
 * @param arg {name, node, desc, nickName, success: function, error: function, complete:function}
 */
YYIMChatGroupManager.prototype.addChatGroup = function(arg) {
	// 请求加入群
	YYIMPresence.joinChatGroup({
		jid : YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.node)),
		success : function() {
			// 发送配置表单
			YYIMIQ.configChatGroup({
				jid : this.jid,
				name : arg.name,
				desc : arg.desc,
				error : arg.error,
				success : function() {
					arg.success && arg.success({
						name : arg.name,
						node : arg.node,
						id : arg.id,
						nickname : YYIMManager.getInstance().getUserID()
					});
				},
				complete : arg.complete 
			});
			
		},
		error : function() {
			arg.error && arg.error();
		}
	});
	
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().addChatGroup))
		this.getProvider().addChatGroup(arg);
};

/**
 * 创建群组  rongqb 20151117
 * @param arg {name:,members:[],success:function,complete:function}
 * resource:2.1 
 */
YYIMChatGroupManager.prototype.createChatGroup = function(arg){
	YYIMIQ.createChatGroup({
		id: Math.uuid(),
		name:arg.name,
		members:arg.members,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};

/**
 *  群主转让群组 rongqb 20160104
 *  @param arg {to:群组,newOwner:string,success:function,error:function,complete:function}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.transferChatGroup = function(arg){
	YYIMIQ.transferChatGroup({
		id: Math.uuid(),
		to:arg.to,
		newOwner:arg.newOwner,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};


/**
 *  群主解散群组 rongqb 20160106
 *  @param arg {to:群组}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.dismissChatGroup = function(arg){
	YYIMIQ.dismissChatGroup({
		id: Math.uuid(),
		to:arg.to,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};


/**
 * 房间成员邀请人入群  rongqb 20151118
 * @param arg {to:群组,members:[],success:function,complete:function}
 * resource:2.1 
 */
YYIMChatGroupManager.prototype.inviteGroupMember = function(arg){
	YYIMIQ.inviteGroupMember({
		id: Math.uuid(),
		to:arg.to,
		members:arg.members,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});	
};

/**
 * 群成员更改配置信息 rongqb 20151119
 *  @param arg {id: string,to:群组,name:string, success: function,complete: function}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.modifyChatGroupInfo = function(arg){
	YYIMIQ.modifyChatGroupInfo({
		id: Math.uuid(),
		to:arg.to,
		name:arg.name,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};

/**
 *  群主踢人 rongqb 20151119
 *  @param arg {to:群组,member:string, success: function,complete: function}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.kickGroupMember = function(arg){
	YYIMIQ.kickGroupMember({
		id: Math.uuid(),
		to:arg.to,
		member:arg.member,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};


/**
 * 群成员退出群 rongqb 20151119
 *  @param arg {to:群组,success: function,complete: function}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.exitChatGroup = function(arg){
	YYIMIQ.exitChatGroup({
		id: Math.uuid(),
		to:arg.to,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};

/**
 *  收藏群组(收藏/取消收藏) rongqb 20151201
 *  @param arg {to:群组,type:'add/remove', success: function,complete: function}
 *  resource:2.1 
 */
YYIMChatGroupManager.prototype.collectChatGroup = function(arg){
	YYIMIQ.collectChatGroup({
		id: Math.uuid(),
		to:arg.to,
		type:arg.type,
		success:function(data){
			arg.success && arg.success(data);
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};


/**
 * 退出群, 先发包到IM Server
 * @param jid
 */
YYIMChatGroupManager.prototype.delGroupMember = function(roomid, delid, callbackFn) {
	YYIMPresence.delGroupMember(roomid, delid, callbackFn);
};

/**
 * 删除群成员, 先发包到IM Server
 * @param jid
 */
YYIMChatGroupManager.prototype.quitChatGroup = function(jid) {
	YYIMPresence.quitChatGroup(jid);
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().quitChatGroup))
		this.getProvider().quitChatGroup(jid);
};

/**
 * 查找群
 * @param arg {keyword, start, size, success: function, error: function,complete: function}
 */
YYIMChatGroupManager.prototype.queryChatGroup = function(arg) {
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().queryChatGroup))
		this.getProvider().queryChatGroup(arg);
};

/**
 * 加入群组，发包至IM Server, 暂时Provider中无此接口
 * @param arg
 */
YYIMChatGroupManager.prototype.joinChatGroup = function(arg) {
	YYIMPresence.joinChatGroup(arg);
};

/**
 * 更新群组信息
 * @param arg {jid, name, desc, success: function, error: function, complete:function}
 */
YYIMChatGroupManager.prototype.updateChatGroup = function(arg) {
	// 发送配置表单
	YYIMIQ.configChatGroup(arg);
};
var YYIMChatGroupProvider = function(){
	
};

/**
 * 查询自己所在的群组
 * @param arg {success: function, error: function, complete:function}
 */
YYIMChatGroupProvider.prototype.getChatGroups = function(arg){
	YYIMIQ.getChatGroups(arg);
};

/**
 * 创建房间
 * @param arg {name, node, desc, success: function, error: function, complete:function}
 */
YYIMChatGroupProvider.prototype.addChatGroup = function(arg){
	// do nothing
};

/**
 * 退出一个房间
 * 发送一个类型为"unavailable"的出席信息节给正在使用这个房间的 <room@service/nick>.
 */
YYIMChatGroupProvider.prototype.quitChatGroup = function(roomJid){
	// do nothing
};

/**
 * 查找群
 * @param arg {keyword, start, size, success: function, error: function,complete: function}
 */
YYIMChatGroupProvider.prototype.queryChatGroup = function(arg) {
	YYIMIQ.queryChatGroup(arg);
};
var YYIMChatGroupMemberManager = function(){
	this._provider;
};

YYIMChatGroupMemberManager.getInstance = function(){
	if(!YYIMChatGroupMemberManager._instance){
		YYIMChatGroupMemberManager._instance = new YYIMChatGroupMemberManager();
	}
	return YYIMChatGroupMemberManager._instance;
};

/**
 * 现在主要初始化provider
 * @param arg {provider: YYIMChatGroupMemberProvider}
 */
YYIMChatGroupMemberManager.prototype.init = function(arg) {
	if(arg && arg.provider)
		this._provider = arg.provider;
	else
		this._provider = new YYIMChatGroupMemberProvider();
};

YYIMChatGroupMemberManager.prototype.getProvider = function() {
	if(!this._provider)
		this._provider = new YYIMChatGroupMemberProvider();
	return this._provider;
};

/**
 * 获取指定群的群成员[chatroom]
 * @param arg {jid: string, success: function, error: function,complete: function}
 */
YYIMChatGroupMemberManager.prototype.getGroupMembers = function(arg) {
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().getGroupMembers))
		this.getProvider().getGroupMembers(arg);
};

/**
 * 发送邀请报文给联系人，邀请其加入聊天室, 先发包至IM Server
 * @param roomJid
 * @param jids {Array<String>}
 */
YYIMChatGroupMemberManager.prototype.addGroupMember = function(roomJid, jids) {
	YYIMMessage.addGroupMember(roomJid, jids);
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().addGroupMember))
		this.getProvider().addGroupMember(roomJid, jids);
};
var YYIMChatGroupMemberProvider = function(){
	
};

/**
 * 获取指定群的群成员
 * @param arg {jid: string, success: function, error: function,complete: function}
 */
YYIMChatGroupMemberProvider.prototype.getGroupMembers = function(arg){
	YYIMIQ.getGroupMembers(arg);
};

/**
 * 发送邀请报文给联系人，邀请其加入聊天室
 * @param roomJid
 * @param jids {Array<String>}
 */
YYIMChatGroupMemberProvider.prototype.addGroupMember = function(roomJid, jids) {
	// do nothing
};
var YYIMRosterManager = function(){
	this._provider;
	this._onlineList = new SNSBaseList();
};

YYIMRosterManager.getInstance = function(){
	if(!YYIMRosterManager._instance){
		YYIMRosterManager._instance = new YYIMRosterManager();
	}
	return YYIMRosterManager._instance;
};


YYIMRosterManager.prototype.addToOnline = function(id) {
	this._onlineList.add(id, true);
};

YYIMRosterManager.prototype.removeFromOnline = function(id) {
	this._onlineList.remove(id);
};

/**
 * 现在主要初始化provider
 * @param arg {provider: YYIMRosterProvider}
 */
YYIMRosterManager.prototype.init = function(arg) {
	if(arg && arg.provider)
		this._provider = arg.provider;
	else
		this._provider = new YYIMRosterProvider();
};

YYIMRosterManager.prototype.getProvider = function() {
	if(!this._provider)
		this._provider = new YYIMRosterProvider();
	return this._provider;
};

/**
 * 请求好友列表
 * @param arg {
 * success: function, //成功回调函数
 * error: function,  //失败回调函数
 * complete:function //无论成功失败都回调的函数
 * }
 */
YYIMRosterManager.prototype.getRosterItems = function(arg) {
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().getRosterItems))
		this.getProvider().getRosterItems(arg);
};

/**
 * 添加好友, 先去IM Server上进行发包, 再去调用Provider
 * @param jid
 */
YYIMRosterManager.prototype.addRosterItem = function(jid) {
	YYIMPresence.addRosterItem(jid);
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().addRosterItem))
		this.getProvider().addRosterItem(jid);
};

/**
 * 删除好友, 先去IM Server上进行删除, 再去调用Provider
 * @param arg {jid: string, success: function, error: function,complete: function}
 */
YYIMRosterManager.prototype.deleteRosterItem = function(arg) {
	// 需要服务器的推送, 因此须在Provider之外发送
	YYIMIQ.deleteRosterItem(arg);
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().deleteRosterItem))
		this.getProvider().deleteRosterItem(arg);
};

/**
 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
 * @param arg {keyword, success: function, error: function,complete: function}
 */
YYIMRosterManager.prototype.queryRosterItem = function(arg) {
	if(this.getProvider()&& YYIMCommonUtil.isFunction(this.getProvider().queryRosterItem))
		this.getProvider().queryRosterItem(arg);
};

/**
 * 获取用户在线状态 rongqb 20151119
 * arg {
 * username: ['zhangsan','lisi'],
 * success:function,
 * error:function,
 * complete:function,
 * }
 * resource:2.1
 */
YYIMRosterManager.prototype.getRostersPresence = function(arg){
	if(this.getProvider() && YYIMCommonUtil.isFunction(this.getProvider().getRostersPresence)){
		this.getProvider().getRostersPresence(arg);
	}
};
var YYIMRosterProvider = function(){
	
};

/**
 * 请求好友列表
 * @param arg {success: function, error: function, complete:function}
 */
YYIMRosterProvider.prototype.getRosterItems = function(arg){
	YYIMIQ.getRosterItems(arg);
};

/**
 * 添加好友请求
 * @param jid
 */
YYIMRosterProvider.prototype.addRosterItem = function(jid){
	// do nothing
};

/**
 * 删除好友
 * TODO 根据订阅关系的改变判断删除结果 deleteRosterItem(username)
 * @param arg {jid: string, success: function, error: function,complete: function}
 */
YYIMRosterProvider.prototype.deleteRosterItem = function(arg){
	// do nothing
};

/**
 * @param arg 搜索相关设置 {keyword, success, error}
 */
YYIMRosterProvider.prototype.queryRosterItem = function(arg) {
	YYIMIQ.queryRosterItem(arg);
};


/**
 * 获取用户在线状态 rongqb 20151119
 * arg {
 * username: ['zhangsan','lisi'],
 * success:function,
 * error:function,
 * complete:function,
 * }
 * resource:2.1
 */
YYIMRosterProvider.prototype.getRostersPresence = function(arg){
	YYIMIQ.getRostersPresence(arg);
};
var emptyFn = function(){};
var _logger = new YYIMConsoleLogger(YYIMConfiguration.LOG.FILTER_LEVEL);
var YYIMManager = function(){
	this._user;
	this.init();
	this._token = {};
	this._anonymousUser = false;
	this.appkey;
	this.version = '2.0';
};

YYIMManager.getInstance = function(){
	if (!YYIMManager._instance) {
		YYIMManager._instance = new YYIMManager();
	}
	return YYIMManager._instance;
};

YYIMManager.prototype.log = function(groupname, level, obj1, obj2){
	_logger.log(groupname, level, obj1, obj2);
};

/**
 * [INIT] 初始化，回调方法的设置
 * @param options
 */
YYIMManager.prototype.init = function(options){
	options = options || new Object();
	this.onOpened = options.onOpened || emptyFn;
	this.onClosed = options.onClosed || emptyFn;
	this.onAuthError = options.onAuthError || emptyFn;
	this.onStatusChanged = options.onStatusChanged || emptyFn;
	this.onConnectError = options.onConnectError || emptyFn;
	this.onUserBind = options.onUserBind || emptyFn;
	this.onPresence = options.onPresence || emptyFn;
	// 对方请求加好友
	this.onSubscribe = options.onSubscribe || emptyFn;
	// 自己删除好友成功或对方进行了删除操作 added @ 2015/04/27
	this.onRosterDeleted = options.onRosterDeleted || emptyFn;
	// 好友信息更新 added @ 2015/04/27
	this.onRosterUpdateded = options.onRosterUpdateded || emptyFn;
	
	//群信息更新
	this.onGroupUpdate = options.onGroupUpdate || emptyFn;
	//群主转让
	this.onTransferGroupOwner = options.onTransferGroupOwner || emptyFn;

	//被群踢出
	this.onKickedOutGroup = options.onKickedOutGroup || emptyFn;
	
	//公众号更新
	this.onPubaccountUpdate = options.onPubaccountUpdate || emptyFn;
	
	this.onRoomMemerPresence = options.onRoomMemerPresence || emptyFn;
	this.onMessage = options.onMessage || emptyFn;
	this.onReceipts = options.onReceipts || emptyFn;
	this.onTextMessage = options.onTextMessage || emptyFn;
	this.onPictureMessage = options.onPictureMessage || emptyFn;
	this.onFileMessage = options.onFileMessage || emptyFn;
	this.onShareMessage = options.onShareMessage || emptyFn;
	this.onSystemMessage = options.onSystemMessage || emptyFn;
	this.onPublicMessage = options.onPublicMessage || emptyFn;
	this.onDeviceMessage = options.onDeviceMessage || emptyFn;
	this.onAudoMessage = options.onAudoMessage || emptyFn;
	this.onLocationMessage = options.onLocationMessage || emptyFn;
	this.onWhiteBoardMessage = options.onWhiteBoardMessage || emptyFn;
	
	//白板更新
	this.onWhiteBoardUpdated = options.onWhiteBoardUpdated || emptyFn;
	//logout = logout || emptyFn;
};

/**
 * 文件上传初始化, YYIMChat.initUpload({id, style},{id, style}...);
 */
YYIMManager.prototype.initUpload = function() {
	if(arguments && SNSIMUploadUseFlash && typeof SNSIMUploadUseFlash.prototype.addUploader == "function") {
		for(var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if(typeof arg.button_placeholder_id == "string") {
				SNSIMUploadUseFlash.getInstance().addUploader(arg);
			}
		}
	}
};

/**
 * [INIT] 设置多租户参数, 非多租户环境可不设置
 * @param app
 * @param etp
 * @param config {
 * 	address:,
 *  wsport:,
 *  hbport:,
 *  servlet:
 * }
 */
YYIMManager.prototype.initSDK = function(app, etp, config){
	var conf = YYIMConfiguration.MULTI_TENANCY;
	conf.ENABLE = true;
	conf.APP_KEY = app;
	conf.ETP_KEY = etp;
	this.appkey = conf.SEPARATOR + conf.APP_KEY + conf.SEPARATOR + conf.ETP_KEY;
	
	if(!!config){
		YY_IM_ADDRESS = config.address || YY_IM_ADDRESS;
		YYIMConfiguration.CONNECTION.HTTP_BASE = YY_IM_ADDRESS;
		
		YY_IM_WSPORT = config.wsport || YY_IM_WSPORT;
		YYIMConfiguration.CONNECTION.WS_PORT = YY_IM_WSPORT;
		
		YY_IM_HTTPBIND_PORT = config.hbport || YY_IM_HTTPBIND_PORT;
		YYIMConfiguration.CONNECTION.HTTP_BIND_PORT = YY_IM_HTTPBIND_PORT;
		
		YY_IM_SERVLET_ADDRESS = config.servlet || YY_IM_SERVLET_ADDRESS;
		
		YYIMConfiguration.SERVLET = {
			FILE_UPLOAD_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/fileUpload",
			FILE_DOWNLOAD_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/download",
			FILE_DELETE_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/cancel",
			AVATAR_SERVLET : YY_IM_SERVLET_ADDRESS + "sysadmin/avatar",
			REST_RESOURCE_SERVLET:YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/resource/',
			REST_HISTORY_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/history/",
			REST_VERSION_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/version/",
			REST_USER_SERVLET: YY_IM_SERVLET_ADDRESS + "sysadmin/rest/user/",
			REST_UPLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + "im_upload/rest/resource/",
			REST_DOWNLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + "im_download/rest/resource/",
			REST_TRANSFORM_SERVLET: YY_IM_SERVLET_ADDRESS + "im_download/rest/transform/resource/"
		};
	}
};


YYIMManager.prototype.getTenancy = function(){
	return YYIMConfiguration.MULTI_TENANCY;
};

/**
 * 获取appKey 
 * @returns '.app.etp'
 */
YYIMManager.prototype.getAppkey = function(){
	return this.appkey;
};

/**
 * [INIT] 
 * @param provider
 */
YYIMManager.prototype.setRosterProvider = function(provider){
	YYIMRosterManager.getInstance().init({provider:provider || new YYIMRosterProvider()});
};

/**
 * [INIT] 
 * @param provider
 */
YYIMManager.prototype.setChatGroupProvider = function(provider){
	YYIMChatGroupManager.getInstance().init({provider:provider || new YYIMChatGroupProvider()});
};

/**
 * [INIT] 
 * @param provider
 */
YYIMManager.prototype.setChatGroupMemberProvider = function(provider){
	YYIMChatGroupMemberManager.getInstance().init({provider:provider || new YYIMChatGroupMemberProvider()});
};

/**
 * 设置连接服务器的地址
 * @param hostName IM服务器的域名或机器名，需要和IM服务器内HostName相同
 * @param IP [optional] 能访问的IP地址或者域名
 */
YYIMManager.prototype.setServer = function(hostName, IP){
	YYIMConfiguration.CONNECTION.SERVER_NAME = hostName;
	if(IP){
		YYIMConfiguration.CONNECTION.HTTP_BASE = IP;
	}else{
		YYIMConfiguration.CONNECTION.HTTP_BASE = hostName;
	}
};

/**
 * 主动断开连接
 */
YYIMManager.prototype.disConnect = function() {
	YYIMConnection.getInstance().disconnect();
};

/**
 * 根据之前的连接参数进行连接
 */
YYIMManager.prototype.connect = function() {
	YYIMConnection.getInstance().connect();
};

/**
 * 获取当前用户的Token
 * @returns
 */
YYIMManager.prototype.getToken = function(){
	return this._token.token;
};

/**
 * 获取当前用户的token过期时间
 * @returns
 */
YYIMManager.prototype.getTokenExpiration = function(){
	return this._token.expiration;
};

/**
 * 登录
 * @param name
 * @param password
 */
YYIMManager.prototype.login = function(username, tokenOrPsd, expiration) {
	this._token = {
		token: tokenOrPsd,
		expiration: expiration
	};
	// username空且允许匿名
	if(!YYIMCommonUtil.isStringAndNotEmpty(username) && YYIMConfiguration.IS_ANONYMOUS){
		this._anonymousUser = true;
	}
		
	if(!(this.isAnonymous()) && YYIMConfiguration.MULTI_TENANCY.ENABLE){
		username = YYIMJIDUtil.getNode(username);
	}
	YYIMConnection.getInstance().connect(username, tokenOrPsd);
};

/**
 * 退出登录, 仅负责断开连接
 */
YYIMManager.prototype.logout = function(){
	YYIMConnection.getInstance().disconnect();
};

/**
 * 获取当前登录用户的bareJid
 */
YYIMManager.prototype.getUserBareJID = function(){
	return this._user.jid.getBareJID();
};

/**
 * 获取当前登录用户的全jid
 */
YYIMManager.prototype.getUserFullJID = function(){
	return this._user.jid.toString();
};

/**
 * 获取当前用户登录的node
 */
YYIMManager.prototype.getUserNode = function(){
	return YYIMJIDUtil.getNode(this.getUserBareJID());
};

/**
 * 获取当前登录用户的id
 */
YYIMManager.prototype.getUserID = function(){
	return YYIMJIDUtil.getID(this.getUserBareJID());
};

/**
 * 获取当前的resource rongqb20151206
 */
YYIMManager.prototype.getUserResource = function(){
	return YYIMConfiguration.RESOURCE;
};

/**
 * 全量同步好友列表到IMServer
 * @param list [{id1, name1}, {id2, name2}, ...]
 */
YYIMManager.prototype.fullSyncRoster = function(list) {
	if(YYIMArrayUtil.isArray(list)){
		var i = list.length, tmpList = [];
		while(i--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(list[i].id)) {
				tmpList.push({
					jid : YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(list[i].id)),
					name : list[i].name ? list[i].name : list[i].id
				});
			}
		}
		YYIMIQ.fullSyncRoster(tmpList);
	}
};

/**
 * 增量同步好友列表到IMServer
 * @param removeList [id1, id2]
 * @param addList [{id3, name3}, {id4, name4}, ...]
 */
YYIMManager.prototype.deltaSyncRoster = function(removeList, addList) {
	var q = -2, k = -2, tmpRemoveList = [], tmpAddList = [];
	if(YYIMArrayUtil.isArray(removeList)){
		q = removeList.length;
		while(q--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(removeList[q])) {
				tmpRemoveList.push(YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(removeList[q])));
			}
		}
	}
	if(YYIMArrayUtil.isArray(addList)){
		k = addList.length;
		while(k--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(addList[k].id)) {
				tmpAddList.push({
					jid : YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(addList[k].id)),
					name : addList[k].name ? addList[k].name : addList[k].id
				});
			}
		}
	}
	if(q !== -2 || k !== -2) {
		YYIMIQ.deltaSyncRoster(tmpRemoveList, tmpAddList);
	}
};

/**
 * 全量同步群列表到IMServer
 * @param list [{id1, name1}, {id2, name2}, ...]
 */
YYIMManager.prototype.fullSyncChatGroup = function(list) {
	if(YYIMArrayUtil.isArray(list)){
		var i = list.length, tmpList = [];
		while(i--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(list[i].id)) {
				tmpList.push({
					id : YYIMJIDUtil.getID(list[i].id),
					name : list[i].name ? list[i].name : list[i].id
				});
			}
		}
		YYIMIQ.fullSyncChatGroup(tmpList);
	}
};

/**
 * 增量同步群组列表到IMServer
 * @param removeList [id1, id2]
 * @param addList [{id3, name3}, {id4, name4}, ...]
 */
YYIMManager.prototype.deltaSyncChatGroup = function(removeList, addList) {
	var q = -2, k = -2, tmpRemoveList = [], tmpAddList = [];
	if(YYIMArrayUtil.isArray(removeList)){
		q = removeList.length;
		while(q--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(removeList[q])) {
				tmpRemoveList.push(YYIMJIDUtil.getID(removeList[q]));
			}
		}
	}
	if(YYIMArrayUtil.isArray(addList)){
		k = addList.length;
		while(k--) {
			if(YYIMCommonUtil.isStringAndNotEmpty(addList[k].id)) {
				tmpAddList.push({
					id : YYIMJIDUtil.getID(addList[k].id),
					name : addList[k].name ? addList[k].name : addList[k].id
				});
			}
		}
	}
	if(q !== -2 || k !== -2) {
		YYIMIQ.deltaSyncChatGroup(tmpRemoveList, tmpAddList);
	}
};

/**
 * 设置上线状态
 * @param arg{show, status, priority} 空则为在线
 */
YYIMManager.prototype.setPresence = function(arg){
	var presence = {};
	if(arg){
		if(arg.show){
			for(var x in STATUS){
				if(STATUS[x] === arg.show){
					presence.show = STATUS[x];
					break;
				}
			}
		}	
		if(!presence.show && arg.status){
			for(var x in STATUS){
				if(STATUS[x] === arg.status){
					presence.show = STATUS[x];
					break;
				}
			}
		}
		presence.status = arg.status;
	}
	presence.show = !!presence.show? presence.show:STATUS.AVAILABLE;  
	YYIMPresence.setPresence(presence);
};

/**
 * 获取自己或好友的VCard
 * @param arg {
 * 		id : 如果没有则获取自己的VCard,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCard = function(arg) {
	var _arg = {
		success : arg.success,
		error : arg.error,
		complete : arg.complete
	};
	
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id))
		_arg.jid = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.id));
	YYIMIQ.getVCard(_arg);
};

/**
 * 获取所有好友的VCard
 * 
 * @param arg {
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCards = function(arg) {
	YYIMIQ.getVCards({
		success : arg.success,
		error : arg.error,
		complete : arg.complete
	});
};

/**
 * 修改当前用户的头像
 * @param arg {
 * 		vcard : {
 * 			nickname,
 * 			photo,
 * 			email,
 * 			mobile,
 * 			telephone
 * 		},
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setVCard = function(arg) {
	YYIMIQ.setVCard({
		vcard : {
			nickname : arg.vcard.nickname,
			photo : arg.vcard.photo,
			email : arg.vcard.email,
			mobile : arg.vcard.mobile,
			telephone : arg.vcard.telephone,
			organization : arg.vcard.organization,
			gender : arg.vcard.gender,
			number : arg.vcard.number,
			remarks : arg.vcard.remarks,
			location : arg.vcard.location,
			position : arg.vcard.position
		},
		success : arg.success,
		error : arg.error
	});
};

/**
 * 获取好友列表[roster]
 * @param arg {success: function, error: function,complete: function}
 */
YYIMManager.prototype.getRosterItems = function(arg){
	YYIMRosterManager.getInstance().getRosterItems(arg);
};

/**
 * 添加好友[roster]
 * @param id
 */
YYIMManager.prototype.addRosterItem = function(id){
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		YYIMRosterManager.getInstance().addRosterItem(YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(id)));
	}
};

/**
 * 同意联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.approveSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		YYIMPresence.approveSubscribe(YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(id)));
	}
};

/**
 * 拒绝联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.rejectSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		YYIMPresence.rejectSubscribe(YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(id)));
	}
};

/**
 * 删除好友[roster]
 * @param arg {id: string, success: function, error: function,complete: function}
 */
YYIMManager.prototype.deleteRosterItem = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMRosterManager.getInstance().deleteRosterItem({
			jid : YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error,
			complete : arg.complete
		});
	}
};

/**
 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
 * @param arg {keyword, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryRosterItem = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)){
		YYIMRosterManager.getInstance().queryRosterItem(arg);
	}
};

/**
 * 获取用户在线状态 rongqb 20151119
 * arg {
 * username: ['zhangsan','lisi'],
 * success:function,
 * error:function,
 * complete:function,
 * }
 * resource:2.1
 */
YYIMManager.prototype.getRostersPresence = function(arg){
	if(arg.username instanceof Array){
		arg.username = JSON.stringify(arg.username);
		YYIMRosterManager.getInstance().getRostersPresence(arg);
	}
};

/**
 * 获取最近联系人列表 rongqb 20160526
 * arg {
 * mode: String, // 'days' 按照最近*天查询联系人(默认)， 'number' 按照最近联系人个数查询，
 * contactsDays: number,//查询最近*天的联系人  默认是 7 （mode == 'days'）
 * contactsCount: number,//查询最近联系人的数量 默认是 20 （mode == 'number'）
 * success:function,
 * error:function,
 * complete:function,
 * }
 */
YYIMManager.prototype.getRecentContacts = function(arg){
	YYIMIQ.getRecentContacts(arg);
};

/**
 * 更新好友
 * @param arg {
 * 		roster : {
 * 			id : 好友id,
 * 			name : 好友昵称,
 * 			groups : ["group1","group2"] // 好友所在分组
 * 		},
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.updateRosterItem = function(arg) {
	if(arg && arg.roster && YYIMCommonUtil.isStringAndNotEmpty(arg.roster.id)) {
		YYIMIQ.updateRosterItem({
			roster : {
				jid : YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(arg.roster.id)),
				name : arg.roster.name,
				groups : arg.roster.groups
			},
			success : arg.success,
			error : arg.error
		});
	}
};

/**
 * 查找群
 * @param arg {keyword, start, size, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryChatGroup = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		YYIMChatGroupManager.getInstance().queryChatGroup(arg);
	}
};

/**
 * 退出群
 * @param id
 */
YYIMManager.prototype.quitChatGroup = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		YYIMChatGroupManager.getInstance().quitChatGroup(YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(id)));
	}
};

YYIMManager.prototype.delGroupMember = function(roomId, delId,callbackFn) {
	if(YYIMCommonUtil.isStringAndNotEmpty(delId)){
		YYIMChatGroupManager.getInstance().delGroupMember(
				YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(roomId)), 
				YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(delId)),
				callbackFn
				);
	}
}; 

/**
 * 加入群
 * @param arg {jid: roomJid, success:function, error:function}
 */
YYIMManager.prototype.joinChatGroup = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMChatGroupManager.getInstance().joinChatGroup({
			jid : YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}
};

/**
 * 获取群组信息
 * @param arg {id : chatGroupId, success : function, error : function}
 */
YYIMManager.prototype.getChatGroupInfo = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMIQ.getChatGroupInfo({
			jid : YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}
};

/**
 * 获取公共号列表[pubaccount]
 * @param arg {success: function, error: function,complete: function}
 */
YYIMManager.prototype.getPubAccount = function(arg){
	YYIMIQ.getPubAccountItems(arg);
};

/**
 * 关注公共账号 rongqb 20151207
 * @param arg {
 * 		id : 公共号id,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.addPubaccount = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMPresence.addPubAccount({
			jid : YYIMJIDUtil.buildPubAccountJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 取消关注公共账号  rongqb 20151207
 * @param arg {
 * 		id : 公共号id,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.removePubaccount = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMPresence.removePubAccount({
			id : Math.uuid(),
			to : YYIMJIDUtil.buildPubAccountJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 查找公共号
 * @param arg {keyword, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryPubaccount = function(arg){
	YYIMIQ.queryPubaccount(arg);
};

/**
 * 获取群组列表
 * @param arg {
 * success: function, //成功回调函数
 * error: function,  //失败回调函数
 * complete:function //无论成功失败都回调的函数
 * }
 */
YYIMManager.prototype.getChatGroups = function(arg){
	YYIMChatGroupManager.getInstance().getChatGroups(arg);
};

/**
 * 群邀请[chatroom]
 * @param arg{
 * 	roomId 目标群组jid或者chatroom对象
 * 	ids 邀请的成员jid数组
 * }
 */
YYIMManager.prototype.addGroupMember = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.roomId) && YYIMArrayUtil.isArray(arg.ids)) {
		var roomJid = YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.roomId)),
			jids = arg.ids.slice(),
			i = 0,
			length = jids.length;
		for(; i < length; i++)
			jids[i] = YYIMJIDUtil.buildUserJID(YYIMJIDUtil.getNode(jids[i]));
		
		YYIMChatGroupMemberManager.getInstance().addGroupMember(roomJid, jids);
	}
};

/**
 * 创建房间
 * @param arg {name, node, desc, nickName, success: function, error: function, complete:function}
 */
YYIMManager.prototype.addChatGroup = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.node))
		YYIMChatGroupManager.getInstance().addChatGroup(arg);
};


/**
 * 创建群组 rongqb 20151117
 * @param arg {name, members:[], success: function, error: function, complete:function}
 * resource:2.1 
 */
YYIMManager.prototype.createChatGroup = function(arg){
	if(!(arg.members instanceof Array)){
		delete arg.members;
	}
	if(arg.name){
		YYIMChatGroupManager.getInstance().createChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  群主转让群组 rongqb 20160104
 *  @param arg {
 *  to:群组,
 *  newOwner:string,
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 *  resource:2.3 
 */
YYIMManager.prototype.transferChatGroup = function(arg){
	if(arg && typeof(arg.newOwner) == 'string' && arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().transferChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  群主解散群组 rongqb 20160106
 *  @param arg {
 *  to:群组,
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 *  resource:2.3 
 */
YYIMManager.prototype.dismissChatGroup = function(arg){
	if(arg && arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().dismissChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};



/**
 * 获取群组共享文件 rongqb 20160323 
 * arg {
 *  id:String,
 *  start:number,
 *  size:number,
 *  success:funciton,
 *  error:function,
 *  complete:funciton,
 * }
 */
YYIMManager.prototype.getGroupSharedFiles = function(arg){
	if(arg && arg.id){
		YYIMIQ.getGroupSharedFiles(arg);
	}
};

/**
 * 房间成员邀请人入群  rongqb 20151118
 * @param arg {to:群组,members:[],success:function,error:function,complete:function}
 * resource:2.1 
 */
YYIMManager.prototype.inviteGroupMember = function(arg){
	if(arg.members && (arg.members instanceof Array) && arg.members.length && arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().inviteGroupMember(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 群成员更改配置信息 rongqb 20151119
 *  @param arg {to:群组,name:string, success: function,error:function,complete: function}
 *  resource:2.1 
 */
YYIMManager.prototype.modifyChatGroupInfo = function(arg){
	if(arg.name && arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().modifyChatGroupInfo(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  群主踢人 rongqb 20151119
 *  @param arg {to:群组,member:string, success: function,error:function,complete: function}
 *  resource:2.1 
 */
YYIMManager.prototype.kickGroupMember = function(arg){
	if(arg.member && typeof(arg.member) == 'string' && arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().kickGroupMember(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 群成员退出群 rongqb 20151119
 *  @param arg {to:群组,success: function,error:function,complete: function}
 *  resource:2.1 
 */
YYIMManager.prototype.exitChatGroup = function(arg){
	if(arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		YYIMChatGroupManager.getInstance().exitChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  收藏群组(收藏) rongqb 20151201
 *  @param arg {to:群组id, success: function, error: function,complete: function}
 *  resource:2.1 
 */
YYIMManager.prototype.collectGroup = function(arg){
	if(arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		arg.type = COLLECT_TYPE.ADD;
		YYIMChatGroupManager.getInstance().collectChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  取消收藏群组 rongqb 20151201
 *  @param arg {to:群组id, success: function, error: function,complete: function}
 *  resource:2.1 
 */
YYIMManager.prototype.removeCollectGroup = function(arg){
	if(arg.to){
		arg.to =YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.to));
		arg.type = COLLECT_TYPE.REMOVE;
		YYIMChatGroupManager.getInstance().collectChatGroup(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 更新群组
 * @param arg {id, name, desc, photo, success: function, error: function, complete:function}
 */
YYIMManager.prototype.updateChatGroup = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id))
		YYIMChatGroupManager.getInstance().updateChatGroup({
			jid : YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.id)),
			name : arg.name,
			desc : arg.desc,
			photo : arg.photo,
			error : arg.error,
			success : arg.success,
			complete : arg.complete 
		});
};

/**
 * 获取指定群的群成员[chatroom]
 * @param arg {id: string, success: function, error: function,complete: function}
 */
YYIMManager.prototype.getGroupMembers = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		YYIMChatGroupMemberManager.getInstance().getGroupMembers({
			jid : YYIMJIDUtil.buildChatGroupJID(YYIMJIDUtil.getNode(arg.id)),
			success : arg.success,
			error : arg.error,
			complete : arg.complete
		});
	}
};

/**
 * 获取历史记录 
 * @param arg {
 * id: //对话人id
 * chatType: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * contentType:int, //代表希望拿到的消息类型，不填则为全部消息类型 
 * start: number,   //消息列表的分页参数，起始值，默认0,
 * num: number   //消息列表的分页参数，分页参数，默认100
 * }
 */
YYIMManager.prototype.getHistoryMessage = function(arg){
	if(!arg.start || isNaN(arg.start)){
		arg.start = 0;
	}
	if(!arg.num || isNaN(arg.num)){
		arg.num = 100;
	}
	YYIMMessage.getHistoryMessage(arg);
};

/**
 * 获取离线消息 rongqb 20150806
 * arg {
 * success:function,
 * error:function,
 * complete:function,
 * }
 */
YYIMManager.prototype.getOfflineMessage = function(arg){
	arg = arg || {};
	YYIMMessage.getOfflineMessage({
		id: this.getUserID(),
		success: arg.success,
		error: arg.error,
		complete: arg.complete
	});
};

/**
 * 发送回执报文
 * @param arg {
 *  	to:,	//回执的对象
 * 		id: 	//报文id
 * }
 */
YYIMManager.prototype.sendReceiptsPacket = function(arg){
	YYIMMessage.sendReceiptsPacket(arg);
};

/**
 * 发送已读回执报文
 *  @param arg {
 *  	to:,	//回执的对象
 * 		id: 	//报文id
 * }
 */
YYIMManager.prototype.sendReadedReceiptsPacket = function(arg){
	YYIMMessage.sendReadedReceiptsPacket(arg);
};

/**
 * 发送消息
 * @param arg
 */
YYIMManager.prototype.sendMessage = function(arg){
	YYIMMessage.sendMessage(arg);
};

/**
 * 发送附件消息 rongqb 20151217
 * arg {
 * 	  to:,
 *    body:{
 *      content:{
 *     		  name:,
 *       	  size:,
 *       	  attachId:
 *    		},
 *    }
 *    type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 *    contentType:,
 *    success:function,
 * }
 */
YYIMManager.prototype.sendAccessoryMessage = function(arg){
	arg.id = Math.uuid();
	var file = new SNSFile(arg.body.content.name, arg.body.content.attachId, arg.body.content.size);
	arg.body = {
		content : file,
		contentType : arg.contentType || MESSAGE_CONTENT_TYPE.FILE,
		dateline : new Date().getTime()
	};
	YYIMChat.sendMessage(arg);
};

/**
 * 异步发送form表单
 * arg {
 * 	  to:,
 *    file:{
 *       name:,
 *       size:
 *    },
 *    data:,
 *    mediaType:, //1:图片，2：附件
 *    type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 *    success:function,
 *    error:function,
 *    complete:function
 * }
 */
YYIMManager.prototype.sendFormMessage = function(arg){
	var param = {
		  token : this.getToken(),
  	   	  creator : this.getUserID() + '.' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '.'  + YYIMConfiguration.MULTI_TENANCY.ETP_KEY,
  	   	  receiver : arg.to  + '.' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '.'  + YYIMConfiguration.MULTI_TENANCY.ETP_KEY,
  	   	  mediaType : arg.mediaType || 2,
  	   	  randomId :  Math.uuid(),
  	   	  name:arg.file.name,
  	   	  size:arg.file.size
	};
	var url = YYIMConfiguration.SERVLET.REST_RESOURCE_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/upload'; 
	url += '?' + jQuery.param(param);
	
	jQuery.ajax({
		url:url,
		type:'post',
		dataType:'json',
		data:arg.data,
		processData:false,
		contentType:false,
		success:function(result){
			if(result && result.attachId){
				var accessory = {
						to:arg.to,
						body:{
							content:{
								name:arg.file.name,
								size:arg.file.size,
								attachId:result.attachId
							}
						},
						type: arg.type,  //chat:单聊，groupcgat:群聊,pubaccount:公众号
						success:function(message){
							var obj = {
									name:message.body.content.name,
									size:message.body.content.size,
									type:message.body.content.type,
									path:YYIMChat.getFileUrl(message.body.content.path)
							};
							message.body.content = obj; 
							message.to = YYIMChat.getJIDUtil(message.to);
							arg.success && arg.success(message);
						}
				};
				accessory.contentType = (param.mediaType === 1)? MESSAGE_CONTENT_TYPE.IMAGE:MESSAGE_CONTENT_TYPE.FILE;
				YYIMManager.getInstance().sendAccessoryMessage(accessory);
			}else{
				arg.error && arg.error();
			}
		},
		error:function(xhr,statusText){
			arg.error && arg.error();
		},
		complete:function(xhr,statusText){
			arg.complete && arg.complete();
		}
	});
};

/**
 * 发送分享消息[分享消息]
 * @param arg {
 * to: id, //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * extend: string,  //扩展字段 
 * sharebody:{
 * 		shareImageUrl:string, //分享中图片的url
 * 		shareUrl:string, //分享的url
 * 		shareDesc:string, //分享的内容描述
 * 		shareTitle:string //分享的标题
 * 	},
 * success:function //成功回调函数
 * }
 */  
YYIMManager.prototype.sendShareMessage = function(arg){
	arg.content = arg.sharebody || arg.content;
	arg.contentType = MESSAGE_CONTENT_TYPE.SHARE;
	this.postMessage(arg);
};

/**
 * 发送白板消息
 * @param arg {
 * to: id,  //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * extend: string,  //扩展字段 
 * content:{
 * 	id:, //白板id
 * }, 
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendWhiteBoardMessage = function(arg){
	arg.contentType = MESSAGE_CONTENT_TYPE.WHITEBOARD;
	this.postMessage(arg);
};

/**
 * 发送文本消息[文本,表情]
 * @param arg {
 * to: id,  //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * msg:text, //消息文本
 * style：{
 *    font: "16", //字体
 *    size: "30", //大小
 *    color: "#000", //颜色
 *    biu: 7 //加粗、斜体、下划线
 * }, 
 * extend: string,  //扩展字段 
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendTextMessage = function(arg){
	arg.content = arg.msg  || arg.content;
	arg.contentType = MESSAGE_CONTENT_TYPE.TEXT;
	this.postMessage(arg);
};

/**
 * 发送消息接口整合
 * @param arg {
 * to: id,  //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * extend: string,  //扩展字段 
 * atuser: array,  //at 成员
 * data:
 * success:function //成功回调函数
 * },
 * contentType
 */
YYIMManager.prototype.postMessage = function(arg){
	arg.id = Math.uuid();
	arg.type = arg.type || CHAT_TYPE.CHAT;
	arg.body = {
		extend:arg.extend,
		content: arg.content,
		contentType: arg.contentType,
		dateline: new Date().getTime()
	};
	
	if(arg.type === CHAT_TYPE.GROUP_CHAT && arg.atuser instanceof Array){
		arg.body.atuser = arg.atuser;
	}
	
	// 所有样式以串形式发, 兼容所有端, 只有文本消息会解析
	if(arg.style && typeof arg.style != 'string'){
		arg.body.style = JSON.stringify(arg.style);
	}
	this.sendMessage(arg);
};

/**
 * 发送图片消息
 * @param arg{
 * fileInputId：, //文件域id 
 * to:jid,        //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendPic = function(arg){
	var toJid = YYIMJIDUtil.getNode(arg.to);
	if(arg.type == CHAT_TYPE.GROUP_CHAT)
		toJid = YYIMJIDUtil.buildChatGroupJID(toJid);
	else
		toJid = YYIMJIDUtil.buildUserJID(toJid);
	
	var opts = {
		fileTypeExts:'jpg;jpeg;png;bmp;gif',
		fileSizeLimit:100*1024,
		breakPoints:false,
		saveInfoLocal:false,
		removeTimeout:100,
		uploader:YYIMConfiguration.SERVLET.FILE_UPLOAD_SERVLET,
		uploadIdPrefix:"image_upload_",
		inputId:arg.fileInputId,
		to: toJid,
		type: MESSAGE_CONTENT_TYPE.IMAGE,
		chatType: arg.type,
		onUploadSuccess: arg.success,
		onUploadProgress: arg.progress,
		onUploadError: arg.error,
		showProcess: false,
		processId: "udnProcessBar"
	};
	
	if(arg.resource){
		opts.resource = arg.resource;
	}
	FileUpload.getInstance(arg.fileInputId, opts);
	FileUpload.getInstance(arg.fileInputId).sendFile(document.getElementById(arg.fileInputId));
};

/**
 * 发送文件消息
 * @param arg{
 * fileInputId：, //文件域id 
 * to:jid,        //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendFile = function(arg){
	var toJid = YYIMJIDUtil.getNode(arg.to);
	if(arg.type == CHAT_TYPE.GROUP_CHAT)
		toJid = YYIMJIDUtil.buildChatGroupJID(toJid);
	else
		toJid = YYIMJIDUtil.buildUserJID(toJid);
	var opts = {
		fileTypeExts:'*',
		fileSizeLimit:99999999,
		breakPoints:true,
		saveInfoLocal:true,
		removeTimeout:100,
		uploader:YYIMConfiguration.SERVLET.FILE_UPLOAD_SERVLET,
		uploadIdPrefix:"bp_upload_",
		inputId:arg.fileInputId,
		to: toJid,
		type: MESSAGE_CONTENT_TYPE.FILE,
		chatType: arg.type,
		onUploadSuccess: arg.success,
		onUploadProgress: arg.progress,
		onUploadError: arg.error,
		showProcess: true,
		processId: "udnProcessBar"
	};
	if(arg.resource){
		opts.resource = arg.resource;
	}
	FileUpload.getInstance(arg.fileInputId, opts);
	FileUpload.getInstance(arg.fileInputId).sendFile(document.getElementById(arg.fileInputId));
};
 
/**
 * 上传头像
 * @param arg{
 * fileInputId：, //文件域id 
 * to:jid,        //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.uploadAvatar = function(arg){
	var toJid = YYIMJIDUtil.getNode(arg.to);
	if(arg.type == CHAT_TYPE.GROUP_CHAT)
		toJid = YYIMJIDUtil.buildChatGroupJID(toJid);
	else
		toJid = YYIMJIDUtil.buildUserJID(toJid);
	FileUpload.getInstance(arg.fileInputId,{
		fileTypeExts:'jpg;jpeg;png;bmp;gif',
		fileSizeLimit:5*1024,
		breakPoints:false,
		saveInfoLocal:false,
		removeTimeout:100,
		uploader:YYIMConfiguration.SERVLET.FILE_UPLOAD_SERVLET,
		uploadIdPrefix:"user_avatar_upload_",
		inputId:arg.fileInputId,
		to: toJid,
		type: UPLOAD_AVATAR,
		onUploadSuccess: arg.success,
		onUploadError: arg.error,
		showProcess: false,
		processId: "udnProcessBar"
	});
	FileUpload.getInstance(arg.fileInputId).sendFile(document.getElementById(arg.fileInputId));
};

// get config
YYIMManager.prototype.getServerName = function(){
	return YYIMConfiguration.CONNECTION.SERVER_NAME;
};

/**
 * 根据附件id获取 文档转换（图片）后的信息
 * @param {Object} arg
 * {
 * 	attachId：
 *  success:function,
 *  error:function
 *  complete:function
 * }
 */
YYIMManager.prototype.getTransformFileList = function(arg){
	jQuery.ajax({
		url: YYIMConfiguration.SERVLET.REST_TRANSFORM_SERVLET + 'docInfo',
		type: 'get',
		data:{
			attachId:arg.attachId,
			token: this.getToken(),
			downloader: this.getUserNode()
		},
		dataType: 'json',
		cache: false,
		success:function(data){
			arg.success && arg.success(data);
		},
		error:function(){
			arg.error && arg.error();
		},
		complete:function(){
			arg.complete && arg.complete();
		}
	});
};

/**
 * 根据附件id获取附件的下载路径
 * @param attachId mediaType(2:缩略图，1:原始图)
 * @returns {String}
 */
//YYIMManager.prototype.getFileUrl = function(attachId,mediaType,mode){
//	
//	var fromUser, token;
//	if(this.isAnonymous()){
//		fromUser = this.getUserFullJID();
//		token = "anonymous";
//	}else{
//		fromUser = this.getUserNode();
//		token = this.getToken();
//	}
//	
//	var url = YYIMConfiguration.SERVLET.REST_DOWNLOAD_SERVLET + YYIMConfiguration.MULTI_TENANCY.ETP_KEY + '/' + YYIMConfiguration.MULTI_TENANCY.APP_KEY + '/download';
//
//	if(mode === 'transform'){
//		url = YYIMConfiguration.SERVLET.REST_TRANSFORM_SERVLET + 'docDownload';
//	}
//	
//	var arg = {
//		token:token,	
//		attachId:attachId,
//		downloader:fromUser,
//		mediaType: 'middle'
//	};
//	
//	if(!!mediaType && 
//			(mediaType === 'small' 
//				|| mediaType === 'middle'
//					|| mediaType === 'large')){
//		arg.mediaType = mediaType;
//	}
//
//	url += '?' + jQuery.param(arg);
//	return url;
//};

YYIMManager.prototype.getFileUrl = function(attachId){
	var fromUser, token;
	if(this.isAnonymous()){
		fromUser = this.getUserFullJID();
		token = "anonymous";
	}else{
		fromUser = this.getUserNode();
		token = this.getToken();
	}
	return YYIMConfiguration.SERVLET.FILE_DOWNLOAD_SERVLET + "?attachId=" + attachId + "&fromUser=" + fromUser + "&token=" + token;
};

YYIMManager.prototype.getServletPath = function() {
	return YYIMConfiguration.SERVLET;
};

YYIMManager.prototype.getJIDUtil = function(){
	return YYIMJIDUtil;
};

YYIMManager.prototype.getArrayUtil = function(){
	return YYIMArrayUtil;
};

YYIMManager.prototype.isAnonymous = function(){
	return this._anonymousUser;
};

YYIMManager.prototype.enableAnonymous = function(){
	return YYIMConfiguration.IS_ANONYMOUS;
};

YYIMManager.prototype.getBrowser = function() {
	return YYIMConfiguration.BROWSER;
};

/**
 * 指定id是否在线
 * 
 * @param id
 * @returns {Boolean}
 */
YYIMManager.prototype.isOnline = function(id) {
	return YYIMRosterManager.getInstance()._onlineList.get(id) == true;
};

/**
 * 多方通话 rongqb 20160104
 * @param arg {
 * 	caller: //主叫号码
 *  phones：//被叫号码
 *  accountMmanaged:true, //账号托管为true时，不需要输入账号密码，去im多租户后台管理账号
 *  account：//通话账号  accountMmanaged:true时 不传
 *  key：//通话秘钥  accountMmanaged:true时 不传
 *  success:function,
 *  error:function
 * }
 */
YYIMManager.prototype.multiPartyCall = function(arg){
	if(typeof arg === 'undefined' || typeof arg.caller === 'undefined' || !arg.phones instanceof Array || !arg.phones.length){
		arg.error && arg.error();
		return;
	}
	
	if(!YYIMRegularUtil.phone.test(arg.caller)){
		arg.error && arg.error();
		return;
	}
	
	var phones = [];
	for(var x in arg.phones){
		var phone = arg.phones[x].toString();
		if(YYIMRegularUtil.phone.test(phone)){
			if(phones.indexOf(phone) === -1){
				phones.push(phone);
				var tempCondition = phones.join(",");
				if(phones.length > YYIMConfiguration.MULTIPARTYCALL.PARTYMAXLENGTH || tempCondition.length > YYIMConfiguration.MULTIPARTYCALL.PHONESMAXLENGTH){
					phones.pop();
					break;
				}
			}
		}
	}
	
	if(!phones.length){
		arg.error && arg.error();
		return;
	}
	
	arg.caller = arg.caller.toString();
	arg.phones = phones;
	
	if(arg.accountMmanaged !== true){
		arg.phones = phones.join(',');
		arg.account = arg.account? arg.account:YYIMConfiguration.MULTIPARTYCALL.ACCOUNT;
		arg.key = arg.key? arg.key:YYIMConfiguration.MULTIPARTYCALL.KEY;
		
		if(typeof arg.account === 'undefined' || typeof arg.key === 'undefined'){
			arg.error && arg.error();
			return;
		}
	}
	
	funExtensions.multiPartyCall(arg);
}; 

/**
 * 白板操作 rongqb 20160318
 * @param arg {
 *   name: String,//"name of whiteboard"
 *   wid: String, //create时不传
 *   origin: String, //必须，白板发起的会话JID， 群组为群组JID, bareJID 
 *   operation: String //could be "create" "end" "rename" "listen"
 *   success:function,
 *   error:function,
 *   complete:function,
 *	}
 */
YYIMManager.prototype.operateWhiteBoard = function(arg){
	var whiteBoardBody  = {
			id: Math.uuid(),
			origin: arg.origin,
			operation: arg.operation || WHITE_OPERATION.CREATE,
			success: arg.success,
			error: arg.error,
			complete: arg.complete
		};
	
	if(arg.operation !== WHITE_OPERATION.CREATE){
		whiteBoardBody.wid = arg.wid;
	}
	
	if(arg.operation === WHITE_OPERATION.CREATE 
			|| arg.operation === WHITE_OPERATION.RENAME){
		whiteBoardBody.name = arg.name;
	}
	
	if(whiteBoardBody.wid && whiteBoardBody.origin && whiteBoardBody.operation === WHITE_OPERATION.LISTEN){
		YYIMWhiteBoard.listenWhiteBoard(whiteBoardBody);
	}else if(whiteBoardBody.origin && (whiteBoardBody.operation === WHITE_OPERATION.CREATE
			|| whiteBoardBody.operation === WHITE_OPERATION.END
			|| whiteBoardBody.operation === WHITE_OPERATION.RENAME)){
		YYIMWhiteBoard.operateWhiteBoard(whiteBoardBody);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 更新白板 rongqb 20160318
 * @param arg {
 *	 wid: String, // whiteboard id
 *	 nodeId: String, // edited svg node id
 *	 nodeContent: String, // edited svg node content
 *	 nodeText: String, // edited svg node text
 *	 operation: String //could be update delete,update default
 *   success:function,
 *   error:function,
 *   complete:function,
 *	}
 */
YYIMManager.prototype.updateWhiteBoard = function(arg){
	if(!!arg.wid && !!arg.nodeId){
		arg.id =  Math.uuid();
		arg.from = YYIMManager.getInstance().getUserFullJID();
		arg.operation = (arg.operation === WHITE_OPERATION.DELETE)? WHITE_OPERATION.DELETE : WHITE_OPERATION.UPDATE;
		if(arg.operation == WHITE_OPERATION.UPDATE && !arg.nodeContent){
			arg.error && arg.error();
			return;
		}
		YYIMWhiteBoard.updateWhiteBoard(arg);
	}else{
		arg.error && arg.error();
	}
};

return YYIMManager.getInstance();})();
