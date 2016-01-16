'use strict';

app.controller('virtualTourController', ['$scope', '$state', 'authToken',
    function ($scope, $state, authToken)
    {


        showPreloader();
        loadTour();
    }
]);


