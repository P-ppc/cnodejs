window.APP.factory("TopicListService", [
    "$rootScope",
    "RequestService",
    ($rootScope, RequestService) => {
    var service = {};

    service.currentPage = 0;

    service.goPage = (pageNum, tab) => {
        pageNum = pageNum || 0;
        tab = tab || "all";

        return RequestService.get("https://cnodejs.org/api/v1/topics", {
            limit: 40,
            page: pageNum,
            tab: tab
        }).then((data) => {
            service.currentPage = pageNum;
            return data.data;
        });
    };

    service.nextPage = tab => {
        return service.goPage(service.currentPage + 1, tab);
    };

    service.getCollect = () => {
        return RequestService.get("https://cnodejs.org/api/v1/topic_collect/" + $rootScope.user.loginname);
    };

    return service;
}]);