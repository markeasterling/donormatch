app.controller("LandingCtrl", function($http, $location, $routeParams, UserFactory, $timeout, $scope) {
  const landing = this
  landing.title = "Landing"
  landing.user = {}
  
  UserFactory.getUser().then((res) => {
    landing.user = res
    landing.requests()
    $timeout()
  })
  // $scope.$on("user", function(event, data){
  //   landing.user = data
  //   console.log("LANDING DOT USER",landing.user)
  //   $timeout()
  // })

  landing.requests= function(){
    // $http.get(`http://localhost:8000/user/${landing.user.id}`) //${landing.userId}
    //   .then(result => landing.user = result.data)
    //     .then(() => console.log("from the get req in landingctrl",landing.user))

    $http.post("http://localhost:8000/get_messages",
    {"user": landing.user.id }, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .then(response => landing.messages = response.data)
        .then(() => (console.log('these are the messages', landing.messages)))
  }

  landing.newListing = function() {
    $location.path("/newlisting")
  }
    })
