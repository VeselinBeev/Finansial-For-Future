(function(angular) {
  'use strict';
angular.module('app', ['ngComponentRouter', 'cards', 'users-center'])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'app')

.component('app', {
  template:
    '<nav>\n' +
    '  <a ng-link="[\'UsersCenter\']">Users Info</a>\n' +
    '  <a ng-link="[\'Cards\']">Cards</a>\n' +
    '</nav>\n' +
    '<ng-outlet></ng-outlet>\n',
  $routeConfig: [
    {path: '/users-center/...', name: 'UsersCenter', component: 'usersCenter', useAsDefault: true},
    {path: '/cards/...', name: 'Cards', component: 'cards' }
  ]
});
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/