import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Users from '../../model/Users.js';

const dummyTest1Id = new mongoose.Types.ObjectId();
export const dummyTest1 = {
  _id: dummyTest1Id,
  username: 'gerald',
  isAdmin: true,
  password: '123456gh',
  tokens: [
    {
      token: jwt.sign({ id: dummyTest1Id }, process.env.JWT_SECRET_KEY),
    },
  ],
};

export const setupDb = async () => {
  await Users.deleteMany();
  await new Users(dummyTest1).save();
};
