window.APP.controller("userInfoCtrl", [
    "$scope",
    "$stateParams",
    "$rootScope",
    "UserInfoService",
    ($scope, $stateParams, $rootScope, UserInfoService) => {

    let loginname = $stateParams.loginname,
        isSelf = $stateParams.loginname === $rootScope.user.loginname;

    function getUserInfo () {
        UserInfoService.getUserInfo(loginname, isSelf).then(userInfo => {
            $scope.userInfo = userInfo;
            $scope.userInfo.isSelf = isSelf;
        }).catch(error => {
            console.log(error);
        });
    }

    $scope.selectedTab = "CREATE";
    $scope.selectTab = tab => {
         $scope.selectedTab = tab;
    };

    getUserInfo();
}]);