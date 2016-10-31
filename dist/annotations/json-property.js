"use strict";
var Map = require('core-js/es6/map');
function JsonProperty(path) {
    return function (target, propertyKey) {
        if (!target || !propertyKey) {
            return;
        }
        path = path || propertyKey;
        target.pathMapping = target.pathMapping || new Map();
        target.pathMapping.set(propertyKey, path);
        var type = Reflect.getMetadata('design:type', target, propertyKey);
        target.typeMapping = target.typeMapping || new Map();
        target.typeMapping.set(propertyKey, type);
    };
}
exports.JsonProperty = JsonProperty;
//# sourceMappingURL=json-property.js.map