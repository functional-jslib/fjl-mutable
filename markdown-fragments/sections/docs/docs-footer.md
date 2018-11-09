
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
