window.APP.controller("topicInfoCtrl", [
    "$scope",
    "$stateParams",
    "MessageService",
    "TopicInfoService",
    ($scope, $stateParams, MessageService, TopicInfoService) => {
    
    let topicId = $stateParams.topicId;

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

   

    $scope.replyParams = {
        topic_id: topicId,
        content: '',
        reply_id: undefined
    };

    $scope.reply = () => {
        $scope.replyBusy = true;
        TopicInfoService.reply($scope.replyParams.topic_id, $scope.replyParams.content, $scope.replyParams.reply_id)
        .then(resp => {
            $scope.replyParams.content = "";
            $scope.replyParams.reply_id = undefined;
            // FIXME: 这里重新获取主题详情，采用更好的方法
            getTopicInfo();
            MessageService.success("回复成功");
        }).catch(error => {
            MessageService.error("回复失败，请稍后重试");
        }).finally(() => {
            $scope.replyBusy = false;
        });
    };
}]);