// 自定义存储
var STORAGE = (function() {
    // TODO  list
    // 支持暂时存储: sessionStorage
    // 提供pop, 即取值时同时删除数据
    // JSON.parse()不能转换普通的字符串, 所以要提供普通的string版
    // 提供删除接口
    var _storage = window.localStorage;

    _getJSON = function(key) {
        var value = _storage.getItem(key);
        if (value === undefined) {
            return undefined;
        }
        return JSON.parse(value);
    };

    _setJSON = function(key, obj) {
        var json = JSON.stringify(obj);
        _storage.setItem(key, json);
    };

    _remove = function(key) {
        _storage.removeItem(key);
    };

    _clear = function() {
        _storage.clear();
    }

    return {
        getJSON: function(key) {
            return _getJSON(key);
        },
        setJSON: function(key, obj) {
            _setJSON(key, obj);
        },
        remove: function(key) {
            _remove(key);
        },
        clear: function() {
            clear();
        }
    };
})();