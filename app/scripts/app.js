'use strict';

var app = angular.module('bugtrackApp', [
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
    'bugtrackApp.flashService',
    'xeditable'
    //   'angular-flash.service',
    //  'angular-flash.flash-alert-directive'
]);

app.config(function($routeProvider) {
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
        .when('/bug/:id', {
            templateUrl: 'views/bugdetails.html',
            controller: 'bugViewCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});