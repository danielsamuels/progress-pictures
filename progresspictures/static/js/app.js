// Define the base application.
// Dependancies:
//  - ngCookies: Used to get the CSRF cookie.

var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute']);

progressPicturesApp.config(function($httpProvider, $routeProvider) {
    // Send the CSRF token with POST requests.
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    // Build URLs.
    $routeProvider
    .when('/', {
        templateUrl: 'templates/categories/category_listing.html',
        controller: 'categoryListing'
    })

    .when('/category/:pk/', {
        templateUrl: 'templates/categories/category_detail.html',
        controller: 'categoryDetail'
    });
});

progressPicturesApp.controller('categoryListing', function($scope, $http, $cookies) {
    $scope.loadCategories = function() {
        $http.get('/api/category/').then( function (response) {
            console.debug(response);
            $scope.categories = response.data;
        });
    }

    $scope.createCategory = function() {
        $http.post('/api/category/', {
            'name': this.newCategoryName,
        }).then(function(response) {
            $scope.loadCategories();
        });
    }

    // Initialise values on elements.
    $scope.newCategoryName = 'New category'

    $scope.loadCategories();
});

progressPicturesApp.controller('categoryDetail', function($scope) {
    $scope.pageClass = 'index';
});
