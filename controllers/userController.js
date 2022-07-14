import Users from '../model/Users.js';

// @route   GET api/users
// @desc    Get All Users Data
// @access  Private
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   GET api/users
// @desc    Get All Users Data
// @access  Private
export const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(404).send({ msg: 'User no found' });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route POST /api/user
// @desc  Create user
// @access Private

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await Users.findOne({ username });
    if (user) {
      return res.status(401).json({ msg: 'Account is already registered!' });
    }

    user = new Users({
      username,
      password,
    });

    const token = await user.generateAuthToken();
    await user.save();
    return res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};
