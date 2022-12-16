// 8 znaków, 1 mała / duza, cyfra, znak
import bcrypt from 'bcrypt';
import { ValidationError } from '../../errors/custom';
import validator from 'validator';

export async function hashPassword(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
        throw new ValidationError([], 'Passwords do not match');
    }

    if (
        !validator.isStrongPassword(password)
    ) {
        throw new ValidationError([], 'Weak password');
    }

    return await bcrypt.hash(password, 10);
}