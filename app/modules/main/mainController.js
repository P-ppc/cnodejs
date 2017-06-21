window.APP.controller("mainCtrl", [
    "$rootScope",
    "$state",
    ($rootScope, $state) => {
    
    $rootScope.logout = () => {
        $rootScope.user = undefined;
        localStorage.removeItem("user");
        ipc.send("logout");
        $state.go("auth");
    };
}]);