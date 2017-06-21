window.APP.factory("AuthService", ["RequestService", (RequestService) => {
    var service = {};
    
    service.auth = accessToken => {
        return RequestService.post(
            "https://cnodejs.org/api/v1/accesstoken",
            { accesstoken: accessToken }
        ).then(data => {
            return data;
        });
    };

    return service;
}]);