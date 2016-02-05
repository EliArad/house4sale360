app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/client/views/register.html'
        }).state('login', {
            url: '/login',
            templateUrl: '/client/views/login.html',
            controller: 'LoginController'
        }).state('main', {
            url: '/main',
            templateUrl: '/client/views/main.html'
        }).state('logout', {
            url: '/logout',
            controller: 'LogoutController'
        }).state('advertisehousesale', {
            url: '/advertisehousecsale',
            templateUrl: '/client/views/salehouse.html'
        }).state('advertisehouserent', {
            url: '/advertisehouserent',
            templateUrl: '/client/views/renthouse.html'
        }).state('addnewsalehouse', {
            url: '/addnewsalehouse',
            templateUrl: '/client/views/addnewsalehouse.html'
        }).state('addnewrenthouse', {
            url: '/addnewrenthouse',
            templateUrl: '/client/views/addnewrenthouse.html'
        }).state('/', {
            url: '/',
            templateUrl: '/client/views/welcome.html'
        }).state('kablanref', {
            url: '/kablanref',
            templateUrl: '/client/views/kablanhouse.html'
        }).state('addnewblankhouse', {
            url: '/addnewblankhouse',
            templateUrl: '/client/views/addnewblankhouse.html'
        }).state('image360howto', {
            url: '/howto360?helptopic',
            controller: 'howto360Controller',
            templateUrl: '/client/views/howto360.html'
        }).state('video360howto', {
            url: '/howto360?helptopic',
            controller: 'howto360Controller',
            templateUrl: '/client/views/howto360.html'
        }).state('admin', {
            url: '/admin',
            templateUrl: '/client/views/admin.html'
        }).state('verifiedok', {
            url: '/verifiedok',
            controller: 'verifiedokController',
            templateUrl: '/client/views/verifiedok.html'
        }).state('contactus', {
            url: '/contactus',
            templateUrl: '/client/views/contactus.html'
        }).state('vrpage', {
            url: '/vrpage',
            controller: 'vrController',
            templateUrl: '/client/views/vr.html'
        }).state('help', {
            url: '/help',
            templateUrl: '/client/views/help.html'
        }).state('siterules', {
            url: '/siterules',
            templateUrl: '/client/views/siterules.html'
        }).state('admincontactus', {
            url: '/admincontactus',
            templateUrl: '/client/views/admincontactus.html'
        }).state('mypage', {
            url: '/mypage',
            templateUrl: '/client/views/mypage.html'
        }).state('resetpassword', {
            url: '/resetpassword?id',
            templateUrl: '/client/views/resetpassword.html'
        }).state('privacyinfo', {
            url: '/privacyinfo',
            templateUrl: '/client/views/privacyinfo.html'
        }).state('deleteaccount', {
            url: '/deleteaccount',
            templateUrl: '/client/views/deleteaccount.html'
        });


        $locationProvider.hashPrefix("!");
        $locationProvider.html5Mode(true); //Attention backend must be configured accordingly
        $httpProvider.interceptors.push('authIntercepter');

    }]);
