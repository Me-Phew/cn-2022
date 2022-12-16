import { AppDataSource } from '../data-source';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { School } from '../entity/School';
import { Password } from '../entity/Password';
import { validatePassword } from '../utils/password';
import { AuthenticationError } from '../errors/custom/Auth';

passport.serializeUser(function(user: School, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
    const repository = AppDataSource.getRepository(School);
    const school = await repository.findOneBy({
        id: id as number
    });

    if (!school) {
        return cb('Siema');
    }

    cb(null, school);
});

passport.use(new LocalStrategy({
    passwordField: 'password',
    usernameField: 'email'
}, async function verify(email: string, password: string, cb: any) {
    const schoolRepository = AppDataSource.getRepository(School);
    const passwordRepository = AppDataSource.getRepository(Password);
    const school = await schoolRepository.findOneBy({
        email
    });

    if (!school) {
        return cb(false, null, new AuthenticationError());
    }

    const passwordHash = await passwordRepository.findOneBy({
        school: {
            id: school.id
        }
    });

    if (!passwordHash) {
        return cb(false, null, new AuthenticationError());
    }

    const isPasswordValid = await validatePassword(password, passwordHash.value);
    if (!isPasswordValid) {
        return cb(false, null, new AuthenticationError());
    }

    return cb(null, school);
}));

export default passport;