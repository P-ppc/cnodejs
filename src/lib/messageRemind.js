// 信息提示
var messageRemind = function() {
    var accessToken = STORAGE.getJSON('USERINFO').accessToken;
    var urlString = "https://cnodejs.org/api/v1/message/count?accesstoken=" + accessToken;
    $.ajax({
        url: urlString,
        type: 'GET',
        dataType: 'json',
        success: function(respData) {
            if (respData && respData.success === true) {
                console.log('you have ' + respData.data + ' messages');
                if (respData.data != '0') {
                    $(".js-unReadMessage").html(respData.data).show();
                } else {
                    $(".js-unReadMessage").hide();
                }
            }
        }
    })
};

$(function () {
    messageRemind();
});