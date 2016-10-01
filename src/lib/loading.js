var LOADING = (function() {
    var _startLoading = function() {
        $(".page-container .loading").show();
    };

    var _stopLoading = function() {
        $(".page-container .loading").fadeOut();
    };

    return {
        startLoading: function() {

        },
        stopLoading: function() {
            _stopLoading();
        }
    };
})();