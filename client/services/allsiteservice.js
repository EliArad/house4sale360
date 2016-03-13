
'use strict';

app.factory("allsite", ['$http', 'myConfig',
    function ($http, myConfig) {

        var isAgent;
        function setAgent(s) {

            isAgent = s;
        }
        function getAgent()
        {
            return isAgent;
        }
        return {
            setAgent: setAgent,
            getAgent: getAgent
        }
    }
]);


