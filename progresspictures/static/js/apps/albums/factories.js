/*global progressPicturesApp*/
progressPicturesApp.factory('albumFactory', ['$http', function ($http) {
    var prototype = {};

    prototype.list = function () {
        return $http.get('/api/album/');
    };

    prototype.detail = function (pk) {
        return $http.get('/api/album/' + pk + '/');
    };

    prototype.create = function (data) {
        $http.post('/api/album/', data).success(function() {
            return prototype.list();
        });
    }

    return prototype;
}]);

progressPicturesApp.factory('image', function ($resource) {
    return {
        images: $resource('/api/album/:albumID\\/', {}, {
            list: {
                method: 'GET'
            },
        })
    };
});

