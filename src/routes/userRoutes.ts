import express from 'express';
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/allusers', authMiddleware, getUsers);
router.get('/user/:id', authMiddleware, getUser);
router.put('/user/:id', authMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, deleteUser);


router.get('/', (req, res) => res.send('Hello World'));

export default router;
