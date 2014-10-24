progressPicturesApp.controller('PageCtrl', [function () {
    console.log('PageCtrl');
}]);


progressPicturesApp.controller('HomepageCtrl', ['$scope', '$location', function ($scope, $location) {
    console.log('HomepageCtrl');
    if ($scope.user) {
        $location.path = '/albums/';
    }
}]);
