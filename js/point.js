/* Universal Module Definition */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a named AMD module.
    define('point', [], function() {
      return (root.point = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Point = factory();
  }
}(this, function() {
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
  }

  return Point;
}));
