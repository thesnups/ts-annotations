import { BillingInfo } from './billiing-info.class';
import { ObjectMapper, JsonProperty, JsonArray, ParentJsonProperty, OnDeserialized } from '../../src/';
import { Address, EmailAddress } from './';
import { ArgsTest1, ArgsTest2, ArgsTest3, NoArgsTest } from './args-tests/';

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

    @JsonProperty('favoriteColors[0]')
    public primaryColor: string;

    @JsonProperty('favoriteColors[3]')
    public secondaryColor: string;

    @JsonProperty('photos.files[photos.ids.primary]')
    public primaryPhotoFileName: string;

    @JsonProperty('photos.files[photos.ids.noop]')
    public photoThatDoesntExist: string;

    @JsonProperty('argsTest', { args: [] })
    public argsTest1: ArgsTest1;

    @JsonProperty('argsTest', { args: ['arg1'] })
    public argsTest2: ArgsTest2;

    @JsonProperty('argsTest', { args: ['arg1', 'arg2'] })
    public argsTest3: ArgsTest3;

    @JsonProperty('argsTest')
    public noArgsTest: NoArgsTest;

    @JsonArray('argsArrayTest', { type: ArgsTest1, args: [] })
    public argsArrayTest1: ArgsTest1[];

    @JsonArray('argsArrayTest', { type: ArgsTest2, args: ['arg1'] })
    public argsArrayTest2: ArgsTest2[];

    @JsonArray('argsArrayTest', { type: ArgsTest3, args: ['arg1', 'arg2'] })
    public argsArrayTest3: ArgsTest3[];

    @JsonArray('argsArrayTest', { type: NoArgsTest })
    public noArgsArrayTest: NoArgsTest[];

    public deserializedParams: any;

    @OnDeserialized()
    public onDeserialized(instance: AccountDetails, json: any, typeRef: any, mapper: ObjectMapper) {
        this.deserializedParams = {
            instance: instance,
            json: json,
            typeRef: typeRef,
            mapper: mapper,
        };
    }
}
