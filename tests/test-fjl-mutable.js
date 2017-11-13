import {assert, expect} from 'chai';
import {
    _descriptorForSettable,
    _makeDescriptorEnumerable,
    defineProp$,
    defineEnumProp$,
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

});
