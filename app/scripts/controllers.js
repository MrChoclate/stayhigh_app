'use strict';

var app = angular.module('Controllers', ['ngCordova', 'firebase']);

app.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner', '$firebaseArray',
    function ($scope, $cordovaBarcodeScanner, $firebaseArray) {
        var itemsRef = new Firebase('https://blinding-inferno-478.firebaseio.com/people');
        $scope.people = $firebaseArray(itemsRef);
        $scope.barcodeText = '';

        var updateProfile = function (employeeNumber) {
          $scope.people.$loaded().then(function () {
            var rec = $scope.people.$getRecord(employeeNumber);
            if(rec) {
              $scope.firstName = rec.first_name;
              $scope.lastName = rec.last_name;
              $scope.contributor = rec.contributor;
            } else {
              console.log('employeeNumber not found !');
            }
          });
        };

        $scope.scanBarcode = function () {
            if (typeof cordova !== 'undefined') {
                $cordovaBarcodeScanner.scan().then(function (imageData) {
                    if (!imageData.cancelled) {
                        $scope.barcodeText = imageData.text;
                        updateProfile($scope.barcodeText);
                    }
                }, function (error) {
                    console.log('An error happened -> ' + error);
                });
            } else {
              $scope.barcodeText = '9903106';
              updateProfile($scope.barcodeText);
              //console.log('Cordova is undefined');
            }
        };
    }
]);
