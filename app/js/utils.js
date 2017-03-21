// 工具方法, 依赖angular
// 拼接 get url 参数
String.prototype.setParameters = function (params) {
    if (!angular.isObject(params)) {
        throw new Error("Need a object");
    }
    var url = this + "?";
    for (var key in params) {
        var value = params[key];
        if (value != "") {
            url += key + "=" + value + "&";
        } else {
            url += key + "&";            
        }
    }
    return url.substring(0, url.length - 1);
};