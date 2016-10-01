var COLLECTION = (function() {
    var loginName = STORAGE.getJSON('USERINFO').loginName;
    var urlString = "https://cnodejs.org/api/v1/topic_collect/" + loginName;
    var initPage = function() {
        $.ajax({
            url: urlString,
            type: 'GET',
            dataType: 'json',
            success: function(respData) {
                if (respData && respData.success === true) {
                    listHtml = template('listCell', respData);
                    $('.collection-list').html(listHtml);
                    LOADING.stopLoading();
                }
            }
        });
    };

    return {
        initPage: function() {
            initPage();
        }
    };
})();