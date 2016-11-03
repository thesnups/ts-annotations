import { JsonProperty } from '../../';

export class EmailAddress {

    @JsonProperty('address')
    public address: string;

    @JsonProperty('active')
    public isActive: boolean;

}
