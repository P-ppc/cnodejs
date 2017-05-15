window.APP.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/templates/topics.html",
        controller: "topicsCtrl"
    }).when("/topic", {
        templateUrl: "views/templates/topicInfo.html",
        controller: "topicInfoCtrl"
    }).when("/topicEdit", {
        templateUrl: "views/templates/topicEdit.html",
        controller: "topicEditCtrl"
    }).when("/user", {
        templateUrl: "views/templates/userInfo.html",
        controller: "userInfoCtrl"
    }).otherwise({
        redirectTo: "/"
    });
}]);