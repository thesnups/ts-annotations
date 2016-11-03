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
            pathMapping.forEach((paths: string[], key: string) => {
                let value = this.getValueFromObjectPaths(json, paths);
                let type = typeMapping.get(key);

                if (type) {
                    const primitiveConvert = primitivesMap.get(type);
                    if (primitiveConvert) {
                        value = primitiveConvert(value);
                    } else {
                        value = this.readValue(value, type);
                    }
                }

                if (value) {
                    instance[key] = value;
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

        while (!value && index < numPaths) {
            value = this.getValueFromObjectPath(obj, paths[index++]);
        }

        return value;
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
