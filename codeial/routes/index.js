import { Router } from 'express';

const router = Router();
import { home } from '../controllers/home_controller.js';
import UsersRouter from './users.js'
import PostRouter from './posts.js'
import CommentsRouter from './comments.js'
console.log('router loaded');


router.get('/', home);
router.use('/users', UsersRouter);
router.use('/posts', PostRouter);
router.use('/comments',CommentsRouter);

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


export default router;