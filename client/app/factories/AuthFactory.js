app.factory("authFactory", () => {
  let user = null;
  console.log("authfactory user", user)

  return {
    user
  };
});
