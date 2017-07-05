window.APP.directive('mAutofocus', [
    () => {
    
    return {
        restrict: 'A',
        scope: {
            mAutofocus: '=',
            mFocusTarget: '@'
        },
        link: ($scope, $element, $attrs) => {
            var $target = $element;
            if ($scope.mFocusTarget) {
                $target = $element.find($scope.mFocusTarget);
            }
            $scope.$watch('mAutofocus', (newValue, oldValue) => {
                if (newValue === true) $target.focus();
            });
        }
    };
}]);