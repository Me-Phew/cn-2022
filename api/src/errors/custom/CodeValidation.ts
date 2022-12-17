export class AuthenticationError {
    public message = 'Code validation failed!';
    public code = 400;

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