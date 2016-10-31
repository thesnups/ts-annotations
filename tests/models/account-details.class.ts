import { JsonProperty } from '../../';
import { Address } from './';

export class AccountDetails {

    @JsonProperty('account.details.name')
    public name: string = '';

    @JsonProperty('account.details.age')
    public age: number = -1;

    @JsonProperty('account.details.isAwesome')
    public awesomeness: boolean = false;

    @JsonProperty('account.details.regex')
    public regex: RegExp = null;

    @JsonProperty('account.details.summary.location.address')
    public address: Address = null;

}
