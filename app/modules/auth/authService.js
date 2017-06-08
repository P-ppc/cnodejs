window.APP.factory("AuthService", ["$rootScope", "RequestService", ($rootScope, Request) => {
    var service = {};
    
    service.auth = accessToken => {
        return Request.post(
            "https://cnodejs.org/api/v1/accesstoken",
            { accesstoken: accessToken }
        ).then(data => {
            $rootScope.user = {
                loginname: data.loginname,
                id: data.id,
                avatar_url: data.avatar_url
            };
            return data;
        });
    };

    return service;
}]);