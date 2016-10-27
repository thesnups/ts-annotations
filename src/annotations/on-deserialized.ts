export function OnDeserialized() {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        target.deserializeCallbacks = target.deserializeCallbacks || [];
        target.deserializeCallbacks.push(propertyKey);
    };
}
