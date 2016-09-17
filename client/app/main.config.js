app.config(($routeProvider) => (
  $routeProvider
    .when("/register", {
      controller: "RegisterCtrl",
      controllerAs: "register",
      templateUrl: "app/partials/register.html"
    })
    .when("/login", {
      controller: "LoginCtrl",
      controllerAs: "login",
      templateUrl: "app/partials/login.html"
    })
    .otherwise("/")
))
