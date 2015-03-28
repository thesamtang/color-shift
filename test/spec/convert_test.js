/*global describe, it */
'use strict';

(function () {
    describe("Color conversion module", function () {
        it("checks if a hex code is valid", function() {
            expect(Convert.isValidHex("#CCCCCC")).toBe(true);
            expect(Convert.isValidHex("#CCC")).toBe(true);
            expect(Convert.isValidHex("#CCCCC")).toBe(false);
            expect(Convert.isValidHex("#CCCCCCC")).toBe(false);
            expect(Convert.isValidHex("#CCCCCJ")).toBe(false);
            expect(Convert.isValidHex("#cccccc")).toBe(false);
            expect(Convert.isValidHex("#CCJ")).toBe(false);
        });

        it("converts a hex string to an rgb array", function() {
            expect(Convert.hexToRgbArr("#CCCCCC")).toEqual([204, 204, 204]);
            expect(Convert.hexToRgbArr("#CCC")).toEqual([204, 204, 204]);
            expect(Convert.hexToRgbArr("#CCCCCJ")).toBeNull();
            expect(Convert.hexToRgbArr("#CCJ")).toBeNull();
        });

        it("converts an rgb array to a hex string", function() {
            expect(Convert.rgbArrToHex([204, 204, 204])).toEqual("#CCCCCC");
        });
        
        it("converts an rgb array to an hsl array", function() {
            expect(Convert.rgbArrToHslArr([204, 204, 204])).toEqual([0, 0, 0.8]);
        });
        
        it("converts a hex string to an hsl array", function() {
            expect(Convert.hexToHslArr("#CCCCCC")).toEqual([0, 0, 0.8]);
        });
    });
})();