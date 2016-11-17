import { JsonProperty } from '../../src/';

export class Address {

    @JsonProperty('account.details.summary.location.address.streetAddress')
    public address: string = '';

    @JsonProperty('account.details.summary.location.address.city')
    public city: string = '';

    @JsonProperty('account.details.summary.location.address.stateCode')
    public state: string = '';

    @JsonProperty('account.details.summary.location.address.zip_code')
    public zip: string = '';

}
