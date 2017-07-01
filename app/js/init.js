moment.locale('zh-cn');
Mditor.$options.props.split = false;

window.ipc = require("electron").ipcRenderer;
window.shell = require("electron").shell;
window.APP = angular.module("APP", ["ui.router", "ngSanitize", "infinite-scroll", "ngAnimate"]);
window.APP.run(["$http", "$state", "$rootScope", ($http, $state, $rootScope) => {
    /* markdown内部的链接在浏览器中打开 */
    $(document).on("click", ".markdown-text a", function () {
        event.preventDefault();
        let href = $(this).attr('href') || "";
        if (href.startsWith("/user/")) {
            let loginname = href.replace(/\/user\/(.*)$/, "$1");
            console.log(loginname);
            $state.go("main.userInfo", {loginname: loginname});
        } else {
            window.shell.openExternal(href);
        }
    });

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
    }).state("main.topicInfo", {
        params: { topicId: null },
        templateUrl: 'modules/topicInfo/topicInfo.html'
    }).state("main.topicEdit", {
        params: { topicId: null },
        templateUrl: 'modules/topicEdit/topicEdit.html'
    }).state("main.userInfo", {
        params: { loginname: null },
        templateUrl: 'modules/userInfo/userInfo.html'
    })
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
        } else if (input == "dev") {
            return "测试";
        }
        return input;
    };
});

window.APP.filter("pretty", ["$log", function ($log) {
    return function (input) {
        if (typeof prettyPrintOne !== "function") {
            $log.warn("code-pretty is not install!");
            return input;
        }
        var container = document.createElement("div");
        container.innerHTML = input;
        /* 修复图片路径 */
        let $imgs = $(container).find("img");
        $imgs.each(function () {
            let src = $(this).attr("src") || "";
            if (src.startsWith("//")) {
                $(this).attr("src", "http:" + src);
            }
        });
        prettyPrint(null, container);
        return container.innerHTML;
    };
}]);

window.APP.filter('imgFix', () => {
    return input => {
        input = input || "";
        if (input.startsWith("//")) {
            return "http:" + input;
        }
        return input;
    }; 
});