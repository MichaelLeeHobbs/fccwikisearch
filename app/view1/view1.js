'use strict';
console.log('view1.js loading');
angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$location', 'wikiSvc', 'sharedProperties', function ($scope, $location, wikiSvc, sharedProperties) {

        $scope.searchText = '';

        var undefinedResults = function () {
            $scope.results = [];
            sharedProperties.setRandomEntry('');
            // notify MainCtrl we have no results
            sharedProperties.setHaveResults(false);
        };

        var getResults = function (value) {
            // abort search if search value less than 3 to respect wikipidea
            if (value.length < 3) value = undefined;

            // if value is undefined/empty set results to empty
            if (value === '' || value === undefined) {
                undefinedResults();

            // else get results
            } else {
                wikiSvc.query(value).then(function (results) {
                    if (results.data.query === undefined) {
                        undefinedResults();
                    } else {
                        $scope.results = results.data.query.pages;

                        // and select a random entry
                        var count = 0;
                        for (var prop in $scope.results) {
                            if (Math.random() < 1 / ++count) {
                                sharedProperties.setRandomEntry("https://en.wikipedia.org/?curid=" + prop);
                            }
                        }

                        // notify MainCtrl we have results
                        sharedProperties.setHaveResults(true);
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
