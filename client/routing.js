app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/welcome');

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
    //controller: 'renthouseController'
  }).state('addnewsalehouse', {
    url: '/addnewsalehouse',
    templateUrl: '/client/views/addnewsalehouse.html'
  }).state('m', {
    url: '/',
    templateUrl: '/client/views/main.html'
  }).state('addnewrenthouse', {
    url: '/addnewrenthouse',
    templateUrl: '/client/views/addnewrenthouse.html'
  }).state('welcome', {
    url: '/welcome',
    templateUrl: '/client/views/welcome.html'
  });


  $httpProvider.interceptors.push('authIntercepter');

});
