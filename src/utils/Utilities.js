//root object
var Utilities = {};
//library version
Utilities.Version = "1.3a";

//root packages
Utilities.Array = {};
Utilities.DateTime = {};
Utilities.Dom = {};
Utilities.Error = {};
Utilities.Log = {};
Utilities.Script = {};
Utilities.String = {};
Utilities.Object = {};
Utilities.Number = {};

/************
DateTime

Description: Class and helper functions to perfom
tasks on Date and Times.
*/

var Dt = Utilities.DateTime;

Dt.now = function(){ return new Date(); };
Dt.toEpoch = function(d){ return d.getTime(); };
Dt.toUnix = function(d){ return Math.round(d.getTime() / 1000); };


/************
Error

Description: Common Errors to be thrown
*/
var Err = Utilities.Error;

Err.NotImplementedException = { name: "Not Implemented", level: "ERROR", message: "Method or Function not yet implemented.", htmlMessage: "Method or Function not yet implemented." };
Err.TypeError = TypeError || { name: "Type Error", level: "ERROR", message: "Invalid object or object of incorrect type.", htmlMessage: "Invalid object or object of incorrect type." };
Err.Required = { name: "Object Required", level: "ERROR", message: "It is required that the object passed is not null or undefined.", htmlMessage: "It is required that the object passed is not null or undefined." };


/************
Error

Description: Common Errors to be thrown
*/

var Log = Utilities.Log;

Log.loggingEnabled = true;
Log.log = function(obj){ if(console && console.log && Log.loggingEnabled){ console.log(obj); } };
Log.debug = function(obj){ if(console && console.debug && Log.loggingEnabled){ console.debug(obj); } };
Log.info = function(obj){ if(console && console.info && Log.loggingEnabled){ console.info(obj); } };
Log.warn = function(obj){ if(console && console.warn && Log.loggingEnabled){ console.warn(obj); } };
Log.error = function(obj){ if(console && console.error){ console.error(obj); } };
Log.assert = function(test, message){ if(console && console.assert && Log.loggingEnabled){ console.assert(test, message); } };
Log.clear = function(){ if(console && console.clear){ console.clear(); } };
Log.start = function(label){ if(console && console.time && Log.loggingEnabled){ console.time(label); } };
Log.end = function(label){ if(console && console.timeEnd && Log.loggingEnabled){ console.timeEnd(label); } };


/************
String

Description: 
*/

var Str = Utilities.String;

Str.trim = String.trim || function(s){ return s.replace(/^\s+|\s+$/g,''); };
Str.isEmptyOrWhitespace = function(s){ if(Str.trim(s).length == 0){ return true; } return false; };
Str.randomString = function(seed){ var s = seed || Math.random(); return s.toString(36).slice(-8); };
Str.uriEncode = function(s){ return encodeURIComponent(s); };
Str.uriDecode = function(s){ return  decodeURIComponent(s); };
Str.utf8Encode = function(s){ return unescape(Str.uriEncode(s)); };
Str.utf8Decode = function(s){ return Str.uriDecode(escape(s)); };
Str.base64Encode = window.btoa || function(s){
	var output = ""; var i = 0; var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    s = Str.utf8Encode(s);

    while (i < s.length) {
        chr1 = s.charCodeAt(i++); chr2 = s.charCodeAt(i++); chr3 = s.charCodeAt(i++);
        enc1 = chr1 >> 2; enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); enc4 = chr3 & 63;
        if (isNaN(chr2)) { enc3 = enc4 = 64; } else if (isNaN(chr3)) { enc4 = 64; }
        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
};
Str.base63Decode = window.atob || function(s){
	var output = ""; var i = 0; var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    s = s.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < s.length) {
        enc1 = this._keyStr.indexOf(s.charAt(i++));enc2 = this._keyStr.indexOf(s.charAt(i++));
        enc3 = this._keyStr.indexOf(s.charAt(i++)); enc4 = this._keyStr.indexOf(s.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4); chr2 = ((enc2 & 15) << 4) | (enc3 >> 2); chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
        if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
    }
    return Str.utf8Decode(output);
};


/************
Object

Description: 
*/

var Obj = Utilities.Object;

