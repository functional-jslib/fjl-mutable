/**
 * @module fjlMutable
 */
import {isUndefined, curry, apply, isType} from 'fjl';

import {errorIfNotType, getTypeName} from 'fjl-error-throwing';

/**
 * @param enumerable {Boolean}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function _getDefineProps$ (enumerable) {
    const operation$ = enumerable ? defineEnumProp$ : defineProp$;
    return (argTuples, target) => {
        argTuples.forEach(argTuple => {
            const [TypeRef, propName, defaultValue] = argTuple;
            apply(operation$, [TypeRef, target, propName, defaultValue]);
        });
        return target;
    };
}

/**
 * @note Custom jsdoc type definitions defined toward end of file.
 */
export const

    /**
     * @function module:fjlMutable._descriptorForSettable
     * @param Type {TypeRef} - {String|Function}
     * @param target {*}
     * @param propName {String}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     * @private
     */
    _descriptorForSettable = (Type, target, propName) => {
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
    _makeDescriptorEnumerable = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    },

    _targetDescriptorTuple = targetOrTargetDescrTuple =>
        isType('Array', targetOrTargetDescrTuple) ? // Strict type check for array
            targetOrTargetDescrTuple : [targetOrTargetDescrTuple],

    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget$
     * @param Type {TypeRef} - {String|Function}
     * @param target {*}
     * @param propName {String}
     * @param propValue {*}
     * @returns {*} - `propValue`
     */
    errorIfNotTypeOnTarget$ = (Type, target, propName, propValue) => {
        errorIfNotType(getTypeName(Type), target, propName, propValue);
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
    defineProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);
        Object.defineProperty(_target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
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
    defineEnumProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);
        return defineProp$(
            Type,
            _makeDescriptorEnumerable([_target, descriptor]),
            propName,
            defaultValue
        );
    },

    /**
     * Allows you to define multiple enum props at once on target.
     * @function module:fjlMutable.defineEnumProps$
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
     */
    defineEnumProps$ = _getDefineProps$(true),

    /**
     * Allows you to define multiple props at once on target.
     * @function module:fjlMutable.defineProps$
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
     */
    defineProps$ = _getDefineProps$(false),

    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget
     * @param Type {TypeRef} - {String|Function}
     * @param target {*}
     * @param propName {String}
     * @param propValue {*}
     * @returns {*} - `propValue`
     * @curried
     */
    errorIfNotTypeOnTarget = curry(errorIfNotTypeOnTarget$),

    /**
     * @function module:fjlMutable.defineProp
     * @param Type {TypeRef} - {String|Function}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param propName {String}
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineProp = curry(defineProp$),

    /**
     * @function module:fjlMutable.defineEnumProp
     * @param Type {TypeRef} - {String|Function}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param propName {String}
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumProp = curry(defineEnumProp$),

    /**
     * Same as `defineProps$` but curried:
     *  Allows you to define multiple props at once on target.
     * @function module:fjlMutable.defineProps
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineProp`.
     * @curried
     */
    defineProps = curry(defineProps$),

    /**
     * Same as `defineEnumProps$` but curried:
     *  Allows you to define multiple enum props at once on target.
     * @function module:fjlMutable.defineEnumProps
     * @param argsTuple {Array.<DefinePropArgsTuple>} - Array of argArrays for `defineEnumProp`.
     * @param [target = undefined] {Target} - Target to use in internal calls if one is not provided but encountered 'argArray'.
     * @returns {Array.<TargetDescriptorTuple>} - Results of each call to `defineEnumProp`.
     * @curried
     */
    defineEnumProps = curry(defineEnumProps$)

;

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
