var colorApp = angular.module("ColorTuner", []);

colorApp.controller("StageController", function($scope) {
    "use strict";
    
    // Namespaces
    $scope.stage = {};
    $scope.controls = {};
    
    // Model declarations
    $scope.colorStack = ["#CCCCCC"];
    
    $scope.stage.currentColor = "#CCCCCC";
    $scope.stage.hexInput = "";
    
    $scope.controls.modifiers = [
        {id: 0, text: "SELECT", value: "none", btnColor: "#999", active: [0, 0, 0]},
        {id: 1, text: "RED", value: "red", btnColor: "#DE3E46", active: [1, 0, 0]},
        {id: 2, text: "BLUE", value: "blue", btnColor: "#3E3EDE", active: [0, 0, 1]},
        {id: 3, text: "GREEN", value: "green", btnColor: "#3EDE56", active: [0, 1, 0]},
        {id: 4, text: "YELLOW", value: "yellow", btnColor: "#FFFF66", active: [1, 1, 0]},
        {id: 5, text: "WHITE", value: "white", btnColor: "#fff", active: [0, 0, 1]}
    ];
    $scope.controls.modifier = $scope.controls.modifiers[0];
    
    
    // Controller functions
    var _setStageColor = function(hexcode) {
        $scope.colorStack.push(hexcode);
        $scope.stage.currentColor = hexcode;
    };
    
    $scope.hexSubmit = function() {
        var hexVal = "#".concat($scope.stage.hexInput.toUpperCase());
        console.log(hexVal);
        
        if (Convert.isValidHex(hexVal)) {
            if (hexVal !== $scope.colorStack[$scope.colorStack.length - 1]) {
                console.log("valid");
                _setStageColor(hexVal);
                //$("#error").hide();
                //console.log(hexVal);
            }
        } else {
            // invalid hex code
            console.log("invalid");
        }
    };
    
    var _rgbTune = function(direction) {
        
        var active = $scope.controls.modifier.active,
            rgb = Convert.hexToRgbArr($scope.stage.currentColor);
            
        if (direction === "increase") {
            for (var i = 0; i < 3; i++) {
                if (rgb[i] <= 250) {
                    rgb[i] += active[i] * 5;
                }
            }
        } else if (direction === "decrease") {
            for (var i = 0; i < 3; i++) {
                if (rgb[i] >= 5) {
                    rgb[i] -= active[i] * 5;
                }
            }
        }
        
        var newColor = Convert.rgbArrToHex(rgb);
        $scope.stage.currentColor = newColor;
        $scope.stage.hexInput = newColor.split("#")[1];
    }
    
    var _hslTune = function(direction) {
        var hsl = Convert.hexToHslArr($scope.stage.currentColor)
        console.log(hsl);
    }
    
    $scope.controls.tune = function(direction) {
        var id = $scope.controls.modifier.id;
        if (id > 0 && id <= 4) {
            _rgbTune(direction);
        } else if (id == 5) {
            _hslTune(direction);
        }
    };
});
