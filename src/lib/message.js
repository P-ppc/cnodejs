var MESSAGE = (function() {
    var accessToken = STORAGE.getJSON('USERINFO').accessToken;
    var urlString = "https://cnodejs.org/api/v1/messages?accesstoken=" + accessToken;

    var initPage = function() {
        $.ajax({
            url: urlString,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    unReadMessageHtml = template('unReadMessageTemplate', respData.data);
                    if (unReadMessageHtml != "") {
                        $("#unReadMessage").html(unReadMessageHtml);
                    }
                    readMessageHtml = template('readMessageTemplate', respData.data);
                    if (readMessageHtml != "") {
                        $("#readMessage").html(readMessageHtml);
                    }
                    LOADING.stopLoading();
                    // 设置所有信息已读
                    _markAllMessage();
                }
            }
        });
    };

    var _markAllMessage = function() {
        var _urlString = "https://cnodejs.org/api/v1/message/mark_all";
        $.ajax({
            url: _urlString,
            type: 'POST',
            dataType: 'json',
            data: $.param({
                accesstoken: accessToken
            }),
            success: function(respData) {
                if (respData && respData.success === true) {
                    console.log(respData);
                }
            }
        })
    }

    return  {
        initPage: function() {
            initPage();
        }
    }
})();