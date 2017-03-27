app.controller("RegisterCtrl", function($http, $location) {
  const register = this

  register.submit = () => {
    $http.post("http://localhost:8000/register",
      register.user,
      {headers: {"Content-Type": "application/json"}})
          .then(() => {$location.path("/landing")})
            .catch(err => console.error("the error", err))
  }
})
