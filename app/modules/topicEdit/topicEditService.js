window.APP.factory("TopicEditService", [
    "$rootScope",
    "RequestService",
    ($rootScope, RequestService) => {
    
    let service = {},
        createUrl = 'https://cnodejs.org/api/v1/topics',
        updateUrl = 'https://cnodejs.org/api/v1/topics/update';
    
    service.save = (params) => {
        params.accesstoken = $rootScope.user.accessToken;
        if (params.topic_id) {
            return RequestService.post(updateUrl, params);
        } else {
            return RequestService.post(createUrl, params);
        }
    };
    
    return service;
}]);