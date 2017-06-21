window.APP.controller("userInfoCtrl", [
    "$scope",
    "$stateParams",
    "UserInfoService",
    ($scope, $stateParams, UserInfoService) => {

    let loginname = $stateParams.loginname,
        isSelf = $stateParams.isSelf;
    
    if (isSelf) {
        let user = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (user) {
            try {
                user = JSON.parse(user);
                $scope.userInfo = user;
            } catch (error) {
                console.log("Invalid format for user info!");
            }
        }
    }
}]);