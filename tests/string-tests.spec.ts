import { ObjectMapper } from '../src/';
import { StringTests } from './models/';
import { testValues } from './constants/';

describe('string tests', () => {
    let mapper: ObjectMapper;
    let stringTests: StringTests;

    beforeAll(() => {
        mapper = new ObjectMapper();
        stringTests = mapper.readValue<StringTests>(testValues, StringTests);
    });

    it('should correctly handle a null value', () => {
        expect(stringTests.nullValue).toBeNull();
    });

    it('should correctly handle an undefined value', () => {
        expect(stringTests.undefinedValue).toBeUndefined();
    });

    it('should correctly handle a false value', () => {
        expect(stringTests.falseValue).toEqual('false');
    });

    it('should correctly handle a true value', () => {
        expect(stringTests.trueValue).toEqual('true');
    });

    it('should correctly handle an empty string', () => {
        expect(stringTests.emptyString).toEqual('');
    });

    it('should correctly handle a non-empty string', () => {
        expect(stringTests.nonemptyString).toEqual(testValues.nonemptyString);
    });

    it('should correctly handle an empty array', () => {
        expect(stringTests.emptyArray).toEqual('');
    });

    it('should correctly handle a non-empty array', () => {
        expect(stringTests.nonemptyArray).toEqual(testValues.nonemptyArray.toString());
    });

    it('should correctly handle an object', () => {
        expect(stringTests.object).toEqual('[object Object]');
    });

    it('should correctly handle a -1', () => {
        expect(stringTests.negativeOne).toEqual('-1');
    });

    it('should correctly handle a 0', () => {
        expect(stringTests.zero).toEqual('0');
    });

    it('should correctly handle a 1', () => {
        expect(stringTests.one).toEqual('1');
    });
});
