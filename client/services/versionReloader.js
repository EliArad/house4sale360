app.factory("versionReloader", function(general,$interval) {

    var started = false;
    var myVar;

    var pageCallbacks = [];

    function addPage(callback)
    {
        pageCallbacks.push(callback);
    }

    function start() {

        if (started == true)
            return true;
        started = true;

        var self = general;
        myVar = $interval(function() {
            self.getVersion(function (reload) {
                if (reload == true) {
                    console.log('need to reload');
                    pageCallbacks.forEach(function(entry) {
                        entry();
                    });
                } else {
                    console.log('no need to reload');
                }
            });

        }, 60000, self);
    }

    return {
        start:start,
        addPage:addPage
    }

});