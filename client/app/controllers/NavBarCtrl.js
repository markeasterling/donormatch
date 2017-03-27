app.controller("NavBarCtrl", function($http, $location, UserFactory, $scope, $cookies) {
  const navBar = this
  navBar.user = {}

  UserFactory.getUser().then((res) => {
    navBar.user = res
  })

  navBar.logout = function() {
    navBar.user = {}
    $cookies.remove("DonorCredentials")
    $location.path("/login")
  }

})
