app.controller("ViewListingsCtrl", function($http, $location) {
  const viewListings = this

  $http.get("http://localhost:8000/request")
    .then((response => viewListings.listings = response.data))
      .then(() => console.log(viewListings.listings))
})
