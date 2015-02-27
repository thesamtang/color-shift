(function($, window, document) {
    "use strict";
    var $stage = $("#stage"),
        $hex = $("#hex"),
        $go = $("#go"),
        hash = "#",
        colorStack = ["cccccc"];

    var changeColor = function(hexcode) {
        if (hexcode.length === 6) {
            colorStack.push(hexcode);
            var hashed = hash.concat(hexcode);
            $stage.css({"background-color": hashed});
            $hex.css({"background-color": hashed});
            console.log("color change");
        }
    };

    $hex.keyup(function(event) {
        var hex = $hex.val();
        if (hex.length === 6) {
            changeColor(hex);
        }
    });

}(window.jQuery, window, document));
