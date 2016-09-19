app.controller("ListingDetailCtrl", function($http, $location, $routeParams, $timeout) {
  const listingDetail = this

  // let logError = (err) => console.log("error", err)

  $http.get("http://localhost:8000/request/" + $routeParams.listingId)
    .then(result => {listingDetail.selectedListing = result.data})
      .then(() => {console.log(listingDetail.selectedListing)})

})
