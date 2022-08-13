import Subscribers from '../model/Subscribers.js';

// @route POST /api/subscribers
// @desc  Create subscriber and Message
// @access Public

export const createMessage = async (req, res) => {
  const { name, email, message, phone } = req.body;
  try {
    let subscriber = await Subscribers.findOne({ email });
    if (subscriber) {
      subscriber.messages = [...subscriber.messages, { message, date: Date() }];
      await subscriber.save();
      return res.status(201).send({ msg: 'Your message has been sent.' });
    }
    subscriber = new Subscribers({
      name,
      email,
      messages: [{ message, date: Date() }],
      phone: String(phone),
    });
    await subscriber.save();
    return res.status(201).send({ msg: 'Your message has been sent.' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   GET api/subscribers/:id
// @desc    Get Specific Subscriber Data
// @access  Private

export const getSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscribers.findOne({ _id: req.params.id });
    if (!subscriber || subscriber.length == 0)
      return res.status(404).send({ msg: 'Not found' });
    return res.status(200).send(subscriber);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   GET api/subscribers?page=2&limit=3
// @desc    Get All message Data with pagination ready
// @access  Private

export const getAllSubscribers = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startIndex = page * limit;

  try {
    const totalPage = await Subscribers.countDocuments({});
    const subscriberData = await Subscribers.find()
      .limit(limit)
      .skip(startIndex)
      .sort({
        name: 'asc',
      });
    // to set page - Math.ceil(total / limit)
    return res.status(200).json({
      subscriberList: subscriberData,
      totalPage,
    });
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   DELETE api/subscribers/:id
// @desc    Delete Specific Subscriber Data
// @access  Private

export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscribers.findByIdAndRemove({
      _id: req.params.id,
    });

    return res.status(200).send(subscriber);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};
