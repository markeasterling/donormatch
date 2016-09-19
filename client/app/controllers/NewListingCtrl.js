app.controller('NewListingCtrl', function($http, $location, authFactory) {
  const newListing = this
  newListing.title = 'Post New Listing'
  newListing.username = authFactory.user.username
  newListing.userPk = authFactory.user.userId

  $http.get("http://localhost:8000/get_request_categories")
    .then((response => newListing.request_categories = response.data))
      .then(() => console.log(newListing.request_categories))

  $http.get("http://localhost:8000/get_grouping_choices")
    .then((response => newListing.grouping_choices = response.data))
      .then(() => console.log(newListing.grouping_choices))

  newListing.postNewListing = function() {
    dataToPost = {"creator": `${newListing.userPk}`,
    "category": newListing.chosenCategory[0],
    "grouping": newListing.chosenGrouping[0],
    "name": newListing.requestName,
    "description": newListing.requestDescription,
    "end": newListing.endDate,
    "email": newListing.email,
    "phone": newListing.phone}

    $http.post("http://localhost:8000/post_new_listing",
      dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .success(res => {
        if (res.success) {
          console.log("it works")
      }
    }).error(console.error)
  }

})
