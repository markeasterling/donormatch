app.controller("NavBarCtrl", function($http, $location, authFactory) {
  const navBar = this
  navBar.user = authFactory.user

  navBar.logout = () =>
    $http.post("http://localhost:8000/logout", authFactory.user.current)
      .then(() => authFactory.user.current = null)
      .then(() => $location.path("/"))
      .catch(err => console.error(err))
})
