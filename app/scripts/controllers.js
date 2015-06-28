'use strict';

var app = angular.module('Controllers', ['ngCordova']);

app.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner',
    function ($scope, $cordovaBarcodeScanner) {

        $scope.scanBarcode = function () {
            if (typeof cordova !== 'undefined') {
                $cordovaBarcodeScanner.scan().then(function (imageData) {
                    console.log(imageData.text);
                    console.log('Barcode Format -> ' + imageData.format);
                    console.log('Cancelled -> ' + imageData.cancelled);
                }, function (error) {
                    console.log('An error happened -> ' + error);
                });
            } else {
                console.log('Cordova is undefined');
            }
        };
    }
]);