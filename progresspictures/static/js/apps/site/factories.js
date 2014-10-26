/*global progressPicturesApp*/
progressPicturesApp.factory('auth', ['$http', function ($http) {
    var prototype = {};

    prototype.login = function (data) {
        return $http.post('/api/auth/', data);
    };

    return prototype;
}]);


progressPicturesApp.factory('menuControl', [function () {
    var prototype = {},
        uploadImage = false,
        createAlbum = false,
        deleteAlbum = false;

    prototype.showUploadImage = function () {
        uploadImage = true;
        return true;
    };

    prototype.hideUploadImage = function () {
        uploadImage = false;
        return true;
    }

    prototype.getUploadImage = function () {
        return uploadImage;
    }

    prototype.showCreateAlbum = function () {
        createAlbum = true;
        return true;
    };

    prototype.hideCreateAlbum = function () {
        createAlbum = false;
        return true;
    }

    prototype.getCreateAlbum = function () {
        return createAlbum;
    }

    prototype.showDeleteAlbum = function () {
        deleteAlbum = true;
        return true;
    };

    prototype.hideDeleteAlbum = function () {
        deleteAlbum = false;
        return true;
    }

    prototype.getDeleteAlbum = function () {
        return deleteAlbum;
    }

    return prototype;
}]);
