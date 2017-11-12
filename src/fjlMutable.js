import {isUndefined, curry} from 'fjl';

import {errorIfNotType, getTypeName} from 'fjl-error-throwing';

export const

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

    _makeEnumerableDescriptor = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    },

    errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        errorIfNotType(Type, getTypeName(target), propName, propValue);
        return propValue;
    },

    defineProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        Object.defineProperty(target, propName, descriptor);
        if (!isUndefined(defaultValue)) {
            target[propName] = defaultValue;
        }
        return [target, descriptor];
    },

    defineEnumProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) =>
        _makeEnumerableDescriptor (
            defineProp$(Type, propName, [target, descriptor], defaultValue)
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
