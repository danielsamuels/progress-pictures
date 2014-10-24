progressPicturesApp.factory('albums', function ($resource) {
    return {
        albums: $resource('/api/album\\/', {}, {
            list: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST'
            }
        })
    };
});

progressPicturesApp.factory('images', function ($resource) {
    return {
        images: $resource('/api/album/:albumID\\/', {}, {
            list: {
                method: 'GET'
            },
        })
    };
});

