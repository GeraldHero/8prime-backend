import express from 'express';
import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multerUploadMulti.js';

import {
  getAllImage,
  getSpecificImages,
  uploadImage,
  deleteImage,
  deleteAllImage,
} from '../controllers/imageController.js';
const router = express.Router();

router
  .route('/')
  .post(auth, multerMiddleware, uploadImage)
  .get(auth, getAllImage);
router.route('/:id').delete(auth, deleteImage).get(auth, getSpecificImages);
router.route('/deleteAll/:id').delete(auth, deleteAllImage);

export default router;
