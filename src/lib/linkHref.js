// 负责连接的跳转
$(function() {
    $(document).on('click', '.topic-link', function() {
        var topicId = $(this).attr("data-id");
        var anchor = $(this).attr("data-anchor");
        window.location = 'topicInfo.html?topicId=' + topicId + "&anchor=" + anchor;
    });
});