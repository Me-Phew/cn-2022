import { Express } from 'express';
import { Router } from 'types/Router';

export function registerRoutes(app: Express, routers: Router[]) {
    routers.forEach(({ path, router }) => {
        app.use(path, router);
    });
}