import { JsonProperty } from '../../lib/';

export class Address {

    @JsonProperty('streetAddress')
    public address: string = '';

    @JsonProperty('city')
    public city: string = '';

    @JsonProperty('stateCode')
    public state: string = '';

    @JsonProperty('zip_code')
    public zip: string = '';

}
