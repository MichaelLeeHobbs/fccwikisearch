'use strict';
console.log('view1.js loading');
angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$location', 'wikiSvc', 'sharedProperties', function ($scope, $location, wikiSvc, sharedProperties) {

        $scope.searchText = '';

        var getResults = function (value) {
            // if value is undefined/empty set results to empty
            if (value === '' || value === undefined) {
                $scope.results = [];
                sharedProperties.setRandomEntry('');

            // else get results
            } else {
                wikiSvc.query(value).then(function (results) {
                    $scope.results = results.data.query.pages;

                    // and select a random entry
                    var count = 0;
                    for (var prop in $scope.results) {
                        if (Math.random() < 1 / ++count) {
                            sharedProperties.setRandomEntry("https://en.wikipedia.org/?curid=" + prop);
                        }
                    }
                });
            }

        };
        // watch for change in sharedProperties.getSearchText()
        $scope.$watch(
            function () {
                return sharedProperties.getSearchText();
            },
            function (newValue, oldValue) {
                if (newValue !== oldValue) { getResults(newValue); }
            }

        );
    }]);
