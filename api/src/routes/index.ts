import { Router } from '../types/Router';
import SchoolRouter from './School';
import CategoryRouter from './Category';
import AuthorRouter from './Author';
import BookRouter from './Book';
import GlobalRouter from './Global';
import StudentRouter from './Student';

const routes = <Router[]>[
    {
        path: '/global',
        router: GlobalRouter
    },
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
    },
    {
        path: '/student',
        router: StudentRouter
    }
];

export default routes;