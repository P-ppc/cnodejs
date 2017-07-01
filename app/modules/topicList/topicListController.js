window.APP.controller("topicListCtrl", [
    "$scope",
    "TopicListService",
    ($scope, TopicListService) => {
    
    function TopicList () {
        this.tab = "";
        this.items = [];
        this.busy = false;
        this.page = 0;
    }

    TopicList.prototype.changeTab = function (tab) {
        if (this.tab == tab) return;
        this.tab = tab;
        this.page = 0;
        this.busy = false;
        this.items = [];
        if (tab != "collect") {
            this.nextPage();
        } else {
            this.getCollect();
        }
    };

    TopicList.prototype.nextPage = function () {
        let self = this;
        if (self.busy) return;
        if (self.tab == "collect") return;
        self.busy = true;

        TopicListService.goPage(self.page + 1, self.tab).then(function (data) {
            self.items = self.items.concat(data);
            self.page = self.page + 1;
            self.busy = false;
        }).catch(function (error) {
            // TODO 处理异常
            self.busy = false;
        });
    };

    TopicList.prototype.getCollect = function () {
        let self = this;
        if (self.busy) return;
        self.busy = true;

        TopicListService.getCollect().then(function (resp) {
            self.items = self.items.concat(resp.data);
            self.busy = false;
        }).catch(function (error) {
            // TODO 处理异常
            self.busy = false;
        });
    };

    $scope.topicList = new TopicList();
    $scope.topicList.changeTab("all");
}]);