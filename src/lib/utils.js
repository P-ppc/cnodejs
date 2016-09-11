var UTILS = (function() {
    // TODO 全局替换
    var _replaceAll = function(originStr, replacedStr, replaceStr) {
        return originStr.replace(new RegExp(replacedStr,'gm'), replaceStr);
    };

    return {
        replaceAll: function(originStr, replacedStr, replaceStr) {
            return _replaceAll(originStr, replacedStr, replaceStr);
        }
    }
})();