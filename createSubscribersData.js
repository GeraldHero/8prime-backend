import Subscribers from './model/Subscribers';

const createData = async (data, idx) => {
  try {
    const subscriber = new Subscribers({
      name: `${data.name} - ${idx}`,
      email: `t${idx}-${data.email}`,
      messages: [{ message: `${data.message} : ${idx}`, date: Date() }],
      phone: `${data.message}${idx}`,
    });
    await subscriber.save();
    return subscriber;
  } catch (error) {
    console.log(error);
    return;
  }
};

const limitData = 50;
const data = {
  name: 'testData',
  email: 'test@gmail.com',
  message: 'From Subscriber Data Maker',
  phone: '000000000',
};

// for (let i = 1; i < limitData; i++) {

// }
createData(data, i);
