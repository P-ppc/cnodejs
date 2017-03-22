window.APP.controller('topicsCtrl', ['$scope', '$http', 'TopicListService', function($scope, $http, TopicListService){
    $scope.topicList = [];
    $scope.selectedTab = "";
    
    $scope.selectTab = function (tab) {
        $scope.selectedTab = tab;

        TopicListService.goPage(1, $scope.selectedTab).then(function (data) {
            $scope.topicList = data;
        }).catch(function (error) {
            // TODO 异常处理
        });
    };
    $scope.selectTab("all");
}]);