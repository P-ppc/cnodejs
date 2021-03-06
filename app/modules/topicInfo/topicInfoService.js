window.APP.factory('TopicInfoService', [
    "$rootScope",
    'RequestService',
    ($rootScope, RequestService) => {
    
    let service = {},
        infoUrl = 'https://cnodejs.org/api/v1/topic/',
        collectUrl = 'https://cnodejs.org/api/v1/topic_collect/collect',
        unCollectUrl = 'https://cnodejs.org/api/v1/topic_collect/de_collect',
        replyUpUrl = 'https://cnodejs.org/api/v1/reply/';

    service.getInfo = params => {
        let url = infoUrl + params.id;
        return RequestService.get(url, {
            accesstoken: $rootScope.user.accessToken,
            mdrender: params.mdrender || true
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

    service.reply = (topic_id, content, reply_id) => {
        let url = infoUrl + topic_id + '/replies';
        return RequestService.post(url, {
            accesstoken: $rootScope.user.accessToken,
            content: content,
            reply_id: reply_id
        });
    };

    service.toggleReplyUp = (reply_id) => {
        let url = replyUpUrl + reply_id + '/ups';
        return RequestService.post(url, {
            accesstoken: $rootScope.user.accessToken
        });
    };

    return service;
}]);