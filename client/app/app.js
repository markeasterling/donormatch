var app = angular
  .module("client", ["ngRoute", "angular.filter", "ngCookies"])

app.constant("apiUrl", "http://localhost:8000")

app.run(function run(UserFactory, $cookies, $http, $location) {
  const donorCookie = $cookies.get("DonorCredentials")
  console.log(donorCookie)
  if (donorCookie) {
    $http.defaults.headers.common.Authorization = "Basic " + donorCookie
    UserFactory.setEncodedCredentials(donorCookie)
    UserFactory.getUser()
  } else {
    $location.path("/login")
  }
})

app.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  });
