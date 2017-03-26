app.controller("RegisterCtrl", function($http, $location, authFactory) {
  const register = this

  register.submit = () => {
    $http.post("http://localhost:8000/register",
      register.user,
      {headers: {"Content-Type": "application/json"}})
        // .then(resp => authFactory.user= resp.data)
        // .then(() => console.log("user obj from authFactory", authFactory.user))
        .then(() => {$location.path("/landing")})
        .catch(err => console.error("the error", err));
  };
});
