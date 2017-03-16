window.APP = angular.module("APP", []);

window.APP.controller("sidebarCtrl", function ($rootScope, $scope) {
    $scope.menuItems = [
        {
            title: "首页",
            code: "HOME",
            class: "home"
        },
        {
            title: "新话题",
            code: "NEW_TOPIC",
            class: "plus"
        },
        {
            title: "消息",
            code: "MESSAGE",
            class: "envelope-o"
        },
        {
            title: "收藏夹",
            code: "COLLECTION",
            class: "heart"
        },
        {
            title: "设置",
            code: "SETTING",
            class: "gear"
        },
        {
            title: "注销",
            code: "LOGOUT",
            class: "sign-out"
        }
    ];
    $scope.selectedItem = $scope.menuItems[0];
    $scope.select = function (item) {
        $scope.selectedItem = item;
        $rootScope.$broadcast("menuSelect", item);
    };
    // 切换展开或者收缩
    $scope.isExpanded = false;
    $scope.toggleExpand = function () {
        $scope.isExpanded = !$scope.isExpanded;
    };
    $scope.$on("tabSelect", function (event, tab) {
        if (tab == null) {
            $scope.selectedItem = null;
            return;
        }
        var code = tab.menu;
        for (var i = 0, len = $scope.menuItems.length; i < len; i++) {
            if (code == $scope.menuItems[i].code) {
                $scope.selectedItem = $scope.menuItems[i];
                break;
            }
        }
    });
});

window.APP.controller("mainCtrl", function ($rootScope, $scope) {
    $scope.tabItems = [
        {
            title: "首页",
            menu: "HOME",
            src: "views/templates/index.html"
        }
    ];
    $scope.selectedItem = $scope.tabItems[0];
    $scope.select = function (item) {
        $scope.selectedItem = item;
        $rootScope.$broadcast("tabSelect", item);
    };
    $scope.addTab = function () {
        var newItem = {
            title: "首页",
            menu: "HOME",
            src: "views/templates/index.html"
        };
        $scope.tabItems.push(newItem);
        // 选中tab
        $scope.select(newItem);
    };
    $scope.closeTab = function (item) {
        var len = $scope.tabItems.length;
        var index = $scope.tabItems.indexOf(item);
        // 选中其他项
        if ($scope.selectedItem == item) {
            if (len == 1) {
                $scope.select(null);
            } else if (index == len - 1) {
                $scope.select($scope.tabItems[index - 1]);
            } else {
                $scope.select($scope.tabItems[index + 1]);
            }
        }
        $scope.tabItems.splice(index, 1);
    };
    $scope.$on("menuSelect", function (event, menu) {
        $scope.selectedItem.title = menu.title;
        $scope.selectedItem.menu = menu.code;
    });
});

window.APP.controller("indexCtrl", function ($scope) {
    $scope.topicItems = [
        {
            title: "THIS IS THE OF THE TOPIC!",
            answerCount: 0,
            viewCount: 123,
            tags: ["分享", "置顶", "精华"],
            createAt: "Posted 3h ago"
        },
        {
            title: "THIS IS THE OF THE TOPIC!",
            answerCount: 2,
            viewCount: 123,
            tags: ["分享", "置顶", "精华"],
            createAt: "Posted 3h ago"
        },
        {
            title: "THIS IS THE OF THE TOPIC!",
            answerCount: 0,
            viewCount: 123,
            tags: ["分享", "置顶", "精华"],
            createAt: "Posted 3h ago"
        }
    ];
});