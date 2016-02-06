/* Universal Module Definition */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as a named AMD module.
    define('underline', [], function() {
      return (root.underline = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Underline = factory();
  }
}(this, function() {
  var baselineRatio = require('./baseline-ratio');
  var MultipleUnderline = require('./multiple-underline');
  var SingleUnderline = require('./single-underline');


  function getElementStyles(element) {
    // lineHeight, height, ratio, fontFamily, fontSize, fontStyle
    var $this = element;

    var baselinePositionRatio = baselineRatio(element);
    var lineHeight = parseFloat(window.getComputedStyle($this, null)
      .getPropertyValue("line-height"));
    var fontFamily = window.getComputedStyle($this, null)
      .getPropertyValue("font-family");
    var fontSize = window.getComputedStyle($this, null)
      .getPropertyValue("font-size");
    var fontStyle = window.getComputedStyle($this, null)
      .getPropertyValue("font-style");
    var width = $this.getBoundingClientRect().width;
    var height = $this.getBoundingClientRect().height;
    var parentWidth = $this.parentNode.getBoundingClientRect().width;


    var offsetLeft = $this.offsetLeft;
    var parentOffsetLeft = $this.parentNode.offsetLeft;
    var canvasLeft = parentOffsetLeft - offsetLeft;
    var textIndent = offsetLeft - parentOffsetLeft;

    // canvas.style.left= canvasLeft + 'px';
    return {
      lineHeight: lineHeight,
      width: width,
      height: height,
      parentWidth: parentWidth,
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontStyle: fontStyle,
      baselinePositionRatio: baselinePositionRatio,
      canvasLeft: canvasLeft,
      textIndent: textIndent
    }
  }

  var requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  function Underline(element, options) {
    this.underlines = [];

    if (!element) {
      console.error('No element defined!');
    }

    var underlineStyles = {
      'text-underline-color': options.color || '#000',
      'text-underline-position': options.position || 'auto', // could be ratio or todo: px
      'text-underline-skip': options.skip || true,
      'text-underline-width': options.width || 'auto' // could be auto or px or ratio
    }

    // if element parameter is a string, query the dom for it,
    // otherwise just use it
    element = typeof element === 'string' ? document.querySelectorAll(element) : element;

    [].forEach.call(element, function(el) {
      var elementStyles = getElementStyles(el);
      var underline;
      // single line or multiple line?
      if (elementStyles.height > elementStyles.lineHeight) {
        underline = new MultipleUnderline(el, underlineStyles, elementStyles);
      } else {
        // single line
        underline = new SingleUnderline(el, underlineStyles, elementStyles);
      }
      this.underlines.push(underline);
    }.bind(this));
  };

  Underline.prototype.animate = function() {
    this.underlines.forEach(function(underline) {
      underline.clear();
      underline.update();
      underline.draw();
    }.bind(this))
    requestAnimFrame(this.animate);
  };
  return Underline;
}));
