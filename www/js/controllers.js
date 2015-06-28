'use strict';
angular.module('pubnub.controllers', [])

    .controller('AppCtrl', AppCtrl)

    .controller('ChatsCtrl', ChatsCtrl)
    .controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

        $scope.hideTime = true;

        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function() {
            alternate = !alternate;

            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.messages.push({
                userId: alternate ? '12345' : '54321',
                text: $scope.data.message,
                time: d
            });

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };


        $scope.inputUp = function() {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function() {
            // cordova.plugins.Keyboard.close();
        };


        $scope.data = {};
        $scope.myId = '12345';
        $scope.messages = [];

    })

    .controller('ChatCtrl', ChatCtrl);

function AppCtrl ($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
}

function ChatsCtrl($scope) {

}

function ChatCtrl($scope, $stateParams) {
    $scope.init = function () {
        $scope.message={};
        $scope.message.id = 1;
        PUBNUB_demo.subscribe({
            channel: 'company_chat_group',
            message: function(m){console.log(m)}
        });
    };

    $scope.publishToCompanyGroup = function () {
        PUBNUB_demo.publish({
            channel: 'company_chat_group',
            message: {"message": $scope.message.text}
        });
    };

    $scope.$on('$ionicView.enter', function(e) {
        $scope.init();
    });
}

