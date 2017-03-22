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