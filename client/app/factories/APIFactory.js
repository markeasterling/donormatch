app.factory("APIFactory", ["$http", "apiUrl", function($http, apiUrl){

  const httpGet = $http.get(apiUrl)

  const getApiRoot = () => {
    return httpGet.then(res =>res.data)
  }

  return {}
}])
