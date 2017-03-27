var app = angular
  .module("client", ["ngRoute", "angular.filter", "ngCookies"])

app.constant("apiUrl", "http://localhost:8000")
// app 'start up'. checks too see if a cookie is stored. if so, the user is retrieved.
// If not, user is redirected to login screen.
app.run(function run(UserFactory, $cookies, $http, $location) {
  const donorCookie = $cookies.get("DonorCredentials")
  if (donorCookie) {
    $http.defaults.headers.common.Authorization = "Basic " + donorCookie
    UserFactory.setEncodedCredentials(donorCookie)
    UserFactory.getUser()
  } else {
    $location.path("/login")
  }
})
