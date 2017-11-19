(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'fjl', 'fjl-error-throwing'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('fjl'), require('fjl-error-throwing'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.fjl, global.fjlErrorThrowing);
        global.fjlMutable = mod.exports;
    }
})(this, function (exports, _fjl, _fjlErrorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumPropString = exports.defineEnumPropNumber = exports.defineEnumPropFunction = exports.defineEnumPropBoolean = exports.defineEnumPropArray = exports.definePropString = exports.definePropNumber = exports.definePropFunction = exports.definePropBoolean = exports.definePropArray = exports.defineEnumProps = exports.defineProps = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineProps$ = exports.defineEnumProps$ = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._makeDescriptorEnumerable = exports._descriptorForSettable = undefined;

    var _slicedToArray = function () {
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
     * @param enumerable {Boolean}
     * @returns {function(*, *)|PropsDefinerCall}
     * @private
     */
    function _getDefineProps$(enumerable) {
        var op$ = enumerable ? defineEnumProp$ : defineProp$;
        return function (argTuples, target) {
            var targetDescriptorTupleArg = [[target]];
            return argTuples.map(function (argTuple) {
                var result = void 0;
                switch (argTuple.length) {
                    case 2:
                        result = (0, _fjl.apply)(op$, argTuple.concat(targetDescriptorTupleArg));
                        break;
                    default:
                        result = (0, _fjl.apply)(op$, argTuple);
                        break;
                }
                return result;
            });
        };
    }

    /**
     * @note Custom jsdoc type definitions defined toward end of file.
     */
    var

    /**
     * @function module:fjlMutable._descriptorForSettable
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     * @private
     */
    _descriptorForSettable = exports._descriptorForSettable = function _descriptorForSettable(Type, propName, target) {
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


    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @param propValue {*}
     * @returns {*} - `propValue`
     */
    errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = function errorIfNotTypeOnTarget$(Type, propName, target, propValue) {
        (0, _fjlErrorThrowing.errorIfNotType)((0, _fjlErrorThrowing.getTypeName)(Type), target, propName, propValue);
        return propValue;
    },


    /**
     * @function module:fjlMutable.defineProp$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     */
    defineProp$ = exports.defineProp$ = function defineProp$(Type, propName, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            target = _ref4[0],
            descriptor = _ref4[1];

        var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        Object.defineProperty(target, propName, descriptor);
        if (!(0, _fjl.isUndefined)(defaultValue)) {
            target[propName] = defaultValue;
        }
        return [target, descriptor];
    },


    /**
     * @function module:fjlMutable.defineProp$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     */
    defineEnumProp$ = exports.defineEnumProp$ = function defineEnumProp$(Type, propName, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            target = _ref6[0],
            descriptor = _ref6[1];

        var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        return defineProp$(Type, propName, _makeDescriptorEnumerable([target, descriptor]), defaultValue);
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
     * @param propName {String}
     * @param target {*}
     * @param propValue {*}
     * @returns {*} - `propValue`
     * @curried
     */
    errorIfNotTypeOnTarget = exports.errorIfNotTypeOnTarget = (0, _fjl.curry)(errorIfNotTypeOnTarget$),


    /**
     * @function module:fjlMutable.defineProp
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineProp = exports.defineProp = (0, _fjl.curry)(defineProp$),


    /**
     * @function module:fjlMutable.defineEnumProp
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
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
    defineEnumProps = exports.defineEnumProps = (0, _fjl.curry)(defineEnumProps$),


    /**
     * @function module:fjlMutable.definePropArray
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropArray = exports.definePropArray = defineProp(Array),


    /**
     * @function module:fjlMutable.definePropBoolean
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropBoolean = exports.definePropBoolean = defineProp(Boolean),


    /**
     * @function module:fjlMutable.definePropFunction
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropFunction = exports.definePropFunction = defineProp(Function),


    /**
     * @function module:fjlMutable.definePropNumber
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropNumber = exports.definePropNumber = defineProp(Number),


    /**
     * @function module:fjlMutable.definePropString
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropString = exports.definePropString = defineProp(String),


    /**
     * @function module:fjlMutable.defineEnumPropArray
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropArray = exports.defineEnumPropArray = defineEnumProp(Array),


    /**
     * @function module:fjlMutable.defineEnumPropBoolean
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropBoolean = exports.defineEnumPropBoolean = defineEnumProp(Boolean),


    /**
     * @function module:fjlMutable.defineEnumPropFunction
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropFunction = exports.defineEnumPropFunction = defineEnumProp(Function),


    /**
     * @function module:fjlMutable.defineEnumPropNumber
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropNumber = exports.defineEnumPropNumber = defineEnumProp(Number),


    /**
     * @function module:fjlMutable.defineEnumPropString
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropString = exports.defineEnumPropString = defineEnumProp(String);

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
     * @typedef {Array.<TypeRef, String, [TargetDescriptorTuple], [*|null|undefined]>}  DefinePropArgsTuple
     * @description Arguments list for `defineProp` and/or `defineEnumProp`;  E.g.,
     *  ```
     *  [String, 'somePropName', [someTarget], 'someDefaultValue] // ...
     *  ```
     */

    /**
     * @typedef {Function} PropsDefinerCall
     * @description Same type as `defineProp` and `defineEnumProp`
     * @param argsTuple {DefinePropArgsTuple}
     * @param target {Target}
     * @returns {Array.<TargetDescriptorTuple>}
     */
});