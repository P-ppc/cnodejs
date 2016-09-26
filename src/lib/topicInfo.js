var TOPICINFO = (function () {
    var editor;
    var initPage = function(topicId, accessToken, anchor) {
        var urlString = 'https://cnodejs.org/api/v1/topic/' + topicId;
        urlString = accessToken == '' ? urlString : urlString + '?accesstoken=' + accessToken;
        $.ajax({
            url: urlString,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    topicHtml = template('topicTemplate', respData);
                    topicHtml = UTILS.fixImgSrc(topicHtml);
                    $("#topicContent").html(topicHtml);
                    replyHtml = template('replyTemplate', respData);
                    replyHtml = UTILS.fixImgSrc(replyHtml);
                    $("#replyContent").html(replyHtml);
                    if (anchor && anchor != "") {
                        // 跳转到锚点
                        window.location.hash = "#" + anchor;
                    }
                    var authorName = respData.data.author.loginname;
                    _initCollectBtn();
                    _initAutorInfo(authorName);
                }
            }
        })
    };

    var _initAutorInfo = function(authorName) {
        var urlString = 'https://cnodejs.org/api/v1/user/' + authorName;
        $.ajax({
            url: urlString,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    authorHtml = template('authorTemplate', respData);
                    authorHtml = UTILS.fixImgSrc(authorHtml);
                    $('#author').html(authorHtml);
                    prettyPrint();
                }
            }
        });
    }

    // 初始化收藏按钮
    var _initCollectBtn = function() {
        var accessToken = STORAGE.getJSON('USERINFO').accessToken;
        var topicId = UTILS.getQueryString('topicId');
        $("#collect").click(function () {
            var $el = $(this);
            var collectFlag = $el.attr("data-collectFlag") == '0';
            var urlString = "https://cnodejs.org/api/v1/topic_collect/" + (collectFlag ? "collect" : "de_collect");
            $.ajax({
                url: urlString,
                type: 'POST',
                dataType: 'json',
                data: $.param({
                    topic_id: topicId,
                    accesstoken: accessToken
                }),
                success: function(respData) {
                    if (respData.success === true) {
                        // 更新界面
                        if (collectFlag) {
                            $el.attr("data-collectFlag", "1");
                            $el.val('取消收藏');
                            $el.addClass('collect-cancel');
                        } else {
                            $el.attr("data-collectFlag", "0");
                            $el.val('收藏');
                            $el.removeClass('collect-cancel');
                        }
                    }
                } 
            });
        });
    };

    var initEditor = function() {
        var area = document.getElementById('replyArea');
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
    };

    // 初始化回复提交按钮
    var initReplyBtn = function() {
        var accessToken = STORAGE.getJSON('USERINFO').accessToken;
        var topicId = UTILS.getQueryString('topicId');
        $("#replyBtn").click(function () {
            var replyContent = editor.codemirror.getValue();
            urlString = "https://cnodejs.org/api/v1/topic/" + topicId + "/replies";
            $.ajax({
                url: urlString,
                type: 'POST',
                dataType: 'json',
                data: $.param({
                    accesstoken: accessToken,
                    content: replyContent
                }),
                success: function(respData) {
                    if (respData && respData.success === true) {
                        // 刷新页面
                        initPage(topicId, accessToken);
                        // 自己为空
                        editor.codemirror.setValue('');
                    }
                }
            });
        });
    };

    return {
        initPage: function() {
            var topicId = UTILS.getQueryString('topicId');
            var anchor = UTILS.getQueryString('anchor');
            var accessToken = STORAGE.getJSON('USERINFO').accessToken;
            initPage(topicId, accessToken, anchor);
            initEditor();
            initReplyBtn();
        }
    }
})();