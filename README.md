[![Build Status](https://travis-ci.org/functional-jslib/fjl-mutable.png)](https://travis-ci.org/functional-jslib/fjl-mutable)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl-mutable.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl-mutable)
[![NPM version](https://badge.fury.io/js/fjl-mutable.svg)](http://badge.fury.io/js/fjl-mutable)
[![Dependencies](https://david-dm.org/functional-jslib/fjl-mutable.png)](https://david-dm.org/functional-jslib/fjl-mutable)
# fjl-mutable
Functional and "typed" `defineProp`, `defineEnumProp`, `defineProps`, `defineEnumProps` functionality.

## Deprecated
This library now lives on as part of the [fjl library](https://github.com/functional-jslib/fjl).

## Sections in Readme:
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Docs](#docs)
- [Motivation](#motivations)
- [Development](#development)
- [Supported Platforms](#supported-platforms)
- [License](#license)
- [Resources](#resources)
- [Change log](#change-log)

## Requirements:
- Javascript Ecmascript 5+.

### Supported Platforms:

#### Browsers
- IE9+, and all other modern day browsers.

#### NodeJs
- 8+

## Getting Started:

### In NodeJs: 
#### Using es2015 modules:
```
import {...} from 'fjl-mutable';
```

#### Using CommonJs modules:
```
const {...} = require('fjl-mutable');
```

### In Browser:
See desired export type below:
- './dist/amd/' - Asynchronous module format.
- './dist/cjs/' - CommonJs module format.
- './dist/umd/' - Universal module definition format.
- './dist/iife/' - Immediately Invoked Function Execution - (exports `fjlMutable` as a global).
- './dist/es6-module/' - Ecmascript 6 module format.

## Docs

**JSDocs** are here (https://functional-jslib.github.io/fjl-mutable/) [https://functional-jslib.github.io/fjl-mutable/].

### `fjlMutable` methods
 ```
createTypedDescriptor, toEnumerableDescriptor, toTargetDescriptorTuple,
defineProp, defineEnumProp, defineEnumProps, defineProps
```


In-line summary docs follow:

### `defineProp(TypeRef, propName, targetOrTargetTuple, defaultValue = undefined) : Descriptor`
Defines a property on target that is constricted to given Type (`TypeRef`).
HaskellType: `defineProp :: TypeRef -> String -> TargetOrTargetTuple -> Any -> Descriptor`

### `defineEnumProp(TypeRef, propName, targetOrTargetTuple, defaultValue = undefined) : Descriptor`
Defines an enumerable property on target that is constricted to given Type (`TypeRef`).
HaskellType: `defineEnumProp :: TypeRef -> String -> TargetOrTargetTuple -> Any -> Descriptor`
```
const someDefaultValue = 
class User {
    static defaultRole = 'guest';
    constructor ({firstName, age}) {
        defineEnumProp(String, 'firstName', this, firstName); // if `firstName` here is not of type `String`, detailed error thrown  
        defineEnumProp(Number, 'age', this);
        defineEnumProp(String, 'role', this, User.defaultRole);
        this.age = age; // This is fine since our setter expects a number
        this.age = 'hello world'; // This throws a detailed error ('`#User.age` 
                                  //   ... expects type: "Number" ... Type received ...' etc.
                                  // )
    }
}

// Later..
const user = new User();
user.firstName = "Some name";
user.age = '99'; // Throws (detailed) error since type does not match.
```

### `defineEnumProps(argTuples, target) : Array<Array<Target, Descriptor>>`
Defines enumerable properties all at once on specified target.
#### Params:
- `argTuples {Array}` - Array of argument lists of the same type that `defineEnumProps` takes: 
    E.g., `Array.<TypeRef, String, TargetOrTargetTuple, Any>`  with one distinction: 3rd argument is optional (target argument).
```
const someTarget = {};
defineEnumProps([
    [String, 'someProp', someDefaultValue],
    [String, 'someProp2', someDefaultValue2],
    [String, 'someProp3', someTarget, someDefaultValue3],
    [String, 'someProp4', [someTarget, somePropDescriptor], someDefaultValue4],
], someTarget);

```
- `target {*}` - Target to define properties on.  

Example usage:
```
const someDefaultValue = 'someValueHere';
class User {
    static defaultRole = 'guest';
    constructor ({firstName, age}) {
        defineEnumProps([
            [String, 'firstName', firstName],   // if `firstName` here is not of 
                                                // type `String`, detailed error thrown
            [Number, 'age'],
            [String, 'role', User.defaultRole]
        ], target);
        this.age = age;                         // This is fine since our setter expects a number
        this.age = 'hello world';               // This throws a detailed error ('`#User.age` 
                                                //   ... expects type: "Number" ... Type received ...' etc.
                                                // )
    }
}

// Later..
const user = new User();
user.firstName = "Some name";
user.age = '99'; // Throws (detailed) error since type does not match.
```

### `defineProps(argTuples, target) : Array<Array<Target, Descriptor>>`
Same as `defineEnumProps` though doesn't make props enumerable on target.  See params description and examples below:
#### Params:
- `argTuples {Array}` - Array of argument lists of the same type that `defineEnumProps` takes: 
    E.g., `Array.<TypeRef, String, TargetOrTargetTuple, Any>`  with one distinction: 3rd argument is optional (target argument).
```
const someTarget = {};
defineEnumProps([
    [String, 'someProp', someDefaultValue],
    [String, 'someProp2', someDefaultValue2],
    [String, 'someProp3', someTarget, someDefaultValue3],
    [String, 'someProp4', [someTarget, somePropDescriptor], someDefaultValue4],
], someTarget);

```
- `target {*}` - Target to define properties on.  

Example usage:
```
const someDefaultValue = 'someValueHere';
class User {
    static defaultRole = 'guest';
    constructor ({firstName, age}) {
        defineProps([
            [String, 'firstName', firstName],   // if `firstName` here is not of 
                                                // type `String`, detailed error thrown
            [Number, 'age'],
            [String, 'role', User.defaultRole]
        ], target);
        this.age = age;                         // This is fine since our setter expects a number
        this.age = 'hello world';               // This throws a detailed error ('`#User.age` 
                                                //   ... expects type: "Number" ... Type received ...' etc.
                                                // )
    }
}

// Later..
const user = new User();
user.firstName = "Some name";
user.age = '99'; // Throws (detailed) error since type does not match.
```

## Development:
- For commands see './package.json' scripts.

### Dir structure
- Everything is in './src'.
- Distribution is in './dist'.
- Docs are in './docs'.

### Testing
Using `jest` (see './package.json' scripts).

## License:
BSD 3 Clause - Included in sources.

## Resources:
- `defineProperty` - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
- `defineProperties` - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
- Data Types - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

## Change log

### 0.18.0
#### Breaking changes
- Removed uncurried methods (methods ending with `$`) (use curried methods instead).
*Removed*:
- `errorIfNotTypeOnTarget$` - ('fjl' provides this now)
- `errorIfNotTypeOnTarget` - ("")
- `defineEnumProps$`
- `defineProps$`

- Renamed auxillary methods:
    - `_descriptorForSettable` becomes `createTypedDescriptor`.
    - `_makeDescriptorEnumerable` becomes `toEnumerableDescriptor`.
    - `_targetDescriptorTuple` becomes `toTargetDescriptorTuple`.
    
#### Other changes:
- Normalized API (removed un-curried methods from exports and non-api specific (un-required) methods).
- Updated build process (using babel7 now).
- Replaced `mocha` and `chai` with `jest`.
- Changed license from "MIT" to "BSD3".
- Version and build tag links to top of readme file.
- Et. al.
