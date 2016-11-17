import { JsonProperty } from '../../src/annotations/json-property';

export class BillingInfo {

    @JsonProperty('creditCard.number')
    public ccNumber: string;

    @JsonProperty('creditCard.type')
    public ccType: string;

    @JsonProperty('creditCard.expiration')
    public expiration: string;
}