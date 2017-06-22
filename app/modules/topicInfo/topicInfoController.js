window.APP.controller("topicInfoCtrl", [
    "$scope",
    "$stateParams",
    "MessageService",
    "TopicInfoService",
    ($scope, $stateParams, MessageService, TopicInfoService) => {
    
    let topicId = $stateParams.topicId,
        mditor = Mditor.fromTextarea(document.getElementById('editor'));
    mditor.split = false;

    function getTopicInfo () {
        TopicInfoService.getInfo({ id: topicId }).then(resp => {
            $scope.topicInfo = resp.data;
        }).catch(error => {
            console.log(error);
        });
    } 

    getTopicInfo();

    $scope.toggleCollect = () => {
        $scope.busy = true;
        let promise;
        if ($scope.topicInfo.is_collect) {
            promise = TopicInfoService.unCollect($scope.topicInfo.id);
        } else {
            promise = TopicInfoService.collect($scope.topicInfo.id);
        }

        promise.then(resp => {
            let msg = $scope.topicInfo.is_collect ? "取消收藏成功" : "收藏成功";
            MessageService.success(msg);
            $scope.topicInfo.is_collect = !$scope.topicInfo.is_collect;
        }).catch(error => {
            let msg = ($scope.topicInfo.is_collect ? "取消收藏失败，" : "收藏失败，") + "请稍后重试";
            MessageService.error(msg);
        }).finally(() => {
            $scope.busy = false;
        });
    };
}]);