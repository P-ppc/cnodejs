var CREATETOPIC = (function() {
    var accessToken = STORAGE.getJSON('USERINFO').accessToken;
    var editor;
    var initPage = function() {
        // 初始化editor
        var area = document.getElementById('editorArea');
        editor = new Editor({
            element: area,
            toolbar: [
                {name: 'bold', action: Editor.toggleBold},
                {name: 'italic', action: Editor.toggleItalic},
                '|',

                {name: 'quote', action: Editor.toggleBlockquote},
                {name: 'unordered-list', action: Editor.toggleUnOrderedList},
                {name: 'ordered-list', action: Editor.toggleOrderedList},
                '|',

                {name: 'link', action: Editor.drawLink},
                {name: 'image', action: Editor.drawImage},
                '|',

                {name: 'info', action: 'http://lab.lepture.com/editor/markdown'},
                {name: 'preview', action: Editor.togglePreview}
            ]
        });

        LOADING.stopLoading();
    };

    var initSubmitBtn = function() {
        $("#submit").click(function() {
            $el = $(this);
            var title = $("#title").val();
            var tab = $("#tab option:selected").val();
            var content = editor.codemirror.getValue();
            var urlString = "https://cnodejs.org/api/v1/topics";
            if (!tab) {
                TOAST.show({
                    icon: "icon-error",
                    message: "请选择主题类型!"
                });
                return false;
            }
            if (!title) {
                TOAST.show({
                    icon: "icon-error",
                    message: "请输入标题!"
                });
                return false;
            }
            if (title.length <= 10) {
                TOAST.show({
                    icon: "icon-error",
                    message: "标题需10字以上!"
                });
                return false;
            }
            if (!content) {
                TOAST.show({
                    icon: "icon-error",
                    message: "请输入主题内容!"
                });
                return false;
            }
            // disable按钮
            $el.attr("disabled", "true").addClass("disable");
            $.ajax({
                url: urlString,
                type: 'POST',
                dataType: 'json',
                data: $.param({
                    accesstoken: accessToken,
                    title: title,
                    tab: tab,
                    content: content
                }),
                success: function(respData) {
                    if (respData && respData.success === true) {
                        // 暂时跳转到首页
                        window.location = 'index.html';
                        // able按钮
                        $el.removeAttr("disabled").removeClass("disable");
                    }
                }, error: function() {
                    // able按钮
                    $el.removeAttr("disabled").removeClass("disable");
                }
            });
        })
    };

    return {
        initPage: function() {
            initPage();
            initSubmitBtn();
        }
    };
})();