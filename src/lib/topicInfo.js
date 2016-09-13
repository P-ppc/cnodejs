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
                    $("#topicContent").html(topicHtml);
                }
            }
        })
    };

    return {
        initPage: function(topicId, accessToken) {
            initPage(topicId, accessToken);
        }
    }
})();