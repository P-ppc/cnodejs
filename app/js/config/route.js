window.APP.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "views/templates/topics.html",
        controller: "topicsCtrl"
    }).otherwise({
        redirectTo: "/"
    });
}]);