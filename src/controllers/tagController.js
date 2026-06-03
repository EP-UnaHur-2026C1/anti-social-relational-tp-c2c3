import { Tag, Post } from '../models/index.js';

export const addTagToPost = async (req, res) => {
  try {
    const { id } = req.params; // El ID del post (viene en la URL)
    const { name } = req.body; // El nombre de la etiqueta (viene en el JSON)

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la etiqueta es obligatorio' });
    }

    // 1. Verificamos que el post exista
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // 2. Buscamos la etiqueta, o la creamos si es la primera vez que se usa.
    const [tag] = await Tag.findOrCreate({
      where: { name: name.toLowerCase() }
    });

    // 3. Magia de Sequelize: inserta la relación en la tabla intermedia (Post_Tags)
    await post.addTag(tag);

    res.status(200).json({ message: 'Etiqueta vinculada con éxito al post', tag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la etiqueta' });
  }
};