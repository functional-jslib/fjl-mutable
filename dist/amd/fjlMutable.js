define(['exports', 'fjl', 'fjl-error-throwing'], function (exports, _fjl, _fjlErrorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumPropString = exports.defineEnumPropNumber = exports.defineEnumPropFunction = exports.defineEnumPropBoolean = exports.defineEnumPropArray = exports.definePropString = exports.definePropNumber = exports.definePropFunction = exports.definePropBoolean = exports.definePropArray = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._makeEnumerableDescriptor = exports._descriptorForSettable = undefined;


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
     * @module fjlMutable
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
     * @function module:fjlMutable._makeEnumerableDescriptor
     * @param {TargetDescriptorTuple} - [target, descriptor] tuple.
     * @returns {TargetDescriptorTuple} - Array of target and descriptor.
     * @private
     */
    _makeEnumerableDescriptor = exports._makeEnumerableDescriptor = ([target, descriptor]) => {
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
    errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
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
    defineProp$ = exports.defineProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
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
    defineEnumProp$ = exports.defineEnumProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => _makeEnumerableDescriptor(defineProp$(Type, propName, [target, descriptor], defaultValue)),


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
});