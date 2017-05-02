window.APP.controller('topicsCtrl', ['$scope', '$http', 'TopicListService', function($scope, $http, TopicListService){
    // 主题列表构造函数
    function TopicList () {
        this.tab = "";
        this.items = [];
        this.busy = false;
        this.page = 0;
    };

    TopicList.prototype.changeTab = function (tab) {
        if (this.tab == tab) return;
        this.tab = tab;
        this.page = 0;
        this.busy = false;
        this.items = [];
        this.nextPage();
    };

    TopicList.prototype.nextPage = function () {
        var self = this;
        if (self.busy) return;
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

    $scope.topicList = new TopicList();
    $scope.topicList.changeTab("all");
}]);

window.APP.controller("topicInfoCtrl", ["$scope", "TopicInfoService", function ($scope, TopicInfoService) {
    var mditor =  Mditor.fromTextarea(document.getElementById('editor'));
    mditor.split = false;	//关闭
    //是否打开预览			
    mditor.preivew = false;	//关闭
    //是否全屏			
    mditor.fullscreen = false;	//关闭	
    //获取或设置编辑器的值
    mditor.on('ready',function(){
    });

    // var topicId = "5905fbe8782dbc4b183ecf42";
    // 这个topicId 将会导致格式错乱
    // var topicId = "58d0fb3517f61387400b7e15";
    var topicId = "585ddd6a8193ec6c5df1dee3";
    var accesstoken = "2fd28325-f4ee-4b4e-ae40-fd5be3e269bf";
    
    function getTopicInfo () {
        var params = {
            id: topicId,
            accesstoken: accesstoken
        };

        TopicInfoService.getInfo(params).then(function (data) {
            $scope.topicInfo = data;
        }).catch(function (error) {

        });
    }

    getTopicInfo();
}]);