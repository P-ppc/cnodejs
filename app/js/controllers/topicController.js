window.APP.controller('topicsCtrl', ['$scope', 'TopicListService', function($scope, TopicListService){
    TopicListService.goPage(1).then(function (resp) {
    });
}]);