app.controller("EditListingCtrl", function($http, $location, $routeParams, $timeout, authFactory, $filter, UserFactory) {
  const editListing = this
  editListing.user = {}

  UserFactory.getUser().then((res) => {
    editListing.user = res
    editListing.loadRequests()
    $timeout()
  })

  //get request categories from API to populate dropdown
  $http.get("http://localhost:8000/get_request_categories")
    .then((response => editListing.request_categories = response.data))
      .then(() => console.log(editListing.request_categories))
  //get grouping categories from API to populate dropdown
  $http.get("http://localhost:8000/get_grouping_choices")
    .then((response => editListing.grouping_choices = response.data))
      .then(() => console.log(editListing.grouping_choices))
  //get listing to be edited, to pre-fill the form
  $http.get("http://localhost:8000/request/" + $routeParams.listingId)
    .then((response => editListing.listing = response.data))
      .then(() => console.log(editListing.listing))
        .then(() => {
          editListing.chosenGrouping = editListing.grouping
          editListing.requestName = editListing.listing.name
          editListing.requestDescription = editListing.listing.description
          editListing.email = editListing.listing.email
          editListing.phone = editListing.listing.phone
        })

  editListing.pactchListing = function() {
    dataToPatch = {
    "name": editListing.requestName,
    "description": editListing.requestDescription,
    "end": editListing.endDate,
    "email": editListing.email,
    "phone": editListing.phone}

    $http.patch("http://localhost:8000/request/" + $routeParams.listingId + "/",
      dataToPatch, {headers:{"Content-Type": 'application/json'}})
  }



})
