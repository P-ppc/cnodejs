moment.locale('zh-cn');
window.ipc = require("electron").ipcRenderer;
window.APP = angular.module("APP", ["ui.router", "ngSanitize", "infinite-scroll"]);
window.APP.run(["$http", "$state", "$rootScope", ($http, $state, $rootScope) => {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"

    // 条件判断
    // 从localStorage或者sessionStorage中读取用户信息，如果不存在，则进入登录界面
    // 否则在$rootScope上挂载用户信息，进入主页面

    function getUser () {
        var user;
        user = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (user) {
            try {
                user = JSON.parse(user);
            } catch (error) {
                console.log("Invalid format for user info!");
            }
        }
        return user;
    }

    var user = getUser();

    if (user) {
        $rootScope.user = user;
        ipc.send("login-success");
        $state.go("main.topicList");
    } else {
        $state.go("auth");
    }
}]);

window.APP.config(["$stateProvider", "$urlRouterProvider", ($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state("auth", {
        templateUrl: "modules/auth/auth.html"
    }).state("main", {
        templateUrl: "modules/main/main.html"
    }).state("main.topicList", {
        templateUrl: "modules/topicList/topicList.html"
    });
}]);


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