progressPicturesApp.controller('PageCtrl', ['$scope', 'albumFactory', 'menuControl', function ($scope, albumFactory, menuControl) {
    console.log('PageCtrl');
    $scope.showUploadImage = false;
    $scope.showCreateAlbum = false;
    $scope.showDeleteAlbum = false;

    $scope.showAlbumCreateModel = function() {
        albumFactory.openCreateModal();
    }

    $scope.showAlbumDeleteModel = function() {
        albumFactory.openDeleteModal();
    }

    $scope.$watch(function () {
        return menuControl.getUploadImage();
    }, function (newVal) {
        $scope.showUploadImage = newVal;
    });

    $scope.$watch(function () {
        return menuControl.getCreateAlbum();
    }, function (newVal) {
        $scope.showCreateAlbum = newVal;
    });

    $scope.$watch(function () {
        return menuControl.getDeleteAlbum();
    }, function (newVal) {
        $scope.showDeleteAlbum = newVal;
    });

}]);


progressPicturesApp.controller('HomepageCtrl', ['$scope', '$location', function ($scope, $location) {
    console.log('HomepageCtrl');
    if ($scope.user) {
        $location.path('/albums/');
    }
}]);
