/// <reference types="core-js" />
import Map = require('core-js/es6/map');

export function JsonProperty(path?: string) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        path = path || propertyKey;
        target.pathMapping = target.pathMapping || new Map<string, string>();
        target.pathMapping.set(propertyKey, path);

        const type = Reflect.getMetadata('design:type', target, propertyKey);
        target.typeMapping = target.typeMapping || new Map<string, Function>();
        target.typeMapping.set(propertyKey, type);
    };
}
