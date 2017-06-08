window.APP.controller("AuthCtrl", ["$rootScope", "$scope", "$state", "AuthService", ($rootScope, $scope, $state, AuthService) => {
    $scope.auth = () => {
        AuthService.auth($scope.accessToken).then(data => {
            data.accessToken = $scope.accessToken;
            localStorage.setItem("user", JSON.stringify(data));
            $rootScope.user = data;
            ipc.send("login-success");
            $state.go("main.topicList");
        }).catch(error => {

        });
    };
}]);