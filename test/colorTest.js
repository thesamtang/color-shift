QUnit.test("Set stage color", function(assert) {
    var valid = "cccccc",
        invalid = "cccccj",
        short = "abc",
        long = "ccccccc",
        $stage = $("#stage"),
        $hex = $("#hex");

    $stage.css("height", "10px");
    $stage.css("background-color", "#aaaaaa");

    $hex.val(invalid);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aaaaaa");

    $hex.val(short);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aaaaaa");

    $hex.val(long);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aaaaaa");

    $hex.val(valid);
    $hex.trigger("keyup");
    assert.equal($stage.css("background-color"), "#cccccc");

});

//QUnit.test("Increase color stack size", function(assert){
//
//});

// test for hex color change for light and dark bkgds

$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}
