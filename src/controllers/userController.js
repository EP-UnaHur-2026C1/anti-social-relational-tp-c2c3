import { User } from '../models/index.js';

export const createUser = async (req, res) => {
  try {
    // Extraemos el nickName del cuerpo (body) de la petición
    const { nickName } = req.body;

    if (!nickName) {
      return res.status(400).json({ error: 'El nickName es obligatorio' });
    }

    const newUser = await User.create({ nickName });
    
    // Devolvemos el usuario creado con código 201 (Created)
    res.status(201).json(newUser);

  } catch (error) {
    // Si el error es porque el usuario ya existe (violación de la restricción UNIQUE)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
    
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};