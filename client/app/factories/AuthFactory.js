app.factory("authFactory", () => {
  let user = {current:null};
  console.log("authfactory user", user)

  return {
    user
  };
});
