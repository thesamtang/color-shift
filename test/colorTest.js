"use strict"

function saysHi(name) {
    return "Hi, " + name;
};

test('saysHi()', function() {
    equal(saysHi("Jack"), "Hi, Jack", "function outputs string correctly")

});
