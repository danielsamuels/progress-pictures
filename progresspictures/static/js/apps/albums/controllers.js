progressPicturesApp.controller('AlbumListingCtrl', ['$scope', 'albumFactory', 'albums', function($scope, albumFactory, albums) {
    console.log('AlbumListingCtrl');
    $scope.albums = albums.data;

    $scope.createAlbum = function() {
        // Create returns a list() promise.
        albumFactory.create({
            'title': $scope.AlbumTitle,
        }).success(function(data) {
            console.log(data);
            $scope.AlbumTitle = '';
            $scope.albums = data;
        });
    };
}]);


progressPicturesApp.controller('AlbumDetailCtrl', ['$scope', '$http', '$routeParams', '$upload', '$modal', 'album', function($scope, $http, $routeParams, $upload, $modal, album) {
    console.log('AlbumDetailCtrl');
    $scope.album = album.data;

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
