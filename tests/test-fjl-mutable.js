import {assert, expect} from 'chai';
import {
    _descriptorForSettable,
    _makeDescriptorEnumerable,
}
    from "../src/fjlMutable";

const log = console.log.bind(console);

describe ('#fjlMutable', function () {
    const someTarget = {},
        exampleNumberDescriptor = _descriptorForSettable(Number, 'someNum', someTarget);

    describe ('#_descriptorForSettable', function () {
        const result = exampleNumberDescriptor;
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



});
