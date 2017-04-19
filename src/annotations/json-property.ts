import { MetadataKeys } from '../constants/';
import { ArgsMetadata, PathMetadata, TypeMetadata } from '../metadata';
import { DeserializeOptions } from './';

export function JsonProperty(path?: string, options?: DeserializeOptions) {
    return function (target: any, propertyKey: string) {
        if (!target || !propertyKey) {
            return;
        }

        const argsMapping: Map<string, ArgsMetadata> = target.argsMapping || new Map<string, ArgsMetadata>();
        const pathMapping: Map<string, PathMetadata> = target.pathMapping || new Map<string, PathMetadata>();
        const typeMapping: Map<string, TypeMetadata> = target.typeMapping || new Map<string, TypeMetadata>();

        let paths = [path || propertyKey];

        if (options) {
            paths = paths.concat(options.fallbacks || []);

            if (options.args && options.args.length) {
                argsMapping.set(propertyKey, options.args);
            }
        }

        const pathMetadata: PathMetadata = pathMapping.get(propertyKey) || {} as PathMetadata;
        pathMetadata.paths = paths;
        pathMapping.set(propertyKey, pathMetadata);

        const type: Function = Reflect.getMetadata(MetadataKeys.TYPE, target, propertyKey);
        const typeMetadata: TypeMetadata = { type };
        typeMapping.set(propertyKey, typeMetadata);

        target.argsMapping = argsMapping;
        target.pathMapping = pathMapping;
        target.typeMapping = typeMapping;
    };
}
