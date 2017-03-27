//CURRENTLY NOT IN USE

// app.controller("ProfileInfoCtrl", function($http, $location, authFactory) {
//   const profileInfo = this
//   profileInfo.username = authFactory.user.username
//   profileInfo.userPk = authFactory.user.userId
//
//   $http.get("http://localhost:8000/get_profile_choices")
//     .then((response => profileInfo.profileChoices = response.data))
//       .then(() => console.log(profileInfo.profileChoices))
//
//   profileInfo.postProfileInfo = function() {
//     dataToPost = {"user": `${profileInfo.userPk}`,
//                   "category": profileInfo.chosenChoice[0],
//                   "EIN": profileInfo.informationNumber,
//                   "address": profileInfo.address,
//                   "phone": profileInfo.phone}
//
//     $http.post("http://localhost:8000/post_profile_info",
//       dataToPost, {headers:{"Content-Type": 'application/x-www-form-urlencoded'}})
//       .success(res => {
//         if (res.success) {
//           console.log("it works")
//       }
//     }).error(console.error)
//         .then(() => {$location.path("/landing")})
//   }
//
//
// })
