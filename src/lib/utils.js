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

    // 修复一些html内容内一些img的src不正常显示的Bug
    var _fixImgSrc = function(html) {
        var imgReg = new RegExp('<img.*>', 'gm');
        var srcReg = new RegExp('src=[\"\']//', 'gm');
        var imgs = html.match(imgReg);
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            replaceImg = img.replace(srcReg, 'src=\"https://');
            html = html.replace(img, replaceImg);
        }
        return html;
    }

    return {
        replaceAll: function(originStr, replacedStr, replaceStr) {
            return _replaceAll(originStr, replacedStr, replaceStr);
        },
        getQueryString: function(name) {
            return _getQueryString(name);
        },
        fixImgSrc: function(html) {
            return _fixImgSrc(html);
        }
    }
})();