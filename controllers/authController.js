import bcryptjs from 'bcryptjs';
import Users from '../model/Users.js';

// @route   POST /api/auth
// @desc    Auth/Login user and get token
// @access  Public

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (user === null) {
      return res.status(400).json({ msg: 'Invalid Credential' });
    }

    const isMatch = await bcryptjs.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credential' });

    const token = await user.generateAuthToken();
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: 'Server error!' });
  }
};

// @route   POST /api/auth/logout
// @desc    Logout User
// @access  Private

export const logoutUser = async (req, res) => {
  try {
    req.user.logoutTime = await Date();
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    return res.status(200).send({ msg: 'Logout succesfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
};

// @route   POST /api/auth/logoutAll
// @desc    Logout all device session
// @access  Private

export const logoutAllUser = async (req, res) => {
  try {
    req.user.tokens = [];
    req.user.logoutTime = await Date();
    await req.user.save();
    return res.status(200).send({ msg: 'All device are succesfully logout!' });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
};
