window.APP.factory('TopicInfoService', [
    'RequestService',
    RequestService => {
    
    let service = {},
        infoUrl = 'https://cnodejs.org/api/v1/topic/';

    service.getInfo = params => {
        let url = infoUrl + params.id;
        return RequestService.get(url);
    };

    return service;
}]);