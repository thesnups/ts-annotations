/// <reference types="core-js" />
export declare const primitivesMap: Map<Function, Function>;
export declare class ObjectMapper {
    constructor();
    readValue<T>(json: string | any, typeRef: any, ...args: any[]): T;
    private getValueFromObjectPath(obj, path);
}
