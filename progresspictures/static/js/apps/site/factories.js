/*global progressPicturesApp*/
progressPicturesApp.factory('auth', ['$http', function ($http) {
    var prototype = {};

    prototype.login = function (data) {
        return $http.post('/api/auth/', data);
    };

    return prototype;
}]);


progressPicturesApp.factory('menuControl', [function () {
    var prototype = {},
        variables = {
            'UploadImage': false,
            'CreateAlbum': false,
            'DeleteAlbum': false,
            'DeleteImage': false
        };

    for (var key in variables) {
        (function () {
            var innerKey = key;
            prototype['show' + innerKey] = function () {
                variables[innerKey] = true;
                return true;
            }

            prototype['hide' + innerKey] = function () {
                variables[innerKey] = false;
                return true;
            }

            prototype['get' + innerKey] = function () {
                return variables[innerKey];
            }
        })();
    }

    prototype.show = function (keys) {
        for (var variable_key in variables) {
            if (keys.indexOf(variable_key) !== -1) {
                prototype['show' + variable_key]();
            }
            else {
                prototype['hide' + variable_key]();
            }
        }
    };

    prototype.variables = variables;

    return prototype;
}]);
