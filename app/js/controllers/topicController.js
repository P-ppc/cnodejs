window.APP.controller('topicsCtrl', ['$scope', '$http', 'TopicListService', function($scope, $http, TopicListService){
    $scope.topicList = [];
    TopicListService.goPage(1).then(function (data) {
        $scope.topicList = data;
    });
}]);