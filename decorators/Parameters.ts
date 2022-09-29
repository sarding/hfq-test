import { QueryBodyKey, QueryParamKey } from '../utils/types';

export function Body(): ParameterDecorator {
    return (target, propertyKey, index) => {
        const map = Reflect.getOwnMetadata(QueryBodyKey, target) || {};
        map[propertyKey] = {
            index,
            propertyKey
        };
        Reflect.defineMetadata(QueryBodyKey, map, target);
    };
}

export function Query(): ParameterDecorator {
    return (target, propertyKey, index) => {
        const map = Reflect.getOwnMetadata(QueryParamKey, target) || {};
        map[propertyKey] = {
            index,
            propertyKey
        };
        Reflect.defineMetadata(QueryParamKey, map, target);
    };
}
