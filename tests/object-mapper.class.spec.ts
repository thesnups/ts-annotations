import { ObjectMapper } from '../src/';
import { AccountDetails, Address, EmailAddress, StringTests } from './models/';
import { rawAccountDetails, testValues } from './constants/';

describe('ObjectMapper class', () => {
    let mapper: ObjectMapper;

    beforeAll(() => {
        mapper = new ObjectMapper();
    });

    it('should exist', () => {
        expect(ObjectMapper).toBeDefined();
    });

    it('should be a constructor', () => {
        expect(mapper).toBeDefined();
    });

    describe('ObjectMapper instance', () => {
        it('expose a readValue method', () => {
            expect(mapper.readValue).toBeDefined();
            expect(mapper.readValue).toEqual(jasmine.any(Function));
        });
    });
});
