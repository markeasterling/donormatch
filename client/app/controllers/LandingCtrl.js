app.controller("LandingCtrl", function($http, $location, $routeParams, authFactory) {
  const landing = this
  landing.title = "Landing"
  landing.userId = authFactory.user.userId

  $http.get(`http://localhost:8000/user/8`) //${landing.userId}
    .then(result => landing.user = result.data)
      .then(() => console.log(landing.user))


    })
