import {curry, flip, flip3} from 'fjl';

import {errorIfNotType} from 'fjl-error-throwing';

export const

    _descriptorForSettable = Type => {
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

    _makeEnumerableDescriptor = descriptor => {
        descriptor.enumerable = true;
        return descriptor;
    },

    errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        errorIfNotType(Type, (target).constructor.name, propName, propValue);
        return propValue;
    },

    defineProp$ = (Type, propName, target) => {
        const descriptor = _descriptorForSettable(Type);
        Object.defineProperty(target, propName, descriptor);
        return [target, descriptor];
    },

    defineEnumProp$ = (Type, propName, target) =>
        _makeEnumerableDescriptor (
            defineProp$(Type, propName, target)
        ),

    errorIfNotTypeOnTarget = curry(errorIfNotTypeOnTarget$),

    defineProp = curry(defineProp$),

    defineEnumProp = curry(defineEnumProp$),

    definePropArray = defineProp(Array),

    definePropBoolean = defineProp(Boolean),

    definePropFunction = defineProp(Function),

    definePropNumber = defineProp(Number),

    definePropString = defineProp(String),

    defineEnumPropArray = defineEnumProp(Array),

    defineEnumPropBoolean = defineEnumProp(Boolean),

    defineEnumPropFunction = defineEnumProp(Function),

    defineEnumPropNumber = defineEnumProp(Number),

    defineEnumPropString = defineEnumProp(String)

;

export default {
    defineProp,
    defineProp$,
    definePropArray,
    definePropBoolean,
    definePropFunction,
    definePropNumber,
    definePropString,
    defineEnumProp,
    defineEnumProp$,
    defineEnumPropArray,
    defineEnumPropBoolean,
    defineEnumPropFunction,
    defineEnumPropNumber,
    defineEnumPropString,
    errorIfNotTypeOnTarget,
    errorIfNotTypeOnTarget$,
    _descriptorForSettable,
    _makeEnumerableDescriptor
}
