window.APP.controller("topicEditCtrl", [
    "$scope",
    "$state",
    "$stateParams",
    "TopicInfoService",
    "TopicEditService",
    "MessageService",
    ($scope, $state, $stateParams, TopicInfoService, TopicEditService, MessageService) => {
    
    let topicId = $stateParams.topicId;

    $scope.params = {
        topic_id: topicId,
        content: '',
        tab: 'ask',
        title: ''
    };
    $scope.enable = true;

    $scope.init = () => {
        if (!topicId) {
            return;
        }
        TopicInfoService.getInfo({
            id: topicId,
            mdrender: false
        }).then(resp => {
            $scope.params.content = resp.data.content;
            $scope.params.title = resp.data.title;
            $scope.params.tab = resp.data.tab;
        }).catch(error => {
            MessageService.error("主题详情加载失败，请稍后重试");
            $scope.enable = false;
        });
    };
    $scope.init();

    $scope.disableSubmit = () => {
        let params = $scope.params;
        return !($scope.enable && !!params.content && !!params.title && !!params.tab);
    };

    $scope.submit = () => {
        $scope.busy = true;
        TopicEditService.save($scope.params).then(resp => {
            MessageService.success("话题发布成功");
            $state.go("main.topicList");
        }).catch(error => {
            MessageService.error("话题发布失败");
        }).finally(() => {
            $scope.busy = false;
        });
    };
}]);