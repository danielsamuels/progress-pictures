/*global progressPicturesApp*/
progressPicturesApp.controller('AuthCtrl', ['$scope', '$location', 'auth', function ($scope, $location, auth) {
    console.log('AuthCtrl');

    $scope.login = function () {
        console.log('Login trigger.');

        if (!$scope.email || !$scope.password) {
            console.log('No username and/or password');
            return;
        }

        auth.login({
            email: $scope.email,
            password: $scope.password
        }).success(function (data) {
            console.log('login success', data);
            $location.path('/albums/');
        }).error(function (data, status) {
            if (status == 401) {
                console.log('login error', data);
            }
        });
    };
}]);
