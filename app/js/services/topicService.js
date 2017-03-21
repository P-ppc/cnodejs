window.APP.factory('TopicListService', ['$http', 'TopicConfig', function($http, TopicConfig){
    var currentPage = 1;

    // 前往指定页
    var goPage = function (pageNum, tab) {
        pageNum = pageNum || 1;
        tab = tab || "all";
        var promise = new Promise(function (resolve, reject) {
            $http.get(TopicConfig.listUrl.setParameters({
                limit: TopicConfig.limit,
                page: pageNum,
                tab: tab
            })).success(function (resp) {
                if (resp.success) {
                    currentPage = pageNum;
                    resolve(resp.data);
                } else {
                    reject(new Error(resp.error_msg));
                }
            }).error(function (msg, code) {
                // FIXME 解析code 404: not found, 500: 服务器异常
                reject(code);
            });
        });
        return promise;
    };

    // 下一页
    var nextPage = function (tab) {
        return goPage(currentPage + 1, tab);
    };

    return {
        goPage: goPage,
        nextPage: nextPage,
        getPageNum: function () {
            return currentPage;
        }
    };
}])