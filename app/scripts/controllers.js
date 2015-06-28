'use strict';

var app = angular.module('Controllers', ['ngCordova']);

app.controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner',
    function ($scope, $cordovaBarcodeScanner) {

        $scope.scanBarcode = function () {
            console.log('test');
            $cordovaBarcodeScanner.scan().then(function (imageData) {
                console.log(imageData.text);
                console.log('Barcode Format -> ' + imageData.format);
                console.log('Cancelled -> ' + imageData.cancelled);
            }, function (error) {
                console.log('An error happened -> ' + error);
            });
        };
    }
]);