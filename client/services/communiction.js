'use_strict'
app.factory("communication", function () {

    var search = {};
    var fastSearch = false;
    var advancedSearch = false;

    function isAdvancedSearch()
    {
        return advancedSearch;
    }
    function openAdvancedSearch(s)
    {
        advancedSearch = s;
    }
    function setFastSearch(s)
    {
        fastSearch =  s;
    }
    function isFastSearch()
    {
        return fastSearch;
    }
    function saveSearch(s)
    {
        search = s;
    }
    function getSearch()
    {
        return search;
    }

    return {
        saveSearch: saveSearch,
        getSearch:getSearch,
        setFastSearch:setFastSearch,
        isFastSearch:isFastSearch,
        isAdvancedSearch:isAdvancedSearch,
        openAdvancedSearch:openAdvancedSearch
    };

});

