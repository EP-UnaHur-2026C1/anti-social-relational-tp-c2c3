import { Post, PostImage, User, Comment, Tag } from '../models/index.js';
import { Op } from 'sequelize'; 

export const createPost = async (req, res) => {
  try {
    const { description, user_nickName, images } = req.body;

    // 1. Validación de campos obligatorios
    if (!description || !user_nickName) {
      return res.status(400).json({ error: 'La descripción y el autor (user_nickName) son obligatorios' });
    }

    // 2. Verificar que el usuario realmente exista en la base de datos
    const user = await User.findByPk(user_nickName);
    if (!user) {
      return res.status(404).json({ error: 'El usuario especificado no existe' });
    }

    // 3. Crear el post principal
    const newPost = await Post.create({
      description,
      user_nickName
    });

    // 4. Si el usuario envió imágenes, las asociamos al post
    // Usamos bulkCreate para insertar varias filas a la vez en la tabla Post_Images
    if (images && Array.isArray(images) && images.length > 0) {
      const imageRecords = images.map(url => ({
        url,
        post_id: newPost.id
      }));
      await PostImage.bulkCreate(imageRecords);
    }

    // 5. Buscamos el post recién creado para devolverlo completo (incluyendo sus imágenes)
    const postWithImages = await Post.findByPk(newPost.id, {
      include: [PostImage] // Esto hace un JOIN automático con Sequelize
    });

    res.status(201).json(postWithImages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor al crear el post' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // 1. Leemos la variable de entorno o usamos 6 por defecto
    const maxMonths = parseInt(process.env.COMMENT_MAX_AGE_MONTHS) || 6;
    
    // 2. Calculamos la fecha límite (Hace X meses exactos desde hoy)
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - maxMonths);

    // 3. Buscamos todos los posts con sus relaciones
    const posts = await Post.findAll({
      include: [
        { 
          model: PostImage 
        },
        {
          model: Comment,
          required: false, // required: false hace un LEFT JOIN (trae el post aunque no tenga comentarios)
          where: {
            createdAt: {
              [Op.gte]: cutoffDate // gte = Greater Than or Equal (mayor o igual a la fecha límite)
            }
          }
        },
        { 
          model: Tag 
        }
      ],
      order: [['createdAt', 'DESC']] // Ordenamos del más nuevo al más viejo
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params; 

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'El post que intentas eliminar no existe' });
    }

    await post.destroy(); //Con destrou() eliminamos el registro de la base de datos.

    res.status(200).json({ message: 'Publicación eliminada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar el post' });
  }
};