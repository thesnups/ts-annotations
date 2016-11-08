import { ObjectMapper } from '../src/';
import { AccountDetails, Address, EmailAddress, StringTests } from './models/';
import { rawAccountDetails, testValues } from './constants/';

describe('ObjectMapper', () => {
    it('should exist', () => {
        expect(ObjectMapper).toBeDefined();
    });

    it('should be a constructor', () => {
        const mapper = new ObjectMapper();
        expect(mapper).toBeDefined();
    });

    describe('#readValue', () => {

        describe('AccountDetails class tests', () => {
            let mapper: ObjectMapper;
            let accountDetails: AccountDetails;

            beforeAll(() => {
                mapper = new ObjectMapper();
                accountDetails = mapper.readValue<AccountDetails>(rawAccountDetails, AccountDetails);
            });

            it('should correctly map a string from a JSON object to a class variable', () => {
                expect(accountDetails.name).toEqual(rawAccountDetails.account.details.name);
                expect(accountDetails.age).toEqual(rawAccountDetails.account.details.age);
                expect(accountDetails.awesomeness).toEqual(rawAccountDetails.account.details.isAwesome);
                expect(accountDetails.smelliness).toEqual(rawAccountDetails.account.details.isSmelly);

                expect(accountDetails.regex).toEqual(jasmine.any(RegExp));
                let strRegex = accountDetails.regex.toString();
                strRegex = strRegex.substring(1, strRegex.length - 1);
                expect(strRegex).toEqual(rawAccountDetails.account.details.regex);

                expect(accountDetails.address).toEqual(jasmine.any(Address));
                expect(accountDetails.address.address).toEqual(rawAccountDetails.account.details.summary.location.address.streetAddress);
                expect(accountDetails.address.city).toEqual(rawAccountDetails.account.details.summary.location.address.city);
                expect(accountDetails.address.state).toEqual(rawAccountDetails.account.details.summary.location.address.stateCode);
                expect(accountDetails.address.zip).toEqual(rawAccountDetails.account.details.summary.location.address.zip_code);

                expect(accountDetails.phoneNumber).toEqual(rawAccountDetails.account.details.summary.cellPhone);

                expect(accountDetails.emailAddresses).toEqual(jasmine.any(Array));
                expect(accountDetails.emailAddresses[0]).toEqual(jasmine.any(EmailAddress));
                expect(accountDetails.emailAddresses[0].address).toEqual(rawAccountDetails.emailAddresses[0].address);
                expect(accountDetails.emailAddresses[0].isActive).toEqual(rawAccountDetails.emailAddresses[0].active);
                expect(accountDetails.emailAddresses[1]).toEqual(jasmine.any(EmailAddress));
                expect(accountDetails.emailAddresses[1].address).toEqual(rawAccountDetails.emailAddresses[1].address);
                expect(accountDetails.emailAddresses[1].isActive).toEqual(rawAccountDetails.emailAddresses[1].active);

                expect(accountDetails.fbUrl).toEqual(null);
                expect(accountDetails.twitterUrl).toEqual(undefined);
            });
        });

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

            });

            it('should correctly handle a true value', () => {

            });

            it('should correctly handle an empty string', () => {
                expect(stringTests.emptyString).toEqual('');
            });

            it('should correctly handle a non-empty string', () => {
                expect(stringTests.nonemptyString).toEqual(testValues.nonemptyString);
            });

            it('should correctly handle an empty array', () => {

            });

            it('should correctly handle a non-empty array', () => {

            });

            it('should correctly handle an object', () => {

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
    });
});
