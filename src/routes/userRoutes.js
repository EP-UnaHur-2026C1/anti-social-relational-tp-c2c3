import { Router } from 'express';
import { createUser,
    getAllUsers,
    getUserByNickName,
    deleteUser
 } from '../controllers/userController.js';

const router = Router();

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:nickName', getUserByNickName);

router.delete('/:nickName', deleteUser);


export default router;