angular.module('myApp.services', [])
    .factory('wikiSvc', ['$http', function ($http) {
        'use strict';

        return {
            query: function (search) {
                var promise = $http({
                    method: 'JSONP',
                    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search + '&callback=JSON_CALLBACK',
                    cache: true
                });
                promise.success(function (data, status, headers, conf) {
                    return data;
                });
                return promise;
            }
        };
    }])
    .factory('sharedProperties', [function () {
        'use strict';

        var searchText = '';
        var randomEntry = '';
        var haveResults = false;

        return {
            getSearchText: function () { return searchText; },
            setSearchText: function (value) { searchText = value; },
            getRandomEntry: function () { return randomEntry; },
            setRandomEntry: function (value) { randomEntry = value; },
            getHaveResults: function () { return haveResults; },
            setHaveResults: function (value) { haveResults = value; }
        };
    }]);