Obj.asArray = function(obj){ return Obj.isArray(obj) ? obj : [obj]; };
Obj.asBoolean = function(obj){ return !(obj == void 0 || obj == 'false' || obj === 0 || Utilities.Object.isEmpty(obj)); };
Obj.asFloat = function(obj){ return 1 * obj; };
Obj.asInteger = function(obj){ return ~~obj; };
Obj.asNumber = function(obj){ return (+obj); };
Obj.asString = function(obj){ return ""+obj; };
Obj.equal = function(obj1, obj2) {
    var i;
    if ((obj1 === (void 0) && obj2 === (void 0)) || (obj1 === null && obj2 === null)) { return true; }
    if (typeof(obj2) !== 'object' && obj1 !== obj2) { return false; }
    if (obj1.constructor !== obj2.constructor || obj1.length !== obj2.length) { return false; }
    for (i in obj1) {
        if (obj1.propertyIsEnumerable(i) && obj2.propertyIsEnumerable(i)) {
            try { if (!obj1[i].equals(obj2[i])) { return false; } }
            catch (e) { if (obj1[i] !== obj2[i]) { return false; } }
        }
    }
    return true;
};
Obj.functions = function(obj){
	var ns = [];
    for (var key in obj) {
      if (Obj.isFunction(obj[key])) ns.push(key);
    }
    return ns.sort();	
};
Obj.has = function(obj, key){ return Object.prototype.hasOwnProperty.call(obj, key); };
Obj.isArguments = function(obj){ return (Object.prototype.toString.call(obj) == '[object Arguments]') || (!!(obj && Obj.has(obj, 'callee'))) };
Obj.isArray = Array.isArray || function(obj) { return Object.prototype.toString.call(obj) == '[object Array]'; };
Obj.isBoolean = function(obj){ return obj === true || obj === false || Object.prototype.toString.call(obj) == '[object Boolean]'; };
Obj.isDate = function(obj){ return Object.prototype.toString.call(obj) == '[object Date]'; };
Obj.isDocType = function(obj){ return Object.prototype.toString.call(obj) == "[object DocumentType]"; };
Obj.isElement = function(obj){ return !!(obj && obj.nodeType === 1); };
Obj.isEmpty = function(obj){
    if (obj == null) return true;
    if (Obj.isArray(obj) || Obj.isString(obj)) return obj.length === 0;
    for (var key in obj) if (Obj.has(obj, key)) return false;
    return true;
};
Obj.isFinite = function(obj){ return isFinite(obj) && !isNaN(parseFloat(obj)); };
Obj.isFunction = function(obj){ return Object.prototype.toString.call(obj) == '[object Function]'; };
if(typeof (/./) != 'function'){ Obj.isFunction = function(obj){ return typeof obj == 'function'; }; }
Obj.isNaN = function(obj){ return Obj.isNumber(obj) && obj != +obj; };
Obj.isNull = function(obj){ return obj === null; };
Obj.isNumber = function(obj){ return Object.prototype.toString.call(obj) == '[object Number]'; };
Obj.isObject = function(obj){ return (obj === Object(obj)) && Object.prototype.toString.call(obj) == "[object Object]"; };
Obj.isRegExp = function(obj){ return Object.prototype.toString.call(obj) == '[object RegExp]'; };
Obj.isString = function(obj){ return Object.prototype.toString.call(obj) == '[object String]'; };
Obj.isUndefined = function(obj){ return obj === void 0; };
Obj.keys = Object.keys || function(obj){ 
	if (obj !== Object(obj)) throw new Utilities.Error.TypeError;
	var ks = [];
	for (var key in obj) if (Obj.has(obj, key)) ks[ks.length] = key;
	return ks;
};
Obj.required = function(obj){ return !(Utilities.Object.isNull(obj) || Utilities.Object.isUndefined(obj))};


/************
Number

Description: 
*/

var Num = Utilities.Number;

Num.random = function(min, max){ if(max == null){ max = min; min = 0; } return min + (0 | Math.random() * (max - min + 1)); };


/************
Array

Description: 
*/

var Ary = Utilities.Array;

Ary.union = function(){ return Array.prototype.concat.apply(Array.prototype, arguments); };
Ary.contains = function(ary, key){ return key in ary; };
Ary.asyncIterate = function(stack, process, context){
	var s = stack.concat(), t = (arguments.length > 3 ? arguments[3] : 10);
	setTimeout(function(){ var i = s.shift(); process.call(context, i);
		if(s.length > 0){ setTimeout(arguments.callee, t); }
	}, t);
};


/************
Script

Description: These helper methods inform of script behavior
*/

var Scpt = Utilities.Script;

Scpt.isStrictMode = function isStrictMode(){ try{ var o={p:1,p:2}; }catch(E){ return true; } return false; }


/************
Styles

Description: These helper methods inform of CSS Styles behavior
*/

var Dom = Utilities.Dom;

Dom.supportsStyle = function(node){
	var o = (node || document.body).style, c = true;
	if(!(arguments.length > 1)){ return false; }
	var a = (Utilities.Object.isArray(arguments[1])) ? Array.prototype.slice.call(arguments[1], 0) : Array.prototype.slice.call(arguments, 1);
	var i = a.length;
	while(i-- && c){ if(!(a[i] in o)){ c = false; }}
	return c;
};
Dom.contains = jQuery ?
function(elem, node){ return $(elem).find(node).length > 0; } :
function(elem, node){
     var n = node.parentNode;
     while(n != null){ if(n == elem){ return true; } n = n.parentNode; }
     return false;
}
