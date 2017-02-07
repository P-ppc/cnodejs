window.APP = angular.module("APP", []);

window.APP.controller("sidebarCtrl", function ($scope) {
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
    $scope.selectedItem = "HOME";
    $scope.select = function (value) {
        $scope.selectedItem = value;
    };
    // 切换展开或者收缩
    $scope.isExpanded = false;
    $scope.toggleExpand = function () {
        $scope.isExpanded = !$scope.isExpanded;
    };
});