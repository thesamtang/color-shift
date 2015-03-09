$(document).ready(function() {
    var $stage = $("#stage"),
        $hex = $("#hex"),
        $select = $("#color-chooser"),
        $btn = $(".btn"),
        $up = $("#up"),
        $dwn = $("#down"),
        hash = "#";
    $.colorStack = ["#CCCCCC"];
    $.currentColor = "none";

    var changeColor = function(hexcode) {
        $.colorStack.push(hexcode);
        $stage.css({"background-color": hexcode});
        console.log($.colorStack);
    };

    var toggleHover = function(color) {
        $btn.toggleClass("hover-" + color);
        console.log("add .hover-" + color);
        console.log($btn.css("background-color"));
    };

    $hex.keyup(function(event) {
        var hexVal = hash.concat($hex.val().toUpperCase());
        console.log(hexVal + "!");
        if (event.keyCode == 13 && $.isValidHex(hexVal) && hexVal !== $.colorStack[$.colorStack.length - 1]) {
            changeColor(hexVal);
            console.log(hexVal);
        }
    });

    $select.change(function() {
        console.log($(this).val() + " chosen");
        $selection = $(this).val();
        var $btn = $(".btn");
        switch($selection) {
            case "none":
                $btn.css("background-color", "#999");
                $.currentColor = "none";
                break;
            case "red":
                $btn.css("background-color", "#DE3E46");
                $.currentColor = "red";
                break;
            case "blue":
                $btn.css("background-color", "#3E3EDE");
                $.currentColor = "blue";
                break;
            case "green":
                $btn.css("background-color", "#3EDE56");
                $.currentColor = "green";
                break;
            case "yellow":
                $btn.css("background-color", "#FFFF66");
                $.currentColor = "yellow";
                break;
            case "black":
                $btn.css("background-color", "#444");
                $.currentColor = "black";
                break;
            case "gray":
                $btn.css("background-color", "#aaa");
                $.currentColor = "gray";
                break;
        }
    });

    var increaseColor = function() {
        var stageColor = $stage.css("background-color");
        var rgbArr = $.getRgbComponents(stageColor);
        switch($.currentColor){
            case "red":
                rgbArr[0] += 2;
                if (rgbArr[0] <= 255) {
                    var newColor = "rgb(" + rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2] + ")"
                    var newColorHex = color_converter.rgbToHex(newColor);
                    $stage.css("background-color", newColor);
                    $hex.val(newColorHex.split("#")[1]);
                    $.colorStack.push(newColorHex.toUpperCase());
                    console.log($.colorStack);
                }
                break;
            case "blue":
                break;
            case "green":
                break;
            case "yellow":
                break;
            case "black":
                break;
            case "gray":
                break;
        }

    };

    var decreaseColor = function() {

    };

    $up.click(function() {
       increaseColor();
    });

    $dwn.click(function() {
        decreaseColor();
    })


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

//$.rgbToHex = function(rgb) {
//
//}

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
