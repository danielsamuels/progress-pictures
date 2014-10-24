/*global progressPicturesApp*/
progressPicturesApp.controller('LoginCtrl', ['$scope', '$location', '$route', '$rootScope', 'api', function ($scope, $location, $route, $rootScope, api) {
    console.log('LoginCtrl');

    $scope.login = function () {
        console.log('Login trigger.');

        if (!$scope.loginForm.email || !$scope.loginForm.password) {
            return;
        }

        api.auth.login($scope.loginForm).
            $promise.
            then(function (data) {
                // on good email and password
                $scope.user = data.email;
            }).
            catch(function (data) {
                // on incorrect email and password
                console.error('Unable to login.');
            });
    };
}]);

progressPicturesApp.controller('RegisterCtrl', ['$scope', '$location', '$route', '$rootScope', 'api', function ($scope, $location, $route, $rootScope, api) {
    console.log('RegisterCtrl');

    $scope.register = function () {
        console.log('Register', $scope.email, $scope.password);
    };
}]);
