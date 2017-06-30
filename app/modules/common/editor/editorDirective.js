window.APP.directive("mEditor", [
    "$log",
    ($log) => {

    return {
        restrict: 'EA',
        require: '?ngModel',
        link: ($scope, $element, $attrs, ngModel) => {
            $element.append(`<textarea></textarea>`);
            let mditor = Mditor.fromTextarea($element.find("textarea")[0]);
            mditor.on("ready", () => {
                mditor.toolbar.removeItem("help");
                mditor.toolbar.removeItem("toggleSplit");

                if (!ngModel) {
                    return ;
                }

                ngModel.$render = () => {
                    mditor.value = ngModel.$viewValue || "";
                };
                ngModel.$render();           

                // 直接监控元素，更加流畅                
                let $textarea = $element.find(".textarea");
                $textarea.on("blur keydown keyup change", () => {
                    $scope.$apply(() => {
                        ngModel.$setViewValue($textarea.val());
                    });
                });
            });
        }
    };        
}]);