import 'reflect-metadata';

import { ControllerKey } from '../utils/types';

export interface ControllerConfig {}

export interface RouteConfig {
    requestMethod: 'get' | 'post' | 'put' | 'delete';
    handlerName: string | symbol;
    path: string;
}

function setControllerConfig(target: any, config: any) {
    Reflect.defineMetadata(ControllerKey, config, target);
}

export function getControllerConfig(target: any) {
    return Reflect.getOwnMetadata(ControllerKey, target);
}

function addRouter(target: Object, route: RouteConfig) {
    const config = {
        routes: [],
        ...getControllerConfig(target)
    };
    config.routes.push(route);
    setControllerConfig(target, config);
}

export function Controller(path?: string): ClassDecorator {
    return target => {
        setControllerConfig(target.prototype, {
            routes: [],
            prefix: path || '',
            ...getControllerConfig(target.prototype)
        });
    };
}

export function Post(path: string): MethodDecorator {
    return (target, propertyKey) => {
        addRouter(target, {
            requestMethod: 'post',
            path,
            handlerName: propertyKey
        });
    };
}

export function Put(path: string): MethodDecorator {
    return (target, propertyKey) => {
        addRouter(target, {
            requestMethod: 'put',
            path,
            handlerName: propertyKey
        });
    };
}

export function Get(path: string): MethodDecorator {
    return (target, propertyKey) => {
        addRouter(target, {
            requestMethod: 'get',
            path,
            handlerName: propertyKey
        });
    };
}

export function Delete(path: string): MethodDecorator {
    return (target, propertyKey) => {
        addRouter(target, {
            requestMethod: 'delete',
            path,
            handlerName: propertyKey
        });
    };
}
