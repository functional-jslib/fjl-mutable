define(['exports', 'fjl', 'fjl-error-throwing'], function (exports, _fjl, _fjlErrorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumPropString = exports.defineEnumPropNumber = exports.defineEnumPropFunction = exports.defineEnumPropBoolean = exports.defineEnumPropArray = exports.definePropString = exports.definePropNumber = exports.definePropFunction = exports.definePropBoolean = exports.definePropArray = exports.defineEnumProps = exports.defineProps = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineProps$ = exports.defineEnumProps$ = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._targetDescriptorTuple = exports._makeDescriptorEnumerable = exports._descriptorForSettable = undefined;


    /**
     * @param enumerable {Boolean}
     * @returns {function(*, *)|PropsDefinerCall}
     * @private
     */
    /**
     * @module fjlMutable
     */
    function _getDefineProps$(enumerable) {
        const op$ = enumerable ? defineEnumProp$ : defineProp$;
        return (argTuples, target) => {
            const targetDescriptorTupleArg = [target];
            return argTuples.map(argTuple => {
                let result;
                switch (argTuple.length) {
                    case 2:
                        result = (0, _fjl.apply)(op$, argTuple.concat(targetDescriptorTupleArg));
                        break;
                    case 3:
                        const [TypeRef, propName, defaultValue] = argTuple;
                        result = (0, _fjl.apply)(op$, [TypeRef, propName, target, defaultValue]);
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
    const

    /**
     * @function module:fjlMutable._descriptorForSettable
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     * @private
     */
    _descriptorForSettable = exports._descriptorForSettable = (Type, propName, target) => {
        let _value;
        return {
            get: function () {
                return _value;
            },
            set: function (value) {
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
    _makeDescriptorEnumerable = exports._makeDescriptorEnumerable = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    },
          _targetDescriptorTuple = exports._targetDescriptorTuple = targetOrTargetDescrTuple => (0, _fjl.isType)('Array', targetOrTargetDescrTuple) ? // Strict type check for array
    targetOrTargetDescrTuple : [targetOrTargetDescrTuple],


    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @param propValue {*}
     * @returns {*} - `propValue`
     */
    errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        (0, _fjlErrorThrowing.errorIfNotType)((0, _fjlErrorThrowing.getTypeName)(Type), target, propName, propValue);
        return propValue;
    },


    /**
     * @function module:fjlMutable.defineProp$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     */
    defineProp$ = exports.defineProp$ = (Type, propName, target, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
              descriptor = _descriptor || _descriptorForSettable(Type, propName, _target);
        Object.defineProperty(_target, propName, descriptor);
        if (!(0, _fjl.isUndefined)(defaultValue)) {
            _target[propName] = defaultValue;
        }
        return [_target, descriptor];
    },


    /**
     * @function module:fjlMutable.defineProp$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {TargetDescriptorTuple} - Target or array of target and descriptor ([target, descriptor]).
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     */
    defineEnumProp$ = exports.defineEnumProp$ = (Type, propName, target, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
              descriptor = _descriptor || _descriptorForSettable(Type, propName, _target);
        return defineProp$(Type, propName, _makeDescriptorEnumerable([_target, descriptor]), defaultValue);
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
     * @typedef {Array.<TypeRef, String, TargetDescriptorTuple, *>}  DefinePropArgsTuple
     * @description Arguments list for `defineProp` and/or `defineEnumProp` (note: some
     *  parts of array/tuple are options (namely the last two args));  E.g.,
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