/*
 * 用户信息卡片实现:
 * 外部传入用户名
 * 外部容器hover时进行显示
 * 加载过程中显示loading
 * 支持跳转到用户界面
 * 根据用户传入的用户名获取用户详细信息
 */

window.APP.directive('mUserCard', [
    '$rootScope',
    'UserInfoService',
    ($rootScope, UserInfoService) => {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            mUserName: '='
        },
        transclude: {
            content: '?content'
        },
        templateUrl: 'modules/userCard/userCard.html',
        link: ($scope, $element, $attrs) => {
            $element.hover(() => {
                if ($scope.userInfo) return;
                let isSelf = $scope.mUserName === $rootScope.user.loginname;
                UserInfoService.getUserInfo($scope.mUserName, isSelf).then(userInfo => {
                    $scope.userInfo = userInfo;
                    $scope.userInfo.isSelf = isSelf;
                }).catch(error => {
                    console.log(error);
                });
            }, angular.noop);
        }
    }
}]);