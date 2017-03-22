app.factory("UserFactory", ["APIFactory", "$http", function(APIFactory, $http, $cookies) {

  let user = {"userid":null,"username":null}
  let encodedCredentials = ""




  //TODO: Able to query for user with username via api url. Now I need to have the user object stored from this.
  const setUser = () => {
    // if (encodedCredentials.length !== 0) {
      // console.log(user[0] == undefined)
      const decoded = window.atob(encodedCredentials).split(":")
      console.log("decoded credentials",decoded)
      // console.log('URLURLRURLRURL', `http://localhost:8000/user?username=${decoded[0]}`)
      // console.log("hello hi",$http.get(`http://localhost:8000/user?username=${decoded[0]}`))
      // thingy = $http.get(`http://localhost:8000/user?username=${decoded[0]}`)

        return $http.get(`http://localhost:8000/user?username=${decoded[0]}`)
          .then((res) => {
            user = res.data[0]
            console.log("this here is the user from userfactory",user)
            return user
            //console.log(`${root.users}?username=${decoded[0]}`)
            // return $http.get(`${root.users}?username=${decoded[0]}`)
          }, console.error)
      // } else {
        // user = {}
      // }


  }

  return {
    setEncodedCredentials:(credentials) => {
      encodedCredentials = credentials
      console.log('credentials have been set!', encodedCredentials)
    },

    getUser: () => {
        return setUser()
    },

  }


}])
