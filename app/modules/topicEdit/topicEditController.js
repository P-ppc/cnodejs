window.APP.controller("topicEditCtrl", [
    "$scope",
    "$stateParams",
    "TopicEditService",
    ($scope, $stateParams, TopicEditService) => {
    
    let mditor = Mditor.fromTextarea(document.getElementById('editor'));
    mditor.split = false;
    
}]);