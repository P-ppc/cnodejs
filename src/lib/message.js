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
                }
            }
        });
    };

    return  {
        initPage: function() {
            initPage();
        }
    }
})();