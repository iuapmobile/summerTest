angular.module('starter.controllers', [])
    .controller('ContentController', function ($scope, $ionicSideMenuDelegate,$ionicHistory) {
        $scope.myname = '曹操';
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.goBack = function(){
            $ionicHistory.goBack();
        }
    })
    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('ContactsCtrl', function ($scope, Contacts) {
        $scope.contacts = Contacts.all();
        $scope.remove = function (contact) {
            Contacts.remove(contact);
        }
    })

    .controller('ContactDetailCtrl', function ($scope, $stateParams, Contacts) {
        $scope.editable = false;
        $scope.contact = Contacts.get($stateParams.contactId);
        $scope.setEditable = function(){
            $scope.editable = true;
        }
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('SideMenuCtrl', function ($scope,$ionicSideMenuDelegate) {
        $scope.$on('$ionicView.enter', function(){
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.$on('$ionicView.leave', function(){
            $ionicSideMenuDelegate.canDragContent(true);
        });
    });




