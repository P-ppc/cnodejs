window.APP.factory("RequestService", ["$q", "$http", ($q, $http) => {
    var service = {};

    service.post = (url, data, timeout) => {
        var defer = $q.defer();
        $http.post(url, $.param(data), {
            timeout: timeout || 5000
        }).success(data => {
            if (data.success) {
                defer.resolve(data);
            } else {
                defer.reject(data);
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
        }).success(data => {
            if (data.success) {
                defer.resolve(data);
            } else {
                defer.reject(data);
            }
        }).error((msg, code) => {
            defer.reject(code);
        });
        return defer.promise;
    };

    return service;
}]);