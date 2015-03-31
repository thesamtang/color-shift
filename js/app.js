var ColorApp = angular.module("ColorTuner", []);

ColorApp.controller("StageController", function($scope, $document) {
    "use strict";
    
    /*
        TODO
        - directive for hide/show
        - custom style select
        - app logic tests
        - handle other non-rgb colors
    */
    
    
    // Model defaults
    $scope.greeting = {};
    $scope.stage = {
        currentColor: "#CCCCCC",
        hexInput: "",
        error: false,
        errorText: ""
    };
    $scope.controls = {
        modifiers: [
            {id: 0, text: "SELECT", value: "none", btnColor: "#999", active: [0, 0, 0]},
            {id: 1, text: "RED", value: "red", btnColor: "#DE3E46", active: [1, 0, 0]},
            {id: 2, text: "BLUE", value: "blue", btnColor: "#3E3EDE", active: [0, 0, 1]},
            {id: 3, text: "GREEN", value: "green", btnColor: "#3EDE56", active: [0, 1, 0]},
            {id: 4, text: "YELLOW", value: "yellow", btnColor: "#FFFF66", active: [1, 1, 0]},
            {id: 5, text: "WHITE", value: "white", btnColor: "#FFFFFF", active: [0, 0, 1]}
        ],
        state: "Hide"
    };
    $scope.controls.modifier = $scope.controls.modifiers[0];
    
    $scope.colorStack = ["#CCCCCC"];
    
    
    // Controller functions
    
    //// Refactor into directive
    $scope.greeting.confirm = function() {
        _toggle(document.getElementById("greeting"), 0);
        _toggle(document.getElementById("toggle-controls"), 1);
    }
    
    $scope.controls.toggle = function() {
        $scope.controls.state = ($scope.controls.state === "Show") ? "Hide" : "Show";
        if ($scope.controls.state === "Hide") _toggle(document.getElementById("controls"), 1);
        else if ($scope.controls.state === "Show") _toggle(document.getElementById("controls"), 0);
    }
    
    var _toggle = function(element, state) {
        if (state) {
            element.style.opacity = "1";
            element.style.filter = "alpha(opacity=1)"; // IE
            element.style.visibility = "visible";
        } else {
            element.style.opacity = "0";
            element.style.filter = "alpha(opacity=1)"; // IE
            element.style.visibility = "hidden";
        }
    }
    ////////
    
    var _setStageColor = function(hexcode) {
        $scope.colorStack.push(hexcode);
        $scope.stage.currentColor = hexcode;
    };
    
    $scope.hexSubmit = function() {
        var hexVal = "#".concat($scope.stage.hexInput.toUpperCase());
        console.log(hexVal);
        
        if (Convert.isValidHex(hexVal)) {
            $scope.stage.error = false;
            if (hexVal !== $scope.colorStack[$scope.colorStack.length - 1]) {
                console.log("valid");
                _setStageColor(hexVal);
            }
        } else {
            // invalid hex code
            $scope.stage.errorText = "Invalid color";
            $scope.stage.error = true;
            console.log("invalid");
        }
    };
    
    var _rgbTune = function(direction) {
        var active = $scope.controls.modifier.active,
            rgb = Convert.hexToRgbArr($scope.stage.currentColor),
            tuningError = false;
            
        if (direction === "increase") {
            for (var i = 0; i < 3; i++) {
                if (rgb[i] > 250) rgb[i] = 255;
                if (rgb[i] <= 250 && active[i] != 0) {
                    rgb[i] += active[i] * 5;
                    tuningError = false;
                } else if (active[i] != 0) {
                    tuningError = true;
                }
            }
        } else if (direction === "decrease") {
            for (var i = 0; i < 3; i++) {
                if (rgb[i] < 5) rgb[i] = 0;
                if (rgb[i] >= 5 && active[i] != 0) {
                    rgb[i] -= active[i] * 5;
                    tuningError = false;
                } else if (active[i] != 0){
                    tuningError = true;
                }
            }
        }
        //console.log(tuningError);
        
        _checkError(tuningError, direction);
        
        var newColor = Convert.rgbArrToHex(rgb);
        $scope.stage.currentColor = newColor;
        $scope.stage.hexInput = newColor.split("#")[1];
    }
    
    var _hslTune = function(direction) {
        var hsl = Convert.hexToHslArr($scope.stage.currentColor);
        // Convert
        console.log(hsl);
    }
    
    var _checkError = function(isError, direction) {
        if (isError) {
            $scope.stage.errorText = "CAN'T ".concat(direction.toUpperCase()).concat(" ").concat($scope.controls.modifier.text).concat(" ANYMORE");
            $scope.stage.error = true;
        } else {
            $scope.stage.error = false;
        }
    }
    
    $scope.controls.tune = function(direction) {
        var id = $scope.controls.modifier.id;
        if (id > 0 && id <= 4) {
            _rgbTune(direction);
        } else if (id == 5) {
            _hslTune(direction);
        }
    };
    
    // Keyboard shortcuts
    $scope.keyPress = function($event) {
        if ($event.keyCode == 38) {
            $scope.controls.tune("increase");
        } else if ($event.keyCode == 40) {
            $scope.controls.tune("decrease");
        }
    }
});

ColorApp.directive("keyPress", function($document, $parse) {
    "use strict";
    return function($scope, $element, $attributes) {
        var scopeExpression = $attributes.keyPress;
        var invoker = $parse(scopeExpression);

        $document.on("keydown", function(event){
            $scope.$apply(function(){
                invoker(
                    $scope,
                    {$event: event}
                );
            });
        });
    }
});
