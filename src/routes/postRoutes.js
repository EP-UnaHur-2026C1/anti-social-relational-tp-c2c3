import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { createComment } from '../controllers/commentController.js';
import { addTagToPost } from '../controllers/tagController.js';
const router = Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.post('/:id/comments', createComment);

router.post('/:id/tags', addTagToPost); 

export default router;