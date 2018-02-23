(function(angular) {
  'use strict';
angular.module('users-center', ['dialog'])
  .service('usersService', UsersService)

  .component('usersCenter', {
    template: '<h2>Users Center</h2><ng-outlet></ng-outlet>',
    $routeConfig: [
      {path:'/',    name: 'UsersList',   component: 'usersList', useAsDefault: true},
      {path:'/:id', name: 'UsersDetail', component: 'usersDetail'}
    ]
  })

  .component('usersList', {
    template:
      '<ul>\n' +
      '  <li ng-repeat="users in $ctrl.user"\n' +
      '    ng-class="{ selected: $ctrl.isSelected(users) }"\n' +
      '    ng-click="$ctrl.onSelect(users)">\n' +
      '    <span class="badge">{{users.id}}</span> {{users.fname}} {{users.mname}} {{users.lname}}\n' +
      '  </li>\n' +
      '</ul>\n', 
    bindings: { $router: '<' },
    controller: UsersListComponent,
    $canActivate: function($nextInstruction, $prevInstruction) {
      console.log('$canActivate', arguments);
    }
  })

  .component('usersDetail', {
    templateUrl: 'usersDetail.html',
    bindings: { $router: '<' },
    controller: UsersDetailComponent
  });


function UsersService($q) {
  var userPromise = $q.resolve([
    {id: 1, fname: 'Veselin',     mname: 'Vladimorov' , lname: 'Beev',      balance: 125, streetaddress: 'petko d petkov 74', creditcard:'visa'}, 
    {id: 2, fname: 'Dragomor',    mname: 'Ivanov' ,     lname: 'Dimotrov',  balance: 125, streetaddress: 'raicho  petkov 63', creditcard:'mastercard'},
    {id: 3, fname: 'Georgi',      mname: 'Dimitrov' ,   lname: 'Georgiev',  balance: 125, streetaddress: 'doncho  petkov 7',  creditcard:'mastercard'},
    {id: 4, fname: 'Aleksander',  mname: 'Aleks' ,      lname: 'Staviiski', balance: 125, streetaddress: 'ivan d petkov 23',  creditcard:'visa'} 
  ]);

  this.getUser = function() {
    return userPromise;
  };

  this.getUsers = function(id) {
    return userPromise.then(function(user) {
      for (var i = 0; i < user.length; i++) {
        if (user[i].id === id) return user[i];
      }
    });
  };
}

function UsersListComponent(usersService) {
  var selectedId = null;
  var ctrl = this;

  this.$routerOnActivate = function(next) {
    console.log('$routerOnActivate', this, arguments);
    // Load up the user for this view
    usersService.getUser().then(function(user) {
      ctrl.user = user;
      selectedId = next.params.id;
    });
  };

  this.isSelected = function(users) {
    return (users.id === selectedId);
  };

  this.onSelect = function(users) {
    this.$router.navigate(['UsersDetail', { id: users.id }]);
  };
}

function UsersDetailComponent(usersService, dialogService) {
  var ctrl = this;
  this.$routerOnActivate = function(next) {
    // Get the users identified by the route parameter
    var id = next.params.id;
    usersService.getUsers(id).then(function(users) {
      if (users) {
        ctrl.editFName = users.fname;
        ctrl.editMName = users.mname;
        ctrl.editLName = users.lname;
        ctrl.editBalance = users.balance;
        ctrl.editStreetAddress = users.streetaddress;
        ctrl.editCreditCard = users.creditcard;
        ctrl.users = users;
      } else { // id not found
        ctrl.gotoUser();
      }
    });
  };

  this.$routerCanDeactivate = function() {
    // Allow synchronous navigation (`true`) if no users or the users is unchanged.
    if (!this.users || this.users.fname === this.editFName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return dialogService.confirm('Discard changes?');
  };

  this.cancel = function() {
    ctrl.editFName          = ctrl.users.fname;
    ctrl.editMName          = ctrl.users.mname;
    ctrl.editLName          = ctrl.users.lname;
    ctrl.editBalance        = ctrl.users.balance;
    ctrl.editStreetAddress	= ctrl.users.streetaddress;
    ctrl.editCreditCard     = ctrl.users.creditcard;
    ctrl.gotoUser();
  };

  this.save = function() {
    ctrl.users.fname          = ctrl.editFName;
    ctrl.users.mname          = ctrl.editMName;
    ctrl.users.lname          = ctrl.editLName;
    ctrl.users.balance        = ctrl.editBalance;
    ctrl.users.streetaddress  = ctrl.editStreetAddress;
    ctrl.users.creditcard     = ctrl.editCreditCard;

    ctrl.gotoUser();
  };

  this.gotoUser = function() {
    var usersId = ctrl.users && ctrl.users.id;
    // Pass along the hero id if available
    // so that the UsersListComponent can select that hero.
    this.$router.navigate(['UsersList', {id: usersId}]);
  };
}
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/