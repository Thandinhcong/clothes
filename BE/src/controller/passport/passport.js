import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import passport from "passport";
import Auth from "../../models/auths";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


passport.use(new GoogleStrategy({
    clientID: "232983639741-9mhdhig2v5ffg0c533sj65d7ccfn7boe.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: process.env.GOOGLE_REDIRECT,
    passReqToCallback: true

}, async (request, accessToken, refreshToken, profile, done) => {
    const isExitUser = await Auth.findOne({
        googleId: profile.id,
        authType: "google"
    });
    if (isExitUser) {
        const token = jwt.sign({ id: isExitUser._id }, process.env.KEY, { expiresIn: "1d" });
        return done(null, { user: isExitUser, accessToken: token })
    } else {
        try {
            const newUser = new Auth({
                authType: "google",
                googleId: profile.id,
                name: profile.name.familyName,
                email: profile.emails[0].value,
                avatar: {
                    url: profile.picture,
                    publicId: null
                },
                password: "Không có mật khẩu",
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.KEY, { expiresIn: "1d" });
            done(null, { user: newUser, accessToken: token });

        } catch (error) {
            if (error.code === 11000) {
                return done(null, false, { message: "Tài khoản đã tồn tại!" });
            } else {
                return done(error);
            }
        }
    }
}))


passport.serializeUser(({ user, accessToken }, done) => {
    done(null, { user, accessToken })
});
passport.deserializeUser(({ user, accessToken }, done) => {
    done(null, { user, accessToken })
});

export const LoginWithGoogle = (req, res) => {
    const { accessToken } = req.user;
    res.redirect(`${process.env.GOOGLE_SUCCESS}?token=${accessToken}`);
}

export const LogoutGoogle = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.redirect(process.env.CLIENT_URL);
        }
        res.redirect(process.env.CLIENT_URL);
    });
}
