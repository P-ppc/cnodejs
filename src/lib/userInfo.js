var USERINFO = (function() {
    var loginName = STORAGE.getJSON('USERINFO').loginName;
    var initPage = function() {
        var urlString = "https://cnodejs.org/api/v1/user/" + loginName;
        $.ajax({
            url: urlString,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    console.log(respData);
                    // 用户信息
                    userInfoHtml = template('userInfoTemplate', respData.data);
                    $(".user-panel").html(userInfoHtml);
                    // 创建的主题
                    createTopicHtml = template('createTopicTemplate', respData.data);
                    if (createTopicHtml != '') {
                        $("#createTopic").html(createTopicHtml);
                    }
                    // 回复的主题
                    replyTopicHtml = template('replyTopicTemplate', respData.data);
                    if (replyTopicHtml != '') {
                        $("#replyTopic").html(replyTopicHtml);
                    }
                }
            }
        })
    };

    return {
        initPage: function() {
            initPage();
        }
    }
})();