import {assert, expect} from 'chai';
import {unfoldr, keys, isFunction} from 'fjl';
import {
    _descriptorForSettable,
    _makeDescriptorEnumerable,
    defineProp$,
    defineProps$,
    defineEnumProp$,
    defineEnumProps$,
    errorIfNotTypeOnTarget$,
}
    from "../src/fjlMutable";

const log = console.log.bind(console);

describe ('#fjlMutable', function () {

    describe ('#_descriptorForSettable', function () {
        const someTarget = {},
            exampleNumberDescriptor = _descriptorForSettable(Number, 'someNum', someTarget),
            result = exampleNumberDescriptor;
        it ('should return a descriptor with a setter and a getter', function () {
            const keys = Object.keys(result);
            expect(keys.length).to.equal(2);
            expect(result.hasOwnProperty('get')).to.equal(true);
            expect(result.hasOwnProperty('set')).to.equal(true);
        });

        it ('should return a descriptor for whom\'s getter and setter functions' +
            'return and/or set the value for said descriptor.', function () {
            expect(result.set(99)).to.equal(undefined);
            expect(result.get()).to.equal(99);
        });

        it ('should return a descriptor with a setter that throws an `Error` when ' +
            'passed in value to be set is not of the defined type.', function () {
            assert.throws(() => result.set('not expected type'), Error);
        });

        it ('should return a descriptor that retains it\'s value even after ' +
            'throwing a `setter` error (for incorrect type being passed in to `set`).', function () {
            assert.throws(() => result.set('not expected type'), Error);
            expect(result.get()).to.equal(99);
        });

        it ('should return a descriptor that doesn\'t expose internally stored value for ' +
            'it\'s defined property.', function () {
            const keys = Object.keys(result);
            expect(keys.length).to.equal(2);
            expect(result.hasOwnProperty('get')).to.equal(true);
            expect(result.hasOwnProperty('set')).to.equal(true);
        });
    });

    describe ('#_makeDescriptorEnumerable', function () {
        const [_, descriptor] = _makeDescriptorEnumerable([{}, {}]);

        it ('should return an object with an `enumerable` property set to `true`', function () {
            expect(descriptor.hasOwnProperty('enumerable')).to.equal(true);
            expect(descriptor.enumerable).to.equal(true);
        });

        it ('should throw an error when no descriptor is passed in `TargetDescriptorPair`', function () {
            assert.throws(() => _makeDescriptorEnumerable([]), Error);
            assert.throws(() => _makeDescriptorEnumerable([1]), Error);
        });
    });

    describe ('#errorIfNotTypeOnTarget$', function () {
        it ('should throw an error when `value` passed in doesn\'t match given type', function () {
            assert.throw(() => errorIfNotTypeOnTarget$(Number, {}, 'somePropName', 'some value'));
        });
        it ('should return given `value` and not throw an error when passed in `value` matches given `type`', function () {
            expect(errorIfNotTypeOnTarget$(Number, {}, 'somePropName', 99)).to.equal(99);
        });
    });

    describe ('#defineProp$', function () {
        const someTarget = {},
            propName = 'someNum',
            [target, descriptor] = defineProp$(Number, propName, [someTarget]);
        it ('should return a `target` and `descriptor` pair (tuple)', function () {
            expect(target).to.equal(someTarget);
            expect(!!descriptor).to.equal(true);
        });
        it ('should define property `propName` on `target`', function () {
            expect(target.hasOwnProperty(propName)).to.equal(true);
        });
        it ('should return a target whose defined `propName` throws an error when ' +
            'the wrong type is passed in', function () {
            assert.throws(() => target[propName] = 'some value', Error);
        });
        it ('should return a target whose defined `propName` doesn\'t throw' +
            'an error when the correct type of value is passed in', function () {
            target[propName] = 99;
            expect(target[propName]).to.equal(99);
        });
        it ('should allow the user to pass in his/her own `descriptor`', function () {
            const somePropName = 'somePropName',
                someValue = (new Date()).getTime(),
                customDescriptor = {
                    value: someValue,
                    enumerable: true
                },
                [target2, descriptor2] = defineProp$(Number, somePropName, [someTarget, customDescriptor]);
            assert.throws(() => target2[somePropName] = 99, Error);
            expect(target2[somePropName]).to.equal(someValue);
            expect(descriptor2).to.equal(customDescriptor);
            expect(descriptor2.enumerable).to.equal(true);
        });
    });

    describe ('#defineEnumProp$', function () {
        const someTarget = {},
            propName = 'someNum',
            [target, descriptor] = defineEnumProp$(Number, propName, [someTarget]);
        it ('should return a `target` and `descriptor` pair (tuple)', function () {
            expect(target).to.equal(someTarget);
            expect(!!descriptor).to.equal(true);
        });
        it ('should define property `propName` on `target`', function () {
            expect(target.hasOwnProperty(propName)).to.equal(true);
        });
        it ('should set `enumerable` to `true` on returned descriptor', function () {
            expect(descriptor.enumerable).to.equal(true);
            expect(Object.getOwnPropertyDescriptor(target, propName).enumerable).to.equal(true);
        });
        it ('should return a target whose defined `propName` throws an error when ' +
            'the wrong type is passed in', function () {
            assert.throws(() => target[propName] = 'some value', Error);
        });
        it ('should return a target whose defined `propName` doesn\'t throw' +
            'an error when the correct type of value is passed in', function () {
            target[propName] = 99;
            expect(target[propName]).to.equal(99);
        });
        it ('should allow the user to pass in his/her own `descriptor`', function () {
            const somePropName = 'somePropName',
                someValue = (new Date()).getTime(),
                customDescriptor = {
                    value: someValue,
                    enumerable: false
                },
                [target2, descriptor2] = defineEnumProp$(Number, somePropName, [someTarget, customDescriptor]);
            assert.throws(() => target2[somePropName] = 99, Error);
            expect(target2[somePropName]).to.equal(someValue);
            expect(descriptor2).to.equal(customDescriptor);
            expect(descriptor2.enumerable).to.equal(true);
        });
    });

    describe ('#defineEnumProps$', function () {
        const
            seedArgTuples = [
                [String, 'someStringProp'],
                [Number, 'someNumberProp'],
                [Boolean, 'someBooleanProp'],
                [Function, 'someFunctionProp'],
                [Array, 'someArrayProp']
            ],
            seedArgTuple_correctIncorrectValues = [
                ['99 bottles..', 99],
                [99, 'should-be-number'],
                [false, 1],
                [function () {}, 99, 99],
                [[1, 2, 3, 4, 5], function () {}]
            ],
            seedTarget = seedArgTuples.reduce((agg, tuple) => {
                    agg[tuple[1]] = null;
                    return agg;
                }, {}),
            seedPropNames = keys(seedTarget),
            generateTargetData = () => unfoldr((argTuples, ind, _out) => {
                    const
                        _argTuples = argTuples.slice(0),
                        out = [_argTuples.slice(0), {}];
                    if (!_out.length) {
                        return [out, _argTuples];
                    }
                    else if (_argTuples.length) {
                        _argTuples.pop();
                        return [out, _argTuples];
                    }
                    return undefined;
                },
                seedArgTuples);

        it ('data for tests should be in correct format', function () {
            // Test our test parameters
            expect(seedPropNames.length).to.equal(seedArgTuples.length);
            seedPropNames.forEach((name, ind) => {
                expect(seedArgTuples[ind][1]).to.equal(name);
            });
            expect(seedPropNames.length).to.equal(seedArgTuples.length);
        });

        it ('should be able to define many enum props on given target with only argTuples of length `2`', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const result = defineEnumProps$.apply(null, args),
                    [target] = result[0],
                    propNames = args[0].map(x => x[1]);

                // log(propNames, '\n', target);

                // Ensure targets have enumerable props set
                propNames.forEach(name => {
                    expect(target.hasOwnProperty(name)).to.equal(true);
                    expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
                        .to.equal(true);
                });
            });
        });

        it ('should have defined properties that throw errors when they are set to the wrong type' +
            'and no errors when set to the correct type', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const result = defineEnumProps$.apply(null, args),
                    [target] = result[0],
                    propNames = args[0].map(x => x[1]);

                // log(propNames, '\n', target);

                // Ensure targets have enumerable props set
                propNames.forEach((name, ind) => {
                    const [correct, inCorrect] = seedArgTuple_correctIncorrectValues[ind];

                    // Ensure prop exists
                    expect(target.hasOwnProperty(name)).to.equal(true);

                    // Ensure prop is enumerable
                    expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
                        .to.equal(true);

                    // Ensure setter obeys type rule
                    assert.throws(() => target[name] = inCorrect, Error);

                    // Ensure setter obeys type rule
                    expect(target[name] = correct).to.equal(correct);
                });
            });
        });

        it ('should return target and descriptor tuples from operation', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const
                    result = defineEnumProps$.apply(null, args);
                expect(result.length).to.equal(args[0].length);
                result.forEach(([t, d]) => {
                    expect(t).to.be.instanceOf(Object);
                    expect(d.enumerable).to.equal(true);
                    expect(['set', 'get'].every(key => d[key] instanceof Function));
                });
            });
        });

        it ('should be able to set types with argTuples of length of `3`([target, descriptor] tuple) and `4` (defaultValue)');

    });

    describe ('#defineProps$', function () {
        const
            seedArgTuples = [
                [String, 'someStringProp'],
                [Number, 'someNumberProp'],
                [Boolean, 'someBooleanProp'],
                [Function, 'someFunctionProp'],
                [Array, 'someArrayProp']
            ],
            seedArgTuple_correctIncorrectValues = [
                ['99 bottles..', 99],
                [99, 'should-be-number'],
                [false, 1],
                [function () {}, 99, 99],
                [[1, 2, 3, 4, 5], function () {}]
            ],
            seedTarget = seedArgTuples.reduce((agg, tuple) => {
                    agg[tuple[1]] = null;
                    return agg;
                }, {}),
            seedPropNames = keys(seedTarget),
            generateTargetData = () => unfoldr((argTuples, ind, _out) => {
                    const
                        _argTuples = argTuples.slice(0),
                        out = [_argTuples.slice(0), {}];
                    if (!_out.length) {
                        return [out, _argTuples];
                    }
                    else if (_argTuples.length) {
                        _argTuples.pop();
                        return [out, _argTuples];
                    }
                    return undefined;
                },
                seedArgTuples);

        it ('data for tests should be in correct format', function () {
            // Test our test parameters
            expect(seedPropNames.length).to.equal(seedArgTuples.length);
            seedPropNames.forEach((name, ind) => {
                expect(seedArgTuples[ind][1]).to.equal(name);
            });
            expect(seedPropNames.length).to.equal(seedArgTuples.length);
        });

        it ('should be able to define many props on given target with only argTuples of length `2`', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const result = defineProps$.apply(null, args),
                    [target] = result[0],
                    propNames = args[0].map(x => x[1]);

                // log(propNames, '\n', target);

                // Ensure targets have props set
                propNames.forEach(name => {
                    expect(target.hasOwnProperty(name)).to.equal(true);
                });
            });
        });

        it ('should have defined properties that throw errors when they are set to the wrong type' +
            'and no errors when set to the correct type', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const result = defineProps$.apply(null, args),
                    [target] = result[0],
                    propNames = args[0].map(x => x[1]);

                // log(propNames, '\n', target);

                // Ensure targets have props set
                propNames.forEach((name, ind) => {
                    const [correct, inCorrect] = seedArgTuple_correctIncorrectValues[ind];

                    // Ensure prop exists
                    expect(target.hasOwnProperty(name)).to.equal(true);

                    // Ensure setter obeys type rule
                    assert.throws(() => target[name] = inCorrect, Error);

                    // Ensure setter obeys type rule
                    expect(target[name] = correct).to.equal(correct);
                });
            });
        });

        it ('should return target and descriptor tuples from operation', function () {
            generateTargetData().forEach(args => {
                // log(args);
                const
                    result = defineProps$.apply(null, args);
                expect(result.length).to.equal(args[0].length);
                result.forEach(([t, d]) => {
                    expect(t).to.be.instanceOf(Object);
                    expect(['set', 'get'].every(key => d[key] instanceof Function));
                });
            });
        });

        it ('should be able to set types with argTuples of length of `3`([target, descriptor] tuple) and `4` (defaultValue)');

    });



});
