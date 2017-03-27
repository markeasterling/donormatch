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
    .when("/landing", {
      controller: "LandingCtrl",
      controllerAs: "landing",
      templateUrl: "app/partials/landing.html"
    })
    .when("/deletelisting/:listingId", {
      controller: "DeleteListingCtrl",
      controllerAs: "deleteListing",
      templateUrl: "app/partials/deleteListing.html"
    })
    .when("/editlisting/:listingId", {
      controller: "EditListingCtrl",
      controllerAs: "editListing",
      templateUrl: "app/partials/editListing.html"
    })
    .when("/viewmessages", {
      controller: "ViewMessagesCtrl",
      controllerAs: "viewMessages",
      templateUrl: "app/partials/viewMessages.html"
    })
    .when("/viewmessage/:messageId", {
      controller: "ViewMessagesDetailCtrl",
      controllerAs: "messageDetail",
      templateUrl: "app/partials/viewMessagesDetail.html"
    })

    // .otherwise("/")
))
