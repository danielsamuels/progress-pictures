progressPicturesApp.controller('AlbumListingCtrl', ['$scope', 'albumFactory', 'menuControl', 'albums', function($scope, albumFactory, menuControl, albums) {
    console.log('AlbumListingCtrl');
    albumFactory.setAlbums(albums.data);
    menuControl.showCreateAlbum();
    menuControl.hideUploadImage();
    menuControl.hideDeleteAlbum();

    $scope.$watch(function() {
        return albumFactory.getAlbums();
    }, function (newVal) {
        $scope.albums = newVal;
    });
}]);

progressPicturesApp.controller('albumCreateModalCtrl', ['$scope', '$modalInstance', 'albumFactory', function ($scope, $modalInstance, albumFactory) {
    $scope.albumTitle = 'test';

    $scope.createAlbum = function () {
        console.log('albumTitle', this.albumTitle);

        albumFactory.create({
            'title': this.albumTitle,
        }).success(function() {
            albumFactory.list().success(function (data) {
                console.log('settings albums', data);
                $modalInstance.dismiss('cancel');
                albumFactory.setAlbums(data);
            });
        });
    };
}]);


progressPicturesApp.controller('albumDeleteModalCtrl', ['$scope', '$modalInstance', '$routeParams', '$location', 'albumFactory', function ($scope, $modalInstance, $routeParams, $location, albumFactory) {
    console.log('albumDeleteModalCtrl');

    $scope.confirm = function () {
        albumFactory.delete($routeParams.pk).success(function () {
            $modalInstance.dismiss('cancel');
            $location.path('/albums/');
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
}]);




progressPicturesApp.controller('AlbumDetailCtrl', ['$scope', '$http', '$routeParams', '$upload', '$modal', 'menuControl', 'album', function($scope, $http, $routeParams, $upload, $modal, menuControl, album) {
    console.log('AlbumDetailCtrl');
    $scope.album = album.data;
    menuControl.hideCreateAlbum();
    menuControl.showUploadImage();
    menuControl.showDeleteAlbum();

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: '/api/image/',
                method: 'POST',
                data: {
                    title: $scope.ImageTitle,
                    album: $routeParams.pk,
                },
                file: file,
            }).success(function(data, status, headers, config) {
                $scope.album = api.images.list({
                    albumID: $routeParams.pk
                });

                angular.forEach(
                    document.querySelectorAll('.view-container input'),
                    function(inputElem) {
                        angular.element(inputElem).val(null);
                    }
                );
            });
        }
    };

    $scope.open = function () {
        console.log('open');

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);


progressPicturesApp.controller('ImageDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    console.log('ImageDetailCtrl');
    $scope.name = 'ImageDetailCtrl';

    $http.get('/api/image/' + $routeParams.image_pk + '/').then(function (response) {
        console.log(response);
        $scope.album = response.data;
    });
}]);
