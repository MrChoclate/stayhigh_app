'use strict';

var app = angular.module('Controllers', ['ngCordova']);

app.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner',
    function ($scope, $cordovaBarcodeScanner) {

        $scope.barcodeText = 'No barcode';

        $scope.scanBarcode = function () {
            if (typeof cordova !== 'undefined') {
                $cordovaBarcodeScanner.scan().then(function (imageData) {
                    if (!imageData.cancelled) {
                        $scope.barcodeText = imageData.text;
                    }
                }, function (error) {
                    console.log('An error happened -> ' + error);
                });
            } else {
                console.log('Cordova is undefined');
            }
        };
    }
]);