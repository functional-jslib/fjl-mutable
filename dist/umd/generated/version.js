(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.version = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberOf module:fjlErrorThrowing
   * @property version {String} - Semantic version string.
   * @note Content generated by '{project-root}/node-scripts/VersionNumberReadStream.js'.
   * @generated Sun Nov 12 2017 16:34:50 GMT-0500 (Eastern Standard Time) 
   */

  var version = exports.version = '0.11.0';

  exports.default = version;
});