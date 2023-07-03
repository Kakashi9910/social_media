import express from 'express';
const router = express.Router();
import passport from 'passport';
// const usersController = require('../controllers/users_controller.js');
import {profile,createSession,destroySession,create,signIn,signUp} from '../controllers/users_controller.js'
router.get('/profile/:id', passport.checkAuthentication, profile);

router.get('/sign-up',signUp);
router.get('/sign-in',signIn);


router.post('/create', create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), createSession);


router.get('/sign-out', destroySession);

export default router;