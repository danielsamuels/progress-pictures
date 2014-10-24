progressPicturesApp.controller('AlbumListingCtrl', ['$scope', '$http', 'api', function($scope, $http, api) {
    console.log('AlbumListingCtrl');
    $scope.name = 'AlbumListingCtrl';
    $scope.menu.text = 'Add album';
    $scope.albums = api.albums.list();

    $scope.createAlbum = function() {
        api.albums.create({
            'title': $scope.AlbumTitle,
        }).$promise.then(function(data) {
            console.log(data);
            $scope.AlbumTitle = '';
            $scope.albums = api.albums.list();
        }).catch(function(data) {
            console.error(data);
        });
    };
}]);


progressPicturesApp.controller('AlbumDetailCtrl', ['$scope', '$http', '$routeParams', '$upload', '$modal', 'api', function($scope, $http, $routeParams, $upload, $modal, api) {
    console.log('AlbumDetailCtrl');
    $scope.name = 'AlbumDetailCtrl';
    $scope.menu.text = 'Upload image';
    $scope.album = api.images.list({
        albumID: $routeParams.pk
    });

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


    $scope.items = ['item1', 'item2', 'item3'];

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

    // $scope.loadImages();
}]);


progressPicturesApp.controller('ImageDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    console.log('ImageDetailCtrl');
    $scope.name = 'ImageDetailCtrl';

    $http.get('/api/image/' + $routeParams.image_pk + '/').then(function (response) {
        console.log(response);
        $scope.album = response.data;
    });
}]);
