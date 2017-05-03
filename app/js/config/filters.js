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
        if (typeof prettyPrintOne !== "function") {
            $log.warning("code-pretty is not install!");
            return input;
        }
        var container = document.createElement("div");
        container.innerHTML = input;
        prettyPrint(null, container);
        return container.innerHTML;
    };
}]);