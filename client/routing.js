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
  });

    $httpProvider.interceptors.push('authIntercepter');

});
