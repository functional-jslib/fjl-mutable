# fjl-mutable 
Helpers for setting mutable strictly typed properties on objects.

## Docs
JsDocs here: https://functional-jslib.github.io/fjl-mutable/module-fjlMutable.html

## Stars of the show:
`defineEnumProp` and `defineEnumProps` and their variants (`defineEnumProp$` and `defineEnumProps$`).

**Note:** All functions detailed below are curried and have uncurried variants (
    function name(s) with trailing `$` character: E.g., `defineEnumProp$...` ).

## Virtual Types
In order to more precisely and easily write 'readme' docs here 
I've defined some virtual types to better understand and more concisely 
write the docs.  Virtual types proceed:

- `TypeRef` {String|Function} - String name of constructor or constructor itself.
- `Descriptor` {Object} - Prop descriptor.  We generate descriptors of the form
    `{Object<get, set, [enumerable]}` when they are not passed in. 
- `Target` {*} - Target to define property on.
- `TargetOrTargetTuple` {*|Array<Target, Descriptor>} - A target to operate on or target and descriptor to operate on.

## Exports
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

### `definePropArray(propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Sets a property on target and enforces `Array` type (error if not `Array` type).
- `propName {String}`
- `targetOrTargetTuple {*|Array<Target, PropDescriptor>}`
Example:
```
    const target = {},
        defaultList = [1, 2, 3],
        defaultListCopy = defaultListCopy.slice(0);
    definePropArray('someListProp', target, defaultListCopy);
    // Later..
    target.someListProp === defaultListCopy; // true
    target.someListProp = []; // Matches type, is ok
    target.someListProp = 99; // Detailed error thrown, types don't match
```
### `definePropFunction (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `definePropArray` but enforces `Function`.

### `definePropNumber (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `definePropArray` but enforces `Number`.

### `definePropBoolean (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `definePropArray` but enforces `Boolean`.

### `definePropString (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `definePropArray` but enforces `String`.

### `defineEnumPropArray(propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Sets an enumerable property on target and enforces the `Array` type on it (error if not `Array` type etc.).
- `propName {String}`
- `targetOrTargetTuple {*|Array<Target, PropDescriptor>}`
Example:
```
    const target = {},
        defaultList = [1, 2, 3],
        defaultListCopy = defaultListCopy.slice(0);
    defineEnumPropArray('someListProp', target, defaultListCopy);
    // Later..
    target.someListProp === defaultListCopy; // true
    target.someListProp = []; // Matches type, is ok
    target.someListProp = 99; // Detailed error thrown, types don't match
```
### `defineEnumPropFunction (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `defineEnumPropArray` but enforces `Function`.

### `defineEnumPropNumber (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `defineEnumPropArray` but enforces `Number`.

### `defineEnumPropBoolean (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `defineEnumPropArray` but enforces `Boolean`.

### `defineEnumPropString (propName, targetOrTargetTuple, defaultValue = undefined) : TargetTuple`
Same as `defineEnumPropArray` but enforces `String`.

### Development
1.  `npm install`
2.  Look at node scripts in package.json.

### Testing
1. `npm test` (after `npm install`).

## License
MIT
