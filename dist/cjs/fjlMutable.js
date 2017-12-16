'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineEnumProps = exports.defineProps = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineProps$ = exports.defineEnumProps$ = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._targetDescriptorTuple = exports._makeDescriptorEnumerable = exports._descriptorForSettable = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module fjlMutable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _fjl = require('fjl');

var _fjlErrorThrowing = require('fjl-error-throwing');

/**
 * @param enumerable {Boolean}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function _getDefineProps$(enumerable) {
  var operation$ = enumerable ? defineEnumProp$ : defineProp$;
  return function (argTuples, target) {
    argTuples.forEach(function (argTuple) {
      var _argTuple = _slicedToArray(argTuple, 3),
          TypeRef = _argTuple[0],
          propName = _argTuple[1],
          defaultValue = _argTuple[2];

      (0, _fjl.apply)(operation$, [TypeRef, target, propName, defaultValue]);
    });
    return target;
  };
}

/**
 * @note Custom jsdoc type definitions defined toward end of file.
 */
var

/**
 * @function module:fjlMutable._descriptorForSettable
 * @param Type {TypeRef} - {String|Function}
 * @param target {*}
 * @param propName {String}
 * @returns {Descriptor} - Property descriptor with just getter and setter.
 * @private
 */
_descriptorForSettable = exports._descriptorForSettable = function _descriptorForSettable(Type, target, propName) {
  var _value = void 0;
  return {
    get: function get() {
      return _value;
    },
    set: function set(value) {
      _value = errorIfNotTypeOnTarget(Type, propName, target, value);
    }
  };
},


/**
 * @function module:fjlMutable._makeDescriptorEnumerable
 * @param {TargetDescriptorTuple} - [target, descriptor] tuple.
 * @returns {TargetDescriptorTuple} - Array of target and descriptor.
 * @private
 */
_makeDescriptorEnumerable = exports._makeDescriptorEnumerable = function _makeDescriptorEnumerable(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      target = _ref2[0],
      descriptor = _ref2[1];

  descriptor.enumerable = true;
  return [target, descriptor];
},
    _targetDescriptorTuple = exports._targetDescriptorTuple = function _targetDescriptorTuple(targetOrTargetDescrTuple) {
  return (0, _fjl.isType)('Array', targetOrTargetDescrTuple) ? // Strict type check for array
  targetOrTargetDescrTuple : [targetOrTargetDescrTuple];
},


/**
 * @function module:fjlMutable.errorIfNotTypeOnTarget$
 * @param Type {TypeRef} - {String|Function}
 * @param target {*}
 * @param propName {String}
 * @param propValue {*}
 * @returns {*} - `propValue`
 */
errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = function errorIfNotTypeOnTarget$(Type, target, propName, propValue) {
  (0, _fjlErrorThrowing.errorIfNotType)((0, _fjlErrorThrowing.getTypeName)(Type), target, propName, propValue);
  return propValue;
},


/**
 * @function module:fjlMutable.defineProp$
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineProp$ = exports.defineProp$ = function defineProp$(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _targetDescriptorTupl = _targetDescriptorTuple(target),
      _targetDescriptorTupl2 = _slicedToArray(_targetDescriptorTupl, 2),
      _target = _targetDescriptorTupl2[0],
      _descriptor = _targetDescriptorTupl2[1],
      descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);

  Object.defineProperty(_target, propName, descriptor);
  if (!(0, _fjl.isUndefined)(defaultValue)) {
    _target[propName] = defaultValue;
  }
  return [_target, descriptor];
},


/**
 * @function module:fjlMutable.defineProp$
 * @param Type {TypeRef} - {String|Function}
 * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 */
defineEnumProp$ = exports.defineEnumProp$ = function defineEnumProp$(Type, target, propName) {
  var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

  var _targetDescriptorTupl3 = _targetDescriptorTuple(target),
      _targetDescriptorTupl4 = _slicedToArray(_targetDescriptorTupl3, 2),
      _target = _targetDescriptorTupl4[0],
      _descriptor = _targetDescriptorTupl4[1],
      descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);

  return defineProp$(Type, _makeDescriptorEnumerable([_target, descriptor]), propName, defaultValue);
},


/**
 * Allows you to define multiple enum props at once on target.
 * @function module:fjlMutable.defineEnumProps$
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
 */
defineEnumProps$ = exports.defineEnumProps$ = _getDefineProps$(true),


/**
 * Allows you to define multiple props at once on target.
 * @function module:fjlMutable.defineProps$
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
 */
defineProps$ = exports.defineProps$ = _getDefineProps$(false),


/**
 * @function module:fjlMutable.errorIfNotTypeOnTarget
 * @param Type {TypeRef} - {String|Function}
 * @param target {*}
 * @param propName {String}
 * @param propValue {*}
 * @returns {*} - `propValue`
 * @curried
 */
errorIfNotTypeOnTarget = exports.errorIfNotTypeOnTarget = (0, _fjl.curry)(errorIfNotTypeOnTarget$),


/**
 * @function module:fjlMutable.defineProp
 * @param Type {TypeRef} - {String|Function}
 * @param {TargetDescriptorTuple} - [target, descriptor].
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 * @curried
 */
defineProp = exports.defineProp = (0, _fjl.curry)(defineProp$),


/**
 * @function module:fjlMutable.defineEnumProp
 * @param Type {TypeRef} - {String|Function}
 * @param {TargetDescriptorTuple} - [target, descriptor].
 * @param propName {String}
 * @param [defaultValue=undefined] {*}
 * @returns {TargetDescriptorTuple}
 * @curried
 */
defineEnumProp = exports.defineEnumProp = (0, _fjl.curry)(defineEnumProp$),


/**
 * Same as `defineProps$` but curried:
 *  Allows you to define multiple props at once on target.
 * @function module:fjlMutable.defineProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
 * @curried
 */
defineProps = exports.defineProps = (0, _fjl.curry)(defineProps$),


/**
 * Same as `defineEnumProps$` but curried:
 *  Allows you to define multiple enum props at once on target.
 * @function module:fjlMutable.defineEnumProps
 * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
 * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
 * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
 * @curried
 */
defineEnumProps = exports.defineEnumProps = (0, _fjl.curry)(defineEnumProps$);

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