app.controller('NewListingCtrl', function($http, $location, authFactory) {
  const newListing = this;
  newListing.title = 'Post New Listing'
  newListing.username = authFactory.user.username
  newListing.userPk = authFactory.user.userId

  $http.get("http://localhost:8000/get_request_categories")
    .then((response => newListing.request_categories = response.data))
      .then(() => console.log(newListing.request_categories))

//   newListing.get_current_user = () => {
//     $http.get("http://localhost:8000/get_current_user")
//       .then((response) => newListing.currentUser = response.data[0])
// }
  // $http({
  //   url:'http://localhost8000/request/',
  //   method: 'POST',
  //   data: { "creator": `http://localhost:8000/user/${newlisting.userPk}/`,
  //           "category":
  //   }
  // })

})
