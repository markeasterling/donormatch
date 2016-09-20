app.controller("LoginCtrl", function($http, $location, authFactory) {
  const login = this;

  login.login = () => {
    $http.post("http://localhost:8000/login",
    login.user,
    {headers: {"Content-Type": "application/json"}})
      // .then(resp => console.log("the response", resp))
      .then(resp => authFactory.user= resp.data)
      .then(() => console.log("user obj from authFactory", authFactory.user))
      .then(() => {$location.path("/landing")}) // temporary routing
      // .catch(err => console.error("the error", err));
  };
});
