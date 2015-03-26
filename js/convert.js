var Convert = (function(Convert) {
    "use strict";
    //var _hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;
    
    Convert.isValidHex = function(hexcode) {
        return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/).test(hexcode);
    };
    
    
    Convert.hexToRgbArr = function(hex) {
        // Expand shorthand form
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    };
    

    Convert.rgbArrToHex = function(rgb) {
       
        var hexArr = rgb.map(function(x) {
            x = x.toString(16);
            return (x.length === 1) ? "0".concat(x) : x;
        });

        return "#".concat(hexArr.join(""));
    };
    
//    Convert.rgbArrToHex = function(rgb) {
//       
//        var hexArr = Convert.getRgbComponents(rgb).map(function(x) {
//            x = x.toString(16);
//            return (x.length === 1) ? "0".concat(x) : x;
//        });
//
//        return "#".concat(hexArr.join(""));
//    };
   
    Convert.getRgbComponents = function(rgb) {
        var componentString = rgb.split("(")[1].split(")")[0];
        componentString = componentString.split(",");
        return componentString.map(function(x) {
            return parseInt(x);
        });
    };
    
    return Convert;

})(Convert || {});