import express from 'express';
import {
  SubscibersInputData,
  getAll,
} from '../controllers/generateFakeData/fakeController.js';

const router = express.Router();

router.route('/').get(getAll).post(SubscibersInputData);

export default router;
