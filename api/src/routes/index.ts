import { Router } from '../types/Router';
import SchoolRouter from './School';

const routes = <Router[]>[
    {
        path: '/school',
        router: SchoolRouter
    }
];

export default routes;