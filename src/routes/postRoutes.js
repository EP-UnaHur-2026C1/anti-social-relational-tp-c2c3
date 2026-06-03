import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
import { createComment } from '../controllers/commentController.js';

const router = Router();

// Rutas de Publicaciones
router.post('/', createPost);
router.get('/', getAllPosts); // <-- Nueva ruta GET

// Ruta para comentar un post específico
router.post('/:id/comments', createComment); // <-- Nueva ruta de comentarios

export default router;