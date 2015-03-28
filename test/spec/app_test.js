/*global describe, it */
'use strict';

(function () {
    describe("Color Tuner app logic", function () {
        describe("StageController", function () {
            beforeEach(module("ColorTuner"));
            var $controller;
            
            beforeEach(inject(function(_$controller_) {
                $controller = _$controller_;
            }));
            
            describe("$scope.hexSubmit", function() {
                it("takes the value of stage.hexInput and sets the stage color", function() {
                    var $scope = {},
                        controller = $controller("StageController", {$scope: $scope});
                    $scope.stage.hexInput = "aaaaaa";
                    $scope.hexSubmit();
                    expect($scope.stage.currentColor).toEqual("#AAAAAA");
                    
                    $scope.stage.hexInput = "aaa";
                    $scope.hexSubmit();
                    expect($scope.stage.currentColor).toEqual("#AAA");
                    
                    $scope.stage.hexInput = "ccj";
                    $scope.hexSubmit();
                    expect($scope.stage.currentColor).toEqual("#AAA");
                    
                    $scope.stage.hexInput = "cccccj";
                    $scope.hexSubmit();
                    expect($scope.stage.currentColor).toEqual("#AAA");
                });
            });
        });
    });
})();
