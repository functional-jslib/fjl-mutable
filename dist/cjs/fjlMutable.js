'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defineEnumPropString = exports.defineEnumPropNumber = exports.defineEnumPropFunction = exports.defineEnumPropBoolean = exports.defineEnumPropArray = exports.definePropString = exports.definePropNumber = exports.definePropFunction = exports.definePropBoolean = exports.definePropArray = exports.defineEnumProp = exports.defineProp = exports.errorIfNotTypeOnTarget = exports.defineEnumProp$ = exports.defineProp$ = exports.errorIfNotTypeOnTarget$ = exports._makeEnumerableDescriptor = exports._descriptorForSettable = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fjl = require('fjl');

var _fjlErrorThrowing = require('fjl-error-throwing');

var _descriptorForSettable = exports._descriptorForSettable = function _descriptorForSettable(Type, propName, target) {
    var _value = void 0;
    return {
        get: function get() {
            return _value;
        },
        set: function set(value) {
            _value = errorIfNotTypeOnTarget(Type, propName, target, value);
        }
    };
},
    _makeEnumerableDescriptor = exports._makeEnumerableDescriptor = function _makeEnumerableDescriptor(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        target = _ref2[0],
        descriptor = _ref2[1];

    descriptor.enumerable = true;
    return [target, descriptor];
},
    errorIfNotTypeOnTarget$ = exports.errorIfNotTypeOnTarget$ = function errorIfNotTypeOnTarget$(Type, propName, target, propValue) {
    (0, _fjlErrorThrowing.errorIfNotType)(Type, (0, _fjlErrorThrowing.getTypeName)(target), propName, propValue);
    return propValue;
},
    defineProp$ = exports.defineProp$ = function defineProp$(Type, propName, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        target = _ref4[0],
        descriptor = _ref4[1];

    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    descriptor = descriptor || _descriptorForSettable(Type, propName, target);
    Object.defineProperty(target, propName, descriptor);
    if (!(0, _fjl.isUndefined)(defaultValue)) {
        target[propName] = defaultValue;
    }
    return [target, descriptor];
},
    defineEnumProp$ = exports.defineEnumProp$ = function defineEnumProp$(Type, propName, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        target = _ref6[0],
        descriptor = _ref6[1];

    var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    return _makeEnumerableDescriptor(defineProp$(Type, propName, [target, descriptor], defaultValue));
},
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