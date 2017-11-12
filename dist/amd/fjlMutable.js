define(['exports', 'fjl', 'fjl-error-throwing'], function (exports, _fjl, _fjlErrorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defineEnumPropString = exports.defineEnumPropNumber = exports.defineEnumPropFunction = exports.defineEnumPropBoolean = exports.defineEnumPropArray = exports.definePropString = exports.definePropNumber = exports.definePropFunction = exports.definePropBoolean = exports.definePropArray = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._makeEnumerableDescriptor = exports._descriptorForSettable = undefined;
    const _descriptorForSettable = exports._descriptorForSettable = (Type, propName, target) => {
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
          _makeEnumerableDescriptor = exports._makeEnumerableDescriptor = ([target, descriptor]) => {
        descriptor.enumerable = true;
        return [target, descriptor];
    },
          errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = (Type, propName, target, propValue) => {
        (0, _fjlErrorThrowing.errorIfNotType)(Type, (0, _fjlErrorThrowing.getTypeName)(target), propName, propValue);
        return propValue;
    },
          defineProp$ = exports.defineProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => {
        descriptor = descriptor || _descriptorForSettable(Type, propName, target);
        Object.defineProperty(target, propName, descriptor);
        if (!(0, _fjl.isUndefined)(defaultValue)) {
            target[propName] = defaultValue;
        }
        return [target, descriptor];
    },
          defineEnumProp$ = exports.defineEnumProp$ = (Type, propName, [target, descriptor], defaultValue = undefined) => _makeEnumerableDescriptor(defineProp$(Type, propName, [target, descriptor], defaultValue)),
          errorIfNotTypeOnTarget = exports.errorIfNotTypeOnTarget = (0, _fjl.curry)(errorIfNotTypeOnTarget$),
          defineProp = exports.defineProp = (0, _fjl.curry)(defineProp$),
          defineEnumProp = exports.defineEnumProp = (0, _fjl.curry)(defineEnumProp$),
          definePropArray = exports.definePropArray = defineProp(Array),
          definePropBoolean = exports.definePropBoolean = defineProp(Boolean),
          definePropFunction = exports.definePropFunction = defineProp(Function),
          definePropNumber = exports.definePropNumber = defineProp(Number),
          definePropString = exports.definePropString = defineProp(String),
          defineEnumPropArray = exports.defineEnumPropArray = defineEnumProp(Array),
          defineEnumPropBoolean = exports.defineEnumPropBoolean = defineEnumProp(Boolean),
          defineEnumPropFunction = exports.defineEnumPropFunction = defineEnumProp(Function),
          defineEnumPropNumber = exports.defineEnumPropNumber = defineEnumProp(Number),
          defineEnumPropString = exports.defineEnumPropString = defineEnumProp(String);
});