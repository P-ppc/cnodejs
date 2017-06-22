window.APP.factory('TopicInfoService', [
    "$rootScope",
    'RequestService',
    ($rootScope, RequestService) => {
    
    let service = {},
        infoUrl = 'https://cnodejs.org/api/v1/topic/',
        collectUrl = 'https://cnodejs.org/api/v1/topic_collect/collect',
        unCollectUrl = 'https://cnodejs.org/api/v1/topic_collect/de_collect';

    service.getInfo = params => {
        let url = infoUrl + params.id;
        return RequestService.get(url, {
            accesstoken: $rootScope.user.accessToken
        });
    };

    service.collect = topic_id => {
        return RequestService.post(collectUrl, {
            accesstoken: $rootScope.user.accessToken,
            topic_id: topic_id
        });
    };

    service.unCollect = topic_id => {
        return RequestService.post(unCollectUrl, {
            accesstoken: $rootScope.user.accessToken,
            topic_id: topic_id
        });
    };

    return service;
}]);