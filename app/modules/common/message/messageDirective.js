window.APP.directive("mMessage", [
    "$timeout",
    "$animate",
    ($timeout, $animate) => {
    
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            mImgSrc: '@',
            mMessageContent: '@',
            mMessageClose: '@',
            mDuration: '@'
        },
        templateUrl: 'modules/common/message/message.html',
        link: ($scope, $element, $attrs, $transclude) => {
            let $body = $element.parent();
            $animate.enter($element, $body, $body.children(':last'));

            $scope.showClose = () => $scope.mMessageClose === "true";
            $scope.close = () => $animate.leave($element);

            let duration = parseInt($scope.mDuration);
            if (duration > 0) {
                $timeout(() => $scope.close(), duration);
            }
        }
    }
}]);