import { Router } from '../types/Router';
import SchoolRouter from './School';
import CategoryRouter from './Category';
import AuthorRouter from './Author';
import BookRouter from './Book';

const routes = <Router[]>[
    {
        path: '/school',
        router: SchoolRouter
    },
    {
        path: '/category',
        router: CategoryRouter
    },
    {
        path: '/author',
        router: AuthorRouter
    },
    {
        path: '/book',
        router: BookRouter
    }
];

export default routes;