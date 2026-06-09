import Joi from 'joi';

// Esquema de validacion para crear un Post
export const createPostSchema = Joi.object({
  description: Joi.string().min(1).max(280).required(), // limite de caracteres
  user_nickName: Joi.string().min(3).required(), // usamos nickName como id
  images: Joi.array().items(Joi.string().uri()).optional() // imagen opcional
});