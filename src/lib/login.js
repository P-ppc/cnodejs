var LOGIN = (function() {
    var initPage = function() {
        // 如果保存有用户信息, 则跳过登录
        if (STORAGE.getJSON('USERINFO')) {
            window.location = 'index.html';
        }
        _initLoginBtn();
    };

    var _initLoginBtn = function() {
        // 跳过输入验证等
        $("#loginSubmit").click(function () {
            var accessToken = $("#accessToken").val();
            var urlString = "https://cnodejs.org/api/v1/accesstoken";
            $.ajax({
                url: urlString,
                type: 'POST',
                dataType: 'json',
                data: $.param({
                    accesstoken: accessToken
                }),
                success: function(respData) {
                    console.log(respData);
                    if (respData && respData.success === true) {
                        // 保存
                        var userInfo = {
                            id: respData.id,
                            avatarUrl: respData.avatar_url,
                            loginName: respData.loginname,
                            accessToken: accessToken 
                        };
                        STORAGE.setJSON('USERINFO', userInfo);
                        window.location = 'index.html';
                    }
                }
            })
        return false;
        });
    }

    return {
        initPage: function() {
            initPage();
        }
    }
})();
