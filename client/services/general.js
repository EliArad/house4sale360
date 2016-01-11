app.factory("general", function($http, $q,myConfig){


  var getStreets = function (code) {
    var url = myConfig.url+ '/api/getStreets';
    return $http.post(url, {code:code});
  }

  var getSchonot = function (code) {
    var url = myConfig.url+ '/api/getSchonot';
    return $http.post(url, {code:code});
  }

  var sendMail = function(mailParams)
  {
    return $http.post(myConfig.url + "/api/send",mailParams).
      then(sendResponseData).
      catch(sendResponseError);
  }
  function sendResponseData(response)
  {

    return response.data;
  }
  function sendResponseError(response)
  {

    return $q.reject("error from send " + response.status);
  }

  return{
    sendMail: sendMail,
    getStreets:getStreets,
    getSchonot:getSchonot
  };
});
