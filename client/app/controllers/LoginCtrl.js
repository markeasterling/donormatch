app.controller("LoginCtrl", function($http, $location, UserFactory, apiUrl, $cookies) {
  const login = this;
  login.error = null


  login.login = () => {
    $http.post("http://localhost:8000/login",
    login.user,
    {headers: {"Content-Type": "application/x-www-form-urlencoded"}})
      .then(resp => {
        //console.log("login response",resp)
        if (resp.data.userId !== null) {
          const encoded = window.btoa(`${login.user.username}:${login.user.password}`)
          $cookies.put("DonorCredentials", encoded)
          $http.defaults.headers.common.Authorization = "Basic " + encoded
          UserFactory.setEncodedCredentials(encoded)
          $location.path("/landing")
        } else {
          login.error ='An error occured. Please try again'
        }
      })
  }

  login.register = function() {
    $location.path("/register")
  }

})
