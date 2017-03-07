app.controller("NavBarCtrl", function($http, $location, UserFactory, $scope, $timeout, $cookies, $rootScope) {
  const navBar = this
  navBar.user = {}

  UserFactory.getUser().then((res) => {
    navBar.user = res
    // console.log('nav bar user object',navBar.user)
    $timeout()
    // $rootScope.$broadcast("user", navBar.user)
  })

  navBar.logout = function() {
    $cookies.remove("DonorCredentials")
    $location.path("/login")
  }
  // navBar.logout = () =>
  //   $http.post("http://localhost:8000/logout", authFactory.user.current)
  //     .then(() => authFactory.user.current = null)
  //     .then(() => $location.path("/"))
  //     .catch(err => console.error(err))
})
