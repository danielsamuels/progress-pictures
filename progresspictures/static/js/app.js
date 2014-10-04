// Define the base application.
// Dependancies:
//  - ngCookies: Used to get the CSRF cookie.

var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute']);

progressPicturesApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider) {
    // Send the CSRF token with POST requests.
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $locationProvider.html5Mode(true);

    // Build URLs.
    $routeProvider
    .when('/', {
        templateUrl: 'templates/images/album_list.html',
        controller: 'albumListing'
    })

    // .when('/category/:pk/', {
    //     templateUrl: 'templates/categories/category_detail.html',
    //     controller: 'categoryDetail'
    // });
}]);



progressPicturesApp.controller('albumListing', function() {

});

// progressPicturesApp.controller('categoryListing', function($scope, $http, $cookies) {
//     $scope.loadCategories = function() {
//         $http.get('/api/category/').then( function (response) {
//             console.debug(response);
//             $scope.categories = response.data;
//         });
//     }

//     $scope.createCategory = function() {
//         $http.post('/api/category/', {
//             'name': this.newCategoryName,
//         }).then(function(response) {
//             $scope.loadCategories();
//         });
//     }

//     // Initialise values on elements.
//     $scope.newCategoryName = 'New category'

//     $scope.loadCategories();
// });

// progressPicturesApp.controller('categoryDetail', function($scope) {
//     $scope.pageClass = 'index';
// });
