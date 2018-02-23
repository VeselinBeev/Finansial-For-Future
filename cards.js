(function(angular) {
  'use strict';
angular.module('cards', [])
  .service('cardService', CardService)

  .component('cards', {
    template: '<h2>Cards</h2><ng-outlet></ng-outlet>',
    $routeConfig: [
      {path: '/',    name: 'CardList',   component: 'cardList', useAsDefault: true},
      {path: '/:id', name: 'CardDetail', component: 'cardDetail'}
    ]
  })

  .component('cardList', {
    template:
      '<div ng-repeat="card in $ctrl.cards" ' +
      '     ng-class="{ selected: $ctrl.isSelected(card) }">\n' +
        '<a ng-link="[\'CardDetail\', {id: card.id}]">{{card.name}}</a>\n' +
      '</div>',
    controller: CardListComponent
  })

  .component('cardDetail', {
    template:
      '<div ng-if="$ctrl.card">\n' +
      '  <h3>"{{$ctrl.card.name}}"</h3>\n' +
      '  <div>\n' +
      '    <label>Id: </label>{{$ctrl.card.id}}</div>\n' +
      '  <div>\n' +
      '    <label>Name: </label>\n' +
      '    <input ng-model="$ctrl.card.name" placeholder="name"/>\n' +
      '  </div>\n' +
      '  <button ng-click="$ctrl.gotoCards()">Back</button>\n' +
      '</div>\n',
    bindings: { $router: '<' },
    controller: CardDetailComponent
  });


function CardService($q) {
  var cardsPromise = $q.resolve([
    { id: 11, name: 'Visa Electron' },
    { id: 12, name: 'Maestro' },
    { id: 13, name: 'Master Card' }
  ]);

  this.getCards = function() {
    return cardsPromise;
  };

  this.getCard = function(id) {
    return cardsPromise.then(function(cards) {
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === id) return cards[i];
      }
    });
  };
}

function CardListComponent(cardService) {
  var selectedId = null;
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    // Load up the cards for this view
      cardService.getCards().then(function(cards) {
      $ctrl.cards = cards;
      selectedId = next.params.id;
    });
  };

  this.isSelected = function(card) {
    return (card.id === selectedId);
  };
}

function CardDetailComponent(cardService) {
  var $ctrl = this;

  this.$routerOnActivate = function(next) {
    // Get the card identified by the route parameter
    var id = next.params.id;
    cardService.getCard(id).then(function(card) {
      $ctrl.card = card;
    });
  };

  this.gotoCards = function() {
    var cardId = this.card && this.card.id;
    this.$router.navigate(['CardList', {id: cardId}]);
  };
}
})(window.angular);

/*
Copyright 2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/