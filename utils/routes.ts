import { importClassesFromDirectories } from 'typeorm/util/DirectoryExportedClassesLoader';
import { getControllerConfig, RouteConfig } from '../decorators/Controller';

import { QueryBodyKey, QueryParamKey } from './types';

import { Request, Response, NextFunction } from 'express';

import { join } from 'path';
function getAllControllers() {
    const logger: any = {
        log: () => {}
    };
    return importClassesFromDirectories(logger, [join(__dirname, '../controller/**/*.ts')]);
}

function generateHandler(insatnce: any, route: RouteConfig, klass: any) {
    const handlerFunction = insatnce[route.handlerName];
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = Reflect.getOwnMetadata(QueryBodyKey, klass.prototype);
            let args: any[] = [];
            if (body && body[route.handlerName]) {
                args[body[route.handlerName].index] = req.body;
            }

            const query = Reflect.getOwnMetadata(QueryParamKey, klass.prototype);
            if (query && query[route.handlerName]) {
                args[query[route.handlerName].index] = req.query;
            }
            const resData = await handlerFunction(...args);
            res.send(resData);
        } catch (error) {
            console.error(error);
            res.send(error.toString());
        }
    };
}

export const installRoute = async function (app: any) {
    const controllers = await getAllControllers();
    controllers.forEach(klass => {
        // @ts-ignore
        const instance = new klass();
        const { routes, prefix } = getControllerConfig(klass.prototype);
        routes.forEach((route: RouteConfig) => {
            app[route.requestMethod](`${prefix}${route.path}`, generateHandler(instance, route, klass));
        });
    });
};
