app.controller("DeleteListingCtrl", function($http, $location, $routeParams, authFactory) {
  const deleteListing = this

  $http.delete("http://localhost:8000/request/" + $routeParams.listingId +"/")
})
