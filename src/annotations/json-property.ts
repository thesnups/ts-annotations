import { JsonPropertyOptions } from './';

export function JsonProperty(path?: string, options?: JsonPropertyOptions) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        let paths = [path || propertyKey];
        if (options && options.fallbacks) {
            paths = paths.concat(options.fallbacks);
        }

        target.pathMapping = target.pathMapping || new Map<string, string[]>();
        target.pathMapping.set(propertyKey, paths);

        const type = Reflect.getMetadata("design:type", target, propertyKey);
        target.typeMapping = target.typeMapping || new Map<string, Function>();
        target.typeMapping.set(propertyKey, type);
    };
}
