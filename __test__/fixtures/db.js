import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Users from '../../model/Users.js';
import Subscribers from '../../model/Subscribers.js';
import Images from '../../model/Images.js';

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

const dummySub1Id = new mongoose.Types.ObjectId();
export const dummySubcriber1 = {
  _id: dummySub1Id,
  email: 'test@gmail.com',
  message:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores magni id accusamus?',
  name: 'gerald',
  phone: '09558444752',
};

const dummyImg1Id = new mongoose.Types.ObjectId();
export const imageDummy1 = {
  _id: dummyImg1Id,
  section: 'bungalow',
  photos: {
    path: './upload-1658314286753-img.jpg',
    filename: 'upload-1658314286753-img.jpg',
  },
};

const dummyPro1Id = new mongoose.Types.ObjectId();
export const dummyProject1 = {
  _id: dummyPro1Id,
  title: 'Bungalow',
  description: 'Here at Angeles City Pampanga',
  listTitle: 'Order and Facility',
  bedrooms: 3,
  cr: 2,
  area: ['Living room', 'Kitchen', 'Cover Court'],
  price: 2000000,
};

export const setupDb = async () => {
  await Users.deleteMany();
  await Subscribers.deleteMany();
  await Images.deleteMany();
  await new Users(dummyTest1).save();
  await new Subscribers(dummySubcriber1).save();
  await new Images(imageDummy1).save();
};
