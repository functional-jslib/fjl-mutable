/**
 * @module fjlMutable
 */
import {isUndefined, curry} from 'fjl';

import {errorIfNotType, getTypeName} from 'fjl-error-throwing';

/**
 * @note Custom jsdoc type definitions defined toward end of file.
 */
export const

    /**
     * @function module:fjlMutable._descriptorForSettable
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @returns {Descriptor} - Property descriptor with just getter and setter.
     * @private
     */
    _descriptorForSettable = (Type, propName, target) => {
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

    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget$
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @param propValue {*}
     * @returns {*} - `propValue`
     */
    errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        errorIfNotType(getTypeName(Type), target, propName, propValue);
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
    defineProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        Object.defineProperty(target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
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
    defineEnumProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        return defineProp$(
            Type, propName,
            _makeDescriptorEnumerable([target, descriptor]),
            defaultValue
        );
    },

    /**
     * @function module:fjlMutable.errorIfNotTypeOnTarget
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param target {*}
     * @param propValue {*}
     * @returns {*} - `propValue`
     * @curried
     */
    errorIfNotTypeOnTarget = curry(errorIfNotTypeOnTarget$),

    /**
     * @function module:fjlMutable.defineProp
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineProp = curry(defineProp$),

    /**
     * @function module:fjlMutable.defineEnumProp
     * @param Type {TypeRef} - {String|Function}
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumProp = curry(defineEnumProp$),

    /**
     * @function module:fjlMutable.definePropArray
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropArray = defineProp(Array),

    /**
     * @function module:fjlMutable.definePropBoolean
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropBoolean = defineProp(Boolean),

    /**
     * @function module:fjlMutable.definePropFunction
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropFunction = defineProp(Function),

    /**
     * @function module:fjlMutable.definePropNumber
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropNumber = defineProp(Number),

    /**
     * @function module:fjlMutable.definePropString
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    definePropString = defineProp(String),

    /**
     * @function module:fjlMutable.defineEnumPropArray
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropArray = defineEnumProp(Array),

    /**
     * @function module:fjlMutable.defineEnumPropBoolean
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropBoolean = defineEnumProp(Boolean),

    /**
     * @function module:fjlMutable.defineEnumPropFunction
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropFunction = defineEnumProp(Function),

    /**
     * @function module:fjlMutable.defineEnumPropNumber
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropNumber = defineEnumProp(Number),

    /**
     * @function module:fjlMutable.defineEnumPropString
     * @param propName {String}
     * @param {TargetDescriptorTuple} - [target, descriptor].
     * @param [defaultValue=undefined] {*}
     * @returns {TargetDescriptorTuple}
     * @curried
     */
    defineEnumPropString = defineEnumProp(String)

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
