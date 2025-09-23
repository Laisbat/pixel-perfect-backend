import { Router } from 'express';
import { PostController } from '../controllers/PostController';

const router = Router();
const controller = new PostController();

router.get('/post', controller.find);
router.post('/post/store', controller.store);

export default router;
