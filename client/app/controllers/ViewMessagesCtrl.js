app.controller("ViewMessagesCtrl", function($http, $location, UserFactory, $location, $timeout) {
  const viewMessages = this
  viewMessages.user = {}

  UserFactory.getUser().then((res) => {
    viewMessages.user = res
    viewMessages.get_messages()
  })

  viewMessages.get_messages = function(){
    $http.post("http://localhost:8000/get_messages",
    {"user": viewMessages.user.id }, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
      .then(response => viewMessages.messages = response.data)
        .then(() => (console.log(viewMessages.messages)))
  }
})
