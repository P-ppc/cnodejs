// 自定义存储
var STORAGE = (function() {
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
    }

    return {
        getJSON: function(key) {
            return _getJSON(key);
        },
        setJSON: function(key, obj) {
            _setJSON(key, obj);
        }
    };
})();