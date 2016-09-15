var UTILS = (function() {
    // 全局替换
    var _replaceAll = function(originStr, replacedStr, replaceStr) {
        return originStr.replace(new RegExp(replacedStr,'gm'), replaceStr);
    };

    // 提取Url Query的参数
    var _getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    return {
        replaceAll: function(originStr, replacedStr, replaceStr) {
            return _replaceAll(originStr, replacedStr, replaceStr);
        },
        getQueryString: function(name) {
            return _getQueryString(name);
        }
    }
})();