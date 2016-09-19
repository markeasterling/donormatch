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
    .when("/newlisting", {
      controller: "NewListingCtrl",
      controllerAs: "newListing",
      templateUrl: "app/partials/newListing.html"
    })
    .when("/profileinfo", {
      controller: "ProfileInfoCtrl",
      controllerAs: "profileInfo",
      templateUrl: "app/partials/profileInfo.html"
    })
    .when("/viewlistings", {
      controller: "ViewListingsCtrl",
      controllerAs: "viewListings",
      templateUrl: "app/partials/viewListings.html"
    })
    .when("/viewlistings/:listingId", {
      controller: "ListingDetailCtrl",
      controllerAs: "listingDetail",
      templateUrl: "app/partials/listingDetail.html"
    })
    // .otherwise("/")
))
