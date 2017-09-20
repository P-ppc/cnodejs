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

    $scope.toggleReplyUp = (reply) => {
        let message;
        TopicInfoService.toggleReplyUp(reply.id).then(resp => {
            if (reply.is_uped) {
                message = "取消点赞成功";
                _.remove(reply.ups, (n) => n == $scope.user.id);
            } else {
                message = "点赞成功";
                reply.ups.push($scope.user.id);
            }
            reply.is_uped = !reply.is_uped;
            MessageService.success(message);
        }).catch(error => {
            if (reply.is_uped) {
                message = "取消点赞失败";
            } else {
                message = "点赞失败";
            }
            MessageService.error(message);
        }); 
    };

    $scope.replyTarget = {};
    /* 切换回复评论表单显示 */
    $scope.toggleReplyForm = (reply) => {
        if ($scope.replyTarget.reply_id == reply.id) {
            $scope.replyTarget = {};
        } else {
            $scope.replyTarget.topic_id = topicId;
            $scope.replyTarget.reply_id = reply.id;
            $scope.replyTarget.authorname = reply.author.loginname;
            $scope.replyTarget.content = '@' + reply.author.loginname + ' ';
        }
    };

    /* 回复评论  */
    $scope.targetReply = () => {
        $scope.replyBusy = true;
        TopicInfoService.reply($scope.replyTarget.topic_id, $scope.replyTarget.content, $scope.replyTarget.reply_id)
        .then(resp => {
            $scope.replyTarget = {};
            // FIXME: 这里重新获取主题详情，采用更好的方法
            getTopicInfo();
            MessageService.success("回复成功");
        }).catch(error => {
            MessageService.error("回复失败，请稍后重试");
        }).finally(() => {
            $scope.replyBusy = false;
        });
    };

    /* 使用markdown编辑器 */
    $scope.useMarkdown = () => {
        $scope.replyParams.content = '@' + $scope.replyTarget.authorname + ' ';
        $scope.replyParams.reply_id = $scope.replyTarget.reply_id;
        $scope.replyTarget = {};
        $scope.isUseMarkdown = true;
    };

    $scope.$watch("replyParams.content", (newValue, oldValue) => {
        if (newValue === '') {
             $scope.replyParams.reply_id = undefined;
        }
    });
}]);