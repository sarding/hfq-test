import express, { Application, Request, Response, NextFunction } from 'express';

import { installRoute } from './utils/routes';
import bodyParser from 'body-parser';

async function bootstrap() {
    const app: Application = express();

    app.use(bodyParser.json());

    await installRoute(app);

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('hello');
    });
    app.listen(7777, function () {
        console.log('Example app listening on port 7777!');
    });
}

bootstrap();
