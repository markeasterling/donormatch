app.controller('NewListingCtrl', function($http, $location, UserFactory, $timeout) {
  const newListing = this
  newListing.title = 'Post New Listing'
  newListing.user = {}

  UserFactory.getUser().then((res) => {
    newListing.user = res
  })

  // get request categories from API for dropdown menu choices
  $http.get("http://localhost:8000/get_request_categories")
    .then((response => newListing.request_categories = response.data))
      .then(() => console.log(newListing.request_categories))

  // get grouping categories from API for dropdown menu choices
  $http.get("http://localhost:8000/get_grouping_choices")
    .then((response => newListing.grouping_choices = response.data))
      .then(() => console.log(newListing.grouping_choices))

  newListing.postNewListing = function() {
    dataToPost = {"creator": `${newListing.user.id}`,
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
          console.log("it works")
          $location.path("/landing")
      }).error(console.error)
  }

})
