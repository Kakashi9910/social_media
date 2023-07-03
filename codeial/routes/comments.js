import express from 'express';
const router = express.Router();
import passport from 'passport';
import {create} from '../controllers/comments_controller.js'
import { destroy } from '../controllers/comments_controller.js';
// const commentsController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthentication, create);
router.get('/destroy/:id',passport.checkAuthentication,destroy)

export default router;