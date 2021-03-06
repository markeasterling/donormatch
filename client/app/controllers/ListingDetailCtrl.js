app.controller("ListingDetailCtrl", function($http, $location, $routeParams, $timeout, UserFactory) {
  const listingDetail = this
  listingDetail.user = {}

  UserFactory.getUser().then((res) => {
    listingDetail.user = res
    listingDetail.loadListingDetail()
  })

  listingDetail.loadListingDetail = function() {
    $http.get("http://localhost:8000/request/" + $routeParams.listingId)
      .then(result => {
          listingDetail.selectedListing = result.data
          return $http.get(listingDetail.selectedListing.creator)
      })
        .then(creatorResult => {
          listingDetail.creator = creatorResult.data
          $timeout()
        })
          .then(() => {console.log(listingDetail.selectedListing)})
  }

  listingDetail.sendMessage = function() {
    dataToPost = {
      "sender": `${listingDetail.user.id}`,
      "recipient": listingDetail.creator.id,
      "text": listingDetail.message
    }

    $http.post("http://localhost:8000/send_message",
      dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .success(res => {
        if (res.success) {
          console.log("it works")
        }
      }).error(console.error)
  }

})
