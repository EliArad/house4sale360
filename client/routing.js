app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/client/views/register.html?2'
        }).state('login', {
            url: '/login?msg',
            templateUrl: '/client/views/login.html?2',
            controller: 'LoginController'
        }).state('main', {
            url: '/main?agent&aircond=&balcony=&city=&mamad=&messagetype=&numberofrooms=&neighborhood=&parking=&parkingtype=&parkingtype2=&warehouse=&elevator=&floor=&fromfloor=&price=&mid=&rdl=',
            templateUrl: '/client/views/main.html?5'
        }).state('logout', {
            url: '/logout',
            controller: 'LogoutController'
        }).state('advertisehousesale', {
            url: '/advertisehousesale',
            templateUrl: '/client/views/advertisehousesale.html?2'
        }).state('advertisehouserent', {
            url: '/advertisehouserent',
            templateUrl: '/client/views/advertisehouserent.html?2'
        }).state('addnewsalehouse', {
            url: '/addnewsalehouse',
            templateUrl: '/client/views/addnewsalehouse.html?2'
        }).state('addnewrenthouse', {
            url: '/addnewrenthouse',
            templateUrl: '/client/views/addnewrenthouse.html?2'
        }).state('/', {
            url: '/',
            templateUrl: '/client/views/welcome.html?6'
        }).state('kablanhouse', {
            url: '/kablanhouse',
            templateUrl: '/client/views/kablanhouse.html?2'
        }).state('addnewblankhouse', {
            url: '/addnewblankhouse',
            templateUrl: '/client/views/addnewblankhouse.html?2'
        }).state('image360howto', {
            url: '/howto360?helptopic',
            controller: 'howto360Controller',
            templateUrl: '/client/views/howto360.html?2'
        }).state('video360howto', {
            url: '/howto360?helptopic',
            controller: 'howto360Controller',
            templateUrl: '/client/views/howto360.html?2'
        }).state('admin', {
            url: '/admin',
            templateUrl: '/client/views/admin.html?2'
        }).state('verifiedok', {
            url: '/verifiedok',
            controller: 'verifiedokController',
            templateUrl: '/client/views/verifiedok.html?2'
        }).state('contactus', {
            url: '/contactus',
            templateUrl: '/client/views/contactus.html?2'
        }).state('virtualrealityrpage', {
            url: '/virtualrealityrpage',
            controller: 'vrController',
            templateUrl: '/client/views/virtualrealityrpage.html?2'
        }).state('help', {
            url: '/help',
            templateUrl: '/client/views/help.html?2'
        }).state('siterules', {
            url: '/siterules',
            templateUrl: '/client/views/siterules.html?2'
        }).state('admincontactus', {
            url: '/admincontactus',
            templateUrl: '/client/views/admincontactus.html?2'
        }).state('mypage', {
            //url: '/mypage?g=&y=',
            url: '/mypage?g&id=&type=',
            templateUrl: '/client/views/mypage.html?2'
        }).state('resetpassword', {
            url: '/resetpassword?id',
            templateUrl: '/client/views/resetpassword.html?2'
        }).state('privacyinfo', {
            url: '/privacyinfo',
            templateUrl: '/client/views/privacyinfo.html?2'
        }).state('deleteaccount', {
            url: '/deleteaccount',
            templateUrl: '/client/views/deleteaccount.html?2'
        }).state('usersview', {
            url: '/usersview',
            templateUrl: '/client/views/usersview.html?2'
        }).state('virtualtourexp', {
            url: '/virtualtourexp',
            templateUrl: '/client/views/virtualtourexp.html?2'
        }).state('virtualtourvrexp', {
            url: '/virtualtourvrexp',
            templateUrl: '/client/views/virtualtourvrexp.html?2'
        });


        $locationProvider.hashPrefix("!");
        $locationProvider.html5Mode(true); //Attention backend must be configured accordingly
        $httpProvider.interceptors.push('authIntercepter');

    }]);
