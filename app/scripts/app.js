'use strict';

angular
    .module('bugtrackApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'bug.controllers',
        'bug.services',
        'bug.factory',
        'bugConfig.services',
        'bugConfig.controllers',
        'bugTexteditor.directive',
        'bugtrackApp.flashService'
        //   'angular-flash.service',
        //  'angular-flash.flash-alert-directive'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/list.html',
                controller: 'bugListCtrl'
            })
            .when('/new', {
                templateUrl: 'views/new.html',
                controller: 'newBugCtrl'
            })
            .when('/list', {
                templateUrl: 'views/list.html',
                controller: 'bugListCtrl'
            })
            .when('/config', {
                templateUrl: 'views/config.html',
                controller: 'bugConfigCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });