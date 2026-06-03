import { Post, PostImage } from '../models/index.js';


export const addImageToPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({error: 'La URL es obligatoria.'});
        }

        const post = await Post.findByPk(id);

        if (!post){
          return res.status(404).json({error: 'Post no encontrado.'});
        }

        const image = await PostImage.create({url, post_id : id});

        res.status(201).json(image)
    
    } catch (error){
        console.error(error);

        res.status(500).json({
            error: 'Error al agregar la imagen.'
        });
    }


};


export const deleteImageFromPost = async (req, res) => {
    try{
        const { imageId } = req.params

        const image = await PostImage.findByPk(imageId)

        if(!image){
            return res.status(404).json({
                error: 'Imagen no encontrada.'
            })
        }

        await image.destroy();

        res.status(200).json({
            message: 'Imagen eliminada correctamente.'
        })
    } catch(error){
        console.error(error)

        res.status(500).json({
            error: 'Error al eliminar la imagen.'
        })
    }
}