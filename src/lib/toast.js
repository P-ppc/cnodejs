var TOAST = (function() {
    var _template = `
        <script type="text/html" id="toastTemplate">
            <div class="toast" id="toast">
                <!-- 图标区 -->
                <div class="icon-area">
                    <i class="iconfont {{icon}} global-toast"></i>
                </div>
                <!-- 内容区 -->
                <div class="message-area">
                    {{message}}
                </div>
            </div>
        </script>
    `;

    var show = function(options) {
        remove();
        var toastHtml = template("toastTemplate", options);
        $(options.container || ".page-container").append(toastHtml);
        $("#toast").fadeIn(300).delay(3000).fadeOut(300, function() {
            $(this).remove();
        }); 
    };

    var remove = function() {
        $("#toast").remove();
    }

    return {
        init: function() {
            $("body").append(_template);
        },
        show: function(options) {
            show(options);
        },
        remove: function() {
            remove();
        }
    }

})();
TOAST.init();