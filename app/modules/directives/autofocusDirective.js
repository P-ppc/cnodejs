window.APP.directive('mAutofocus', [
    () => {
    
    return {
        restrict: 'A',
        scope: {
            mAutofocus: '='
        },
        link: ($scope, $element, $attrs) => {
            $scope.$watch('mAutofocus', (newValue, oldValue) => {
                if (newValue === true) $element.focus();
            });
        }
    };
}]);