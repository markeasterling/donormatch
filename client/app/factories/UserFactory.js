app.factory("UserFactory", ["APIFactory", "$http", function(APIFactory, $http, $cookies) {

  let user = {"userid":null,"username":null}
  let encodedCredentials = ""

  const setUser = () => {
      const decoded = window.atob(encodedCredentials).split(":")
      console.log("decoded credentials",decoded)

        return $http.get(`http://localhost:8000/user?username=${decoded[0]}`)
          .then((res) => {
            user = res.data[0]
            return user
          }, console.error)
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
