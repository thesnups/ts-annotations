import Map = require('core-js/es6/map');

export function JsonDeserialize(typeRef?: any) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        var typeReference = Reflect.getMetadata("design:type", target, propertyKey);

        target.typeMapping = target.typeMapping || new Map<string, Function>();
        target.typeMapping.set(propertyKey, typeRef || typeReference);
    };
}