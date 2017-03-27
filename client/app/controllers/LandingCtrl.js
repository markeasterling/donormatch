app.controller("LandingCtrl", function($http, $location, $routeParams, UserFactory, $timeout, $scope, $cookies) {
  const landing = this
  landing.title = "Landing"
  landing.user = {}

  UserFactory.getUser().then((res) => {
    landing.user = res
    landing.loadUserContent()
  })

  landing.loadUserContent= function(){
    $http.post("http://localhost:8000/get_messages",
    {"user": landing.user.id }, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .then(response => landing.messages = response.data)
        //.then(() => (console.log('these are the messages', landing.messages)))
  }

  landing.newListing = function() {
    $location.path("/newlisting")
  }

})
