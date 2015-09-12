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
            if (value == '' || value === undefined) {
                $scope.results = [];
            } else {
                wikiSvc.query(value).then(function(results){
                    $scope.results = results.data.query.pages;
                    console.log("$scope: ");
                    console.log($scope.results);
                    //$scope.$apply();
                });
            }

        };

        /*
        $scope.$watch('searchText', function (newValue, oldValue) {
           if (newValue !== oldValue) sharedProperties.setSearchText(newValue);
        });*/

        $scope.$watch(
            function () {
                return sharedProperties.getSearchText();
            },
            function (newValue, oldValue) {
                if (newValue !== oldValue) getResults(newValue);
            }

        );
    }]);
