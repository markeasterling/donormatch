app.controller("ProfileInfoCtrl", function($http, $location, authFactory) {
  const profileInfo = this

  $http.get("http://localhost:8000/get_profile_choices")
    .then((response => profileInfo.profileChoices = response.data))
      .then(() => console.log(profileInfo.profileChoices))

  profileInfo.postProfileInfo = function() {
    dataToPost = {}

  }
})
