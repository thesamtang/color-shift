$(document).ready(function() {
    var $stage = $("#stage"),
        $hex = $("#hex"),
        hash = "#";
    $.colorStack = ["#CCCCCC"];

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
        }
    });
});

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

$.rgbToCMYK = function(rgb, component) {
    var cmyk = {};
    // if component, return cmyk.component
    // else return cmyk
};

$.getRgbComponents = function(rgb) {
    var componentString = rgb.split("(")[1].split(")")[0];
    componentString = componentString.split(",");
    return componentString.map(function(x) {
        return parseInt(x);
    });
};
