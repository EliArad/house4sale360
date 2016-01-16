app.factory("citiesservice", function($http, $q,myConfig)
{
    var citiesData = [];
    var inaction  = false;

    function getcities(callback)
    {
        if (inaction == true)
        {
          callback(null, citiesData);
          return;
        }
          inaction = true;
        if (citiesData.length == 0) {
            //console.log('loading cities');
            var url = myConfig.url + '/api/getcities';
            $http.get(url).then(function(result){
                var errorHappend = false;


                var size = parseInt(result.data);
                console.log('cities size: ' + size);
                var chunk;
                var index = 0;
                var index1 = 0;
                while(size > 0)
                {
                    if (errorHappend == true)
                    {
                        console.log('error happend');
                        return;
                    }
                    chunk = Math.min(50, size);
                    size-=chunk;
                    console.log('size:' + size);
                    url = myConfig.url + '/api/getcitieschunk';
                    index1 = index;
                    index+=chunk;
                    $http.post(url, {size: size , index:index1, chunk:chunk}).then(function(result){
                      console.log('adding: ' + result.data.a.length);
                        for (var j = 0 ; j < result.data.a.length; j++) {
                            citiesData.push(result.data.a[j]);
                        }
                        if (result.data.size == 0)
                        {
                            //console.log('finished, we have the cities');
                            //console.log(citiesData);
                            console.log('size of cities is: ' + citiesData.length);
                            inaction = false;
                            citiesData.sort();
                            callback(null, citiesData);

                        }
                    }).catch (function(result){
                        citiesData = [];
                        //console.log('error get cities');
                        errorHappend = true;
                        callback('error', result);
                            inaction = false;
                    })
                }
            }).catch(function(result){
                citiesData = [];
                //console.log('error get cities');
                callback('error', result);
            });
        } else {
            //console.log('cities is already loaded');
            callback(null, citiesData);
        }
    }

    return {
        getcities:getcities
    }

  });
