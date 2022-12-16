import * as dotenv from 'dotenv';

export function initEnv() {
    try {
        dotenv.config();
    } catch (error) {
        console.error(error);
    }   
}