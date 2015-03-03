QUnit.test("Set stage color", function(assert) {
    var valid = "cccccc",
        invalid = "cccccj",
        shortValid = "abc",
        shortInvalid = "ggg",
        long = "ccccccc",
        $stage = $("#stage"),
        $hex = $("#hex");

    $hex.val("aaaaaa");
    $hex.keyup();

    $hex.val(valid);
    $hex.keyup();
    assert.equal($.rgbToHex($stage.css("background-color")), "#cccccc");
    console.log($stage.css("background-color"));
    console.log($.rgbToHex($stage.css("background-color")));
    console.log(1);

    $hex.val(invalid);
    $hex.keyup();
    assert.equal($.rgbToHex($stage.css("background-color")), "#cccccc");
    console.log(2);

    $hex.val(shortValid);
    $hex.keyup();
    assert.equal($.rgbToHex($stage.css("background-color")), "#aabbcc");
    console.log(3);

    $hex.val(shortInvalid);
    $hex.keyup();
    assert.equal($.rgbToHex($stage.css("background-color")), "#aabbcc");
    console.log(4);

    $hex.val(long);
    $hex.keyup();
    assert.equal($.rgbToHex($stage.css("background-color")), "#aabbcc");
    console.log(5);
});

QUnit.test("$.isValidHex()", function(assert) {
    var validUpper = "#CCCCCC",
        validShort = "#CCC",
        invalidUpper = "#CCCCCJ",
        invalidLower = "#cccccc",
        invalidShort = "#CCJ";

    assert.ok($.isValidHex(validUpper));
    assert.ok($.isValidHex(validShort));
    assert.ok(!$.isValidHex(invalidUpper));
    assert.ok(!$.isValidHex(invalidLower));
    assert.ok(!$.isValidHex(invalidShort));

});

QUnit.test("Increase color stack size", function(assert) {

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

QUnit.test("$.rgbToHex()", function(assert) {
    var rgb = "rgb(255, 255, 255)";
    assert.equal($.rgbToHex(rgb), "#ffffff");
});

QUnit.test("$.getRgbCompononents()", function(assert) {
    var rgb = $.getRgbComponents("rgb(255, 255, 255)");
    assert.equal(rgb[0], 255);
    assert.equal(rgb[1], 255);
    assert.equal(rgb[2], 255);
});


QUnit.test("$.rgbToHSL()", function(assert) {
    var hsl = $.rgbToHSL([34, 200, 62]);
    var exp = [0.36, 0.71, 0.46];
    console.log(hsl);
    assert.equal(hsl, exp);
});

QUnit.test("$.getLightness()", function(assert) {
    var hsl = "#cccccc";
    assert.equal($.getLightness(hsl), 0.80);
});
