app.controller("ViewMessagesDetailCtrl", function($http, $location, $routeParams, authFactory, $timeout) {
  const messageDetail= this
  messageDetail.userPk = authFactory.user.userId

  $http.get("http://localhost:8000/message/" + $routeParams.messageId + "/")
    .then(result => {
        messageDetail.selectedMessage = result.data
        return $http.get(messageDetail.selectedMessage.sender)
    })
      .then(senderResult => {
        messageDetail.sender = senderResult.data
        $timeout()
      })
        .then(() => {console.log(messageDetail.sender)})

  messageDetail.sendMessage = function() {
    dataToPost = {"sender": `${messageDetail.userPk}`,
                  "recipient": messageDetail.sender.id,
                  "text": messageDetail.message}
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
