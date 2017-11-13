var fjlMutable = (function (exports,fjl,fjlErrorThrowing) {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * @module fjlMutable
 */
/** ============================================================= */
/** Type definitions:                                             */
/** ============================================================= */
/**
 * @typedef {String|Function} TypeRef
 * @description Type reference.  Either actual type or type's name;  E.g., `Type.name`
 */

/**
 * @typedef {*} Target
 */

/**
 * @typedef {Object} Descriptor
 */

/**
 * @typedef {Array<Target, Descriptor>} TargetDescriptorTuple
 */

var _descriptorForSettable = function _descriptorForSettable(Type, propName, target) {
    var _value = void 0;
    return {
        get: function get$$1() {
            return _value;
        },
        set: function set$$1(value) {
            _value = errorIfNotTypeOnTarget(Type, propName, target, value);
        }
    };
};
var _makeDescriptorEnumerable = function _makeDescriptorEnumerable(_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        target = _ref2[0],
        descriptor = _ref2[1];

    descriptor.enumerable = true;
    return [target, descriptor];
};
var errorIfNotTypeOnTarget$ = function errorIfNotTypeOnTarget$(Type, propName, target, propValue) {
    fjlErrorThrowing.errorIfNotType(fjlErrorThrowing.getTypeName(Type), target, propName, propValue);
    return propValue;
};
var defineProp$ = function defineProp$(Type, propName, _ref3) {
    var _ref4 = slicedToArray(_ref3, 2),
        target = _ref4[0],
        descriptor = _ref4[1];

    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    descriptor = descriptor || _descriptorForSettable(Type, propName, target);
    Object.defineProperty(target, propName, descriptor);
    if (!fjl.isUndefined(defaultValue)) {
        target[propName] = defaultValue;
    }
    return [target, descriptor];
};
var defineEnumProp$ = function defineEnumProp$(Type, propName, _ref5) {
    var _ref6 = slicedToArray(_ref5, 2),
        target = _ref6[0],
        descriptor = _ref6[1];

    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    descriptor = descriptor || _descriptorForSettable(Type, propName, target);
    return defineProp$(Type, propName, _makeDescriptorEnumerable([target, descriptor]), defaultValue);
};
var errorIfNotTypeOnTarget = fjl.curry(errorIfNotTypeOnTarget$);
var defineProp = fjl.curry(defineProp$);
var defineEnumProp = fjl.curry(defineEnumProp$);
var definePropArray = defineProp(Array);
var definePropBoolean = defineProp(Boolean);
var definePropFunction = defineProp(Function);
var definePropNumber = defineProp(Number);
var definePropString = defineProp(String);
var defineEnumPropArray = defineEnumProp(Array);
var defineEnumPropBoolean = defineEnumProp(Boolean);
var defineEnumPropFunction = defineEnumProp(Function);
var defineEnumPropNumber = defineEnumProp(Number);
var defineEnumPropString = defineEnumProp(String);

exports._descriptorForSettable = _descriptorForSettable;
exports._makeDescriptorEnumerable = _makeDescriptorEnumerable;
exports.errorIfNotTypeOnTarget$ = errorIfNotTypeOnTarget$;
exports.defineProp$ = defineProp$;
exports.defineEnumProp$ = defineEnumProp$;
exports.errorIfNotTypeOnTarget = errorIfNotTypeOnTarget;
exports.defineProp = defineProp;
exports.defineEnumProp = defineEnumProp;
exports.definePropArray = definePropArray;
exports.definePropBoolean = definePropBoolean;
exports.definePropFunction = definePropFunction;
exports.definePropNumber = definePropNumber;
exports.definePropString = definePropString;
exports.defineEnumPropArray = defineEnumPropArray;
exports.defineEnumPropBoolean = defineEnumPropBoolean;
exports.defineEnumPropFunction = defineEnumPropFunction;
exports.defineEnumPropNumber = defineEnumPropNumber;
exports.defineEnumPropString = defineEnumPropString;

return exports;

}({},fjl,fjlErrorThrowing));
//# sourceMappingURL=fjl-mutable.js.map
