//(function($, window, document) {
//
//
//}(window.jQuery, window, document));

$(document).ready(function() {
    "use strict";
    var $stage = $("#stage"),
        $hex = $("#hex"),
        hash = "#",
        colorStack = ["cccccc"];

    var changeColor = function(hexcode) {
        if (hexcode.length === 6) {
            colorStack.push(hexcode);
            var hashed = hash.concat(hexcode);
            $stage.css({"background-color": hashed});
            $hex.css({"background-color": hashed});
            console.log(colorStack);
        }
    };

    $hex.keyup(function(event) {
        var hex = $hex.val();
        if (hex.length === 6) {
            changeColor(hex);
        }
    });
});
