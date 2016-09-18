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

  newListing.test = function(){
    console.log("hey, this works")
    console.log(newListing.field)
    $http({
      url:"http://localhost:8000/test",
      method:"POST",
      headers:{"Content-Type": "application/json"},
      data: {"testytest": newListing.field}
    })
  }

  newListing.postNewListing = function() {
    dataToPost = {"creator": `http://localhost:8000/user/1`, //${newListing.userPk}
    "category": newListing.chosenCategory[0],
    "grouping": newListing.chosenGrouping[0],
    "name": newListing.requestName,
    "description": newListing.requestDescription,
    "end": newListing.endDate,
    "email": newListing.email,
    "phone": newListing.phone}
    console.log(dataToPost)
    // $http({
    //   url:'http://localhost8000/post_new_listing',
    //   method:'POST',
    //   headers:{"Content-Type": "application/json"},
    //   data: dataToPost
      // data: {"creator": `http://localhost:8000/user/1/`, //${newListing.userPk}
      // "category": newListing.chosenCategory[0],
      // "grouping": newListing.chosenGrouping[0],
      // "name": newListing.requestName,
      // "description": newListing.requestDescription,
      // "end": newListing.endDate,
      // "email": newListing.email,
      // "phone": newListing.phone
      // }
    $http.post("http://localhost:8000/post_new_listing",
      dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .success(res => {
        if (res.success) {
          console.log("it works")
      }
    }).error(console.error)
  }

})
