app.controller("ViewMessagesDetailCtrl", function($http, $location, $routeParams, UserFactory, $timeout) {
  const messageDetail= this
  messageDetail.user = {}

  UserFactory.getUser().then((res) => {
    messageDetail.user = res
    $timeout()
  })
  //retrieve the username of the message sender
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

    //retrieve the username of the message recipient
    $http.get("http://localhost:8000/message/" + $routeParams.messageId + "/")
      .then(result => {
          messageDetail.selectedMessage = result.data
          return $http.get(messageDetail.selectedMessage.recipient)
      })
        .then(recipientResult => {
          messageDetail.recipient = recipientResult.data
          $timeout()
        })
          .then(() => {console.log(messageDetail.recipient)})

  messageDetail.sendMessage = function() {
    dataToPost = {
      "sender": `${messageDetail.user.id}`,
      "recipient": messageDetail.sender.id,
      "text": messageDetail.message
    }

    $http.post("http://localhost:8000/send_message",
      dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .success(res => {
        $location.path("/viewmessages")
      })
        .error(console.error)
  }


})
