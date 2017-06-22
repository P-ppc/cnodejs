window.APP.directive("mButtonLoading", [
    () => {
    
    return {
        restrict: 'A',
        scope: {
            mLoading: '=',
            mNormalText: '@',
            mLoadingText: '@',
            mLoadingClass: '@'
        },
        link: ($scope, $element, $attrs) => {
            $scope.$watch("mLoading", (newValue, oldValue) => {
                if (newValue) {
                    $element.text($scope.mLoadingText);
                    $element.addClass($scope.mLoadingClass);
                } else {
                    $element.text($scope.mNormalText);
                    $element.removeClass($scope.mLoadingClass);
                }
            })
        }
    }
}]);