'use strict';

app.factory("messageToLink", ['$cookies',
    function($cookies) {


        function buildLink(userguid, id, type) {

            var link = 'www.apt360.co.il/mypage?g=' + userguid + '&id=' + id + '&type=' + type;
            return link;
        }

        function BuildLinkFromSearch(search)
        {
            var link = 'www.apt360.co.il/main?agent=' + search.agent;
            link    += 'www.apt360.co.il/main?aircond=' + search.aircond;

            link    += 'www.apt360.co.il/main?balcony=' + search.balcony;
            link    += 'www.apt360.co.il/main?city=' + search.city;
            link    += 'www.apt360.co.il/main?mamad=' + search.mamad;
            link    += 'www.apt360.co.il/main?messagetype=' + search.messagetype;
            link    += 'www.apt360.co.il/main?aircond=' + search.numberofrooms;
            link    += 'www.apt360.co.il/main?aircond=' + search.neighborhood;
            link    += 'www.apt360.co.il/main?aircond=' + search.parking;
            link    += 'www.apt360.co.il/main?aircond=' + search.parkingtype;
            link    += 'www.apt360.co.il/main?aircond=' + search.parkingtype2;
            link    += 'www.apt360.co.il/main?aircond=' + search.parkingtype2;
            warehouse: "לא משנה לי"


            return link;
        }

        return {
            buildLink: buildLink,
            BuildLinkFromSearch:BuildLinkFromSearch
        };
    }
]);
