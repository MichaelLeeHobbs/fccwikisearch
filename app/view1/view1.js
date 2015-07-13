'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl',
            resolve: {
                results: ['wikiSvc', function (wikiSvc) {
                    return wikiSvc.query('test');
                }]
            }
        });
    }])

    .controller('View1Ctrl', ['$scope', 'results', function ($scope, results) {
        $scope.results = results.data.query.pages;
    }]);