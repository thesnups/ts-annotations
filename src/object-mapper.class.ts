import Map = require('core-js/es6/map');

export const primitivesMap = new Map<Function, Function>();
primitivesMap.set(String, (val: any): string => `${val}`);
primitivesMap.set(Number, (val: any): number => parseInt(val, 10));
primitivesMap.set(Boolean, (val: any): boolean => !!val);
primitivesMap.set(RegExp, (val: any): RegExp => new RegExp(val));

export class ObjectMapper {

    constructor() { ; }

    public readValue<T>(json: string | any, typeRef: any, ...args: any[]): T {

        let instance: T = new typeRef(...args);
        const pathMapping = typeRef.prototype.pathMapping;

        if (pathMapping) {
            pathMapping.forEach((val, key) => {
                let jsonValue = this.getValueFromObjectPath(json, val);
                let deserializedType;
                if (typeRef.prototype.typeMapping) {
                    deserializedType = typeRef.prototype.typeMapping.get(key);
                }
                if (deserializedType) {
                    if (primitivesMap.get(deserializedType)) {
                        jsonValue = primitivesMap.get(deserializedType)(jsonValue);
                    } else {
                        jsonValue = this.readValue(jsonValue, deserializedType);
                    }
                }
                if (typeof instance[key] === 'undefined' && jsonValue) {
                    instance[key] = jsonValue;
                }
            });
        }

        const callbacks = typeRef.prototype.deserializeCallbacks || [];

        if (callbacks.length) {
            callbacks.forEach((fn) => {
                if (typeof instance[fn] === 'function') {
                    instance[fn].call(instance, instance, json, typeRef);
                }
            });
        }
        return instance;
    }

    private getValueFromObjectPath(obj: any, path: string): any {
        const paths = path.split('.');
        const pathsLength = paths.length;

        try {
            for (let i = 0; i < pathsLength; i++) {
                obj = obj[paths[i]];
            };
        } catch (e) {
            obj = undefined;
        }
        return obj;
    };

}
