window.APP.directive("mAutoPrettify", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.one("DOMNodeInserted", function () {
                prettyPrint();
            });
        }
    };
});