

(function() {
    console.log("color converter");
   window.color_converter = {}; //global variable, the root of our namespace

   color_converter.rgbToHex= function(rgb) {
       
       var hexArr = $.getRgbComponents(rgb).map(function(x) {
            x = x.toString(16);
            return (x.length == 1) ? "0".concat(x) : x;
        });

        return "#".concat(hexArr.join(""));
   }
   

})();