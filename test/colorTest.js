QUnit.test("Set stage color", function(assert) {
    var valid = "cccccc",
        invalid = "cccccj",
        shortValid = "abc",
        shortInvalid = "ggg",
        long = "ccccccc",
        $stage = $("#stage"),
        $hex = $("#hex");

    $stage.css("background-color", "#aaaaaa");

    $hex.val(valid);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#cccccc");
    assert.equal($hex.css("background-color"), "#cccccc");
    console.log(1);

    $hex.val(invalid);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#cccccc");
    assert.equal($hex.css("background-color"), "#cccccc");
    console.log(2);

    $hex.val(shortValid);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aabbcc");
    assert.equal($hex.css("background-color"), "#aabbcc");
    console.log(3);

    $hex.val(shortInvalid);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aabbcc");
    assert.equal($hex.css("background-color"), "#aabbcc");
    console.log(4);

    $hex.val(long);
    $hex.keyup();
    assert.equal($stage.css("background-color"), "#aabbcc");
    assert.equal($hex.css("background-color"), "#aabbcc");
    console.log(5);
});

QUnit.test("Increase color stack size", function(assert){

    var $stage = $("#stage"),
        $hex = $("#hex");

    $hex.val("cccccc");
    $hex.keyup();
    var len = $.colorStack.length;

    // Add same color
    $hex.val("cccccc");
    $hex.keyup();
    assert.equal($.colorStack.length, len);
    console.log(6);

    // Add new color
    $hex.val("aaaaaa");
    $hex.keyup();
    assert.equal($.colorStack.length, len + 1);
    console.log(7);
});

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
