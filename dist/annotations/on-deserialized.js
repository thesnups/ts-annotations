"use strict";
function OnDeserialized() {
    return function (target, propertyKey) {
        if (!target || !propertyKey) {
            return;
        }
        target.deserializeCallbacks = target.deserializeCallbacks || [];
        target.deserializeCallbacks.push(propertyKey);
    };
}
exports.OnDeserialized = OnDeserialized;
//# sourceMappingURL=on-deserialized.js.map