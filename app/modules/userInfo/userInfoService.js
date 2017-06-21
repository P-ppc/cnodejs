window.APP.factory("UserInfoService", [
    "$q",
    "$rootScope",
    "RequestService",
    ($q, $rootScope, RequestService) => {
    
    let service = {},
        infoUrl = "https://cnodejs.org/api/v1/user/",
        messageUrl = "https://cnodejs.org/api/v1/messages";

    service.getUserInfo = (loginname, isSelf) => {
        let defer = $q.defer(),
            promises = [ RequestService.get(infoUrl + loginname) ];
        
        if (isSelf) {
            promises.push(RequestService.get(messageUrl, {
                accesstoken: $rootScope.user.accessToken,
                mdrender: false
            }));
        }
        $q.all(promises).then(([infoResp, messageResp]) => {
            let userInfo = infoResp.data;
            if (isSelf) {
                userInfo.unReadMessages = messageResp.data.hasnot_read_messages;
                userInfo.hasReadMessages =  messageResp.data.has_read_messages;
            }
            defer.resolve(userInfo);
        });
        return defer.promise;
    };

    return service;
}]);