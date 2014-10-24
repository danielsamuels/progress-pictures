/*global progressPicturesApp*/
progressPicturesApp.factory('auth', ['$http', function ($http) {
    var prototype = {};

    prototype.login = function (data) {
        return $http.post('/api/auth/', data);
    };

    return prototype;
}]);
