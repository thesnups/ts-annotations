import { JsonProperty, JsonArray } from '../../src/';

export class BooleanTests {
    @JsonProperty('nullValue')
    public nullValue: boolean;

    @JsonProperty('undefinedValue')
    public undefinedValue: boolean;

    @JsonProperty('falseValue')
    public falseValue: boolean;

    @JsonProperty('trueValue')
    public trueValue: boolean;

    @JsonProperty('emptyString')
    public emptyString: boolean;

    @JsonProperty('nonemptyString')
    public nonemptyString: boolean;

    @JsonProperty('emptyArray')
    public emptyArray: boolean;

    @JsonProperty('nonemptyArray')
    public nonemptyArray: boolean;

    @JsonProperty('object')
    public object: boolean;

    @JsonProperty('negativeOne')
    public negativeOne: boolean;

    @JsonProperty('zero')
    public zero: boolean;

    @JsonProperty('one')
    public one: boolean;

}
