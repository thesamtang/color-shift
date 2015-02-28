$(document).ready(function() {
    "use strict";
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
        if ($.isValidHex(hexVal) && hexVal !== $.colorStack[$.colorStack.length - 1]) {
            $.changeColor(hexVal);
            console.log(hexVal);
        }
    });
});

$.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;

$.isValidHex = function(hexcode) {
    return $.hexRegex.test(hexcode);
}

