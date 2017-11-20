import { apply, curry, isType, isUndefined } from 'fjl';
import { errorIfNotType, getTypeName } from 'fjl-error-throwing';

/**
 * @module fjlMutable
 */
/**
 * @param enumerable {Boolean}
 * @returns {function(*, *)|PropsDefinerCall}
 * @private
 */
function _getDefineProps$ (enumerable) {
    const op$ = enumerable ? defineEnumProp$ : defineProp$;
    return (argTuples, target) => {
        const targetDescriptorTupleArg = [target];
        return argTuples.map(argTuple => {
            let result;
            switch (argTuple.length) {
                case 2:
                    result = apply(op$, argTuple.concat(targetDescriptorTupleArg));
                    break;
                case 3:
                    const [TypeRef, propName, defaultValue] = argTuple;
                    result = apply(op$, [TypeRef, propName, target, defaultValue]);
                    break;
                default:
                    result = apply(op$, argTuple);
                    break;
            }
            return result;
        });
    };
}

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
const _targetDescriptorTuple = targetOrTargetDescrTuple =>
        isType('Array', targetOrTargetDescrTuple) ? // Strict type check for array
            targetOrTargetDescrTuple : [targetOrTargetDescrTuple];
const errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        errorIfNotType(getTypeName(Type), target, propName, propValue);
        return propValue;
    };
const defineProp$ = (Type, propName, target, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, propName, _target);
        Object.defineProperty(_target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
            _target[propName] = defaultValue;
        }
        return [_target, descriptor];
    };
const defineEnumProp$ = (Type, propName, target, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, propName, _target);
        return defineProp$(
            Type, propName,
            _makeDescriptorEnumerable([_target, descriptor]),
            defaultValue
        );
    };
const defineEnumProps$ = _getDefineProps$(true);
const defineProps$ = _getDefineProps$(false);
const errorIfNotTypeOnTarget = curry(errorIfNotTypeOnTarget$);
const defineProp = curry(defineProp$);
const defineEnumProp = curry(defineEnumProp$);
const defineProps = curry(defineProps$);
const defineEnumProps = curry(defineEnumProps$);
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

export { _descriptorForSettable, _makeDescriptorEnumerable, _targetDescriptorTuple, errorIfNotTypeOnTarget$, defineProp$, defineEnumProp$, defineEnumProps$, defineProps$, errorIfNotTypeOnTarget, defineProp, defineEnumProp, defineProps, defineEnumProps, definePropArray, definePropBoolean, definePropFunction, definePropNumber, definePropString, defineEnumPropArray, defineEnumPropBoolean, defineEnumPropFunction, defineEnumPropNumber, defineEnumPropString };
