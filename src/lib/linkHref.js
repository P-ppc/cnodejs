// 负责连接的跳转
$(function() {
    $(document).on('click', '.topic-link', function() {
        var topicId = $(this).attr("data-id");
        // 锚点
        var anchor = $(this).attr("data-anchor");
        window.location = 'topicInfo.html?topicId=' + topicId + "&anchor=" + anchor;
    });

    // 点击用户头像和用户名跳转到用户信息页面
    $(document).on('click', '.js-userInfoLink', function() {
        var loginName = $(this).attr("data-loginName");
        window.location = 'userInfo.html?loginName=' + loginName;
    });
});