/* Universal Module Definition */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a named AMD module.
    define('optimalStrokeWidthPos', [], function() {
      return (root.optimalStrokeWidthPos = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.OptimalStrokeWidthPos = factory();
  }
}(this, function() {
  var optimalStrokeWidthPos = function(strokeWidth, posY) {
    if (strokeWidth < 1) {
      posY = Math.round(posY - 0.5) + 0.5;
    } else if (strokeWidth >= 1) {
      strokeWidth = Math.round(strokeWidth);
      if (strokeWidth % 2) {
        // odd, posY -> 0.5
        posY = Math.round(posY - 0.5) + 0.5;
      } else {
        // even, posY -> 1
        posY = Math.round(posY);
      }
    }
    return {
      strokeWidth: strokeWidth,
      posY: posY
    }
  }
  return optimalStrokeWidthPos;
}));
