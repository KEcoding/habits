'use strict';

var habitsApp = angular.module('habitsApp', []);

habitsApp.controller('HabitsCtrl', function ($scope, $http) {
    var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");
    
    $scope.dates = [];
    var date = new Date();
    date.setDate(date.getDate()+1);
    var dd, mm, yyyy;
    for (var i = 0; i < 7; i++) {
        date.setDate(date.getDate()-1);

        dd = date.getDate();
        mm = date.getMonth() + 1;
        yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        }

        $scope.dates.push({
            'slug': yyyy + '-' + mm + '-' + dd,
            'name': m_names[date.getMonth()] + ' ' + date.getDate()
        });
    }

    var habit_names = {};
    $http.get('/api/habits/names').
        success(function(data, status, headers, config) {
            habit_names = data;
        }).
        error(function(data, status, headers, config){});

    $scope.habits = {};
    $scope.dates.forEach(function (date) {
        $scope.habits[date] = {};
        $http.get('/api/entries/' + date.slug).
            success(function(data, status, headers, config) {
                var entry = {};
                for (var key in data) {
                    if ((key !== 'id') && (key !== 'date')) {
                        entry[key] = {
                            'name': habit_names[key],
                            'value': data[key]
                        };
                    }
                }
                $scope.habits[date.slug] = entry;
            }).
            error(function(data, status, headers, config){});
    });
    console.log($scope.habits);
});