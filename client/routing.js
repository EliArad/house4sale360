app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider,$urlRouterProvider, $httpProvider, citiesservice) {
//app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
  });




  $httpProvider.interceptors.push('authIntercepter');

}]);
