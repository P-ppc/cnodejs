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
            var title = $("#title").val();
            var tab = $("#tab").val();
            var content = editor.codemirror.getValue();
            var urlString = "https://cnodejs.org/api/vi/topics";
            console.log({
                accessToken: accessToken,
                title: title,
                tab: tab,
                content: content
            });
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
                    }
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