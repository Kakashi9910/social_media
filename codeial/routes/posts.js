import express from 'express';
const router = express.Router();
import passport from 'passport';
import {create} from '../controllers/posts_controller.js'
import { destroy } from '../controllers/posts_controller.js';
// const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication,create);
router.get('/destroy/:id',passport.checkAuthentication,destroy);

export default router;