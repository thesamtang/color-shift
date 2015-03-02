$(document).ready(function() {
    var $stage = $("#stage"),
        $hex = $("#hex"),
        hash = "#";
    $.colorStack = ["#CCCCCC"];
    $.currentColor = "red";

    $.changeColor = function(hexcode) {
        $.colorStack.push(hexcode);
        $stage.css({"background-color": hexcode});
        $hex.css({"background-color": hexcode});
        console.log($.colorStack);
    };

    $hex.keyup(function(event) {
        var hexVal = hash.concat($hex.val().toUpperCase());
        console.log(hexVal + "!");
        if ($.isValidHex(hexVal) && hexVal !== $.colorStack[$.colorStack.length - 1]) {
            $.changeColor(hexVal);
            console.log(hexVal);

//            if ($.getLightness(hexVal) < 0.5) {
//
//            } else {
//
//            }
        }
    });
});

$.getLightness = function(hexcode) {
    var rgb = $.getRgbComponents(hexcode); // NO, need to pass in rgb?
    var hsl = $.rgbToHSL(rgb);
    return hsl[2];
};

$.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;

$.isValidHex = function(hexcode) {
    return $.hexRegex.test(hexcode);
};

$.rgbToHex = function(rgb) {

    var hexArr = $.getRgbComponents(rgb).map(function(x) {
        x = x.toString(16);
        return (x.length == 1) ? "0".concat(x) : x;
    });

    return "#".concat(hexArr.join(""));
}

$.rgbToHex = function(rgb) {

}

//$.rgbToCMYK = function(rgb, component) {
//    var cmyk = {};
//    // if component, return cmyk.component
//    // else return cmyk
//};

$.rgbToHSL = function(rgb) {
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

    return [$.roundTwoPlaces(h), $.roundTwoPlaces(s), $.roundTwoPlaces(l)];
};

$.hslToRGB = function(hsl) {

}

$.roundTwoPlaces = function(num) {
    return Math.round((num + 0.00001) * 100) / 100
};

$.getRgbComponents = function(rgb) {
    var componentString = rgb.split("(")[1].split(")")[0];
    componentString = componentString.split(",");
    return componentString.map(function(x) {
        return parseInt(x);
    });
};
