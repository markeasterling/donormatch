app.controller("ListingDetailCtrl", function($http, $location, $routeParams, $timeout, authFactory) {
  const listingDetail = this
  listingDetail.userPk = authFactory.user.userId

  // let logError = (err) => console.log("error", err)

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

    listingDetail.sendMessage = function() {
      dataToPost = {"sender": `${listingDetail.userPk}`,
                    "recipient": listingDetail.creator.id,
                    "text": listingDetail.message}
      console.log("here's the data to post",dataToPost)

      $http.post("http://localhost:8000/send_message",
        dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
        .success(res => {
          if (res.success) {
            console.log("it works")
          }
        }).error(console.error)
    }

})
