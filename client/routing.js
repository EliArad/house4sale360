app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: '/client/views/register.html',
    controller: 'RegistrationController'
  }).state('login', {
    url: '/login',
    templateUrl: '/client/views/login.html',
    controller: 'LoginController'
  }).state('main', {
    url: '/main',
    templateUrl: '/client/views/main.html',
    controller: 'MainController'
  }).state('logout', {
    url: '/logout',
    controller: 'LogoutController'
  }).state('advertisehousesale', {
    url: '/advertisehousecsale',
    templateUrl: '/client/views/salehouse.html',
    controller: 'salehouseController'
  }).state('advertisehouserent', {
    url: '/advertisehouserent',
    templateUrl: '/client/views/renthouse.html',
    controller: 'renthouseController'
  }).state('addnewsalehouse', {
    url: '/addnewsalehouse',
    templateUrl: '/client/views/addnewsalehouse.html',
    controller: 'addnewsalehouseController'
  });






  $httpProvider.interceptors.push('authIntercepter');

});
