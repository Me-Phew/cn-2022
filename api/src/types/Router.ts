import { Router as RouterType } from 'express';

export interface Router {
    path: string;
    router: RouterType;
}