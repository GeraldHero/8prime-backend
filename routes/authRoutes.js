import express from 'express';
import auth from '../middleware/auth.js';
import {
  loginUser,
  logoutUser,
  logoutAllUser,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/').post(loginUser);
router.route('/logout').post(auth, logoutUser);
router.route('/logoutAll').post(auth, logoutAllUser);

export default router;
