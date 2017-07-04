/* this directive is just for a css trangle for a textarea */
window.APP.directive("mReplyTrangle", [
    () => {

    return {
        restrict: 'A',
        link: ($scope, $element, $attrs) => {
            let $parent = $element.parent();
            $element.hover(() => {
                if (!$element.is(':focus')) $parent.addClass('focused');
            }, () => {
                if (!$element.is(':focus')) $parent.removeClass('focused');
            }).focus(() => {
                $parent.addClass('focused');
            }).blur(() => {
                $parent.removeClass('focused');
            });
        }
    };
}]);