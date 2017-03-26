app.controller("DeleteListingCtrl", function($http, $location, $routeParams) {
  const deleteListing = this

  //retreive listing from API
  $http.get("http://localhost:8000/request/" + $routeParams.listingId +"/")
    .then(result => deleteListing.listing = result.data)
      .then(()=>{console.log(deleteListing.listing)})


  deleteListing.delete = function() {
    $http.delete("http://localhost:8000/request/" + $routeParams.listingId +"/")
      .then(()=>{$location.path("/landing")})
  }

  deleteListing.backToLanding = function() {
    $location.path("/landing")
  }
})
