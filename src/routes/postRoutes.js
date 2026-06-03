// src/routes/postRoutes.js
import { Router } from 'express';
import { createPost } from '../controllers/postController.js';

const router = Router();

// Endpoint para crear un post
router.post('/', createPost);

export default router;