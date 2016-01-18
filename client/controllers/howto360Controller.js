'use strict';


app.controller('howto360Controller', ['$scope', '$state','$stateParams',
    function ($scope, $state,$stateParams) {


        console.log($stateParams.helptopic);
    }
]);
