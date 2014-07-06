'use strict';

var app = angular.module('bugtrackApp.flashService', []);

app.service('Flash', function($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    $rootScope.alerts = [];

    // this.sendMsg = function(type, msg) {
    //     return $rootScope.alerts = [{
    //         'type': type,
    //         'msg': msg
    //     }];
    // };

    this.addAlert = function(type, msg) {
        console.log(type, msg);
        $rootScope.alerts.push({
            'type': type,
            'msg': msg
        });
    };

    this.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };


});