import { ObjectMapper } from '../';
import { AccountDetails, Address } from './models/';
import { rawAccountDetails } from './constants/';

describe('ObjectMapper', () => {
    it('should exist', () => {
        expect(ObjectMapper).toBeDefined();
    });

    it('should be a constructor', () => {
        const mapper = new ObjectMapper();
        expect(mapper).toBeDefined();
    });

    describe('#readValue', () => {
        let mapper: ObjectMapper;

        beforeEach(() => {
            mapper = new ObjectMapper();
        });

        it('should correctly map a JSON object to a class', () => {
            const accountDetails: AccountDetails = mapper.readValue<AccountDetails>(rawAccountDetails, AccountDetails);

            expect(accountDetails.name).toEqual(rawAccountDetails.account.details.name);
            expect(accountDetails.age).toEqual(rawAccountDetails.account.details.age);
            expect(accountDetails.awesomeness).toEqual(rawAccountDetails.account.details.isAwesome);

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
        });
    });
});
