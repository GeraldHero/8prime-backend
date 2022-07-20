import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import platform from 'platform';
import bcryptjs from 'bcryptjs';

const { Schema } = mongoose;

const UsersSchema = Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      require: [true, 'Please enter a password'],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerifiedEmail: {
      type: Boolean,
      default: false,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
    logoutTime: {
      type: Date,
      default: Date.now,
    },
    activity: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
        usedPlatform: {
          type: String,
          require: true,
          default: 'Not detected',
        },
      },
    ],
  },
  { timestamps: true }
);

// Change the password to hash password for security
UsersSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcryptjs.genSaltSync(10);
  if (user.isModified('password'))
    user.password = await bcryptjs.hashSync(user.password, salt);
  next();
});

// Generate JWT Token and detect platform
UsersSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
  const usedPlatform = platform.description;
  user.loginTime = Date();
  //Concat token and usedplatform to user.tokens
  user.tokens = [...user.tokens, { token, usedPlatform }];
  await user.save();
  return token;
};

// Limit/remove sensitive data to the client
UsersSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.isAdmin;
  delete userObject.isVerifiedEmail;
  delete userObject.tokens;
  delete userObject.isActive;
  return userObject;
};

const Users = mongoose.model('user', UsersSchema);
export default Users;
