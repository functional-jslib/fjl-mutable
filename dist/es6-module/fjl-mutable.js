import { apply, curry, errorIfNotType, isType, isUndefined, toTypeRefName } from 'fjl';

/**
 * @module fjlMutable
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
const _descriptorForSettable = (Type, target, propName) => {
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
const errorIfNotTypeOnTarget$ = (Type, target, propName, propValue) => {
        errorIfNotType(toTypeRefName(Type), target, propName, propValue);
        return propValue;
    };
const defineProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);
        Object.defineProperty(_target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
            _target[propName] = defaultValue;
        }
        return [_target, descriptor];
    };
const defineEnumProp$ = (Type, target, propName, defaultValue = undefined) => {
        const [_target, _descriptor] = _targetDescriptorTuple(target),
            descriptor = _descriptor || _descriptorForSettable(Type, _target, propName);
        return defineProp$(
            Type,
            _makeDescriptorEnumerable([_target, descriptor]),
            propName,
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

export { _descriptorForSettable, _makeDescriptorEnumerable, _targetDescriptorTuple, errorIfNotTypeOnTarget$, defineProp$, defineEnumProp$, defineEnumProps$, defineProps$, errorIfNotTypeOnTarget, defineProp, defineEnumProp, defineProps, defineEnumProps };
