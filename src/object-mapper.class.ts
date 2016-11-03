import { MetadataKeys } from './constants/';

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
        const typeMapping = typeRef.prototype.typeMapping;

        if (pathMapping && typeMapping) {
            pathMapping.forEach((paths: string[], propertyKey: string) => {
                let value = this.getValueFromObjectPaths(json, paths);
                let propertyType = typeMapping.get(propertyKey);

                if (propertyType) {
                    const primitiveConvert = primitivesMap.get(propertyType);

                    if (primitiveConvert) {
                        value = primitiveConvert(value);
                    } else if (propertyType === Array && Reflect.hasMetadata(MetadataKeys.ARRAY_TYPE, typeRef.prototype, propertyKey)) {
                        const arrayType = Reflect.getMetadata(MetadataKeys.ARRAY_TYPE, typeRef.prototype, propertyKey);
                        value = value.map(arrayItem => this.readValue(arrayItem, arrayType));
                    } else {
                        value = this.readValue(value, propertyType);
                    }
                }

                if (typeof value !== 'undefined') {
                    instance[propertyKey] = value;
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

    private getValueFromObjectPaths(obj: any, paths: string[]): any {
        let numPaths = paths.length;
        let index = 0;
        let value = undefined;

        while (typeof value === 'undefined' && index < numPaths) {
            value = this.getValueFromObjectPath(obj, paths[index++]);
        }

        return value;
    }

    private getValueFromObjectPath(obj: any, path: string): any {
        const pathParts = path.split('.');
        const numParts = pathParts.length;

        try {
            for (let i = 0; i < numParts; i++) {
                obj = obj[pathParts[i]];
            };
        } catch (e) {
            obj = undefined;
        }
        return obj;
    };

}
