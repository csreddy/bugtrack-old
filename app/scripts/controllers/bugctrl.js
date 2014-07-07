'use strict';

var app = angular.module('bug.controllers', ['ui.bootstrap']);
app.constant('RESTURL', 'http://' + location.hostname + ':' + location.port);

app.controller('newBugCtrl', ['$scope', '$location', 'RESTURL', 'BugService', 'bugFactory', 'bugConfigFactory', 'Flash',

    function($scope, $location, RESTURL, BugService, bugFactory, bugConfigFactory, Flash) {
        //$scope.test = 'controller works';

        // accordiion interactions

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.config = {};
        bugConfigFactory.getConfig().then(function(response) {
            $scope.config = response.data;
        });

        // initialize scope variables
        // $scope.id = null;
        // $scope.title = null;
        // $scope.submittedBy = null;
        // $scope.assignTo = null;
        // $scope.description = null;
        // $scope.samplequery = null;
        // $scope.sampledata = null;
        // $scope.stacktrace = null;
        // $scope.cloneOf = null;
        // $scope.clones = [];
        // $scope.category = null;
        // $scope.priority = null;
        // $scope.relation = null;
        $scope.relatedTo = [];
        // $scope.version = null;
        // $scope.platform = 'all';
        // $scope.memory = null;
        // $scope.processors = null;
        // $scope.note = null;
        // $scope.headline = null;
        // $scope.supportDescription = null;
        // $scope.workaround = null;
        // $scope.publishStatus = 'Not ready';
        // $scope.tickets = [];
        // $scope.customerImpact = null;


        $scope.relatedTasks = [
            'Requirements task for',
            'Functional Spec task for',
            'Test Specification task for',
            'Test Automation task for',
            'Documentation task for',
            'Sub-task of'
        ];

        $scope.setQuery = function(samplequery) {
            $scope.samplequery = samplequery;
        };
        $scope.setSampledata = function(sampledata) {
            $scope.sampledata = sampledata;
        };
        $scope.setStacktrace = function(stacktrace) {
            $scope.stacktrace = stacktrace;
        };

        $scope.setCategory = function(category) {
            $scope.category = category;
        };

        $scope.setAssignTo = function(assignTo) {
            $scope.assignTo = assignTo;
        };

        $scope.setSeverity = function(severity) {
            $scope.severity = severity;
        };

        $scope.setPriority = function(priority) {
            $scope.priority = priority;
        };

        $scope.setToFixIn = function(tofixin) {
            $scope.tofixin = tofixin;
        };

        $scope.setRelation = function(relation) {
            $scope.relation = relation;
        };

        $scope.setRelatedTo = function(relatedTo) {
            var tokenizedTaskIds = relatedTo.split(',');
            for (var i = 0; i < tokenizedTaskIds.length; i++) {
                tokenizedTaskIds[i] = parseInt(tokenizedTaskIds[i].replace(/ /g, ''));
            }
            $scope.relatedTo = tokenizedTaskIds;
        };

        $scope.setVersion = function(version) {
            $scope.version = version;
        };

        $scope.setPlatform = function(platform) {
            $scope.platform = platform;
        };

        $scope.setMemory = function(memory) {
            $scope.memory = memory;
        };

        $scope.setProcessors = function(processors) {
            $scope.processors = processors;
        };

        $scope.setNote = function(note) {
            $scope.note = note;
        };

        $scope.setHeadline = function(headline) {
            $scope.headline = headline;
        };

        $scope.setSupportDescription = function(supportDescription) {
            $scope.supportDescription = supportDescription;
        };

        $scope.setWorkaround = function(workaround) {
            $scope.workaround = workaround;
        };

        $scope.setPublishStatus = function(publishStatus) {
            $scope.publishStatus = publishStatus;
        };

        $scope.setTickets = function(setTickets) {
            var tokenizedTickets = setTickets.split(',');
            for (var i = 0; i < tokenizedTickets.length; i++) {
                tokenizedTickets[i] = parseInt(tokenizedTickets[i].replace(/ /g, ''));
            }
            $scope.tickets = tokenizedTickets;
        };

        $scope.setCustomerImpact = function(customerImpact) {
            $scope.customerImpact = customerImpact;
        };

        $scope.createNewBug = function() {
            var bugId = Math.floor(Math.random() * 10000);
            var bug = {};
            bug.relatedTo = [];
            bug.tickets = [];

            bug.id = bugId;
            bug.createdAt = new Date();
            bug.modifiedAt = bug.createdAt;
            bug.status = $scope.config.status[1];
            bug.title = $scope.title;
            bug.submittedBy = 'sudhakar'; //$scope.creator;
            bug.assignTo = $scope.assignTo;
            bug.description = $scope.description;
            bug.samplequery = $scope.samplequery;
            bug.sampledata = $scope.sampledata;
            bug.stacktrace = $scope.stacktrace;

            // $scope.cloneOf = null;
            // $scope.clones;
            bug.category = $scope.category;
            bug.tofixin = $scope.tofixin;
            bug.severity = $scope.severity;
            bug.priority = $scope.priority;
            bug.relation = $scope.relation;
            bug.relatedTo = $scope.relatedTo;
            //bug.relatedTo.push($scope.relatedTo);
            bug.version = $scope.version;
            bug.platform = $scope.platform;
            bug.memory = $scope.memory;
            bug.processors = $scope.processors;
            bug.note = $scope.note;
            bug.headline = $scope.headline;
            bug.supportDescription = $scope.supportDescription;
            bug.workaround = $scope.workaround;
            bug.publishStatus = $scope.publishStatus;
            bug.tickets.push($scope.tickets);
            bug.customerImpact = $scope.customerImpact;


            var uri = bugId + '.json';
            BugService.putDocument(uri, bug).then(function() {
                    console.log('bug details ', bug);
                    $location.path('/list');
                    Flash.addAlert('success', bugId + ' was successfully created');

                },
                function(response) {
                    Flash.addAlert('danger', response.data.error.message);
                }
            );
        };


        // text editor for bug descrition	
        //  $scope.descrizione = undefined;

    }
]);



