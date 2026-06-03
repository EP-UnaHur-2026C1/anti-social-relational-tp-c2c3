import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { createComment } from '../controllers/commentController.js';
import { addTagToPost } from '../controllers/tagController.js';
import { addImageToPost, deleteImageFromPost} from '../controllers/postImageController.js'
const router = Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.post('/:id/comments', createComment);

router.post('/:id/tags', addTagToPost); 

router.post('/:id/images', addImageToPost)
router.delete('/:id/images/:imageId', deleteImageFromPost)

export default router;