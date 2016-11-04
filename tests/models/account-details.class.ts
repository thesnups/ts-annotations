import { JsonProperty, JsonArray } from '../../src/';
import { Address, EmailAddress } from './';

export class AccountDetails {

    @JsonProperty('account.details.name')
    public name: string = '';

    @JsonProperty('account.details.age')
    public age: number = -1;

    @JsonProperty('account.details.isAwesome')
    public awesomeness: boolean = false;

    @JsonProperty('account.details.isSmelly')
    public smelliness: boolean = true;

    @JsonProperty('account.details.regex')
    public regex: RegExp = null;

    @JsonProperty('account.details.summary.location.address')
    public address: Address = null;

    @JsonProperty('account.homePhone', {
        fallbacks: ['account.workPhone', 'account.details.summary.cellPhone']
    })
    public phoneNumber: string;

    @JsonArray('emailAddresses', { type: EmailAddress })
    public emailAddresses: EmailAddress[];

    @JsonProperty('account.facebook_profile_url')
    public fbUrl: string;

    @JsonProperty('undefined.value.test')
    public twitterUrl: string;

}
