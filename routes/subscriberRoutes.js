import express from 'express';
import auth from '../middleware/auth.js';
import {
  createMessage,
  getAllSubscribers,
  getSubscriber,
  deleteSubscriber,
} from '../controllers/subscriberController.js';
const router = express.Router();

router.route('/').get(auth, getAllSubscribers).post(createMessage);

router.route('/:id').get(auth, getSubscriber).delete(auth, deleteSubscriber);
export default router;
