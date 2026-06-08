import { Router } from 'express';
import { createUser,
    getAllUsers,
    getUserByNickName,
    deleteUser
 } from '../controllers/userController.js';
import { validateSchema, createUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.post('/', validateSchema(createUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/:nickName', getUserByNickName);
router.delete('/:nickName', deleteUser);

export default router;