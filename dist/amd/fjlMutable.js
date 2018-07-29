define(['exports', 'fjl'], function (exports, _fjl) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumProps = exports.defineProps = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineProps$ = exports.defineEnumProps$ = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._targetDescriptorTuple = exports._makeDescriptorEnumerable = exports._descriptorForSettable = undefined;


    /**
     * @param enumerable {Boolean}
     * @returns {function(*, *)|PropsDefinerCall}
     * @private
     */
    function _getDefineProps$(enumerable) {
        const operation$ = enumerable ? defineEnumProp$ : defineProp$;
        return (argTuples, target) => {
            argTuples.forEach(argTuple => {
                const [TypeRef, propName, defaultValue] = argTuple;
                (0, _fjl.apply)(operation$, [TypeRef, target, propName, defaultValue]);
            });
            return target;
        };
    }

    /**
     * @note Custom jsdoc type definitions defined toward end of file.
     */
    /**
     * @module fjlMutable
     */
    const

    /**
     * @function module:fjlMutable._descriptorForSettable
     * @param Type {TypeRef} - {String|Function}
     * @param target {*}
     * @param propName {String}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     * @private
     */
    _descriptorForSettable = exports._descriptorForSettable = (Type, target, propName) => {
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
     * @param target {*}
     * @param propName {String}
     * @param propValue {*}
     * @returns {*} - `propValue`
     */
    errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = (Type, target, propName, propValue) => {
        (0, _fjl.errorIfNotType)((0, _fjl.toTypeRefName)(Type), target, propName, propValue);
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
    defineProp$ = exports.defineProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
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
    defineEnumProp$ = exports.defineEnumProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
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
});