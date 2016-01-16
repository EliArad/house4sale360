app.factory("authToken", function($cookies) {

  var setToken = function (token) {
    //$cookies.put('token', token);
    sessionStorage.setItem('token', token);
  }

  function getToken() {
     //return $cookies.get('token');
     return sessionStorage.getItem('token');
  }

  function isAuthenticated() {
    return !!getToken();
  }
  function RemoveToken() {
    //$cookies.remove('token');
    sessionStorage.removeItem('token');
  }

  return {
    setToken: setToken,
    getToken: getToken,
    isAuthenticated : isAuthenticated,
    RemoveToken:RemoveToken
  };

});
