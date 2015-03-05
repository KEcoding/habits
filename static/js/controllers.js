'use strict';

var habitsApp = angular.module('habitsApp', []);

habitsApp.controller('HabitsCtrl', function ($scope, $http) {
    var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");
    
    $scope.dates = [];
    var date = new Date();
    for (var i = 0; i < 5; i++) {
        date.setDate(date.getDate()+1);
        $scope.dates.push({
            'slug': date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),
            'name': m_names[date.getMonth()] + ' ' + date.getDate()
        });
    }

    $http.get('/api/habits').
        success(function(data, status, headers, config){
            $scope.habits = data;
        }).
        error(function(data, status, headers, config){});
});