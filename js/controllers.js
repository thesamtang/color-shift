var colorApp = angular.module('ColorTuner', []);

colorApp.controller('ColorStage', function($scope) {
    $scope.currentColor = "#CCCCCC";
    $scope.hexInput = "";
    $scope.options = [
        {text: "SELECT", value: "none"},
        {text: "RED", value: "red"},
        {text: "BLUE", value: "blue"},
        {text: "GREEN", value: "green"},
        {text: "YELLOW", value: "yellow"},
        {text: "BLACK", value: "black"}
    ]
    
    $scope.setHexInput = function(hex) {
        $scope.hexInput = hex;
    }
    
    $scope.changeColor = function(hexcode) {
        $.colorStack.push(hexcode);
        $stage.css({"background-color": hexcode});
        console.log($.colorStack);
    };
    
    $scope.hexKeyup = function($event) {
        
    
    }
});
