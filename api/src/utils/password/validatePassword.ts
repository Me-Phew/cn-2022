// 8 znaków, 1 mała / duza, cyfra, znak
import bcrypt from 'bcrypt';

export async function validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}