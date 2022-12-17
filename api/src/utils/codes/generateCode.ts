import crypto, { randomBytes } from 'crypto';

export async function generateCode() {
    const tokenInBytes = await crypto.randomBytes(8);

    if (!tokenInBytes) {
        return;
    }

    return tokenInBytes.toString('hex');
}