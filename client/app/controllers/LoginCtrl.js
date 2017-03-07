app.controller("LoginCtrl", function($http, $location, UserFactory, apiUrl, $cookies) {
  const login = this;

  login.login = () => {
    console.log(login.user)
    $http.post("http://localhost:8000/login",
    login.user,
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
      // .then(resp => authFactory.user= resp.data)
      .then(resp => {
        console.log("login response",resp)
        // authFactory.user = resp.data
        if (resp.status == 200) {
          console.log("yep")
          //encode the credentials
          const encoded = window.btoa(`${login.user.username}:${login.user.password}`)
          $cookies.put("DonorCredentials", encoded)
          $http.defaults.headers.common.Authorization = "Basic " + encoded
          UserFactory.user = resp.data

        }
      })
      .then(() => console.log("user obj from authFactory", UserFactory.user))
      .then(() => {$location.path("/landing")}) // temporary routing
      // .catch(err => console.error("the error", err));
  }

  login.register = function() {
    $location.path("/register")
  }

})
