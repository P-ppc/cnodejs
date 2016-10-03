var LOGIN = (function() {
    var initPage = function() {
        _initLoginBtn();
    };

    var _initLoginBtn = function() {
        // 跳过输入验证等
        $(document).on('click', '#loginSubmit', function() {
            var accessToken = $("#accessToken").val();
            var urlString = "https://cnodejs.org/api/v1/accesstoken";
            if (!accessToken) {
                TOAST.show({
                    container: "body",
                    icon: "icon-error",
                    message: "请输入Token!"
                });
                return false;
            }
            $.ajax({
                url: urlString,
                type: 'POST',
                dataType: 'json',
                data: $.param({
                    accesstoken: accessToken
                }),
                success: function(respData) {
                    console.log(respData);
                    if (respData.success === true) {
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
                },
                error: function() {
                    TOAST.show({
                        container: "body",
                        icon: "icon-error",
                        message: "登录失败!"
                    });
                    return false;
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
