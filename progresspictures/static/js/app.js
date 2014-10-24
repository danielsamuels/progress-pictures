/*global angular*/
var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute', 'angularFileUpload', 'ngResource', 'mm.foundation']);

progressPicturesApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
    // Send the CSRF token with POST requests.
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $locationProvider.html5Mode(true);
}]);
