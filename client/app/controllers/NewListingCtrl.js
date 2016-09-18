app.controller('NewListingCtrl', function($http, $location, authFactory) {
  const newListing = this;
  newListing.title = 'Post New Listing'
  newListing.username = authFactory.user.username
  newListing.userPk = authFactory.user.userId

  $http.get("http://localhost:8000/get_request_categories")
    .then((response => newListing.request_categories = response.data))
      .then(() => console.log(newListing.request_categories))

  $http.get("http://localhost:8000/get_grouping_choices")
    .then((response => newListing.grouping_choices = response.data))
      .then(() => console.log(newListing.grouping_choices))


  function postNewListing() {
    $http({
      url:'http://localhost8000/request/',
      method: 'POST',
      headers: {
            "Content-Type": "application/json"
              },
      data: { "creator": `http://localhost:8000/user/${newListing.userPk}/`,
      "category": newListing.chosenCategory,
      "grouping": newListing.chosenGrouping,
      "name": newListing.requestName,
      "description": newListing.requestDescription,
      "end": newListing.endDate,
      "email": newListing.email,
      "phone": newListing.phone
      },
    }).sucess(res => {
      if (res.success) {
        console.log("it works")
      }
    }).error(console.error)
  }

})
