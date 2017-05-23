import { MetadataKeys } from '../constants/';
import { PathMetadata, TypeMetadata } from '../metadata';
import { DeserializeOptions } from './';

export function JsonProperty(path?: string, options?: DeserializeOptions) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        let paths = [path || propertyKey];
        let ignoreNull = false;

        if (options) {
            paths = paths.concat(options.fallbacks || []);
            ignoreNull = !!options.ignoreNull
        }

        const pathMapping: Map<string, PathMetadata> = target.pathMapping || new Map<string, PathMetadata>();
        const pathMetadata: PathMetadata = pathMapping.get(propertyKey) || {} as PathMetadata;
        pathMetadata.paths = paths;
        pathMetadata.ignoreNull = ignoreNull;

        pathMapping.set(propertyKey, pathMetadata);

        target.pathMapping = pathMapping;

        const type: Function = Reflect.getMetadata(MetadataKeys.TYPE, target, propertyKey);
        const typeMapping: Map<string, TypeMetadata> = target.typeMapping || new Map<string, TypeMetadata>();
        const typeMetadata: TypeMetadata = { type };

        typeMapping.set(propertyKey, typeMetadata);

        target.typeMapping = typeMapping;
    };
}
