window.APP.directive("mHoverPopup", [
    () => {
    /* 返回元素是否位于Body左侧 */
    function isAtLeft ($ele) {
        let bodyWidth = $("body").width();
        let offset = $ele.offset();
        return (offset.left <= bodyWidth / 2);
    };
    /* 对于位于Body左侧的指令 添加left类, 右侧的指令 添加right类 */
    return {
        restrict: 'A',
        link: ($scope, $element, $attrs) => {
            if (isAtLeft($element)) {
                $element.addClass("left");
            } else {
                $element.addClass("right");
            }
        }
    };
}]);