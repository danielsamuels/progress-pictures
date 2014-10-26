/*global progressPicturesApp*/
progressPicturesApp.factory('albumFactory', ['$http', '$modal', function ($http, $modal) {
    var prototype = {},
        albums = [];

    prototype.list = function () {
        return $http.get('/api/album/');
    };

    prototype.detail = function (pk) {
        return $http.get('/api/album/' + pk + '/');
    };

    prototype.create = function (data) {
        console.log(data);
        return $http.post('/api/album/', data);
    }

    prototype.delete = function (pk) {
        return $http.delete('/api/album/' + pk + '/');
    }

    prototype.openCreateModal = function () {
        var createModal = $modal.open({
            templateUrl: '/static/partials/images/modals/album_create.html',
            controller: 'albumCreateModalCtrl'
        })
    }

    prototype.openDeleteModal = function () {
        var deleteModal = $modal.open({
            templateUrl: '/static/partials/images/modals/album_delete.html',
            controller: 'albumDeleteModalCtrl'
        })
    }

    prototype.getAlbums = function () {
        return albums;
    }

    prototype.setAlbums = function (data) {
        albums = data;
        return true;
    }

    return prototype;
}]);

progressPicturesApp.factory('imageFactory', ['$http', function ($http) {
    var prototype = {};

    prototype.detail = function (pk) {
        return $http.get('/api/image/' + pk + '/');
    }

    return prototype;
}]);
