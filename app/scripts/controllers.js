'use strict';

var app = angular.module('Controllers', ['config', 'ngCordova', 'firebase']);

app.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner', '$firebaseArray', 'EMAIL', 'PASSWORD', 'FIREBASE_URL',
    function ($scope, $cordovaBarcodeScanner, $firebaseArray, EMAIL, PASSWORD, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);
        ref.authWithPassword({
          email    : EMAIL,
          password : PASSWORD
        }, function () {});
        $scope.people = $firebaseArray(ref.child('people'));
        $scope.hist =  $firebaseArray(ref.child('historic'));
        $scope.barcodeText = '';

        var sendHistoric = function (record) {
          var obj = {data: record}
          obj.created = Date();
          obj.author = ref.getAuth();
          $scope.hist.$add(obj);
        }

        var updateProfile = function (employeeNumber) {
          $scope.people.$loaded().then(function () {
            var rec = $scope.people.$getRecord(employeeNumber);
            if(rec) {
              $scope.firstName = rec.first_name;
              $scope.lastName = rec.last_name;
              $scope.contributor = rec.contributor;
              sendHistoric(rec);
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
