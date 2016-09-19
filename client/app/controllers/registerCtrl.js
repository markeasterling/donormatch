app.controller("RegisterCtrl", function($http, $location, authFactory) {
  const register = this;

  register.submit = () => {
    $http.post("http://localhost:8000/register",
      register.user,
      {headers: {"Content-Type": "application/json"}})
        .then(resp => console.log("the response", resp))
        .then(() => authFactory.user.current = register.user)
        .then(() => {$location.path("/newlisting")}) // temporary routing
        .catch(err => console.error("the error", err));
  };
});
