app.controller("LoginCtrl", function($http, $location, authFactory) {
  const login = this;

  login.login = () => {
    $http.post("http://localhost:8000/login",
    login.user,
    {headers: {"Content-Type": "application/json"}})
      .then(resp => console.log("the response", resp))
      .then(() => authFactory.user.current = login.user)
      .catch(err => console.error("the error", err));
  };
});
