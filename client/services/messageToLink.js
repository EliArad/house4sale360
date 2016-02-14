'use strict';

app.factory("messageToLink", ['$cookies',
    function($cookies) {


        function buildLink(userguid, id, type) {

            var link = 'www.apt360.co.il/mypage?g=' + userguid + '&id=' + id + '&type=' + type;
            return link;
        }

        function BuildLinkFromSearch(search,citiesSelected)
        {
            var link = 'www.apt360.co.il/main?agent=' + search.agent;
            if (search.aircond != 'הכל')
                link    += '&aircond=' + search.aircond;
            var pstr1= '';
            var index = 0;
            for (var i = 0 ; i < citiesSelected.length; i++)
            {
                if (index > 0)
                    pstr1 += ',';
                pstr1+= citiesSelected[i].name;
                index++;
            }

            if (search.balcony != 'לא משנה לי')
                link    += '&balcony=' + search.balcony;
            link    += '&city=' + pstr1;
            if (search.mamad != 'לא משנה לי')
                link    += '&mamad=' + search.mamad;
            link    += '&messagetype=' + search.messagetype;

            if (search.numberofrooms != 'הכל')
                link    += '&numberofrooms=' + search.numberofrooms;

            if (search.neighborhood != '' && search.neighborhood != undefined)
                link    += '&neighborhood=' + search.neighborhood;
            if (search.parking != 'לא משנה לי')
                link    += '&parking=' + search.parking;

            if (search.parkingtype != 'לא משנה לי')
                link    += '&parkingtype=' + search.parkingtype;

            if (search.parkingtype2 != 'לא משנה לי')
                link    += '&parkingtype2=' + search.parkingtype2;

            if (search.warehouse != 'לא משנה לי')
                link    += '&warehouse=' + search.warehouse;
            if (search.elevator != 'לא משנה לי')
                link    += '&elevator=' + search.elevator;
            if (search.floor != undefined)
                link    += '&floor=' + search.floor;
            if (search.fromfloor != undefined)
                link    += '&fromfloor=' + search.fromfloor;
            if (search.price != undefined)
                link    += '&price=' + search.price;

            var replaced = link.split(' ').join('%20');

            return replaced;
        }

        return {
            buildLink: buildLink,
            BuildLinkFromSearch:BuildLinkFromSearch
        };
    }
]);
