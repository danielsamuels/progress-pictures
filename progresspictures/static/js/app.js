// Define the base application.
// Dependancies:
//  - ngCookies: Used to get the CSRF cookie.

var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute', 'angularFileUpload', 'ngResource', 'mm.foundation']);

progressPicturesApp.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});

progressPicturesApp.factory('api', function($resource){
    function add_auth_header(data, headersGetter){
        // as per HTTP authentication spec [1], credentials must be
        // encoded in base64. Lets use window.btoa [2]
        var headers = headersGetter();
        headers['Authorization'] = data.email + ':' + data.password;
    }
    // defining the endpoints. Note we escape url trailing dashes: Angular
    // strips unescaped trailing slashes. Problem as Django redirects urls
    // not ending in slashes to url that ends in slash for SEO reasons, unless
    // we tell Django not to [3]. This is a problem as the POST data cannot
    // be sent with the redirect. So we want Angular to not strip the slashes!
    return {
        auth: $resource('/api/auth\\/', {}, {
            login: {
                method: 'POST',
                transformRequest: add_auth_header,
            },
            register: {
                method: 'PUT'
            },
            logout: {
                method: 'DELETE'
            }
        }),

        albums: $resource('/api/album\\/', {}, {
            list: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST'
            }
        }),

        images: $resource('/api/album/:albumID\\/', {}, {
            list: {
                method: 'GET'
            },
        })
    };
});

progressPicturesApp.factory('MenuButton', function(){
    return {
        href: '#',
        text: ''
    };
});

progressPicturesApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider) {
    // Send the CSRF token with POST requests.
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $locationProvider.html5Mode(true);

    // Build URLs.
    $routeProvider

    // Album listing
    .when('/', {
        templateUrl: '/static/partials/images/album_list.html',
        controller: 'AlbumListingCtrl'
    })

    // Album detail
    .when('/album/:pk/', {
        templateUrl: '/static/partials/images/album_detail.html',
        controller: 'AlbumDetailCtrl',
        controllerAs: 'albumdetail'
    })

    // Image detail
    .when('/album/:album_pk/image/:image_pk', {
        templateUrl: '/static/partials/images/image_detail.html',
        controller: 'ImageDetailCtrl'
    });
}]);


progressPicturesApp.controller('PageCtrl', ['$scope', '$location', '$route', '$rootScope', 'MenuButton', 'api', function($scope, $location, $route, $rootScope, MenuButton, api) {
    console.log('PageCtrl')
    $scope.menu = MenuButton;

    $scope.loginForm = {
        email: '',
        password: ''
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        console.log('event', event);
        console.log('toState', toState);
        console.log('toParams', toParams);
        console.log('fromState', fromState);
        console.log('fromParams', fromParams);
    });

    $scope.showUploadImageButton = function() {
        if (undefined === $route.current || undefined === $route.current.scope) {
            return false;
        }

        return $route.current.scope.name == 'AlbumDetailCtrl'
    };

    $scope.login = function(){
        console.log('Login trigger.');

        if ( ! $scope.loginForm.email || ! $scope.loginForm.password) {
            return;
        }

        api.auth.login($scope.loginForm).
            $promise.
                then(function(data){
                    // on good email and password
                    $scope.user = data.email;
                }).
                catch(function(data){
                    // on incorrect email and password
                    console.error('Unable to login.');
                });
        };
}]);


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


var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
