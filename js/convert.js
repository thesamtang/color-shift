var Convert = (function(Convert) {
    "use strict";
    
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
   
//    Convert.getRgbComponents = function(rgb) {
//        var componentString = rgb.split("(")[1].split(")")[0];
//        componentString = componentString.split(",");
//        return componentString.map(function(x) {
//            return parseInt(x);
//        });
//    };
    
    Convert.rgbArrToHslArr = function(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [_roundTwoPlaces(h), _roundTwoPlaces(s), _roundTwoPlaces(l)];
    };
    
    //Convert.hslArrToRgbArr
    
    Convert.hexToHslArr = function(hex) {
        return Convert.rgbArrToHslArr(Convert.hexToRgbArr(hex));
    };
    
    //Convert.hslArrToHex
    
    var _roundTwoPlaces = function(num) {
        return Math.round((num + 0.00001) * 100) / 100
    };
    
    return Convert;

})(Convert || {});