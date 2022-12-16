export class AuthenticationError {
    public message = 'Authentication failed! Provided email or password is incorrect.';
    public code = 401;

    constructor(message?: string, code?: number) {
        if (message) {
            this.message = message;
        }

        if (code) {
            this.code = code;
        }
    }

    public getError() {
        return {
            errors: [],
            message: this.message
        };
    }
}