import { ObjectMapper } from '../src/';
import { AccountDetails, Address, EmailAddress } from './models/';
import { rawAccountDetails } from './constants/';

describe('AccountDetails class', () => {
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

        expect(accountDetails.favoriteColors).toEqual(jasmine.any(Array));
        expect(accountDetails.favoriteColors[0]).toEqual(jasmine.any(String));
        expect(accountDetails.favoriteColors[0]).toEqual(rawAccountDetails.favoriteColors[0]);

        expect(accountDetails.primaryColor).toEqual(rawAccountDetails.favoriteColors[0]);
        expect(accountDetails.secondaryColor).toEqual(undefined);

        expect(accountDetails.billingInfo.ccNumber).toEqual(rawAccountDetails.account.billing.creditCard.number);
        expect(accountDetails.billingInfo.ccType).toEqual(rawAccountDetails.account.billing.creditCard.type);
        expect(accountDetails.billingInfo.expiration).toEqual(rawAccountDetails.account.billing.creditCard.expiration);

        expect(accountDetails.stringWithFallback).toEqual('fallback');
        expect(accountDetails.string2WithFallback).toBeNull();

        expect(accountDetails.primaryPhotoFileName).toEqual(rawAccountDetails.photos.files[rawAccountDetails.photos.ids.primary]);
        expect(accountDetails.photoThatDoesntExist).toEqual(undefined);
    });
});