app.controller('bugListCtrl', ['$scope', '$location', 'RESTURL', 'BugService', 'bugFactory', 'Flash',

    function($scope, $location, RESTURL, BugService, bugFactory, Flash) {

        BugService.getBugs().then(function(response) {
            $scope.bugs = response.data.results;
            console.log($scope.bugs);
        });

        $scope.goToBug = function(uri) {
            $location.path(uri);
        };

    }
]);


app.controller('bugViewCtrl', ['$scope', '$location', 'RESTURL', 'BugService', 'bugFactory', 'bugConfigFactory', 'Flash',

    function($scope, $location, RESTURL, BugService, bugFactory, bugConfigFactory, Flash) {

        $scope.config = {};
        var current;
        var uri = $location.path().replace('/bug/', '') + '.json';

        bugConfigFactory.getConfig().then(function(response) {
            $scope.config = response.data;
        });

        BugService.getBug(uri).then(function(response) {
            current = response.data;
        });


        BugService.getBug(uri).then(function(response) {
                console.log(response.data);
                $scope.bug = response.data;
                //  Flash.addAlert('success', 'opened ' + uri);
            },
            function(response) {
                Flash.addAlert('danger', response.data.error.message);
            });


        // update bug status
        $scope.updateStatus = function() {
            var uri = $scope.bug.id + '.json';
            BugService.putDocument(uri, $scope.bug).then(function() {
                    console.log('bug status changed from ' + current.status + ' to ' + $scope.bug.status);
                    Flash.addAlert('success', $scope.bug.id + ' was successfully updated');

                },
                function(response) {
                    Flash.addAlert('danger', response.data.error.message);
                }
            );
        };
    }
]);