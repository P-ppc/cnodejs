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
        scope: {
            mHoverPopup: '@'
        },
        link: ($scope, $element, $attrs) => {
            $element.prepend(`<span class="before"></span>`)
                    .append(`<span class="after">${$scope.mHoverPopup}</span>`);
            if (isAtLeft($element)) {
                $element.addClass("left");
            } else {
                $element.addClass("right");
            }
            let paddingBottom = $element.css("padding-bottom");
            $element.find(".after, .before").css("margin-top", "-" + paddingBottom); 

            $scope.$watch("mHoverPopup", (newValue, oldValue) => {
                $element.find(".after").text(newValue);
            });        
        }
    };
}]);