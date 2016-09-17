console.log("thuehkvjdf")
var app = angular
  .module("client", ["ngRoute"])
  .config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });
