import express from 'express';
import auth from '../middleware/auth.js';
import {
  createMessage,
  getAllSubscribers,
  getSubscriber,
} from '../controllers/subscriberController.js';
const router = express.Router();

router.route('/').get(auth, getAllSubscribers).post(createMessage);
router.route('/:id').get(auth, getSubscriber);
export default router;
