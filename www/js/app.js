'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pubnub', ['ionic', 'pubnub.controllers', 'pubnub.directives'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.contacts', {
                url: "/contacts",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contacts.html"
                    }
                }
            })
            .state('app.chatHistory', {
                url: "/chats",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chats.html",
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('app.groupChat', {
                url: "/group/chat",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat.html",
                        controller: 'ChatCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/chat/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat.html",
                        controller: 'ChatCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/group/chat');
    });
