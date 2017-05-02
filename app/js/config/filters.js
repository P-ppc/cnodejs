window.APP.filter("fromNow", function () {
    return function (input) {
        input = input || "";
        return moment(input).fromNow();
    };
});

window.APP.filter("topicTabFormatter", function () {
    return function (input) {
        input = input || "";
        if (input == "share") {
            return "分享";
        } else if (input == "ask") {
            return "问答";
        } else if (input == "job") {
            return "招聘";
        }
    };
});

window.APP.filter("pretty", ["$log", function ($log) {
    return function (input) {
        if (typeof prettyPrintOne !== "function" || typeof $ !== "function") {
            return input;
            $log.warning("code-pretty or jQuery is not install!");
        }
        var $input = $(input);
        var $pres = $input.find("pre.prettyprint");
        $pres.each(function () {
            $(this).replaceWith(prettyPrintOne(this.outerHTML));
        });
        return $input.prop("outerHTML");
    };
}]);