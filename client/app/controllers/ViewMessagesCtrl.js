app.controller("ViewMessagesCtrl", function($http, $location, authFactory) {
  const viewMessages = this
  viewMessages.userPk = authFactory.user.userId

  $http.post("http://localhost:8000/get_messages",
  {"user": viewMessages.userPk}, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
    .then(response => viewMessages.messages = response.data)
      .then(() => (console.log(viewMessages.messages)))
})
