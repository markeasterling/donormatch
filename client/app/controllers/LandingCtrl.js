app.controller("LandingCtrl", function($http, $location, $routeParams, authFactory) {
  const landing = this
  landing.title = "Landing"
  landing.userPk = authFactory.user.userId

  $http.get(`http://localhost:8000/user/8`) //${landing.userId}
    .then(result => landing.user = result.data)
      .then(() => console.log(landing.user))

      $http.post("http://localhost:8000/get_messages",
      {"user": landing.userPk }, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
        .then(response => landing.messages = response.data)
          .then(() => (console.log(landing.messages)))

  landing.newListing = function() {
    $location.path("/newlisting")
  }
    })
