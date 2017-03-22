app.controller("LandingCtrl", function($http, $location, $routeParams, UserFactory, $timeout, $scope, $cookies) {
  const landing = this
  landing.title = "Landing"
  landing.user = {}

  //UserFactory.checkForCookie()
  UserFactory.getUser().then((res) => {
    console.log('GET USER',res)
    landing.user = res
    $timeout().then(landing.loadRequests())

  })

  landing.loadRequests= function(){
    $http.get(`http://localhost:8000/user/${landing.user.id}`) //${landing.userId}
      .then(result => landing.user = result.data)
        //.then(() => console.log("from the get req in landingctrl",landing.user))

    $http.post("http://localhost:8000/get_messages",
    {"user": landing.user.id }, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .then(response => landing.messages = response.data)
        //.then(() => (console.log('these are the messages', landing.messages)))
  }

  landing.newListing = function() {
    $location.path("/newlisting")
  }
    })
