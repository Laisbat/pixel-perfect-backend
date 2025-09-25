import { Router } from 'express';
import env from '../configs/env';
import IsAuthenticated from '../middlewares/IsAuthenticated';

import postsRoutes from './posts.route';
import sessionRoutes from './session.route';
import userRoutes from './users.route';

const router = Router();

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'API',
    development: '@PIXELPERFECT',
    environment: env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

router.use('/posts', IsAuthenticated, postsRoutes);
router.use('/session', sessionRoutes);
router.use('/users', IsAuthenticated, userRoutes);

export default router;
