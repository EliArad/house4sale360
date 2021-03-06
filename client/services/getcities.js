'use_strict'

app.factory("citiesservice", ['$http', '$q','myConfig',
    function($http, $q,myConfig) {
        var citiesDataAll = [];
        var citiesDataOnly = [];
        var inaction = false;

        function getcities_ready() {

            return citiesDataOnly;
        }
        var citiesLoaderCallback = [];

        function registerCitiesLoaded(callback)
        {
            citiesLoaderCallback.push(callback);
        }

        function getcities_all_ready() {

            return citiesDataAll;
        }

        function getcitiesatonce(callback) {
            if (inaction == true) {
                callback('inprocess', citiesDataAll);
                return;
            }

            var url = myConfig.url + '/api/getcitiesatonce';
            $http.get(url).then(function (result) {
                citiesDataAll = angular.copy(result.data);
                for (var j = 0; j < (result.data.length); j++) {
                    try {
                        //console.log(result.data[j].city);
                        citiesDataOnly[j] = (result.data[j].city);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                if (citiesLoaderCallback != [])
                {
                    for (var i = 0 ; i < citiesLoaderCallback.length; i++) {
                        citiesLoaderCallback[i](citiesDataAll, citiesDataOnly);
                    }
                }
                //console.log(citiesDataAll);
                callback(null, citiesDataAll);
            }).catch(function (result) {
                citiesDataAll = [];
                //console.log('error get cities');
                callback('error', result);
                inaction = false;
            });
        }

        function getcities(callback) {
            if (inaction == true) {
                callback('inprocess', citiesDataAll);
                return;
            }
            inaction = true;
            if (citiesDataAll.length == 0) {
                //console.log('loading cities');
                var url = myConfig.url + '/api/getcities';
                $http.get(url).then(function (result) {
                    var errorHappend = false;
                    var size = parseInt(result.data);
                    //console.log('cities size: ' + size);
                    var chunk;
                    var index = 0;
                    var index1 = 0;
                    while (size > 0) {
                        if (errorHappend == true) {
                            console.log('error happend');
                            return;
                        }
                        //chunk = Math.min(50, size);
                        chunk = size;
                        size -= chunk;
                        //console.log('size:' + size);
                        url = myConfig.url + '/api/getcitieschunk';
                        index1 = index;
                        index += chunk;
                        $http.post(url, {size: size, index: index1, chunk: chunk}).then(function (result) {
                            var resize = result.data.a.length;
                            //console.log(result.data);
                            //console.log('adding: ' + resize);
                            var x = 0;
                            for (var j = result.data.index; j < (result.data.index + resize); j++) {
                                try {


                                    citiesDataOnly[j] = (result.data.a[x].city);
                                    citiesDataAll[j] = (result.data.a[x]);
                                    x++;
                                }
                                catch (e) {

                                    console.log(e + '  ' + x);
                                    console.log(result.data);
                                }
                            }
                            if (result.data.size == 0) {
                                //console.log('finished, we have the cities');
                                //console.log(citiesData);
                                //console.log('size of cities is: ' + citiesData.length);
                                inaction = false;
                                callback(null, citiesDataAll);


                            }
                        }).catch(function (result) {
                            citiesDataAll = [];
                            //console.log('error get cities');
                            errorHappend = true;
                            callback('error', result);
                            inaction = false;
                        })
                    }
                }).catch(function (result) {
                    citiesDataAll = [];
                    //console.log('error get cities');
                    callback('error', result);
                });
            } else {
                //console.log('cities is already loaded');
                callback(null, citiesData);
            }
        }

        return {
            getcities: getcities,
            getcities_ready: getcities_ready,
            getcities_all_ready: getcities_all_ready,
            getcitiesatonce:getcitiesatonce,
            registerCitiesLoaded:registerCitiesLoaded
        }
    }
]);
