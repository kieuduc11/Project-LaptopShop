import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/admin/user.service";
import { getUserAndRoleById } from "services/client/auth.service";

const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true,
    }, async function verify(req, username, password, callback) {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return callback(null, false, { message: "Incorrect username or password." });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return callback(null, false, { message: "Incorrect username or password." });
        }

        return callback(null, user as any);
    }));

    passport.serializeUser(function (user: any, callback) {
        return callback(null, {
            id: user.id,
            username: user.username,
        });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id } = user;
        const userFromDb = await getUserAndRoleById(id);
        return callback(null, { ...userFromDb });
    });
};

export default configPassportLocal;

