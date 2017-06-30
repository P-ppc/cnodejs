window.APP.directive("mEditor", [
    "$log",
    ($log) => {

    return {
        restrict: 'EA',
        require: '?ngModel',
        link: ($scope, $element, $attrs, ngModel) => {
            if (!Mditor) {
                $log.error("Mditor is not install!");
                return ;
            }
            $element.append(`<textarea></textarea>`);
            let mditor = Mditor.fromTextarea($element.find("textarea")[0]);
            mditor.on("ready", () => {
                mditor.split = false;

                if (!ngModel) {
                    return ;
                }

                ngModel.$render = () => {
                    mditor.value = ngModel.$viewValue || "";
                };
                ngModel.$render();           

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