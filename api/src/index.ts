import express, { json } from 'express';
import { AppDataSource } from './data-source';
import cors from 'cors';
import swaggerDocs from './docs/swagger';
import routes from './routes';
import { registerRoutes } from './utils/routes/registerRoutes';
import { errorHandler } from './errors';

AppDataSource.initialize().then(async () => {
    const { PORT } = process.env;
    const app = express();

    app.use(cors());
    app.use(json());
    swaggerDocs(app, PORT as unknown as number);
    registerRoutes(app, routes);

    /**
     * @openapi
     * /:
     *  get:
     *     tags:
     *     - Root
     *     description: Root route
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/', (_, res) => {
        res.send('Welcome buddy! Let\'s chop some wood together!');
    });

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log('Hello!');
    }).on('error', (error) => {
        console.error(error);
    });
}).catch((error) => console.log(error));
