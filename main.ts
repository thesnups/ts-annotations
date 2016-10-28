import { JsonProperty, JsonDeserialize, OnDeserialized } from './index';

class Test {

    @JsonProperty('level1.level2.name');
    private name: string = '';

}