// 负责连接的跳转
$(function() {
    window.nodeRequire = require;
    const electron = nodeRequire('electron');
    const shell = electron.shell;

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

    // 主题内容和用户回复内容中的超链接使用浏览器打开
    $(document).on('click', '.markdown-text a', function() {
        var href = $(this).attr('href');
        shell.openExternal(href);
        event.preventDefault();
    });

    // 指定的链接使用浏览器打开
    $(document).on('click', '.js-externalLink', function() {
        var href = $(this).attr('href');
        shell.openExternal(href);
        event.preventDefault();
    });

    // @用户名连接点击跳转到用户信息
    $(document).on('click', '.markdown-text a[href^=\\/user\\/]', function() {
        var loginName = $(this).attr("href").replace("/user/", '');
        event.preventDefault();
        window.location = 'userInfo.html?loginName=' + loginName;
    });
});