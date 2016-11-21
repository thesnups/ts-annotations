import { BillingInfo } from './billiing-info.class';
import { JsonProperty, JsonArray, ParentJsonProperty } from '../../src/';
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

    @ParentJsonProperty()
    public address: Address = null;

    @JsonProperty('account.billing')
    public billingInfo: BillingInfo;

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

    @JsonArray('favoriteColors', { type: String })
    public favoriteColors: string[] = [];

    @JsonProperty('undefined.value.test')
    public stringWithFallback: string = 'fallback';

    @JsonProperty('null.value.test')
    public string2WithFallback: string = 'fallback';
}
