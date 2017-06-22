window.APP.controller("AuthCtrl", [
    "$rootScope", 
    "$scope", 
    "$state", 
    "$timeout",
    "MessageService",
    "AuthService", 
    ($rootScope, $scope, $state, $timeout, MessageService, AuthService) => {

    $scope.auth = () => {
        $scope.busy = true;
        AuthService.auth($scope.accessToken).then(data => {
            data.accessToken = $scope.accessToken;
            localStorage.setItem("user", JSON.stringify(data));
            $rootScope.user = data;
            ipc.send("login-success");
            $state.go("main.topicList");
        }).catch(error => {
            MessageService.error("登录出错，请输入正确的AccessToken");
        }).finally(() => {
            $timeout(() => {
                $scope.busy = false;
            }, 500);
        });
    };
}]);