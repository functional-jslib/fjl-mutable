import { curry, isUndefined } from 'fjl';
import { errorIfNotType, getTypeName } from 'fjl-error-throwing';

/**
 * @module fjlMutable
 */
/**
 * @note Custom jsdoc type definitions defined toward end of file.
 */
const _descriptorForSettable = (Type, propName, target) => {
        let _value;
        return {
            get: function () {
                return _value;
            },
            set: function (value) {
                _value = errorIfNotTypeOnTarget(Type, propName, target, value);
            }
        };
    };
const _makeDescriptorEnumerable = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    };
const errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        errorIfNotType(getTypeName(Type), target, propName, propValue);
        return propValue;
    };
const defineProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        Object.defineProperty(target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
            target[propName] = defaultValue;
        }
        return [target, descriptor];
    };
const defineEnumProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        return defineProp$(
            Type, propName,
            _makeDescriptorEnumerable([target, descriptor]),
            defaultValue
        );
    };
const errorIfNotTypeOnTarget = curry(errorIfNotTypeOnTarget$);
const defineProp = curry(defineProp$);
const defineEnumProp = curry(defineEnumProp$);
const definePropArray = defineProp(Array);
const definePropBoolean = defineProp(Boolean);
const definePropFunction = defineProp(Function);
const definePropNumber = defineProp(Number);
const definePropString = defineProp(String);
const defineEnumPropArray = defineEnumProp(Array);
const defineEnumPropBoolean = defineEnumProp(Boolean);
const defineEnumPropFunction = defineEnumProp(Function);
const defineEnumPropNumber = defineEnumProp(Number);
const defineEnumPropString = defineEnumProp(String);

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

export { _descriptorForSettable, _makeDescriptorEnumerable, errorIfNotTypeOnTarget$, defineProp$, defineEnumProp$, errorIfNotTypeOnTarget, defineProp, defineEnumProp, definePropArray, definePropBoolean, definePropFunction, definePropNumber, definePropString, defineEnumPropArray, defineEnumPropBoolean, defineEnumPropFunction, defineEnumPropNumber, defineEnumPropString };
