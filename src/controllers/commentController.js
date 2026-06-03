import { Comment, Post, User } from '../models/index.js';

export const createComment = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ID del post desde la URL
    const { text, user_nickName } = req.body;

    if (!text || !user_nickName) {
      return res.status(400).json({ error: 'El texto y el autor son obligatorios' });
    }

    // Verificamos que el post exista antes de comentarlo
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'El post que intentas comentar no existe' });
    }

   
    const newComment = await Comment.create({
      text,
      user_nickName,
      post_id: id
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};