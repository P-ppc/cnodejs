var TOPICINFO = (function () {
    var initPage = function(topicId, accessToken) {
        var urlString = 'https://cnodejs.org/api/v1/topic/' + topicId;
        urlString = accessToken == '' ? urlString : urlString + '?accessoken=' + accessToken;
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
                    $("#replyContent").html(replyHtml);
                }
            }
        })
    };

    return {
        initPage: function() {
            var topicId = UTILS.getQueryString('topicId');
            initPage(topicId);
            var area = document.getElementById('replyArea');
            var editor = new Editor({
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
        }
    }
})();