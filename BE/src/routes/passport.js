import express from 'express';
import passport from 'passport';

import dotenv from "dotenv";
import { LoginWithGoogle, LogoutGoogle } from '../controller/passport/passport';
dotenv.config();
const successRedirect = process.env.GOOGLE_SUCCESS_REDIRECT;
const failureRedirect = process.env.GOOGLE_FAILURE_REDIRECT;
const routerPassport = express.Router();

routerPassport.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));
routerPassport.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: successRedirect,
        failureRedirect: failureRedirect
    }));
routerPassport.use('/auth/logout', LogoutGoogle);
routerPassport.use('/google/success', LoginWithGoogle);
// 
export default routerPassport;