(function() {
    
   window.color_converter = {}; //global variable, the root of our namespace
    
    color_converter.hexRegex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/;

    color_converter.isValidHex = function(hexcode) {
        return color_converter.hexRegex.test(hexcode);
    };
    

   color_converter.rgbToHex= function(rgb) {
       
       var hexArr = color_converter.getRgbComponents(rgb).map(function(x) {
            x = x.toString(16);
            return (x.length == 1) ? "0".concat(x) : x;
        });

        return "#".concat(hexArr.join(""));
   }
   
   color_converter.getRgbComponents = function(rgb) {
       var componentString = rgb.split("(")[1].split(")")[0];
        componentString = componentString.split(",");
        return componentString.map(function(x) {
            return parseInt(x);
        });
   }
   

})();