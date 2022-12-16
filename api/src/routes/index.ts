import { Router } from '../types/Router';
import SchoolRouter from './School';
import CategoryRouter from './Category';

const routes = <Router[]>[
    {
        path: '/school',
        router: SchoolRouter
    },
    {
        path: '/category',
        router: CategoryRouter
    }
];

export default routes;