/*global describe, it */

(function () {
    'use strict';
    
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
            
            describe("$scope.tune", function() {
                describe("rgb-color tuning", function() {
                    it("increases rgb value of a color", function() {
                        var $scope = {},
                        controller = $controller("StageController", {$scope: $scope});
                        $scope.controls.modifier = $scope.controls.modifiers[1];
                        $scope.stage.currentColor = "#CCCCCC";
                        $scope.controls.tune("increase");
                        expect($scope.stage.currentColor).toEqual("#D1CCCC");
                    });
                    it("detects edge case rgb increase", function() {
                        var $scope = {},
                        controller = $controller("StageController", {$scope: $scope});
                        $scope.controls.modifier = $scope.controls.modifiers[1];
                        $scope.stage.currentColor = "#FECCCC";
                        $scope.controls.tune("increase");
                        expect($scope.stage.currentColor).toEqual("#FFCCCC");
                        $scope.controls.tune("increase");
                        expect($scope.stage.error).toBe(true);
                    });
                    it("decreases rgb value of a color", function() {
                        var $scope = {},
                        controller = $controller("StageController", {$scope: $scope});
                        $scope.controls.modifier = $scope.controls.modifiers[1];
                        $scope.stage.currentColor = "#CCCCCC";
                        $scope.controls.tune("decrease");
                        expect($scope.stage.currentColor).toEqual("#C7CCCC");
                    });
                    it("detects edge case rgb decrease", function() {
                        var $scope = {},
                        controller = $controller("StageController", {$scope: $scope});
                        $scope.controls.modifier = $scope.controls.modifiers[1];
                        $scope.stage.currentColor = "#01CCCC";
                        $scope.controls.tune("decrease");
                        expect($scope.stage.currentColor).toEqual("#00CCCC");
                        $scope.controls.tune("decrease");
                        expect($scope.stage.error).toBe(true);
                    });
                });
                
                describe("hsl-color tuning", function() {
                    it("increases hsl value of a color", function() {
                        
                    });
                    it("decreases hsl value of a color", function() {
                        
                    });
                });
            });
        });
    });
})();
