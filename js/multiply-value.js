/* Universal Module Definition */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a named AMD module.
    define('multiplyValue', [], function() {
      return (root.multiplyValue = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.MultiplyValue = factory();
  }
}(this, function() {

  var multiplyValue = function(value, multiplier) {
    var str = value;
    var m = multiplier;
    var result = str.match(/(\d*\.?\d*)(.*)/);
    //http://stackoverflow.com/questions/2868947/split1px-into-1px-1-px-in-javascript
    return result[1] * m + result[2];
  }

  return multiplyValue;
}));
