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
/**
 * @param enumerable {Boolean}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function _getDefineProps$(enumerable) {
  var operation$ = enumerable ? defineEnumProp$ : defineProp$;
  return function (argTuples, target) {
    argTuples.forEach(function (argTuple) {
      var _argTuple = slicedToArray(argTuple, 3),
          TypeRef = _argTuple[0],
          propName = _argTuple[1],
          defaultValue = _argTuple[2];

      fjl.apply(operation$, [TypeRef, target, propName, defaultValue]);
    });
    return target;
  };
}

/**
 * @note Custom jsdoc type definitions defined toward end of file.
 */
var _descriptorForSettable = function _descriptorForSettable(Type, target, propName) {
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
var _targetDescriptorTuple = function _targetDescriptorTuple(targetOrTargetDescrTuple) {
  return fjl.isType('Array', targetOrTargetDescrTuple) ? // Strict type check for array
  targetOrTargetDescrTuple : [targetOrTargetDescrTuple];
};
var errorIfNotTypeOnTarget$ = function errorIfNotTypeOnTarget$(Type, target, propName, propValue) {
  fjlErrorThrowing.errorIfNotType(fjlErrorThrowing.getTypeName(Type), target, propName, propValue);
  return propValue;
};
var defineProp$ = function defineProp$(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _targetDescriptorTupl = _targetDescriptorTuple(target),
      _targetDescriptorTupl2 = slicedToArray(_targetDescriptorTupl, 2),
      _target = _targetDescriptorTupl2[0],
      _descriptor = _targetDescriptorTupl2[1],
      descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);

  Object.defineProperty(_target, propName, descriptor);
  if (!fjl.isUndefined(defaultValue)) {
    _target[propName] = defaultValue;
  }
  return [_target, descriptor];
};
var defineEnumProp$ = function defineEnumProp$(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _targetDescriptorTupl3 = _targetDescriptorTuple(target),
      _targetDescriptorTupl4 = slicedToArray(_targetDescriptorTupl3, 2),
      _target = _targetDescriptorTupl4[0],
      _descriptor = _targetDescriptorTupl4[1],
      descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);

  return defineProp$(Type, _makeDescriptorEnumerable([_target, descriptor]), propName, defaultValue);
};
var defineEnumProps$ = _getDefineProps$(true);
var defineProps$ = _getDefineProps$(false);
var errorIfNotTypeOnTarget = fjl.curry(errorIfNotTypeOnTarget$);
var defineProp = fjl.curry(defineProp$);
var defineEnumProp = fjl.curry(defineEnumProp$);
var defineProps = fjl.curry(defineProps$);
var defineEnumProps = fjl.curry(defineEnumProps$);

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

/**
 * @typedef {Array.<TypeRef, TargetDescriptorTuple, String, *>}  DefinePropArgsTuple
 * @description Arguments list for `defineProp` and/or `defineEnumProp` (note: some
 *  parts of array/tuple are options (namely the last two args));  E.g.,
 *  ```
 *  [String, [someTarget], 'somePropName', 'someDefaultValue] // ...
 *  ```
 */

/**
 * @typedef {Function} PropsDefinerCall
 * @description Same type as `defineProp` and `defineEnumProp`
 * @param argsTuple {DefinePropArgsTuple}
 * @param target {Target}
 * @returns {Array.<TargetDescriptorTuple>}
 */

exports._descriptorForSettable = _descriptorForSettable;
exports._makeDescriptorEnumerable = _makeDescriptorEnumerable;
exports._targetDescriptorTuple = _targetDescriptorTuple;
exports.errorIfNotTypeOnTarget$ = errorIfNotTypeOnTarget$;
exports.defineProp$ = defineProp$;
exports.defineEnumProp$ = defineEnumProp$;
exports.defineEnumProps$ = defineEnumProps$;
exports.defineProps$ = defineProps$;
exports.errorIfNotTypeOnTarget = errorIfNotTypeOnTarget;
exports.defineProp = defineProp;
exports.defineEnumProp = defineEnumProp;
exports.defineProps = defineProps;
exports.defineEnumProps = defineEnumProps;

return exports;

}({},fjl,fjlErrorThrowing));
//# sourceMappingURL=fjl-mutable.js.map
