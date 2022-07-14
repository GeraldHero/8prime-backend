import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(auth, getAllUsers).post(createUser);

router.route('/:id').get(auth, getUser);

export default router;
