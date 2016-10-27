import Map = require('core-js/es6/map');

export function JsonProperty(value?: string) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        target.pathMapping = target.pathMapping || new Map<string, string>();
        target.pathMapping.set(propertyKey, value || propertyKey);
    };
}
