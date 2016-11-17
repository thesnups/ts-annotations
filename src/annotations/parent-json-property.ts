import { MetadataKeys } from '../constants/';
import { PathMetadata, TypeMetadata } from '../metadata';

export function ParentJsonProperty() {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        const pathMapping: Map<string, PathMetadata> = target.pathMapping || new Map<string, PathMetadata>();
        const pathMetadata: PathMetadata = pathMapping.get(propertyKey) || { paths: [] };

        pathMetadata.useParentJson = true;
        pathMapping.set(propertyKey, pathMetadata);

        target.pathMapping = pathMapping;

        const type: Function = Reflect.getMetadata(MetadataKeys.TYPE, target, propertyKey);
        const typeMapping: Map<string, TypeMetadata> = target.typeMapping || new Map<string, TypeMetadata>();
        const typeMetadata: TypeMetadata = { type };

        typeMapping.set(propertyKey, typeMetadata);

        target.typeMapping = typeMapping;
    };
}
