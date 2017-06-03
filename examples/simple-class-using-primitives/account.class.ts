import { JsonProperty } from 'ts-annotations';

export class Account {

    @JsonProperty('name')
    public name: string;

    @JsonProperty('age')
    public age: number;

    @JsonProperty('isActive')
    public active: boolean = false;

}

