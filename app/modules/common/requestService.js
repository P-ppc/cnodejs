window.APP.factory("RequestService", ["$q", "$http", ($q, $http) => {
    var service = {};

    service.post = (url, data, timeout) => {
        var defer = $q.defer();
        $http.post(url, $.param(data), {
            timeout: timeout || 5000
        }).success(resp => {
            if (resp.success) {
                defer.resolve(resp);
            } else {
                defer.reject(resp);
            }
        }).error((msg, code) => {
            defer.reject(code);
        });
        return defer.promise;
    };

    service.get = (url, data, timeout) => {
        var defer = $q.defer();
        if (data && !angular.equals({}, data)) {
            url = url + "?" + $.param(data);
        }
        $http.get(url, {
            timeout: timeout || 5000
        }).success(resp => {
            if (resp.success) {
                defer.resolve(resp);
            } else {
                defer.reject(resp);
            }
        }).error((msg, code) => {
            defer.reject(code);
        });
        return defer.promise;
    };

    return service;
}]);