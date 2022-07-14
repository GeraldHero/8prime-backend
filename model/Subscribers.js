import mongoose from 'mongoose';
const { Schema } = mongoose;
import validator from 'validator';

const SubscibersSchema = Schema(
  {
    email: {
      type: String,
      require: [true, 'Please enter your email'],
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Invalid Email');
      },
    },
    message: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscibers = mongoose.model('subscriber', SubscibersSchema);

export default Subscibers;
