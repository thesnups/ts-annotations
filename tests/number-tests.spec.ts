import { ObjectMapper } from '../src/';
import { NumberTests } from './models/';
import { testValues } from './constants/';

describe('number tests', () => {
    let mapper: ObjectMapper;
    let numberTests: NumberTests;

    beforeAll(() => {
        mapper = new ObjectMapper();
        numberTests = mapper.readValue<NumberTests>(testValues, NumberTests);
    });

    it('should correctly handle a null value', () => {
        expect(numberTests.nullValue).toBeNull();
    });

    it('should correctly handle an undefined value', () => {
        expect(numberTests.undefinedValue).toBeUndefined();
    });

    it('should correctly handle a false value', () => {
        expect(numberTests.falseValue).toEqual(0);
    });

    it('should correctly handle a true value', () => {
        expect(numberTests.trueValue).toEqual(1);
    });

    it('should correctly handle an empty string', () => {
        expect(numberTests.emptyString).toEqual(NaN);
    });

    it('should correctly handle a non-empty string', () => {
        expect(numberTests.nonemptyString).toEqual(NaN);
    });

    it('should correctly handle a integer string', () => {
        expect(numberTests.intString).toEqual(3);
    });

    it('should correctly handle a float string', () => {
        expect(numberTests.floatString).toEqual(1.25);
    });

    it('should correctly handle an empty array', () => {
        expect(numberTests.emptyArray).toEqual(NaN);
    });

    it('should correctly handle a non-empty array', () => {
        expect(numberTests.nonemptyArray).toEqual(NaN);
    });

    it('should correctly handle an object', () => {
        expect(numberTests.object).toEqual(NaN);
    });

    it('should correctly handle a -1', () => {
        expect(numberTests.negativeOne).toEqual(-1);
    });

    it('should correctly handle a 0', () => {
        expect(numberTests.zero).toEqual(0);
    });

    it('should correctly handle a 1', () => {
        expect(numberTests.one).toEqual(1);
    });
});
