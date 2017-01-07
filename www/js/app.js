(function() {
    var app = angular.module('mynotes', ['ionic', 'mynotes.notestore']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('list', {
            url: "/list",
            templateUrl: "templates/list.html"
        });

        //usando o mesmo template para dois states diferentes
        $stateProvider.state('edit', {
            url: "/edit/:noteId",
            templateUrl: "templates/edit.html",
            controller: 'EditCtrl'
        });

        $stateProvider.state('add', {
            url: "/add",
            templateUrl: "templates/edit.html",
            controller: 'AddCtrl'
        });
        
        $urlRouterProvider.otherwise("/list");
    });

    app.controller('ListCtrl', function($scope, NoteStore) {
        $scope.notes = NoteStore.list();
    });

    app.controller('EditCtrl', function($scope, $state, NoteStore) {
        //Cria uma copia, para não alterar definitivamente enquanto não clicar no botão salvar
        console.log($state.params);
        $scope.note = angular.copy(NoteStore.get($state.params.noteId));
        
        $scope.save = function() {
            NoteStore.update($scope.note);
            $state.go('list');
        };
    });
    
    app.controller('AddCtrl', function($scope, $state, NoteStore) {
        $scope.note = {
            id: new Date().getTime().toString(),
            title: '',
            description: ''
        };
        
        $scope.save = function() {
            NoteStore.create($scope.note);
            $state.go('list');
        };
    });

    app.run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });
}());
