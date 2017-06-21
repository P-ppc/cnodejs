window.APP.controller("topicInfoCtrl", [
    "$scope",
    "$stateParams",
    "TopicInfoService",
    ($scope, $stateParams, TopicInfoService) => {
    
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
}]);