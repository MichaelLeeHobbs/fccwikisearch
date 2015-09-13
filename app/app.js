'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.services',
    'myApp.view1',
    /*'myApp.view2',*/
    'myApp.version'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .controller('MainCtrl', ['$scope', 'sharedProperties', function ($scope, sharedProperties) {
        var defaultRandomEntry = 'https://en.wikipedia.org/wiki/FreeCodeCamp';
        $scope.randomEntry = defaultRandomEntry;
        $scope.luckyButtonStyle = function() {
            if (sharedProperties.getHaveResults()) {
                console.log('inline');
                return {"display": "inline"};
            }
            console.log('none');
            return {"display": "none"};
        };

        $scope.setSearchText = function (value) {
            sharedProperties.setSearchText(value);
        };

        $scope.$watch(
            function () {
                return sharedProperties.getRandomEntry();
            },
            function (newValue, oldValue) {
                console.log('newValue: ' + newValue);
                console.log('oldValue: ' + oldValue);

                if (newValue !== oldValue) {
                    if (newValue === '' || newValue === undefined) {
                        $scope.randomEntry = defaultRandomEntry;
                    } else {
                        if (newValue !== oldValue) $scope.randomEntry = newValue;
                    }
                }
            }
        );
    }])
;