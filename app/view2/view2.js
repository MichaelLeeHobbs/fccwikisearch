'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {


      var resultFrameSizing = function () {
        $("#result-frame").height($(window).height() - $("main-menu").height() - 50);
      };
      resultFrameSizing();
      $(window).resize(function(){
        resultFrameSizing();
      });
}]);