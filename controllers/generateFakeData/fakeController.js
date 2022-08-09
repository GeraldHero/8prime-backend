import express from 'express';
import { faker } from '@faker-js/faker';
import Subscribers from '../../model/Subscribers.js';

const router = express.Router();

// @route POST /fake/data
// @desc  Create bulk fake subscriber and Message
// @access Public

export const SubscibersInputData = async (req, res) => {
  const limit = 100;
  try {
    for (let i = 1; i < limit; i++) {
      const subscriber = await new Subscribers({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        messages: [
          { message: faker.lorem.paragraph(), date: faker.date.past() },
        ],
        phone: faker.phone.number('09#-###-####'),
      });
      await subscriber.save();
    }
    return res.status(201).send({ msg: 'Your messages has been sent.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

export const getAll = async (req, res) => {
  console.log('runing');
};
